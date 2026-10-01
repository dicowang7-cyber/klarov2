import { Slider } from "@/components/ui/slider";
import { FILL_SWATCHES, OUTLINE_SWATCHES, hexEqual } from "@/lib/image/pixels";
import { MODEL_OPTIONS } from "@/lib/image/remove-bg";
import type { PhotoSession } from "@/components/editor/use-photo-session";
import { cn } from "@/lib/utils";

type AdjustPanelProps = {
  session: PhotoSession;
};

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-fg">{label}</p>
        {value ? (
          <p className="text-xs tabular-nums text-subtle">{value}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function AdjustPanel({ session }: AdjustPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Kuas
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => session.setBrushTool("erase")}
            className={cn(
              "h-11 rounded-[var(--radius-sm)] text-sm font-medium transition-[background-color,color] duration-[var(--motion-quick)]",
              session.brushTool === "erase"
                ? "bg-accent text-accent-fg"
                : "bg-surface-2 text-fg hover:bg-border/80",
            )}
          >
            Hapus
          </button>
          <button
            type="button"
            onClick={() => session.setBrushTool("restore")}
            className={cn(
              "h-11 rounded-[var(--radius-sm)] text-sm font-medium transition-[background-color,color] duration-[var(--motion-quick)]",
              session.brushTool === "restore"
                ? "bg-accent text-accent-fg"
                : "bg-surface-2 text-fg hover:bg-border/80",
            )}
          >
            Pulihkan
          </button>
        </div>
        <Row label="Ukuran kuas" value={`${session.brushSize}px`}>
          <Slider
            min={6}
            max={160}
            step={1}
            value={[session.brushSize]}
            onValueChange={([v]) => session.setBrushSize(v ?? 36)}
            aria-label="Ukuran kuas"
          />
        </Row>
        <Row
          label="Kekerasan"
          value={`${Math.round(session.brushHardness * 100)}%`}
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[session.brushHardness]}
            onValueChange={([v]) => session.setBrushHardness(v ?? 0.55)}
            aria-label="Kekerasan kuas"
          />
        </Row>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Kecerahan
        </h2>
        <Row
          label="Pencahayaan subjek"
          value={`${session.brightness > 0 ? "+" : ""}${session.brightness}`}
        >
          <Slider
            min={-80}
            max={80}
            step={1}
            value={[session.brightness]}
            onValueChange={([v]) => session.setBrightness(v ?? 0)}
            aria-label="Kecerahan"
          />
        </Row>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Outline
        </h2>
        <Row label="Ketebalan" value={`${session.outlineWidth}px`}>
          <Slider
            min={0}
            max={48}
            step={1}
            value={[session.outlineWidth]}
            onValueChange={([v]) => session.setOutlineWidth(v ?? 0)}
            aria-label="Ukuran outline"
          />
        </Row>
        <div className="space-y-2">
          <p className="text-sm font-medium text-fg">Warna</p>
          <div className="flex flex-wrap items-center gap-2">
            {OUTLINE_SWATCHES.map((swatch) => (
              <button
                key={swatch.value}
                type="button"
                title={swatch.label}
                aria-label={swatch.label}
                onClick={() => session.setOutlineColor(swatch.value)}
                className={cn(
                  "size-9 rounded-full shadow-[var(--shadow-border)]",
                  hexEqual(session.outlineColor, swatch.value) &&
                    "ring-2 ring-accent ring-offset-2 ring-offset-surface",
                )}
                style={{ backgroundColor: swatch.value }}
              />
            ))}
            <label className="relative size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]">
              <span className="sr-only">Warna kustom</span>
              <input
                type="color"
                value={session.outlineColor}
                onChange={(e) => session.setOutlineColor(e.target.value)}
                className="absolute inset-[-25%] size-[150%] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Latar
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {FILL_SWATCHES.map((swatch) => (
            <button
              key={swatch.label}
              type="button"
              title={swatch.label}
              aria-label={swatch.label}
              onClick={() => session.setFillColor(swatch.value)}
              className={cn(
                "size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]",
                session.fillColor === swatch.value &&
                  "ring-2 ring-accent ring-offset-2 ring-offset-surface",
                !swatch.value && "studio-check",
              )}
              style={
                swatch.value ? { backgroundColor: swatch.value } : undefined
              }
            />
          ))}
          <label className="relative size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]">
            <span className="sr-only">Latar kustom</span>
            <input
              type="color"
              value={session.fillColor ?? "#4a6d73"}
              onChange={(e) => session.setFillColor(e.target.value)}
              className="absolute inset-[-25%] size-[150%] cursor-pointer"
            />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Model AI
        </h2>
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
                  session.model === option.id
                    ? "text-accent-fg/70"
                    : "text-subtle",
                )}
              >
                {option.hint}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-subtle">
          ISNet open source. Tanpa biaya API. Unduhan pertama cached di
          browser.
        </p>
      </section>
    </div>
  );
}
