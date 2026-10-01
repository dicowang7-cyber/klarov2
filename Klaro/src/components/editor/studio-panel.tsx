import { AdjustPanel } from "@/components/editor/adjust-panel";
import { BatchPanel } from "@/components/editor/panels/batch-panel";
import { CutoutPanel } from "@/components/editor/panels/cutout-panel";
import { PositionPanel } from "@/components/editor/panels/position-panel";
import { ResizePanel } from "@/components/editor/panels/resize-panel";
import { RetouchPanel } from "@/components/editor/panels/retouch-panel";
import type { PhotoSession } from "@/components/editor/use-photo-session";

export function StudioPanel({
  session,
  onPickBatch,
}: {
  session: PhotoSession;
  onPickBatch: () => void;
}) {
  switch (session.activeTool) {
    case "retouch":
      return <RetouchPanel session={session} />;
    case "cutout":
      return <CutoutPanel session={session} />;
    case "position":
      return <PositionPanel session={session} />;
    case "resize":
      return <ResizePanel session={session} />;
    case "batch":
      return <BatchPanel session={session} onPickFiles={onPickBatch} />;
    default:
      return <AdjustPanel session={session} />;
  }
}
