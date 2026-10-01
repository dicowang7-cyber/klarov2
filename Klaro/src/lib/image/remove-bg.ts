export type BgModel = "isnet_quint8" | "isnet_fp16";

export const MODEL_OPTIONS: {
  id: BgModel;
  label: string;
  hint: string;
}[] = [
  {
    id: "isnet_quint8",
    label: "Cepat",
    hint: "ISNet 8-bit · ~40MB",
  },
  {
    id: "isnet_fp16",
    label: "Halus",
    hint: "ISNet FP16 · ~80MB",
  },
];

function progressLabel(key: string) {
  const k = key.toLowerCase();
  if (k.includes("fetch") || k.includes("download") || k.includes("load:")) {
    return "Mengunduh model AI";
  }
  if (k.includes("infer") || k.includes("compute") || k.includes("onnx")) {
    return "Memotong background";
  }
  return "Menyiapkan model";
}

export async function removeImageBackground(
  source: Blob,
  model: BgModel,
  onProgress: (percent: number, label: string) => void,
): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("Hapus background hanya tersedia di browser.");
  }
  const { removeBackground } = await import("@imgly/background-removal");

  return removeBackground(source, {
    model,
    device: "cpu",
    proxyToWorker: false,
    output: {
      format: "image/png",
      quality: 1,
    },
    progress: (key, current, total) => {
      const percent = total > 0 ? Math.round((current / total) * 100) : 0;
      onProgress(percent, progressLabel(key));
    },
  });
}
