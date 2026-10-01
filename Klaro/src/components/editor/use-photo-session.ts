import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  applyAlpha,
  cloneImageData,
  downloadBlob,
  extractAlpha,
  imageDataFromSource,
  imageDataToPngBlob,
} from "@/lib/image/io";
import { composeSubject, paintBrush } from "@/lib/image/pixels";
import { refineCutout } from "@/lib/image/pixels";
import {
  removeImageBackground,
  type BgModel,
} from "@/lib/image/remove-bg";
import {
  canvasToSource,
  computeLayout,
  isIdentityLayout,
  renderLayout,
  type Layout,
  type PositionMode,
} from "@/lib/image/layout";
import {
  clearMask,
  cloneMask,
  createMask,
  maskBounds,
  maskCoverage,
  paintMask,
  redOverlayFromMask,
} from "@/lib/image/mask";
import {
  copyPatch,
  copyRgbKeepAlpha,
  extractPatch,
  inpaintTelea,
} from "@/lib/image/inpainting";
import {
  eraseMaskedAlpha,
  growGuidedCutout,
  subjectBounds,
} from "@/lib/image/cutout";
import {
  clampCanvas,
  findPreset,
} from "@/lib/image/presets";
import { makeZip } from "@/lib/image/zip";

export type BrushTool = "erase" | "restore";
export type StudioTool =
  | "adjust"
  | "retouch"
  | "cutout"
  | "position"
  | "resize"
  | "batch";
export type CutoutMode = "guide" | "manual";
export type BatchStatus = "queued" | "processing" | "done" | "error";

export type BatchItem = {
  id: string;
  name: string;
  file: File;
  thumbUrl: string;
  status: BatchStatus;
  resultBlob?: Blob;
  resultUrl?: string;
  error?: string;
};

type Progress = { percent: number; label: string };

type HistoryOp =
  | { kind: "alpha"; alpha: Uint8Array }
  | {
      kind: "patch";
      x: number;
      y: number;
      w: number;
      h: number;
      working: ImageData;
      base: ImageData;
      retouched: ImageData;
    };

const MAX_UNDO = 16;

