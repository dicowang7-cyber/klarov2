const MAX_EDGE = 1800;
const MAX_BYTES = 20 * 1024 * 1024;

export function cloneImageData(source: ImageData): ImageData {
  return new ImageData(
    new Uint8ClampedArray(source.data),
    source.width,
    source.height,
  );
}

export function extractAlpha(source: ImageData): Uint8Array {
  const alpha = new Uint8Array(source.width * source.height);
  const data = source.data;
  for (let i = 0, p = 3; i < alpha.length; i++, p += 4) {
    alpha[i] = data[p];
  }
  return alpha;
}

export function applyAlpha(target: ImageData, alpha: Uint8Array) {
  const data = target.data;
  for (let i = 0, p = 3; i < alpha.length; i++, p += 4) {
    data[p] = alpha[i];
  }
}

async function decodeImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  if (img.decode) {
    await img.decode();
    return img;
  }
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Gagal memuat gambar."));
  });
  return img;
}

export function rasterizeImage(
  image: CanvasImageSource & { width: number; height: number },
  maxEdge = MAX_EDGE,
): ImageData {
  const sourceWidth = "naturalWidth" in image && image.naturalWidth
    ? (image as HTMLImageElement).naturalWidth
    : image.width;
  const sourceHeight = "naturalHeight" in image && image.naturalHeight
    ? (image as HTMLImageElement).naturalHeight
    : image.height;
  const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas tidak tersedia.");
  ctx.drawImage(image, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export async function imageDataFromSource(
  source: File | Blob | string,
): Promise<ImageData> {
  if (source instanceof Blob && source.size > MAX_BYTES) {
    throw new Error("Ukuran foto terlalu besar (maks 20MB).");
  }
  const url =
    typeof source === "string" ? source : URL.createObjectURL(source);
  try {
    const image = await decodeImage(url);
    return rasterizeImage(image);
  } catch {
    throw new Error("Gagal memuat gambar.");
  } finally {
    if (typeof source !== "string") URL.revokeObjectURL(url);
  }
}

export async function imageDataToPngBlob(data: ImageData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia.");
  ctx.putImageData(data, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Gagal menyimpan PNG.");
  return blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
