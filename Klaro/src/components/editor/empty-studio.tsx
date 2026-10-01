import { ImagePlus, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_PHOTOS } from "@/lib/samples";

type EmptyStudioProps = {
  onPickFile: () => void;
  onPickBatch: () => void;
  onSample: (src: string, label: string) => void;
};

export function EmptyStudio({
  onPickFile,
  onPickBatch,
  onSample,
}: EmptyStudioProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-10 sm:px-8">
      <div className="stagger-in space-y-3">
        <p className="text-sm font-medium tracking-[0.18em] text-muted uppercase">
          Studio foto
        </p>
        <h1 className="font-display text-4xl leading-tight font-medium tracking-[-0.03em] text-balance text-fg sm:text-5xl">
          Potong background
          <span className="italic text-muted"> sehalus studio.</span>
        </h1>
        <p className="max-w-lg text-pretty text-base leading-relaxed text-muted">
          Hapus latar, retouch watermark, buang bagian cutout, lalu atur ukuran
          dan posisi. Batch banyak foto sekaligus — semuanya di perangkatmu.
        </p>
      </div>

      <div className="stagger-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onPickFile} className="min-h-12">
          <ImagePlus />
          Unggah foto
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={onPickBatch}
          className="min-h-12"
        >
          <Images />
          Batch
        </Button>
        <p className="text-sm text-subtle">PNG, JPG, atau WEBP · maks 20MB</p>
      </div>

      <div className="stagger-in mt-10">
        <p className="mb-3 text-sm font-medium text-muted">Atau coba contoh</p>
        <div className="grid grid-cols-3 gap-3">
          {SAMPLE_PHOTOS.map((sample) => (
            <button
              key={sample.src}
              type="button"
              onClick={() => onSample(sample.src, sample.label)}
              className="group overflow-hidden rounded-[var(--radius-lg)] bg-surface text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]"
            >
              <img
                src={sample.src}
                alt={sample.label}
                className="aspect-portrait w-full object-cover"
              />
              <span className="flex items-baseline justify-between px-3 py-2">
                <span className="text-sm font-medium text-fg">{sample.label}</span>
                <span className="text-xs text-subtle">{sample.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="stagger-in mt-8 max-w-xl text-sm leading-relaxed text-subtle">
        Model: ISNet (open source, gratis) lewat ONNX Runtime di browser.
        Varian Cepat (~40MB) atau Halus (~80MB) diunduh sekali, lalu dipakai
        ulang dari cache.
      </p>
    </div>
  );
}
