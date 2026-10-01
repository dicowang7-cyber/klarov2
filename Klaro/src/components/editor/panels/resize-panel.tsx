import { CheckRow, PanelTitle } from "@/components/editor/panel-bits";
import type { PhotoSession } from "@/components/editor/use-photo-session";
import { Input } from "@/components/ui/input";
import { PRESET_GROUPS, SIZE_PRESETS } from "@/lib/image/presets";
import { cn } from "@/lib/utils";

export function ResizePanel({ session }: { session: PhotoSession }) {
  return (
    <div className="flex flex-col gap-6">
      <PanelTitle
        title="Resize"
        hint="Ubah rasio dan ukuran kanvas. Subjek mengikuti pengaturan Posisi."
      />

      {PRESET_GROUPS.map((group) => {
        const presets = SIZE_PRESETS.filter((p) => p.group === group);
        return (
          <section key={group} className="space-y-2">
            <h3 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
              {group}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => {
                const active = session.presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => session.applyPreset(preset.id)}
                    className={cn(
                      "rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-[background-color,color] duration-[var(--motion-quick)]",
                      active
                        ? "bg-accent text-accent-fg"
                        : "bg-surface-2 text-fg hover:bg-border/80",
                    )}
                  >
                    <span className="block text-sm font-medium">{preset.label}</span>
                    <span
                      className={cn(
                        "block text-xs",
                        active ? "text-accent-fg/70" : "text-subtle",
                      )}
                    >
                      {preset.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="space-y-3">
        <h3 className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Kustom
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1.5">
            <span className="text-xs text-muted">Lebar</span>
            <Input
              type="number"
              min={64}
              max={4096}
              value={session.canvasWidth}
              onChange={(e) =>
                session.setCanvasSize(
                  Number(e.target.value),
                  session.canvasHeight,
                  "width",
                )
              }
              aria-label="Lebar kanvas"
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-xs text-muted">Tinggi</span>
            <Input
              type="number"
              min={64}
              max={4096}
              value={session.canvasHeight}
              onChange={(e) =>
                session.setCanvasSize(
                  session.canvasWidth,
                  Number(e.target.value),
                  "height",
                )
              }
              aria-label="Tinggi kanvas"
            />
          </label>
        </div>
        <CheckRow
          checked={session.lockAspect}
          onChange={session.setLockAspect}
          label="Kunci rasio"
        />
      </section>
    </div>
  );
}
