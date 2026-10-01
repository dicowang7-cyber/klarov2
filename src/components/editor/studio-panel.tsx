import { CutoutPanel } from "@/components/editor/panels/cutout-panel";
import { PositionPanel } from "@/components/editor/panels/position-panel";
import { ResizePanel } from "@/components/editor/panels/resize-panel";
import { RetouchPanel } from "@/components/editor/panels/retouch-panel";
import { BackgroundPanel } from "@/components/editor/panels/background-panel";
import { OutlinePanel } from "@/components/editor/panels/outline-panel";
import { SoonPanel } from "@/components/editor/panels/soon-panel";
import { TemplatePanel } from "@/components/editor/panels/template-panel";
import type { PhotoSession } from "@/components/editor/use-photo-session";

export function StudioPanel({
  session,
  onRemoveBg,
}: {
  session: PhotoSession;
  onRemoveBg: () => void;
}) {
  switch (session.activeTool) {
    case "retouch":
      return <RetouchPanel session={session} />;
    case "cutout":
      return <CutoutPanel session={session} />;
    case "outline":
      return <OutlinePanel session={session} />;
    case "position":
      return <PositionPanel session={session} />;
    case "resize":
      return <ResizePanel session={session} />;
    case "background":
      return <BackgroundPanel session={session} onRemoveBg={onRemoveBg} />;
    case "shadow":
      return (
        <SoonPanel
          title="Bayangan AI"
          hint="Bayangan studio otomatis untuk seluruh batch. Segera hadir."
        />
      );
    case "ai":
      return (
        <SoonPanel
          title="Alat AI"
          hint="Alat generatif tambahan. Segera hadir."
        />
      );
    default:
      return <TemplatePanel session={session} />;
  }
}
