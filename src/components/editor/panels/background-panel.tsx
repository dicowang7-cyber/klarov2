import { Scissors } from "lucide-react";
import { PanelTitle } from "@/components/editor/panel-bits";
import type { PhotoSession } from "@/components/editor/use-photo-session";
import { Button } from "@/components/ui/button";
import { FILL_SWATCHES } from "@/lib/image/pixels";
import { cn } from "@/lib/utils";

export function BackgroundPanel({
  session,
  onRemoveBg,
}: {
  session: PhotoSession;
  onRemoveBg: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PanelTitle
        title="Latar Belakang"
        hint="Warna kanvas berlaku untuk semua foto. Hapus BG memproses seluruh batch."
      />
      <Button onClick={onRemoveBg} disabled={session.processing}>
        <Scissors />
        Hapus background
      </Button>
      <section className="space-y-3">
        <h3 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Warna
        </h3>
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
              value={session.fillColor ?? "#ffffff"}
              onChange={(e) => session.setFillColor(e.target.value)}
              className="absolute inset-[-25%] size-[150%] cursor-pointer"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
