import { Download, ImagePlus, Trash2, X } from "lucide-react";
import { CheckRow, PanelTitle } from "@/components/editor/panel-bits";
import type { PhotoSession } from "@/components/editor/use-photo-session";
import { Button } from "@/components/ui/button";
import { MODEL_OPTIONS } from "@/lib/image/remove-bg";
import { cn } from "@/lib/utils";

export function BatchPanel({
  session,
  onPickFiles,
}: {
  session: PhotoSession;
  onPickFiles: () => void;
}) {
  const done = session.batchItems.filter((i) => i.status === "done").length;
  const total = session.batchItems.length;

  return (
    <div className="flex flex-col gap-6">
      <PanelTitle
        title="Batch"
        hint="Proses banyak foto dengan pengaturan yang sama: hapus BG, ukuran, posisi, dan latar."
      />

      <Button variant="outline" onClick={onPickFiles} disabled={session.processing}>
        <ImagePlus />
        Tambah foto
      </Button>

      <CheckRow
        checked={session.batchRemoveBg}
        onChange={session.setBatchRemoveBg}
        label="Hapus background"
      />

      <section className="space-y-2">
        <h3 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Model AI
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {MODEL_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => session.setModel(option.id)}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-[background-color,color] duration-[var(--motion-quick)]",
                session.model === option.id
                  ? "bg-accent text-accent-fg"
                  : "bg-surface-2 text-fg hover:bg-border/80",
              )}
            >
              <span className="block text-sm font-medium">{option.label}</span>
              <span
                className={cn(
                  "block text-xs",
                  session.model === option.id ? "text-accent-fg/70" : "text-subtle",
                )}
              >
                {option.hint}
              </span>
            </button>
          ))}
        </div>
      </section>

      {total > 0 ? (
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-fg">Antrian</p>
            <p className="text-xs tabular-nums text-subtle">
              {done}/{total} siap
            </p>
          </div>
          <ul className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
            {session.batchItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-surface-2 p-1.5"
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  onClick={() => void session.openBatchItem(item.id)}
                >
                  <img
                    src={item.resultUrl ?? item.thumbUrl}
                    alt=""
                    className="size-10 shrink-0 rounded-[6px] object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-fg">
                      {item.name}
                    </span>
                    <span className="block text-xs text-subtle">
                      {statusLabel(item.status, item.error)}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="flex size-9 shrink-0 items-center justify-center rounded-[6px] text-muted hover:bg-surface hover:text-fg"
                  aria-label="Hapus dari antrian"
                  onClick={() => session.removeBatchItem(item.id)}
                >
                  <X className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted">
          Unggah beberapa foto, atau seret banyak berkas ke studio.
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => void session.processBatch()}
          disabled={session.processing || total === 0}
        >
          Proses {total || ""} foto
        </Button>
        <Button
          variant="outline"
          onClick={() => void session.downloadBatchZip()}
          disabled={done === 0 || session.processing}
        >
          <Download />
          Unduh ZIP
        </Button>
        {total > 0 ? (
          <Button
            variant="ghost"
            onClick={session.clearBatch}
            disabled={session.processing}
          >
            <Trash2 />
            Kosongkan antrian
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function statusLabel(
  status: PhotoSession["batchItems"][number]["status"],
  error?: string,
) {
  if (status === "queued") return "Antri";
  if (status === "processing") return "Memproses";
  if (status === "done") return "Selesai";
  return error ?? "Gagal";
}