function stemName(name: string) {
  return name.replace(/\.[^.]+$/, "") || "klaro";
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function revokeBatch(item: BatchItem) {
  URL.revokeObjectURL(item.thumbUrl);
  if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
}

export function usePhotoSession() {
  const originalRef = useRef<ImageData | null>(null);
  const retouchedRef = useRef<ImageData | null>(null);
  const baseRef = useRef<ImageData | null>(null);
  const workingRef = useRef<ImageData | null>(null);
  const maskRef = useRef<Uint8Array | null>(null);
  const undoRef = useRef<HistoryOp[]>([]);
  const redoRef = useRef<HistoryOp[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const paintingRef = useRef(false);
  const panningRef = useRef(false);
  const panStartRef = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);
  const rafRef = useRef<number | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const layoutKeyRef = useRef("");
  const boundsRef = useRef<ReturnType<typeof subjectBounds>>(null);
  const boundsKeyRef = useRef("");
  const batchBusyRef = useRef(false);

  const [fileName, setFileName] = useState("foto");
  const [revision, setRevision] = useState(0);
  const [maskRevision, setMaskRevision] = useState(0);
  const [hasImage, setHasImage] = useState(false);
  const [hasCutout, setHasCutout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [activeTool, setActiveToolState] = useState<StudioTool>("adjust");
  const [brushTool, setBrushTool] = useState<BrushTool>("erase");
  const [cutoutMode, setCutoutMode] = useState<CutoutMode>("guide");
  const [brushSize, setBrushSize] = useState(36);
  const [brushHardness, setBrushHardness] = useState(0.55);
  const [guideTolerance, setGuideTolerance] = useState(62);
  const [brightness, setBrightness] = useState(0);
  const [outlineWidth, setOutlineWidth] = useState(0);
  const [outlineColor, setOutlineColor] = useState("#ffffff");
  const [fillColor, setFillColor] = useState<string | null>(null);
  const [model, setModel] = useState<BgModel>("isnet_quint8");
  const [showOriginal, setShowOriginal] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [compareAvailable, setCompareAvailable] = useState(false);
  const [hasMask, setHasMask] = useState(false);
  const [positionMode, setPositionMode] = useState<PositionMode>("original");
  const [paddingPct, setPaddingPct] = useState(0);
  const [ignoreCroppedSides, setIgnoreCroppedSides] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(1080);
  const [canvasHeight, setCanvasHeight] = useState(1080);
  const [presetId, setPresetId] = useState("original");
  const [lockAspect, setLockAspect] = useState(true);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [batchRemoveBg, setBatchRemoveBg] = useState(true);

  const bump = useCallback(() => {
    setRevision((n) => n + 1);
    setCanUndo(undoRef.current.length > 0);
    setCanRedo(redoRef.current.length > 0);
  }, []);

  const bumpMask = useCallback(() => {
    const coverage = maskRef.current ? maskCoverage(maskRef.current) : 0;
    setHasMask(coverage > 0);
    setMaskRevision((n) => n + 1);
  }, []);

  const bumpSoon = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      bump();
    });
  }, [bump]);

  const resetAdjustments = useCallback(() => {
    setBrightness(0);
    setOutlineWidth(0);
    setOutlineColor("#ffffff");
    setFillColor(null);
    setPositionMode("original");
    setPaddingPct(0);
    setIgnoreCroppedSides(false);
    setOffsetX(0);
    setOffsetY(0);
  }, []);

  const layoutOptions = useCallback(
    (sourceW: number, sourceH: number) => ({
      canvasWidth: presetId === "original" ? sourceW : canvasWidth,
      canvasHeight: presetId === "original" ? sourceH : canvasHeight,
      mode: positionMode,
      paddingPct,
      ignoreCroppedSides,
      offsetX,
      offsetY,
    }),
    [
      canvasHeight,
      canvasWidth,
      ignoreCroppedSides,
      offsetX,
      offsetY,
      paddingPct,
      positionMode,
      presetId,
    ],
  );

  const getLayout = useCallback((): Layout | null => {
    const working = workingRef.current;
    if (!working) return null;
    const opts = layoutOptions(working.width, working.height);
    const boundsKey = `${working.width}x${working.height}:${revision}`;
    if (boundsKeyRef.current !== boundsKey) {
      boundsRef.current = subjectBounds(working);
      boundsKeyRef.current = boundsKey;
    }
    const key = `${boundsKey}:${opts.canvasWidth}x${opts.canvasHeight}:${opts.mode}:${opts.paddingPct}:${opts.ignoreCroppedSides}:${opts.offsetX}:${opts.offsetY}`;
    if (layoutRef.current && layoutKeyRef.current === key) {
      return layoutRef.current;
    }
    const layout = computeLayout(
      working.width,
      working.height,
      boundsRef.current,
      opts,
    );
    layoutRef.current = layout;
    layoutKeyRef.current = key;
    return layout;
  }, [layoutOptions, revision]);

  const composeOutput = useCallback(
    (working: ImageData, live = false) => {
      const skipOutline = live && paintingRef.current;
      const opts = layoutOptions(working.width, working.height);
      const bounds = subjectBounds(working);
      const layout = computeLayout(
        working.width,
        working.height,
        bounds,
        opts,
      );
      if (workingRef.current === working) {
        layoutRef.current = layout;
      }
      const identity = isIdentityLayout(layout, working.width, working.height);
      const composed = composeSubject(working, {
        brightness,
        outlineWidth,
        outlineColor,
        fillColor: identity ? fillColor : null,
        skipOutline,
      });
      if (identity) return composed;
      return renderLayout(composed, layout, fillColor);
    },
    [brightness, fillColor, layoutOptions, outlineColor, outlineWidth],
  );

  const loadFromSource = useCallback(
    async (source: File | Blob | string, name?: string) => {
      const data = await imageDataFromSource(source);
      originalRef.current = cloneImageData(data);
      retouchedRef.current = cloneImageData(data);
      baseRef.current = cloneImageData(data);
      workingRef.current = data;
      maskRef.current = createMask(data.width, data.height);
      undoRef.current = [];
      redoRef.current = [];
      lastPointRef.current = null;
      setFileName(
        stemName(name ?? (source instanceof File ? source.name : "foto")),
      );
      setHasImage(true);
      setHasCutout(false);
      setCompareAvailable(false);
      setShowOriginal(false);
      setHasMask(false);
      resetAdjustments();
      setBrushTool("erase");
      if (presetId === "original") {
        setCanvasWidth(data.width);
        setCanvasHeight(data.height);
      }
      bump();
      bumpMask();
    },
    [bump, bumpMask, presetId, resetAdjustments],
  );

  const clearBatch = useCallback(() => {
    setBatchItems((items) => {
      for (const item of items) revokeBatch(item);
      return [];
    });
  }, []);

  const clearSession = useCallback(() => {
    originalRef.current = null;
    retouchedRef.current = null;
    baseRef.current = null;
    workingRef.current = null;
    maskRef.current = null;
    undoRef.current = [];
    redoRef.current = [];
    setHasImage(false);
    setHasCutout(false);
    setCompareAvailable(false);
    setShowOriginal(false);
    setProcessing(false);
    setProgress(null);
    setHasMask(false);
    setActiveToolState("adjust");
    resetAdjustments();
    clearBatch();
    bump();
  }, [bump, clearBatch, resetAdjustments]);

  const setActiveTool = useCallback(
    (tool: StudioTool) => {
      if (tool !== "retouch" && maskRef.current) {
        clearMask(maskRef.current);
        bumpMask();
      }
      setActiveToolState(tool);
      if (tool === "cutout") setBrushTool("erase");
    },
    [bumpMask],
  );

  const applyPreset = useCallback((id: string) => {
    const working = workingRef.current;
    const preset = findPreset(id);
    setPresetId(id);
    if (preset.width == null) {
      if (working) {
        setCanvasWidth(working.width);
        setCanvasHeight(working.height);
      }
    } else {
      setCanvasWidth(preset.width);
      setCanvasHeight(preset.height ?? preset.width);
    }
    setOffsetX(0);
    setOffsetY(0);
  }, []);

  const setCanvasSize = useCallback(
    (nextW: number, nextH: number, from: "width" | "height" | "both") => {
      let w = clampCanvas(nextW);
      let h = clampCanvas(nextH);
      if (lockAspect && from !== "both") {
        const aspect = canvasWidth / Math.max(1, canvasHeight);
        if (from === "width") h = clampCanvas(w / aspect);
        else w = clampCanvas(h * aspect);
      }
      setCanvasWidth(w);
      setCanvasHeight(h);
      setPresetId("custom");
    },
    [canvasHeight, canvasWidth, lockAspect],
  );

  const pushAlphaUndo = useCallback(() => {
    const working = workingRef.current;
    if (!working) return;
    undoRef.current.push({ kind: "alpha", alpha: extractAlpha(working) });
    if (undoRef.current.length > MAX_UNDO) undoRef.current.shift();
    redoRef.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  const pushPatchUndo = useCallback(
    (x: number, y: number, w: number, h: number) => {
      const working = workingRef.current;
      const base = baseRef.current;
      const retouched = retouchedRef.current;
      if (!working || !base || !retouched) return;
      const pad = 8;
      const px = Math.max(0, x - pad);
      const py = Math.max(0, y - pad);
      const pw = Math.min(working.width - px, w + pad * 2);
      const ph = Math.min(working.height - py, h + pad * 2);
      undoRef.current.push({
        kind: "patch",
        x: px,
        y: py,
        w: pw,
        h: ph,
        working: extractPatch(working, px, py, pw, ph),
        base: extractPatch(base, px, py, pw, ph),
        retouched: extractPatch(retouched, px, py, pw, ph),
      });
      if (undoRef.current.length > MAX_UNDO) undoRef.current.shift();
      redoRef.current = [];
      setCanUndo(true);
      setCanRedo(false);
    },
    [],
  );

  const snapshotFull = useCallback(() => {
    const working = workingRef.current;
    const base = baseRef.current;
    const retouched = retouchedRef.current;
    if (!working || !base || !retouched) return null;
    return {
      kind: "patch" as const,
      x: 0,
      y: 0,
      w: working.width,
      h: working.height,
      working: cloneImageData(working),
      base: cloneImageData(base),
      retouched: cloneImageData(retouched),
    };
  }, []);

  const applyOp = useCallback((op: HistoryOp, into: "undo" | "redo") => {
    const working = workingRef.current;
    const base = baseRef.current;
    const retouched = retouchedRef.current;
    if (!working || !base || !retouched) return;
    if (op.kind === "alpha") {
      const current = extractAlpha(working);
      applyAlpha(working, op.alpha);
      const inverse: HistoryOp = { kind: "alpha", alpha: current };
      if (into === "undo") redoRef.current.push(inverse);
      else undoRef.current.push(inverse);
    } else {
      const inverse: HistoryOp = {
        kind: "patch",
        x: op.x,
        y: op.y,
        w: op.w,
        h: op.h,
        working: extractPatch(working, op.x, op.y, op.w, op.h),
        base: extractPatch(base, op.x, op.y, op.w, op.h),
        retouched: extractPatch(retouched, op.x, op.y, op.w, op.h),
      };
      copyPatch(working, op.working, op.x, op.y, op.w, op.h);
      copyPatch(base, op.base, op.x, op.y, op.w, op.h);
      copyPatch(retouched, op.retouched, op.x, op.y, op.w, op.h);
      if (into === "undo") redoRef.current.push(inverse);
      else undoRef.current.push(inverse);
    }
  }, []);

  const undo = useCallback(() => {
    const op = undoRef.current.pop();
    if (!op) return;
    applyOp(op, "undo");
    bump();
  }, [applyOp, bump]);

  const redo = useCallback(() => {
    const op = redoRef.current.pop();
    if (!op) return;
    applyOp(op, "redo");
    bump();
  }, [applyOp, bump]);

  const removeBackground = useCallback(async () => {
    const source = retouchedRef.current ?? originalRef.current;
    if (!source || processing) return;
    setProcessing(true);
    setProgress({ percent: 4, label: "Menyiapkan model" });
    try {
      const blob = await imageDataToPngBlob(source);
      const cutBlob = await removeImageBackground(
        blob,
        model,
        (percent, label) => {
          setProgress({ percent, label });
        },
      );
      const cutout = refineCutout(await imageDataFromSource(cutBlob));
      baseRef.current = cloneImageData(cutout);
      workingRef.current = cutout;
      undoRef.current = [];
      redoRef.current = [];
      setHasCutout(true);
      setCompareAvailable(true);
      setShowOriginal(false);
      bump();
      toast.success("Background dihapus. Rapikan cutout jika perlu.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menghapus background. Coba lagi.";
      toast.error(message);
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  }, [bump, model, processing]);

  const paintAt = useCallback(
    (x: number, y: number) => {
      const working = workingRef.current;
      const base = baseRef.current;
      const mask = maskRef.current;
      if (!working) return;
      if (activeTool === "retouch" && mask) {
        paintMask(
          mask,
          working.width,
          working.height,
          x,
          y,
          brushSize / 2,
          brushHardness,
          255,
        );
        return;
      }
      if (activeTool === "cutout" && cutoutMode === "guide" && mask) {
        paintMask(
          mask,
          working.width,
          working.height,
          x,
          y,
          brushSize / 2,
          0.9,
          255,
        );
        return;
      }
      if (!base) return;
      paintBrush(
        working,
        base,
        x,
        y,
        brushSize / 2,
        brushHardness,
        brushTool,
      );
    },
    [activeTool, brushHardness, brushSize, brushTool, cutoutMode],
  );

  const isPaintTool =
    activeTool === "adjust" ||
    activeTool === "retouch" ||
    activeTool === "cutout";

  const isPanTool = activeTool === "position" && positionMode === "custom";

  const beginStroke = useCallback(
    (canvasX: number, canvasY: number) => {
      const working = workingRef.current;
      if (!working || processing) return;
      const layout = getLayout();
      if (!layout) return;
      const src = canvasToSource(layout, canvasX, canvasY);
      if (!src) return;

      if (isPanTool) {
        panningRef.current = true;
        panStartRef.current = {
          x: canvasX,
          y: canvasY,
          ox: offsetX,
          oy: offsetY,
        };
        return;
      }
      if (!isPaintTool) return;
      if (activeTool === "cutout" && !hasCutout) return;

      paintingRef.current = true;
      if (
        activeTool === "adjust" ||
        (activeTool === "cutout" && cutoutMode === "manual")
      ) {
        pushAlphaUndo();
      }
      paintAt(src.x, src.y);
      lastPointRef.current = src;
      if (
        activeTool === "retouch" ||
        (activeTool === "cutout" && cutoutMode === "guide")
      ) {
        bumpMask();
      } else {
        bump();
      }
    },
    [
      activeTool,
      bump,
      bumpMask,
      cutoutMode,
      getLayout,
      isPaintTool,
      isPanTool,
      offsetX,
      offsetY,
      paintAt,
      processing,
      pushAlphaUndo,
      hasCutout,
    ],
  );

  const moveStroke = useCallback(
    (canvasX: number, canvasY: number) => {
      if (panningRef.current && panStartRef.current) {
        const start = panStartRef.current;
        setOffsetX(start.ox + (canvasX - start.x));
        setOffsetY(start.oy + (canvasY - start.y));
        return;
      }
      const working = workingRef.current;
      const last = lastPointRef.current;
      const layout = layoutRef.current ?? getLayout();
      if (!paintingRef.current || !working || !last || !layout) return;
      const src = canvasToSource(layout, canvasX, canvasY);
      if (!src) return;
      const dx = src.x - last.x;
      const dy = src.y - last.y;
      const dist = Math.hypot(dx, dy);
      const step = Math.max(1, brushSize * 0.22);
      const steps = Math.max(1, Math.ceil(dist / step));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        paintAt(last.x + dx * t, last.y + dy * t);
      }
      lastPointRef.current = src;
      if (
        activeTool === "retouch" ||
        (activeTool === "cutout" && cutoutMode === "guide")
      ) {
        bumpMask();
      } else {
        bumpSoon();
      }
    },
    [activeTool, brushSize, bumpMask, bumpSoon, cutoutMode, getLayout, paintAt],
  );

  const applyGuidedCutout = useCallback(() => {
    const working = workingRef.current;
    const mask = maskRef.current;
    if (!working || !mask || !hasCutout) return;
    if (maskCoverage(mask) < 8) {
      clearMask(mask);
      bumpMask();
      return;
    }
    const grown = growGuidedCutout(working, cloneMask(mask), guideTolerance);
    pushAlphaUndo();
    eraseMaskedAlpha(working, grown, 1);
    clearMask(mask);
    bumpMask();
    bump();
  }, [bump, bumpMask, guideTolerance, hasCutout, pushAlphaUndo]);

  const endStroke = useCallback(() => {
    const wasPainting = paintingRef.current;
    const wasPanning = panningRef.current;
    paintingRef.current = false;
    panningRef.current = false;
    lastPointRef.current = null;
    panStartRef.current = null;
    if (wasPainting && activeTool === "cutout" && cutoutMode === "guide") {
      applyGuidedCutout();
      return;
    }
    if (wasPainting || wasPanning) bump();
  }, [activeTool, applyGuidedCutout, bump, cutoutMode]);

  const clearRetouchMask = useCallback(() => {
    if (!maskRef.current) return;
    clearMask(maskRef.current);
    bumpMask();
  }, [bumpMask]);

  const applyRetouch = useCallback(async () => {
    const retouched = retouchedRef.current;
    const working = workingRef.current;
    const base = baseRef.current;
    const mask = maskRef.current;
    if (!retouched || !working || !base || !mask || processing) return;
    if (maskCoverage(mask) < 8) {
      toast.error("Sapu dulu objek atau watermark yang ingin dihapus.");
      return;
    }
    const bounds = maskBounds(mask, working.width, working.height, 8);
    setProcessing(true);
    setProgress({ percent: 6, label: "Menghapus objek" });
    try {
      if (bounds) pushPatchUndo(bounds.x, bounds.y, bounds.w, bounds.h);
      else {
        const full = snapshotFull();
        if (full) {
          undoRef.current.push(full);
          redoRef.current = [];
        }
      }
      const filled = await inpaintTelea(retouched, mask, (percent) => {
        setProgress({ percent: Math.max(6, percent), label: "Mengisi area" });
      });
      retouchedRef.current = filled;
      copyRgbKeepAlpha(working, filled);
      copyRgbKeepAlpha(base, filled);
      clearMask(mask);
      bumpMask();
      bump();
      toast.success("Objek dihapus.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal meretouch foto.",
      );
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  }, [bump, bumpMask, processing, pushPatchUndo, snapshotFull]);

  const getPreview = useCallback(
    (live = false) => {
      if (showOriginal) return originalRef.current;
      const working = workingRef.current;
      if (!working) return null;
      return composeOutput(working, live);
    },
    [composeOutput, showOriginal],
  );

  const getMaskOverlay = useCallback(() => {
    const mask = maskRef.current;
    const working = workingRef.current;
    if (!mask || !working || !hasMask) return null;
    return redOverlayFromMask(mask, working.width, working.height);
  }, [hasMask]);

  const exportPng = useCallback(async () => {
    const working = workingRef.current;
    if (!working) return;
    const composed = composeOutput(working, false);
    const blob = await imageDataToPngBlob(composed);
    downloadBlob(blob, `${fileName}-klaro.png`);
    toast.success("PNG disimpan.");
  }, [composeOutput, fileName]);

  const addBatchFiles = useCallback((files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      toast.error("Pilih berkas gambar.");
      return;
    }
    const items: BatchItem[] = images.map((file) => ({
      id: uid(),
      name: file.name,
      file,
      thumbUrl: URL.createObjectURL(file),
      status: "queued",
    }));
    setBatchItems((prev) => [...prev, ...items]);
    setActiveToolState("batch");
    toast.success(`${items.length} foto masuk antrian.`);
  }, []);

  const removeBatchItem = useCallback((id: string) => {
    setBatchItems((prev) => {
      const next = prev.filter((item) => {
        if (item.id !== id) return true;
        revokeBatch(item);
        return false;
      });
      return next;
    });
  }, []);

  const processBatch = useCallback(async () => {
    if (batchBusyRef.current) return;
    const pending = batchItems.filter((i) => i.status !== "done");
    if (pending.length === 0) {
      toast.error("Tidak ada foto yang perlu diproses.");
      return;
    }
    batchBusyRef.current = true;
    setProcessing(true);
    try {
      for (let i = 0; i < pending.length; i++) {
        const item = pending[i]!;
        setBatchItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: "processing", error: undefined }
              : it,
          ),
        );
        setProgress({
          percent: Math.round((i / pending.length) * 100),
          label: `Batch ${i + 1}/${pending.length}`,
        });
        try {
          let data = await imageDataFromSource(item.file);
          if (batchRemoveBg) {
            const blob = await imageDataToPngBlob(data);
            const cutBlob = await removeImageBackground(
              blob,
              model,
              (percent, label) => {
                const overall = Math.round(
                  ((i + percent / 100) / pending.length) * 100,
                );
                setProgress({
                  percent: overall,
                  label: `${label} · ${i + 1}/${pending.length}`,
                });
              },
            );
            data = refineCutout(await imageDataFromSource(cutBlob));
          }
          const framed = composeOutput(data, false);
          const resultBlob = await imageDataToPngBlob(framed);
          const resultUrl = URL.createObjectURL(resultBlob);
          setBatchItems((prev) =>
            prev.map((it) => {
              if (it.id !== item.id) return it;
              if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
              return {
                ...it,
                status: "done",
                resultBlob,
                resultUrl,
              };
            }),
          );
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Gagal memproses.";
          setBatchItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? { ...it, status: "error", error: message }
                : it,
            ),
          );
        }
      }
      toast.success("Batch selesai.");
    } finally {
      batchBusyRef.current = false;
      setProcessing(false);
      setProgress(null);
    }
  }, [batchItems, batchRemoveBg, composeOutput, model]);

  const downloadBatchZip = useCallback(async () => {
    const done = batchItems.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) {
      toast.error("Belum ada hasil batch.");
      return;
    }
    const files = await Promise.all(
      done.map(async (item, index) => ({
        name: `${String(index + 1).padStart(2, "0")}-${stemName(item.name)}-klaro.png`,
        data: new Uint8Array(await item.resultBlob!.arrayBuffer()),
      })),
    );
    const zip = makeZip(files);
    downloadBlob(zip, "klaro-batch.zip");
    toast.success("ZIP diunduh.");
  }, [batchItems]);

  const openBatchItem = useCallback(
    async (id: string) => {
      const item = batchItems.find((it) => it.id === id);
      if (!item) return;
      try {
        await loadFromSource(item.file, item.name);
        setActiveToolState("adjust");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal membuka foto.",
        );
      }
    },
    [batchItems, loadFromSource],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }
      if (event.key === "[") setBrushSize((n) => Math.max(6, n - 4));
      if (event.key === "]") setBrushSize((n) => Math.min(160, n + 4));
      if (event.key.toLowerCase() === "e") setBrushTool("erase");
      if (event.key.toLowerCase() === "r") setBrushTool("restore");
      if (isPanTool && !event.metaKey && !event.ctrlKey) {
        const step = event.shiftKey ? 10 : 2;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setOffsetX((n) => n - step);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setOffsetX((n) => n + step);
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setOffsetY((n) => n - step);
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setOffsetY((n) => n + step);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPanTool, redo, undo]);

  const sourceSize = workingRef.current
    ? { width: workingRef.current.width, height: workingRef.current.height }
    : null;
  const outputSize = sourceSize
    ? {
        width: presetId === "original" ? sourceSize.width : canvasWidth,
        height: presetId === "original" ? sourceSize.height : canvasHeight,
      }
    : null;

  return {
    fileName,
    revision,
    maskRevision,
    hasImage,
    hasCutout,
    processing,
    progress,
    activeTool,
    setActiveTool,
    brushTool,
    setBrushTool,
    cutoutMode,
    setCutoutMode,
    brushSize,
    setBrushSize,
    brushHardness,
    setBrushHardness,
    guideTolerance,
    setGuideTolerance,
    brightness,
    setBrightness,
    outlineWidth,
    setOutlineWidth,
    outlineColor,
    setOutlineColor,
    fillColor,
    setFillColor,
    model,
    setModel,
    showOriginal,
    setShowOriginal,
    canUndo,
    canRedo,
    compareAvailable,
    hasMask,
    positionMode,
    setPositionMode: (mode: PositionMode) => {
      setPositionMode(mode);
      if (mode !== "custom") {
        setOffsetX(0);
        setOffsetY(0);
      }
    },
    paddingPct,
    setPaddingPct,
    ignoreCroppedSides,
    setIgnoreCroppedSides,
    offsetX,
    offsetY,
    canvasWidth,
    canvasHeight,
    presetId,
    applyPreset,
    setCanvasSize,
    lockAspect,
    setLockAspect,
    batchItems,
    batchRemoveBg,
    setBatchRemoveBg,
    addBatchFiles,
    removeBatchItem,
    clearBatch,
    processBatch,
    downloadBatchZip,
    openBatchItem,
    loadFromSource,
    clearSession,
    removeBackground,
    beginStroke,
    moveStroke,
    endStroke,
    undo,
    redo,
    getPreview,
    getMaskOverlay,
    getLayout,
    exportPng,
    resetAdjustments,
    applyRetouch,
    clearRetouchMask,
    isPanTool,
    isPaintTool,
    imageSize: outputSize,
    sourceSize,
  };
}

export type PhotoSession = ReturnType<typeof usePhotoSession>;
