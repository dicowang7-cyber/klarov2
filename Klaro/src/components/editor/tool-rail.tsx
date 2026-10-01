import {
  Images,
  Lasso,
  Scaling,
  Scan,
  Scissors,
  SlidersHorizontal,
  WandSparkles,
} from "lucide-react";
import type { PhotoSession, StudioTool } from "@/components/editor/use-photo-session";
import { cn } from "@/lib/utils";

const TOOLS: {
  id: StudioTool;
  label: string;
  icon: typeof Scissors;
}[] = [
  { id: "adjust", label: "Kuas", icon: SlidersHorizontal },
  { id: "retouch", label: "Retouch", icon: WandSparkles },
  { id: "cutout", label: "Cutout", icon: Lasso },
  { id: "resize", label: "Resize", icon: Scaling },
  { id: "position", label: "Posisi", icon: Scan },
  { id: "batch", label: "Batch", icon: Images },
];

type ToolRailProps = {
  session: PhotoSession;
  onRemoveBg: () => void;
};

export function ToolRail({ session, onRemoveBg }: ToolRailProps) {
  return (
    <aside className="flex shrink-0 items-stretch gap-1 overflow-x-auto border-b border-border px-2 py-2 lg:w-[4.75rem] lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:px-2 lg:py-3">
      <RailButton
        label="Hapus BG"
        active={false}
        tone={session.hasCutout ? "muted" : "accent"}
        disabled={session.processing}
        onClick={onRemoveBg}
      >
        <Scissors className="size-4" />
      </RailButton>
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <RailButton
            key={tool.id}
            label={tool.label}
            active={session.activeTool === tool.id}
            disabled={session.processing}
            onClick={() => session.setActiveTool(tool.id)}
          >
            <Icon className="size-4" />
          </RailButton>
        );
      })}
    </aside>
  );
}

function RailButton({
  label,
  active,
  tone = "default",
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  tone?: "default" | "accent" | "muted";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex min-h-12 min-w-14 flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)] px-2 text-[10px] font-medium tracking-wide transition-[background-color,color] duration-[var(--motion-quick)] disabled:opacity-40 lg:min-h-[3.4rem] lg:min-w-0 lg:w-full",
        tone === "accent" && "bg-accent text-accent-fg hover:bg-accent/90",
        tone === "muted" && "text-subtle hover:bg-surface-2/70 hover:text-fg",
        tone === "default" &&
          (active
            ? "bg-surface-2 text-fg"
            : "text-muted hover:bg-surface-2/70 hover:text-fg"),
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
