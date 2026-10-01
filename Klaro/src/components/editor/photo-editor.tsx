import { useRef } from "react";
import { Download, ImagePlus, Redo2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyStudio } from "@/components/editor/empty-studio";
import { Stage } from "@/components/editor/stage";
import { StudioPanel } from "@/components/editor/studio-panel";
import { ToolRail } from "@/components/editor/tool-rail";
import { usePhotoSession } from "@/components/editor/use-photo-session";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Tip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function statusHint(session: ReturnType<typeof usePhotoSession>) {
  if (session.activeTool === "retouch") {
    return session.hasMask
      ? "Sapuan siap. Tekan Hapus objek."
      : "Sapu objek atau watermark, lalu terapkan.";
  }
  if (session.activeTool === "cutout") {
    if (!session.hasCutout) return "Hapus background dulu untuk memotong cutout.";
    return session.cutoutMode === "guide"
      ? "Gambar garis pada bagian cutout yang ingin dibuang."
      : "Hapus atau pulihkan tepi secara manual.";
  }
  if (session.activeTool === "position") {
    return session.positionMode === "custom"
      ? "Seret subjek, atur padding, atau kunci ke tengah."
      : "Asli menjaga letak foto. Tengah menempatkan subjek di kanvas.";
  }
  if (session.activeTool === "resize") {
    return "Pilih rasio atau ketik ukuran kustom.";
  }
  if (session.activeTool === "batch") {
    return "Antrian memakai model, ukuran, posisi, dan latar yang aktif.";
  }
  return session.hasCutout
    ? "Rapikan tepi dengan hapus / pulihkan."
    : "Tekan gunting untuk menghapus background.";
}

export function PhotoEditor() {
  const session = usePhotoSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const batchRef = useRef<HTMLInputElement>(null);

  async function handleFiles(list: FileList | File[] | null | undefined) {
    const files = list ? [...list] : [];
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      if (files.length > 0) toast.error("Pilih berkas gambar.");
      return;
    }
    if (images.length === 1 && !session.hasImage) {
      try {
        await session.loadFromSource(images[0]!, images[0]!.name);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal membuka foto.",
        );
      }
      return;
    }
    if (images.length === 1 && session.hasImage) {
      try {
        await session.loadFromSource(images[0]!, images[0]!.name);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal membuka foto.",
        );
      }
      return;
    }
    session.addBatchFiles(images);
    if (!session.hasImage) {
      try {
        await session.loadFromSource(images[0]!, images[0]!.name);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal membuka foto.",
        );
      }
    }
  }

  async function handleSample(src: string, label: string) {
    try {
      await session.loadFromSource(src, label);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal memuat contoh.",
      );
    }
  }

  function openPicker() {
    fileRef.current?.click();
  }

  function openBatchPicker() {
    batchRef.current?.click();
  }

  return (
    <TooltipProvider>
      <div
        className="flex h-dvh flex-col bg-bg text-fg"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          void handleFiles(e.dataTransfer.files);
        }}
        onPaste={(e) => {
          const files = [...e.clipboardData.files].filter((f) =>
            f.type.startsWith("image/"),
          );
          if (files.length) void handleFiles(files);
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          suppressHydrationWarning
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
        <input
          ref={batchRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          multiple
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          suppressHydrationWarning
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />

        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            className="font-display text-xl tracking-[-0.03em] italic sm:text-2xl"
            onClick={() => session.clearSession()}
          >
            Klaro
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {session.hasImage && (
              <>
                <Tip label="Undo">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={!session.canUndo || session.processing}
                    onClick={session.undo}
                    aria-label="Undo"
                  >
                    <Undo2 />
                  </Button>
                </Tip>
                <Tip label="Redo">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={!session.canRedo || session.processing}
                    onClick={session.redo}
                    aria-label="Redo"
                  >
                    <Redo2 />
                  </Button>
                </Tip>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={openPicker}
                >
                  <ImagePlus />
                  Foto baru
                </Button>
                <Button
                  size="sm"
                  onClick={() => void session.exportPng()}
                  disabled={session.processing}
                >
                  <Download />
                  <span className="hidden sm:inline">Unduh PNG</span>
                  <span className="sm:hidden">Unduh</span>
                </Button>
              </>
            )}
          </div>
        </header>

        {!session.hasImage ? (
          <EmptyStudio
            onPickFile={openPicker}
            onPickBatch={openBatchPicker}
            onSample={handleSample}
          />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <ToolRail
              session={session}
              onRemoveBg={() => void session.removeBackground()}
            />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
              <Stage session={session} />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="hidden text-sm text-muted sm:block">
                  {statusHint(session)}
                </p>
                {session.compareAvailable && (
                  <button
                    type="button"
                    className="h-11 rounded-[var(--radius-sm)] bg-surface px-3 text-sm font-medium shadow-[var(--shadow-border)]"
                    onPointerDown={() => session.setShowOriginal(true)}
                    onPointerUp={() => session.setShowOriginal(false)}
                    onPointerLeave={() => session.setShowOriginal(false)}
                  >
                    Tahan untuk asli
                  </button>
                )}
              </div>
            </div>

            <aside className="min-h-0 max-h-[38vh] shrink-0 overflow-y-auto border-t border-border bg-surface px-4 py-4 lg:max-h-none lg:w-[22rem] lg:border-t-0 lg:border-l lg:px-5 lg:py-5">
              <StudioPanel session={session} onPickBatch={openBatchPicker} />
            </aside>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
