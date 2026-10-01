import { edgeCutout } from "@/lib/image/edge-cutout";
import { refineCutout } from "@/lib/image/pixels";

export type BgModel = "fast" | "quality";

export const MODEL_OPTIONS: {
  id: BgModel;
  label: string;
  file: string;
  hint: string;
}[] = [
  {
    id: "fast",
    label: "Cepat",
    file: "model.onnx",
    hint: "Lebih ringan, hasil cepat",
  },
  {
    id: "quality",
    label: "Halus",
    file: "model_fp16.onnx",
    hint: "Tepi lebih rapi",
  },
];

export const MODEL_PATHS: Record<BgModel, string> = {
  fast: "/model/model.onnx",
  quality: "/model/model_fp16.onnx",
};

const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];

type OrtTensor = { data: ArrayLike<number>; dims: readonly number[] };

type InferenceSession = {
  inputNames: readonly string[];
  outputNames: readonly string[];
  run: (feeds: Record<string, unknown>) => Promise<Record<string, OrtTensor>>;
};

type OrtModule = {
  env: {
    wasm: {
      wasmPaths: string;
      numThreads: number;
      simd: boolean;
      proxy: boolean;
    };
  };
  InferenceSession: {
    create: (
      path: string,
      options: { executionProviders: string[]; graphOptimizationLevel: string },
    ) => Promise<InferenceSession>;
  };
  Tensor: new (
    type: string,
    data: Float32Array,
    dims: number[],
  ) => unknown;
};

let ortPromise: Promise<OrtModule> | null = null;
const sessions = new Map<string, Promise<InferenceSession>>();

async function loadOrt(): Promise<OrtModule> {
  if (!ortPromise) {
    ortPromise = import("onnxruntime-web").then((mod) => {
      const ort = mod as unknown as OrtModule;
      ort.env.wasm.wasmPaths = "/ort/";
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.simd = true;
      ort.env.wasm.proxy = false;
      return ort;
    });
  }
  return ortPromise;
}

export async function modelFileReady(path: string): Promise<boolean> {
  try {
    const res = await fetch(path, { method: "HEAD", cache: "no-cache" });
    if (!res.ok) return false;
    const length = Number(res.headers.get("content-length") ?? "0");
    if (Number.isFinite(length) && length > 0) return length > 2048;
    const full = await fetch(path, { cache: "force-cache" });
    const buf = await full.arrayBuffer();
    return buf.byteLength > 2048;
  } catch {
    return false;
  }
}

async function getSession(path: string): Promise<InferenceSession> {
  const cached = sessions.get(path);
  if (cached) return cached;
  const pending = (async () => {
    const ort = await loadOrt();
    return ort.InferenceSession.create(path, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
  })();
  sessions.set(path, pending);
  try {
    return await pending;
  } catch (error) {
    sessions.delete(path);
    throw error;
  }
}

function resizeImageData(source: ImageData, width: number, height: number) {
  const src = document.createElement("canvas");
  src.width = source.width;
  src.height = source.height;
  src.getContext("2d")!.putImageData(source, 0, 0);
  const dst = document.createElement("canvas");
  dst.width = width;
  dst.height = height;
  const ctx = dst.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas tidak tersedia.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

function tensorFromImage(
  ort: OrtModule,
  image: ImageData,
  layout: "nchw" | "nhwc",
) {
  const { width, height, data } = image;
  const pixelCount = width * height;
  const floats = new Float32Array(pixelCount * 3);
  if (layout === "nchw") {
    for (let i = 0, p = 0; i < pixelCount; i++, p += 4) {
      floats[i] = (data[p] / 255 - MEAN[0]!) / STD[0]!;
      floats[pixelCount + i] = (data[p + 1] / 255 - MEAN[1]!) / STD[1]!;
      floats[pixelCount * 2 + i] = (data[p + 2] / 255 - MEAN[2]!) / STD[2]!;
    }
  } else {
    for (let i = 0, p = 0, o = 0; i < pixelCount; i++, p += 4, o += 3) {
      floats[o] = (data[p] / 255 - MEAN[0]!) / STD[0]!;
      floats[o + 1] = (data[p + 1] / 255 - MEAN[1]!) / STD[1]!;
      floats[o + 2] = (data[p + 2] / 255 - MEAN[2]!) / STD[2]!;
    }
  }
  const dims =
    layout === "nchw" ? [1, 3, height, width] : [1, height, width, 3];
  return new ort.Tensor("float32", floats, dims);
}

function maskFromOutput(
  output: { data: ArrayLike<number>; dims: readonly number[] },
  width: number,
  height: number,
): Float32Array {
  const values = output.data;
  const count = width * height;
  const mask = new Float32Array(count);
  let offset = 0;
  if (values.length >= count * 2) {
    offset = values.length - count;
  }
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < count; i++) {
    const v = Number(values[offset + i] ?? 0);
    mask[i] = v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const span = Math.max(1e-5, max - min);
  for (let i = 0; i < count; i++) {
    mask[i] = (mask[i] - min) / span;
  }
  const corners =
    (mask[0]! +
      mask[width - 1]! +
      mask[(height - 1) * width]! +
      mask[height * width - 1]!) /
    4;
  if (corners > 0.5) {
    for (let i = 0; i < count; i++) mask[i] = 1 - mask[i]!;
  }
  return mask;
}

function applyMask(source: ImageData, mask: Float32Array, maskW: number, maskH: number) {
  const out = new ImageData(
    new Uint8ClampedArray(source.data),
    source.width,
    source.height,
  );
  const { width, height, data } = out;
  for (let y = 0; y < height; y++) {
    const sy = ((y + 0.5) * maskH) / height - 0.5;
    const y0 = Math.max(0, Math.floor(sy));
    const y1 = Math.min(maskH - 1, y0 + 1);
    const fy = sy - y0;
    for (let x = 0; x < width; x++) {
      const sx = ((x + 0.5) * maskW) / width - 0.5;
      const x0 = Math.max(0, Math.floor(sx));
      const x1 = Math.min(maskW - 1, x0 + 1);
      const fx = sx - x0;
      const a00 = mask[y0 * maskW + x0] ?? 0;
      const a10 = mask[y0 * maskW + x1] ?? 0;
      const a01 = mask[y1 * maskW + x0] ?? 0;
      const a11 = mask[y1 * maskW + x1] ?? 0;
      const a =
        a00 * (1 - fx) * (1 - fy) +
        a10 * fx * (1 - fy) +
        a01 * (1 - fx) * fy +
        a11 * fx * fy;
      data[(y * width + x) * 4 + 3] = Math.round(
        Math.max(0, Math.min(1, a)) * 255,
      );
    }
  }
  return out;
}

async function runOnnx(
  source: ImageData,
  path: string,
  onProgress: (percent: number, label: string) => void,
): Promise<ImageData> {
  onProgress(6, "Menyiapkan model");
  const ort = await loadOrt();
  onProgress(18, "Menyiapkan model");
  const session = await getSession(path);
  onProgress(36, "Memotong background");

  const inputName = session.inputNames[0];
  if (!inputName) throw new Error("Model tidak punya input.");
  const layout: "nchw" | "nhwc" = "nchw";
  const size = 1024;

  const resized = resizeImageData(source, size, size);
  const tensor = tensorFromImage(ort, resized, layout);
  onProgress(58, "Memotong background");
  const result = await session.run({ [inputName]: tensor });
  const firstOut = session.outputNames[0];
  if (!firstOut || !result[firstOut]) {
    throw new Error("Model tidak mengembalikan mask.");
  }
  onProgress(82, "Merapikan tepi");
  const output = result[firstOut]!;
  const dims = output.dims ?? [];
  const maskH = dims.length >= 2 ? Number(dims[dims.length - 2]) || size : size;
  const maskW = dims.length >= 1 ? Number(dims[dims.length - 1]) || size : size;
  const mask = maskFromOutput(
    output as { data: ArrayLike<number>; dims: readonly number[] },
    maskW,
    maskH,
  );
  onProgress(94, "Merapikan tepi");
  return applyMask(source, mask, maskW, maskH);
}

export async function removeImageBackground(
  source: ImageData,
  model: BgModel,
  onProgress: (percent: number, label: string) => void,
): Promise<ImageData> {
  if (typeof window === "undefined") {
    throw new Error("Hapus background hanya tersedia di browser.");
  }
  const path = MODEL_PATHS[model];
  const ready = await modelFileReady(path);
  if (ready) {
    try {
      const cut = await runOnnx(source, path, onProgress);
      return refineCutout(cut);
    } catch (error) {
      console.warn("Model ONNX gagal, memakai cutout lokal.", error);
    }
  }
  onProgress(10, "Memotong background");
  const cut = edgeCutout(source, model === "fast" ? "fast" : "quality", (percent) => {
    onProgress(Math.max(10, percent), "Memotong background");
  });
  onProgress(100, "Selesai");
  return refineCutout(cut);
}
