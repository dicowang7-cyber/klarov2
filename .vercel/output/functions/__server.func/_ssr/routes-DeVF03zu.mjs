import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as House, a as Trash2, c as Sparkles, d as Redo2, f as Pencil, g as ImagePlus, h as Lasso, l as Scissors, m as LayoutTemplate, n as WandSparkles, o as Square, p as Move, r as Undo2, s as SquareDashed, t as Zap, u as Scaling, v as Download } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DeVF03zu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BatchGrid({ session }) {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-0 flex-1 overflow-auto",
		onClick: () => setSelectedId(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap content-start gap-6 p-5 sm:p-8",
			children: session.batchItems.map((item) => {
				const selected = selectedId === item.id;
				const label = item.status === "processing" ? "Memproses" : item.status === "error" ? item.error ?? "Gagal" : `${item.outW} × ${item.outH}`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "w-[min(100%,17.5rem)]",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between gap-3 px-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 truncate text-sm text-muted",
							title: item.name,
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shrink-0 text-sm tabular-nums text-subtle",
							children: label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("group relative block w-full overflow-hidden rounded-[4px] studio-check text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]", selected && "ring-2 ring-accent ring-offset-2 ring-offset-bg"),
						onClick: () => setSelectedId((id) => id === item.id ? null : item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.thumbUrl,
								alt: item.name,
								className: "aspect-square w-full object-contain"
							}),
							item.status === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-bg/40" }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("absolute inset-0 flex items-center justify-center gap-2 bg-bg/55 transition-opacity duration-[var(--motion-quick)]", selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									role: "button",
									tabIndex: 0,
									className: "inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] bg-surface px-3 text-sm font-medium text-fg shadow-[var(--shadow-border)]",
									onClick: (e) => {
										e.stopPropagation();
										session.openEdit(item.id);
									},
									onKeyDown: (e) => {
										if (e.key === "Enter") session.openEdit(item.id);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									role: "button",
									tabIndex: 0,
									className: "inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-fg shadow-[var(--shadow-border)]",
									"aria-label": "Hapus",
									onClick: (e) => {
										e.stopPropagation();
										session.removeBatchItem(item.id);
										setSelectedId(null);
									},
									onKeyDown: (e) => {
										if (e.key === "Enter") session.removeBatchItem(item.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})
						]
					})]
				}, item.id);
			})
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-40 active:enabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface-2 text-fg hover:bg-border/80",
			outline: "bg-surface text-fg shadow-[var(--shadow-border)] hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			danger: "bg-danger text-accent-fg hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
			sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
			icon: "size-11 rounded-[var(--radius-sm)]",
			"icon-sm": "size-9 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var SAMPLE_PHOTOS = [
	{
		src: "/samples/sneakers.jpg",
		label: "Sneakers",
		caption: "Produk"
	},
	{
		src: "/samples/mug.jpg",
		label: "Mug",
		caption: "Still life"
	},
	{
		src: "/samples/cat.jpg",
		label: "Kucing",
		caption: "Hewan"
	}
];
function EmptyStudio({ onPickFile, onSample }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-10 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-[0.18em] text-muted uppercase",
						children: "Studio batch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance text-fg sm:text-5xl",
						children: ["Rapikan foto produk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: " sekaligus."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-lg text-pretty text-base leading-relaxed text-muted",
						children: "Unggah banyak gambar, hapus background dengan model Cepat atau Halus, lalu atur ukuran dan posisi untuk seluruh batch."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					onClick: onPickFile,
					className: "min-h-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {}), "Tambah gambar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: "PNG, JPG, atau WEBP · maks 20MB"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium text-muted",
					children: "Atau coba contoh"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3",
					children: SAMPLE_PHOTOS.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSample(sample.src, sample.label),
						className: "group overflow-hidden rounded-[var(--radius-md)] bg-surface text-left shadow-[var(--shadow-border)] transition-[transform] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sample.src,
							alt: sample.label,
							className: "aspect-portrait w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-fg",
								children: sample.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: sample.caption
							})]
						})]
					}, sample.src))
				})]
			})
		]
	});
}
var MAX_EDGE = 1800;
var MAX_BYTES = 20971520;
function cloneImageData(source) {
	return new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
}
function extractAlpha(source) {
	const alpha = new Uint8Array(source.width * source.height);
	const data = source.data;
	for (let i = 0, p = 3; i < alpha.length; i++, p += 4) alpha[i] = data[p];
	return alpha;
}
function applyAlpha(target, alpha) {
	const data = target.data;
	for (let i = 0, p = 3; i < alpha.length; i++, p += 4) data[p] = alpha[i];
}
async function decodeImage(url) {
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = url;
	if (img.decode) {
		await img.decode();
		return img;
	}
	await new Promise((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = () => reject(/* @__PURE__ */ new Error("Gagal memuat gambar."));
	});
	return img;
}
function rasterizeImage(image, maxEdge = MAX_EDGE) {
	const sourceWidth = "naturalWidth" in image && image.naturalWidth ? image.naturalWidth : image.width;
	const sourceHeight = "naturalHeight" in image && image.naturalHeight ? image.naturalHeight : image.height;
	const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
	const width = Math.max(1, Math.round(sourceWidth * scale));
	const height = Math.max(1, Math.round(sourceHeight * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.drawImage(image, 0, 0, width, height);
	return ctx.getImageData(0, 0, width, height);
}
async function imageFromSource(source) {
	if (source instanceof Blob && source.size > MAX_BYTES) throw new Error("Ukuran foto terlalu besar (maks 20MB).");
	const url = typeof source === "string" ? source : URL.createObjectURL(source);
	try {
		const image = await decodeImage(url);
		const naturalWidth = image.naturalWidth || image.width;
		const naturalHeight = image.naturalHeight || image.height;
		return {
			data: rasterizeImage(image),
			naturalWidth,
			naturalHeight
		};
	} catch {
		throw new Error("Gagal memuat gambar.");
	} finally {
		if (typeof source !== "string") URL.revokeObjectURL(url);
	}
}
function canvasFromImageData(data) {
	const canvas = document.createElement("canvas");
	canvas.width = data.width;
	canvas.height = data.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.putImageData(data, 0, 0);
	return canvas;
}
async function imageDataToJpegBlob(data, quality = .92) {
	const src = canvasFromImageData(data);
	const canvas = document.createElement("canvas");
	canvas.width = data.width;
	canvas.height = data.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, data.width, data.height);
	ctx.drawImage(src, 0, 0);
	const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
	if (!blob) throw new Error("Gagal menyimpan JPG.");
	return blob;
}
function imageDataToThumbUrl(data, maxEdge = 560) {
	const scale = Math.min(1, maxEdge / Math.max(data.width, data.height));
	const width = Math.max(1, Math.round(data.width * scale));
	const height = Math.max(1, Math.round(data.height * scale));
	const src = canvasFromImageData(data);
	if (scale === 1) return src.toDataURL("image/png");
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(src, 0, 0, width, height);
	return canvas.toDataURL("image/png");
}
function toJpgFileName(name) {
	return `${name.replace(/\.[^.]+$/, "") || "gambar"}.jpg`;
}
function uniqueFileName(name, used) {
	const count = (used.get(name) ?? 0) + 1;
	used.set(name, count);
	if (count === 1) return name;
	return name.replace(/(\.[^.]+)$/, `-${count}$1`);
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function medianChannel(values) {
	if (values.length === 0) return 0;
	const sorted = values.slice().sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)] ?? 0;
}
function colorDist$1(r1, g1, b1, r2, g2, b2) {
	const dr = r1 - r2;
	const dg = g1 - g2;
	const db = b1 - b2;
	return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db);
}
function borderColor(data, frame) {
	const { width, height, data: px } = data;
	const rs = [];
	const gs = [];
	const bs = [];
	const band = Math.max(1, frame);
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (x >= band && y >= band && x < width - band && y < height - band) continue;
		const p = (y * width + x) * 4;
		rs.push(px[p]);
		gs.push(px[p + 1]);
		bs.push(px[p + 2]);
	}
	return [
		medianChannel(rs),
		medianChannel(gs),
		medianChannel(bs)
	];
}
function downsample(source, maxEdge) {
	const scale = Math.min(1, maxEdge / Math.max(source.width, source.height));
	if (scale >= .999) return cloneImageData(source);
	const width = Math.max(1, Math.round(source.width * scale));
	const height = Math.max(1, Math.round(source.height * scale));
	const src = document.createElement("canvas");
	src.width = source.width;
	src.height = source.height;
	src.getContext("2d").putImageData(source, 0, 0);
	const dst = document.createElement("canvas");
	dst.width = width;
	dst.height = height;
	const ctx = dst.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.imageSmoothingEnabled = true;
	ctx.drawImage(src, 0, 0, width, height);
	return ctx.getImageData(0, 0, width, height);
}
function upsampleAlpha(mask, srcW, srcH, dest) {
	const { width, height, data } = dest;
	for (let y = 0; y < height; y++) {
		const sy = (y + .5) * srcH / height - .5;
		const y0 = Math.max(0, Math.floor(sy));
		const y1 = Math.min(srcH - 1, y0 + 1);
		const fy = sy - y0;
		for (let x = 0; x < width; x++) {
			const sx = (x + .5) * srcW / width - .5;
			const x0 = Math.max(0, Math.floor(sx));
			const x1 = Math.min(srcW - 1, x0 + 1);
			const fx = sx - x0;
			const a00 = mask[y0 * srcW + x0] ?? 0;
			const a10 = mask[y0 * srcW + x1] ?? 0;
			const a01 = mask[y1 * srcW + x0] ?? 0;
			const a11 = mask[y1 * srcW + x1] ?? 0;
			const a = a00 * (1 - fx) * (1 - fy) + a10 * fx * (1 - fy) + a01 * (1 - fx) * fy + a11 * fx * fy;
			data[(y * width + x) * 4 + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
		}
	}
}
/**
* Local studio cutout used when the ONNX files are still placeholders.
* Floods from the border using the dominant edge color — strong on product
* photos with a plain backdrop.
*/
function edgeCutout(source, quality, onProgress) {
	onProgress?.(8);
	const work = downsample(source, quality === "fast" ? 480 : 960);
	const { width, height, data } = work;
	const [br, bg, bb] = borderColor(work, quality === "fast" ? 6 : 10);
	const threshold = quality === "fast" ? 42 : 28;
	const floodGate = threshold * 1.35;
	onProgress?.(28);
	const bgMask = new Uint8Array(width * height);
	const seen = new Uint8Array(width * height);
	const queue = [];
	const maybeSeed = (x, y) => {
		const i = y * width + x;
		const p = i * 4;
		if (colorDist$1(data[p], data[p + 1], data[p + 2], br, bg, bb) > floodGate) return;
		if (seen[i]) return;
		seen[i] = 1;
		bgMask[i] = 1;
		queue.push(i);
	};
	for (let x = 0; x < width; x++) {
		maybeSeed(x, 0);
		maybeSeed(x, height - 1);
	}
	for (let y = 0; y < height; y++) {
		maybeSeed(0, y);
		maybeSeed(width - 1, y);
	}
	onProgress?.(48);
	while (queue.length) {
		const i = queue.pop();
		const x = i % width;
		const y = (i - x) / width;
		const neighbors = [
			i - 1,
			i + 1,
			i - width,
			i + width
		];
		for (const ni of neighbors) {
			if (ni < 0 || ni >= bgMask.length) continue;
			if (seen[ni]) continue;
			const nx = ni % width;
			const ny = (ni - nx) / width;
			if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
			const p = ni * 4;
			if (colorDist$1(data[p], data[p + 1], data[p + 2], br, bg, bb) > threshold) continue;
			seen[ni] = 1;
			bgMask[ni] = 1;
			queue.push(ni);
		}
	}
	onProgress?.(72);
	const minKeep = Math.max(24, Math.round(width * height * .0015));
	const subject = new Uint8Array(width * height);
	for (let i = 0; i < subject.length; i++) subject[i] = bgMask[i] ? 0 : 1;
	const visited = new Uint8Array(width * height);
	for (let i = 0; i < subject.length; i++) {
		if (!subject[i] || visited[i]) continue;
		const stack = [i];
		const blob = [];
		visited[i] = 1;
		while (stack.length) {
			const s = stack.pop();
			blob.push(s);
			const x = s % width;
			for (const ns of [
				s - 1,
				s + 1,
				s - width,
				s + width
			]) {
				if (ns < 0 || ns >= subject.length || visited[ns] || !subject[ns]) continue;
				const nx = ns % width;
				if (Math.abs(nx - x) > 1) continue;
				visited[ns] = 1;
				stack.push(ns);
			}
		}
		if (blob.length < minKeep) for (const s of blob) {
			subject[s] = 0;
			bgMask[s] = 1;
		}
	}
	onProgress?.(86);
	const alpha = new Float32Array(width * height);
	const feather = quality === "fast" ? 1.6 : 2.6;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const i = y * width + x;
		if (!bgMask[i]) {
			alpha[i] = 1;
			continue;
		}
		let nearest = 99;
		const r = Math.ceil(feather + 1);
		for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
			const xx = x + dx;
			const yy = y + dy;
			if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
			if (bgMask[yy * width + xx]) continue;
			nearest = Math.min(nearest, Math.hypot(dx, dy));
		}
		alpha[i] = nearest >= 99 ? 0 : Math.max(0, 1 - nearest / (feather + .35));
	}
	onProgress?.(94);
	const out = cloneImageData(source);
	upsampleAlpha(alpha, width, height, out);
	onProgress?.(100);
	return out;
}
function parseHex(hex) {
	const raw = hex.replace("#", "").trim();
	const normalized = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw.padEnd(6, "0").slice(0, 6);
	const value = Number.parseInt(normalized, 16);
	if (Number.isNaN(value)) return [
		28,
		27,
		25
	];
	return [
		value >> 16 & 255,
		value >> 8 & 255,
		value & 255
	];
}
function blendSrcOver(dst, offset, r, g, b, a) {
	const sa = a / 255;
	if (sa <= 0) return;
	const da = dst[offset + 3] / 255;
	const outA = sa + da * (1 - sa);
	if (outA <= 0) {
		dst[offset + 3] = 0;
		return;
	}
	dst[offset] = (r * sa + dst[offset] * da * (1 - sa)) / outA;
	dst[offset + 1] = (g * sa + dst[offset + 1] * da * (1 - sa)) / outA;
	dst[offset + 2] = (b * sa + dst[offset + 2] * da * (1 - sa)) / outA;
	dst[offset + 3] = outA * 255;
}
function distanceToSubject(data, width, height) {
	const inf = 1e5;
	const dist = new Float32Array(width * height);
	for (let i = 0, p = 3; i < dist.length; i++, p += 4) dist[i] = data[p] > 128 ? 0 : inf;
	const diag = Math.SQRT2;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const i = y * width + x;
		let d = dist[i];
		if (x > 0) d = Math.min(d, dist[i - 1] + 1);
		if (y > 0) d = Math.min(d, dist[i - width] + 1);
		if (x > 0 && y > 0) d = Math.min(d, dist[i - width - 1] + diag);
		if (x + 1 < width && y > 0) d = Math.min(d, dist[i - width + 1] + diag);
		dist[i] = d;
	}
	for (let y = height - 1; y >= 0; y--) for (let x = width - 1; x >= 0; x--) {
		const i = y * width + x;
		let d = dist[i];
		if (x + 1 < width) d = Math.min(d, dist[i + 1] + 1);
		if (y + 1 < height) d = Math.min(d, dist[i + width] + 1);
		if (x + 1 < width && y + 1 < height) d = Math.min(d, dist[i + width + 1] + diag);
		if (x > 0 && y + 1 < height) d = Math.min(d, dist[i + width - 1] + diag);
		dist[i] = d;
	}
	return dist;
}
function blurAlphaChannel(data, radius) {
	if (radius <= 0) return;
	const { width, height } = data;
	const src = data.data;
	const tmp = new Uint8ClampedArray(width * height);
	const passes = 2;
	for (let pass = 0; pass < passes; pass++) {
		for (let y = 0; y < height; y++) {
			let run = 0;
			const row = y * width;
			for (let x = -radius; x <= radius; x++) {
				const cx = Math.min(width - 1, Math.max(0, x));
				run += src[(row + cx) * 4 + 3];
			}
			const span = radius * 2 + 1;
			for (let x = 0; x < width; x++) {
				tmp[row + x] = Math.round(run / span);
				const leave = Math.min(width - 1, Math.max(0, x - radius));
				const enter = Math.min(width - 1, Math.max(0, x + radius + 1));
				run += src[(row + enter) * 4 + 3] - src[(row + leave) * 4 + 3];
			}
		}
		for (let x = 0; x < width; x++) {
			let run = 0;
			for (let y = -radius; y <= radius; y++) {
				const cy = Math.min(height - 1, Math.max(0, y));
				run += tmp[cy * width + x];
			}
			const span = radius * 2 + 1;
			for (let y = 0; y < height; y++) {
				src[(y * width + x) * 4 + 3] = Math.round(run / span);
				const leave = Math.min(height - 1, Math.max(0, y - radius));
				const enter = Math.min(height - 1, Math.max(0, y + radius + 1));
				run += tmp[enter * width + x] - tmp[leave * width + x];
			}
		}
	}
}
function refineCutout(source) {
	const out = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
	const data = out.data;
	for (let i = 3; i < data.length; i += 4) {
		const alpha = data[i];
		if (alpha < 22) data[i] = 0;
		else if (alpha > 236) data[i] = 255;
	}
	blurAlphaChannel(out, 1);
	return out;
}
function paintBrush(working, base, cx, cy, radius, hardness, mode) {
	const { width, height, data } = working;
	const baseData = base.data;
	const r = Math.max(1, radius);
	const r2 = r * r;
	const inner = r * Math.max(0, Math.min(.96, hardness));
	const x0 = Math.max(0, Math.floor(cx - r));
	const y0 = Math.max(0, Math.floor(cy - r));
	const x1 = Math.min(width - 1, Math.ceil(cx + r));
	const y1 = Math.min(height - 1, Math.ceil(cy + r));
	for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
		const dx = x + .5 - cx;
		const dy = y + .5 - cy;
		const d2 = dx * dx + dy * dy;
		if (d2 > r2) continue;
		const d = Math.sqrt(d2);
		let t = 1;
		if (d > inner) {
			const u = (d - inner) / Math.max(1e-4, r - inner);
			t = 1 - u * u * (3 - 2 * u);
		}
		const p = (y * width + x) * 4;
		if (mode === "erase") data[p + 3] = Math.round(data[p + 3] * (1 - t));
		else {
			const target = baseData[p + 3];
			data[p] = baseData[p];
			data[p + 1] = baseData[p + 1];
			data[p + 2] = baseData[p + 2];
			data[p + 3] = Math.round(data[p + 3] + (target - data[p + 3]) * t);
		}
	}
}
function composeSubject(source, options) {
	const { width, height, data: src } = source;
	const out = new ImageData(width, height);
	const dst = out.data;
	const shift = Math.round(options.brightness * 2.55);
	if (options.fillColor) {
		const [fr, fg, fb] = parseHex(options.fillColor);
		for (let i = 0; i < dst.length; i += 4) {
			dst[i] = fr;
			dst[i + 1] = fg;
			dst[i + 2] = fb;
			dst[i + 3] = 255;
		}
	}
	const radius = options.skipOutline ? 0 : Math.max(0, options.outlineWidth);
	if (radius > 0) {
		const dist = distanceToSubject(src, width, height);
		const [or, og, ob] = parseHex(options.outlineColor);
		for (let i = 0, p = 0; i < dist.length; i++, p += 4) {
			const d = dist[i];
			if (d <= 0 || d > radius + 1) continue;
			const coverage = Math.min(1, Math.max(0, radius + .65 - d));
			if (coverage <= 0) continue;
			blendSrcOver(dst, p, or, og, ob, Math.round(255 * coverage));
		}
	}
	for (let p = 0; p < src.length; p += 4) {
		const a = src[p + 3];
		if (a === 0) continue;
		blendSrcOver(dst, p, src[p] + shift, src[p + 1] + shift, src[p + 2] + shift, a);
	}
	return out;
}
var OUTLINE_SWATCHES = [
	{
		label: "Putih",
		value: "#ffffff"
	},
	{
		label: "Hitam",
		value: "#111113"
	},
	{
		label: "Perak",
		value: "#d4d4d8"
	},
	{
		label: "Tinta",
		value: "#3f3f46"
	}
];
var FILL_SWATCHES = [
	{
		label: "Transparan",
		value: null
	},
	{
		label: "Putih",
		value: "#ffffff"
	},
	{
		label: "Abu",
		value: "#f4f4f5"
	},
	{
		label: "Hitam",
		value: "#111113"
	}
];
function hexEqual(a, b) {
	return parseHex(a).join() === parseHex(b).join();
}
var MODEL_OPTIONS = [{
	id: "fast",
	label: "Cepat",
	file: "model.onnx",
	hint: "Lebih ringan, hasil cepat"
}, {
	id: "quality",
	label: "Halus",
	file: "model_fp16.onnx",
	hint: "Tepi lebih rapi"
}];
var MODEL_PATHS = {
	fast: "/model/model.onnx",
	quality: "/model/model_fp16.onnx"
};
var MEAN = [
	.485,
	.456,
	.406
];
var STD = [
	.229,
	.224,
	.225
];
var ortPromise = null;
var sessions = /* @__PURE__ */ new Map();
async function loadOrt() {
	if (!ortPromise) ortPromise = import("../_libs/onnxruntime-web.mjs").then((n) => n.t).then((mod) => {
		const ort = mod;
		ort.env.wasm.wasmPaths = "/ort/";
		ort.env.wasm.numThreads = 1;
		ort.env.wasm.simd = true;
		ort.env.wasm.proxy = false;
		return ort;
	});
	return ortPromise;
}
async function modelFileReady(path) {
	try {
		const res = await fetch(path, {
			method: "HEAD",
			cache: "no-cache"
		});
		if (!res.ok) return false;
		const length = Number(res.headers.get("content-length") ?? "0");
		if (Number.isFinite(length) && length > 0) return length > 2048;
		return (await (await fetch(path, { cache: "force-cache" })).arrayBuffer()).byteLength > 2048;
	} catch {
		return false;
	}
}
async function getSession(path) {
	const cached = sessions.get(path);
	if (cached) return cached;
	const pending = (async () => {
		return (await loadOrt()).InferenceSession.create(path, {
			executionProviders: ["wasm"],
			graphOptimizationLevel: "all"
		});
	})();
	sessions.set(path, pending);
	try {
		return await pending;
	} catch (error) {
		sessions.delete(path);
		throw error;
	}
}
function resizeImageData(source, width, height) {
	const src = document.createElement("canvas");
	src.width = source.width;
	src.height = source.height;
	src.getContext("2d").putImageData(source, 0, 0);
	const dst = document.createElement("canvas");
	dst.width = width;
	dst.height = height;
	const ctx = dst.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(src, 0, 0, width, height);
	return ctx.getImageData(0, 0, width, height);
}
function tensorFromImage(ort, image, layout) {
	const { width, height, data } = image;
	const pixelCount = width * height;
	const floats = new Float32Array(pixelCount * 3);
	if (layout === "nchw") for (let i = 0, p = 0; i < pixelCount; i++, p += 4) {
		floats[i] = (data[p] / 255 - MEAN[0]) / STD[0];
		floats[pixelCount + i] = (data[p + 1] / 255 - MEAN[1]) / STD[1];
		floats[pixelCount * 2 + i] = (data[p + 2] / 255 - MEAN[2]) / STD[2];
	}
	else for (let i = 0, p = 0, o = 0; i < pixelCount; i++, p += 4, o += 3) {
		floats[o] = (data[p] / 255 - MEAN[0]) / STD[0];
		floats[o + 1] = (data[p + 1] / 255 - MEAN[1]) / STD[1];
		floats[o + 2] = (data[p + 2] / 255 - MEAN[2]) / STD[2];
	}
	const dims = layout === "nchw" ? [
		1,
		3,
		height,
		width
	] : [
		1,
		height,
		width,
		3
	];
	return new ort.Tensor("float32", floats, dims);
}
function maskFromOutput(output, width, height) {
	const values = output.data;
	const count = width * height;
	const mask = new Float32Array(count);
	let offset = 0;
	if (values.length >= count * 2) offset = values.length - count;
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < count; i++) {
		const v = Number(values[offset + i] ?? 0);
		mask[i] = v;
		if (v < min) min = v;
		if (v > max) max = v;
	}
	const span = Math.max(1e-5, max - min);
	for (let i = 0; i < count; i++) mask[i] = (mask[i] - min) / span;
	if ((mask[0] + mask[width - 1] + mask[(height - 1) * width] + mask[height * width - 1]) / 4 > .5) for (let i = 0; i < count; i++) mask[i] = 1 - mask[i];
	return mask;
}
function applyMask(source, mask, maskW, maskH) {
	const out = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
	const { width, height, data } = out;
	for (let y = 0; y < height; y++) {
		const sy = (y + .5) * maskH / height - .5;
		const y0 = Math.max(0, Math.floor(sy));
		const y1 = Math.min(maskH - 1, y0 + 1);
		const fy = sy - y0;
		for (let x = 0; x < width; x++) {
			const sx = (x + .5) * maskW / width - .5;
			const x0 = Math.max(0, Math.floor(sx));
			const x1 = Math.min(maskW - 1, x0 + 1);
			const fx = sx - x0;
			const a00 = mask[y0 * maskW + x0] ?? 0;
			const a10 = mask[y0 * maskW + x1] ?? 0;
			const a01 = mask[y1 * maskW + x0] ?? 0;
			const a11 = mask[y1 * maskW + x1] ?? 0;
			const a = a00 * (1 - fx) * (1 - fy) + a10 * fx * (1 - fy) + a01 * (1 - fx) * fy + a11 * fx * fy;
			data[(y * width + x) * 4 + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
		}
	}
	return out;
}
async function runOnnx(source, path, onProgress) {
	onProgress(6, "Menyiapkan model");
	const ort = await loadOrt();
	onProgress(18, "Menyiapkan model");
	const session = await getSession(path);
	onProgress(36, "Memotong background");
	const inputName = session.inputNames[0];
	if (!inputName) throw new Error("Model tidak punya input.");
	const layout = "nchw";
	const size = 1024;
	const tensor = tensorFromImage(ort, resizeImageData(source, size, size), layout);
	onProgress(58, "Memotong background");
	const result = await session.run({ [inputName]: tensor });
	const firstOut = session.outputNames[0];
	if (!firstOut || !result[firstOut]) throw new Error("Model tidak mengembalikan mask.");
	onProgress(82, "Merapikan tepi");
	const output = result[firstOut];
	const dims = output.dims ?? [];
	const maskH = dims.length >= 2 ? Number(dims[dims.length - 2]) || size : size;
	const maskW = dims.length >= 1 ? Number(dims[dims.length - 1]) || size : size;
	const mask = maskFromOutput(output, maskW, maskH);
	onProgress(94, "Merapikan tepi");
	return applyMask(source, mask, maskW, maskH);
}
async function removeImageBackground(source, model, onProgress) {
	if (typeof window === "undefined") throw new Error("Hapus background hanya tersedia di browser.");
	const path = MODEL_PATHS[model];
	if (await modelFileReady(path)) try {
		return refineCutout(await runOnnx(source, path, onProgress));
	} catch (error) {
		console.warn("Model ONNX gagal, memakai cutout lokal.", error);
	}
	onProgress(10, "Memotong background");
	const cut = edgeCutout(source, model === "fast" ? "fast" : "quality", (percent) => {
		onProgress(Math.max(10, percent), "Memotong background");
	});
	onProgress(100, "Selesai");
	return refineCutout(cut);
}
function ModelDialog({ open, selected, busy, onSelect, onClose }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 cursor-default",
			"aria-label": "Tutup",
			onClick: onClose,
			disabled: busy
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-subtle uppercase",
					children: "Hapus background"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-semibold tracking-[-0.02em] text-fg",
					children: "Pilih model"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted",
					children: "Semua foto di batch diproses dengan model yang sama. File model diambil dari folder lokal — tanpa unduhan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2",
					children: MODEL_OPTIONS.map((option) => {
						const active = selected === option.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy,
							onClick: () => onSelect(option.id),
							className: cn("rounded-[var(--radius-md)] px-4 py-4 text-left transition-[background-color,box-shadow] duration-[var(--motion-quick)]", active ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg hover:bg-border/80"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" }), option.label]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-2 block font-mono text-xs", active ? "text-accent-fg/80" : "text-subtle"),
									children: option.file
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-1 block text-xs leading-relaxed", active ? "text-accent-fg/75" : "text-muted"),
									children: option.hint
								})
							]
						}, option.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: onClose,
						disabled: busy,
						children: "Batal"
					})
				})
			]
		})]
	});
}
function fitRect(containerW, containerH, imageW, imageH) {
	const scale = Math.min(containerW / imageW, containerH / imageH);
	const width = imageW * scale;
	const height = imageH * scale;
	return {
		width,
		height,
		left: (containerW - width) / 2,
		top: (containerH - height) / 2,
		scale
	};
}
function Stage({ session }) {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const overlayRef = (0, import_react.useRef)(null);
	const [fit, setFit] = (0, import_react.useState)({
		width: 0,
		height: 0,
		left: 0,
		top: 0,
		scale: 1
	});
	const [cursor, setCursor] = (0, import_react.useState)(null);
	const [box, setBox] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const size = session.imageSize;
	const source = session.sourceSize;
	(0, import_react.useEffect)(() => {
		const el = wrapRef.current;
		if (!el) return;
		const update = () => {
			const rect = el.getBoundingClientRect();
			setBox({
				w: rect.width,
				h: rect.height
			});
		};
		update();
		const observer = new ResizeObserver(update);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!size || box.w === 0) return;
		setFit(fitRect(box.w, box.h, size.width, size.height));
	}, [
		box.h,
		box.w,
		size
	]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || !size) return;
		if (canvas.width !== size.width) canvas.width = size.width;
		if (canvas.height !== size.height) canvas.height = size.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const frame = session.getPreview(true);
		ctx.clearRect(0, 0, size.width, size.height);
		if (frame) ctx.putImageData(frame, 0, 0);
	}, [
		session,
		session.revision,
		session.showOriginal,
		session.brightness,
		session.outlineWidth,
		session.outlineColor,
		session.fillColor,
		session.positionMode,
		session.paddingPct,
		session.ignoreCroppedSides,
		session.offsetX,
		session.offsetY,
		session.canvasWidth,
		session.canvasHeight,
		session.presetId,
		size
	]);
	(0, import_react.useEffect)(() => {
		const canvas = overlayRef.current;
		if (!canvas || !source) return;
		if (canvas.width !== source.width) canvas.width = source.width;
		if (canvas.height !== source.height) canvas.height = source.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, source.width, source.height);
		const overlay = session.getMaskOverlay();
		if (overlay) ctx.putImageData(overlay, 0, 0);
	}, [
		session,
		session.maskRevision,
		session.hasMask,
		source
	]);
	function toOutputPoint(event) {
		const canvas = canvasRef.current;
		if (!canvas || !size) return null;
		const rect = canvas.getBoundingClientRect();
		return {
			x: (event.clientX - rect.left) / rect.width * size.width,
			y: (event.clientY - rect.top) / rect.height * size.height
		};
	}
	function onPointerDown(event) {
		if (session.processing || session.showOriginal) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		const pt = toOutputPoint(event);
		if (!pt) return;
		session.beginStroke(pt.x, pt.y);
	}
	function onPointerMove(event) {
		const pt = toOutputPoint(event);
		if (!pt) return;
		setCursor({
			x: event.clientX,
			y: event.clientY
		});
		if (event.buttons === 1 && !session.showOriginal) session.moveStroke(pt.x, pt.y);
	}
	const layout = session.getLayout();
	const displayScale = size && fit.width > 0 ? fit.width / size.width : 1;
	const brushCss = session.brushSize * (layout?.scale ?? 1) * (displayScale || 1);
	const overlayStyle = layout && source && fit.width > 0 ? {
		width: source.width * layout.scale * displayScale,
		height: source.height * layout.scale * displayScale,
		left: fit.left + layout.dx * displayScale,
		top: fit.top + layout.dy * displayScale
	} : null;
	const paintCursor = session.isPanTool ? cursor ? "grabbing" : "grab" : session.showOriginal ? "default" : "none";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: cn("relative min-h-[42vh] flex-1 overflow-hidden rounded-[var(--radius-lg)] lg:min-h-0", session.fillColor ? "bg-surface-2" : "studio-check"),
		children: [
			size && fit.width > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute touch-none",
				style: {
					width: fit.width,
					height: fit.height,
					left: fit.left,
					top: fit.top,
					cursor: paintCursor
				},
				onPointerDown,
				onPointerMove,
				onPointerUp: () => session.endStroke(),
				onPointerCancel: () => session.endStroke(),
				onPointerLeave: () => {
					session.endStroke();
					setCursor(null);
				}
			}),
			overlayStyle && !session.showOriginal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: overlayRef,
				className: "pointer-events-none absolute z-[1]",
				style: {
					...overlayStyle,
					opacity: session.hasMask ? 1 : 0
				}
			}),
			cursor && !session.showOriginal && !session.processing && session.isPaintTool && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute z-10 rounded-full border border-fg/70 mix-blend-difference",
				style: {
					width: brushCss,
					height: brushCss,
					left: cursor.x - (wrapRef.current?.getBoundingClientRect().left ?? 0) - brushCss / 2,
					top: cursor.y - (wrapRef.current?.getBoundingClientRect().top ?? 0) - brushCss / 2
				}
			}),
			session.processing && session.progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 flex items-end bg-fg/25 p-4 sm:items-center sm:justify-center sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-fg",
							children: session.progress.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Model lokal dari folder model, tanpa unduhan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-1 overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
								style: { width: `${session.progress.percent}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm tabular-nums text-subtle",
							children: [session.progress.percent, "%"]
						})
					]
				})
			})
		]
	});
}
function PanelTitle({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold tracking-[-0.02em] text-fg",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: hint
		}) : null]
	});
}
function Row({ label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				children: label
			}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tabular-nums text-subtle",
				children: value
			}) : null]
		}), children]
	});
}
function Segmented({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid auto-cols-fr grid-flow-col gap-1 rounded-[var(--radius-md)] bg-surface-2 p-1",
		children: options.map((option) => {
			const active = option.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(option.id),
				className: cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)] px-2 text-xs font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-quick)]", active ? "bg-surface text-fg shadow-[var(--shadow-border)]" : "text-muted hover:text-fg"),
				children: [option.icon, option.label]
			}, option.id);
		})
	});
}
function CheckRow({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "checkbox",
		"aria-checked": checked,
		onClick: () => onChange(!checked),
		className: "flex min-h-11 items-start gap-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[5px] transition-[background-color,box-shadow] duration-[var(--motion-quick)]", checked ? "bg-accent text-accent-fg" : "bg-surface shadow-[var(--shadow-border)]"),
			children: checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 12 12",
				className: "size-3",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M2.2 6.2 4.7 8.7 9.8 3.4",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.8",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			}) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm leading-snug text-fg",
			children: label
		})]
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-accent shadow-[var(--shadow-border)] ring-2 ring-bg transition-[box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" })]
	});
}
function CutoutPanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
			title: "Hapus Cutout",
			hint: "Buang bagian subjek dari hasil cutout — bukan mengisi ulang, melainkan membuatnya transparan."
		}), !session.hasCutout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-[var(--radius-md)] bg-surface-2 px-3 py-3 text-sm leading-relaxed text-muted",
			children: "Hapus background dulu. Setelah subjek terpisah, Guide dan Manual bisa memotong bagian yang tidak ingin dipertahankan."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			value: session.cutoutMode,
			onChange: session.setCutoutMode,
			options: [{
				id: "guide",
				label: "Guide"
			}, {
				id: "manual",
				label: "Manual"
			}]
		}), session.cutoutMode === "guide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Gambar garis pada objek yang ingin dibuang. Klaro menelusuri tepi dan warna, lalu menghapusnya dari cutout."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Ukuran kuas",
				value: `${session.brushSize}px`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 160,
					step: 1,
					value: [session.brushSize],
					onValueChange: ([v]) => session.setBrushSize(v ?? 36),
					"aria-label": "Ukuran kuas guide"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Kepekaan",
				value: `${session.guideTolerance}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 20,
					max: 100,
					step: 1,
					value: [session.guideTolerance],
					onValueChange: ([v]) => session.setGuideTolerance(v ?? 62),
					"aria-label": "Kepekaan guide"
				})
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => session.setBrushTool("erase"),
					className: cn("h-11 rounded-[var(--radius-sm)] text-sm font-medium transition-[background-color,color] duration-[var(--motion-quick)]", session.brushTool === "erase" ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg hover:bg-border/80"),
					children: "Hapus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => session.setBrushTool("restore"),
					className: cn("h-11 rounded-[var(--radius-sm)] text-sm font-medium transition-[background-color,color] duration-[var(--motion-quick)]", session.brushTool === "restore" ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg hover:bg-border/80"),
					children: "Pulihkan"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Ukuran kuas",
				value: `${session.brushSize}px`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 160,
					step: 1,
					value: [session.brushSize],
					onValueChange: ([v]) => session.setBrushSize(v ?? 36),
					"aria-label": "Ukuran kuas manual"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Kekerasan",
				value: `${Math.round(session.brushHardness * 100)}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: 1,
					step: .01,
					value: [session.brushHardness],
					onValueChange: ([v]) => session.setBrushHardness(v ?? .55),
					"aria-label": "Kekerasan kuas manual"
				})
			})
		] })] })]
	});
}
function PositionPanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				title: "Posisi",
				hint: "Atur letak subjek di dalam kanvas. Padding menjaga jarak dari tepi."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: session.positionMode,
				onChange: session.setPositionMode,
				options: [
					{
						id: "original",
						label: "Asli",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" })
					},
					{
						id: "center",
						label: "Tengah",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareDashed, { className: "size-4" })
					},
					{
						id: "custom",
						label: "Kustom",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Move, { className: "size-4" })
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Padding",
				value: `${Math.round(session.paddingPct)}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: 40,
					step: 1,
					value: [session.paddingPct],
					onValueChange: ([v]) => session.setPaddingPct(v ?? 0),
					"aria-label": "Padding"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
				checked: session.ignoreCroppedSides,
				onChange: session.setIgnoreCroppedSides,
				label: "Abaikan padding di sisi terpotong"
			}),
			session.positionMode === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Seret subjek di kanvas, atau geser dengan tombol panah. Shift untuk langkah lebih besar."
			}) : null
		]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-[var(--radius-sm)] bg-surface-2 px-3 text-sm text-fg tabular-nums outline-none transition-[box-shadow] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:shadow-[0_0_0_2px_var(--color-ring)]", className),
		...props
	});
}
function ResizePanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
			title: "Ubah ukuran",
			hint: "Lebar dan tinggi kanvas diterapkan ke semua foto di batch."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-medium tracking-[0.16em] text-subtle uppercase",
					children: "Kustom"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "Lebar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 64,
							max: 4096,
							value: session.canvasWidth,
							onChange: (e) => session.setCanvasSize(Number(e.target.value), session.canvasHeight, "width"),
							"aria-label": "Lebar kanvas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "Tinggi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 64,
							max: 4096,
							value: session.canvasHeight,
							onChange: (e) => session.setCanvasSize(session.canvasWidth, Number(e.target.value), "height"),
							"aria-label": "Tinggi kanvas"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
					checked: session.lockAspect,
					onChange: session.setLockAspect,
					label: "Kunci rasio"
				})
			]
		})]
	});
}
function RetouchPanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				title: "Retouch",
				hint: "Sapu objek, teks, atau watermark. Klaro mengisi area itu dari piksel di sekitarnya."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Ukuran kuas",
				value: `${session.brushSize}px`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 160,
					step: 1,
					value: [session.brushSize],
					onValueChange: ([v]) => session.setBrushSize(v ?? 36),
					"aria-label": "Ukuran kuas retouch"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Kekerasan",
				value: `${Math.round(session.brushHardness * 100)}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: 1,
					step: .01,
					value: [session.brushHardness],
					onValueChange: ([v]) => session.setBrushHardness(v ?? .55),
					"aria-label": "Kekerasan kuas retouch"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void session.applyRetouch(),
					disabled: session.processing || !session.hasMask,
					children: "Hapus objek"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: session.clearRetouchMask,
					disabled: !session.hasMask || session.processing,
					children: "Reset sapuan"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: "Paling rapi untuk watermark dan objek kecil. Untuk membuang bagian subjek setelah cutout, pakai Hapus Cutout."
			})
		]
	});
}
function BackgroundPanel({ session, onRemoveBg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				title: "Latar Belakang",
				hint: "Warna kanvas berlaku untuk semua foto. Hapus BG memproses seluruh batch."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onRemoveBg,
				disabled: session.processing,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {}), "Hapus background"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-medium tracking-[0.16em] text-subtle uppercase",
					children: "Warna"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [FILL_SWATCHES.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: swatch.label,
						"aria-label": swatch.label,
						onClick: () => session.setFillColor(swatch.value),
						className: cn("size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]", session.fillColor === swatch.value && "ring-2 ring-accent ring-offset-2 ring-offset-surface", !swatch.value && "studio-check"),
						style: swatch.value ? { backgroundColor: swatch.value } : void 0
					}, swatch.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Latar kustom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: session.fillColor ?? "#ffffff",
							onChange: (e) => session.setFillColor(e.target.value),
							className: "absolute inset-[-25%] size-[150%] cursor-pointer"
						})]
					})]
				})]
			})
		]
	});
}
function OutlinePanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				title: "Outline",
				hint: "Tebal dan warna garis luar untuk foto yang sedang diedit. Batch menampilkan hasil terakhir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Ukuran outline",
				value: `${session.outlineWidth}px`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: 48,
					step: 1,
					value: [session.outlineWidth],
					onValueChange: ([v]) => session.setOutlineWidth(v ?? 0),
					"aria-label": "Ukuran outline"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: "Warna outline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [OUTLINE_SWATCHES.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: swatch.label,
						"aria-label": swatch.label,
						onClick: () => session.setOutlineColor(swatch.value),
						className: cn("size-9 rounded-full shadow-[var(--shadow-border)]", hexEqual(session.outlineColor, swatch.value) && "ring-2 ring-accent ring-offset-2 ring-offset-surface"),
						style: { backgroundColor: swatch.value }
					}, swatch.value)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative size-9 overflow-hidden rounded-full shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Warna kustom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: session.outlineColor,
							onChange: (e) => session.setOutlineColor(e.target.value),
							className: "absolute inset-[-25%] size-[150%] cursor-pointer"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Kecerahan",
				value: `${session.brightness > 0 ? "+" : ""}${session.brightness}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: -80,
					max: 80,
					step: 1,
					value: [session.brightness],
					onValueChange: ([v]) => session.setBrightness(v ?? 0),
					"aria-label": "Kecerahan"
				})
			})
		]
	});
}
function SoonPanel({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
			title,
			hint
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-[var(--radius-md)] bg-surface-2 px-3 py-3 text-sm leading-relaxed text-muted",
			children: "Fitur Pro ini belum aktif di studio ini."
		})]
	});
}
var SIZE_PRESETS = [
	{
		id: "original",
		label: "Asli",
		hint: "Ukuran foto",
		group: "Dasar",
		width: null,
		height: null
	},
	{
		id: "square",
		label: "1:1",
		hint: "1080 × 1080",
		group: "Rasio",
		width: 1080,
		height: 1080
	},
	{
		id: "portrait",
		label: "4:5",
		hint: "1080 × 1350",
		group: "Rasio",
		width: 1080,
		height: 1350
	},
	{
		id: "story",
		label: "9:16",
		hint: "1080 × 1920",
		group: "Rasio",
		width: 1080,
		height: 1920
	},
	{
		id: "landscape",
		label: "16:9",
		hint: "1920 × 1080",
		group: "Rasio",
		width: 1920,
		height: 1080
	},
	{
		id: "photo",
		label: "4:3",
		hint: "1600 × 1200",
		group: "Rasio",
		width: 1600,
		height: 1200
	},
	{
		id: "ig-feed",
		label: "IG Feed",
		hint: "1080 × 1350",
		group: "Sosial",
		width: 1080,
		height: 1350
	},
	{
		id: "ig-square",
		label: "IG Square",
		hint: "1080 × 1080",
		group: "Sosial",
		width: 1080,
		height: 1080
	},
	{
		id: "ig-story",
		label: "IG Story",
		hint: "1080 × 1920",
		group: "Sosial",
		width: 1080,
		height: 1920
	},
	{
		id: "marketplace",
		label: "Shopee / Tokped",
		hint: "1000 × 1000",
		group: "Toko",
		width: 1e3,
		height: 1e3
	},
	{
		id: "amazon",
		label: "Amazon",
		hint: "2000 × 2000",
		group: "Toko",
		width: 2e3,
		height: 2e3
	}
];
var PRESET_GROUPS = [
	"Dasar",
	"Rasio",
	"Sosial",
	"Toko"
];
function findPreset(id) {
	return SIZE_PRESETS.find((p) => p.id === id) ?? SIZE_PRESETS[0];
}
var MAX_CANVAS = 4096;
function clampCanvas(n) {
	if (!Number.isFinite(n)) return 64;
	return Math.min(MAX_CANVAS, Math.max(64, Math.round(n)));
}
function TemplatePanel({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
			title: "Templat",
			hint: "Ukuran kanvas diterapkan ke semua foto di batch."
		}), PRESET_GROUPS.map((group) => {
			const presets = SIZE_PRESETS.filter((p) => p.group === group);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-medium tracking-[0.16em] text-subtle uppercase",
					children: group
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: presets.map((preset) => {
						const active = session.presetId === preset.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => session.applyPreset(preset.id),
							className: cn("rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-[background-color,color] duration-[var(--motion-quick)]", active ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg hover:bg-border/80"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: preset.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("block text-xs", active ? "text-accent-fg/70" : "text-subtle"),
								children: preset.hint
							})]
						}, preset.id);
					})
				})]
			}, group);
		})]
	});
}
function StudioPanel({ session, onRemoveBg }) {
	switch (session.activeTool) {
		case "retouch": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetouchPanel, { session });
		case "cutout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CutoutPanel, { session });
		case "outline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlinePanel, { session });
		case "position": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionPanel, { session });
		case "resize": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizePanel, { session });
		case "background": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundPanel, {
			session,
			onRemoveBg
		});
		case "shadow": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoonPanel, {
			title: "Bayangan AI",
			hint: "Bayangan studio otomatis untuk seluruh batch. Segera hadir."
		});
		case "ai": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoonPanel, {
			title: "Alat AI",
			hint: "Alat generatif tambahan. Segera hadir."
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePanel, { session });
	}
}
var BATCH_TOOLS = [
	{
		id: "template",
		label: "Templat",
		icon: LayoutTemplate
	},
	{
		id: "resize",
		label: "Ubah ukuran",
		icon: Scaling
	},
	{
		id: "position",
		label: "Posisi",
		icon: Move
	},
	{
		id: "background",
		label: "Latar Belakang",
		icon: Square
	},
	{
		id: "shadow",
		label: "Bayangan AI",
		icon: Sparkles,
		pro: true
	},
	{
		id: "ai",
		label: "Alat AI",
		icon: WandSparkles,
		pro: true
	}
];
var EDIT_TOOLS = [
	{
		id: "cutout",
		label: "Hapus",
		icon: Lasso
	},
	{
		id: "retouch",
		label: "Retouch",
		icon: WandSparkles
	},
	{
		id: "outline",
		label: "Outline",
		icon: Square
	}
];
function ToolRail({ session, view, onRemoveBg }) {
	const tools = view === "edit" ? EDIT_TOOLS : BATCH_TOOLS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex shrink-0 items-stretch gap-1 overflow-x-auto border-b border-border bg-surface px-1.5 py-2 lg:w-[5.5rem] lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:px-1.5 lg:py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
			label: "Hapus BG",
			active: false,
			tone: "accent",
			disabled: session.processing,
			onClick: onRemoveBg,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-4" })
		}), tools.map((tool) => {
			const Icon = tool.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
				label: tool.label,
				active: session.activeTool === tool.id,
				disabled: session.processing,
				pro: "pro" in tool ? Boolean(tool.pro) : false,
				onClick: () => session.setActiveTool(tool.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}, tool.id);
		})]
	});
}
function RailButton({ label, active, tone = "default", disabled, pro, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": label,
		disabled,
		onClick,
		className: cn("relative flex min-h-12 min-w-[4.4rem] flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)] px-1.5 text-[10px] leading-tight font-medium tracking-wide transition-[background-color,color] duration-[var(--motion-quick)] disabled:opacity-40 lg:min-h-[3.6rem] lg:min-w-0 lg:w-full", tone === "accent" && "bg-accent text-accent-fg hover:bg-accent/90", tone === "default" && (active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/80 hover:text-fg")),
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			pro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1 right-1 rounded-[4px] bg-accent px-1 text-[8px] font-semibold text-accent-fg",
				children: "Pro"
			}) : null
		]
	});
}
function subjectBounds(image, threshold = 18) {
	const { width, height, data } = image;
	let minX = width;
	let minY = height;
	let maxX = -1;
	let maxY = -1;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (data[(y * width + x) * 4 + 3] <= threshold) continue;
		if (x < minX) minX = x;
		if (y < minY) minY = y;
		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
	}
	if (maxX < 0) return null;
	return {
		x: minX,
		y: minY,
		w: maxX - minX + 1,
		h: maxY - minY + 1
	};
}
function detectCroppedSides(bounds, sourceW, sourceH, slack = 3) {
	if (!bounds) return {
		left: true,
		top: true,
		right: true,
		bottom: true
	};
	return {
		left: bounds.x <= slack,
		top: bounds.y <= slack,
		right: bounds.x + bounds.w >= sourceW - slack,
		bottom: bounds.y + bounds.h >= sourceH - slack
	};
}
function luminance(r, g, b) {
	return .2126 * r + .7152 * g + .0722 * b;
}
function colorDist(r1, g1, b1, r2, g2, b2) {
	const dr = r1 - r2;
	const dg = g1 - g2;
	const db = b1 - b2;
	return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db);
}
function sobelLuma(data, width, height) {
	const mag = new Float32Array(width * height);
	for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
		const idx = (yy, xx) => (yy * width + xx) * 4;
		const l = (yy, xx) => {
			const p = idx(yy, xx);
			return luminance(data[p], data[p + 1], data[p + 2]);
		};
		const gx = -l(y - 1, x - 1) + l(y - 1, x + 1) - 2 * l(y, x - 1) + 2 * l(y, x + 1) - l(y + 1, x - 1) + l(y + 1, x + 1);
		const gy = -l(y - 1, x - 1) - 2 * l(y - 1, x) - l(y - 1, x + 1) + l(y + 1, x - 1) + 2 * l(y + 1, x) + l(y + 1, x + 1);
		mag[y * width + x] = Math.hypot(gx, gy);
	}
	return mag;
}
/**
* Grow a scribble into an object on the cutout using color + edge stopping.
* Returns a 0–255 mask of pixels to remove.
*/
function growGuidedCutout(image, scribble, tolerance = 58) {
	const { width: w, height: h, data } = image;
	const out = new Uint8Array(w * h);
	const edges = sobelLuma(data, w, h);
	let sr = 0;
	let sg = 0;
	let sb = 0;
	let n = 0;
	const seeds = [];
	for (let i = 0, p = 0; i < scribble.length; i++, p += 4) {
		if (scribble[i] < 40) continue;
		if (data[p + 3] < 24) continue;
		sr += data[p];
		sg += data[p + 1];
		sb += data[p + 2];
		n++;
		seeds.push(i);
		out[i] = 255;
	}
	if (n === 0) return out;
	const mr = sr / n;
	const mg = sg / n;
	const mb = sb / n;
	const maxDist = 18 + tolerance / 100 * 150;
	const edgeStop = 48 + (1 - tolerance / 100) * 90;
	const seen = new Uint8Array(w * h);
	const queue = seeds.slice();
	for (const s of seeds) seen[s] = 1;
	while (queue.length) {
		const i = queue.pop();
		const x = i % w;
		const y = (i - x) / w;
		for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
			if (dx === 0 && dy === 0) continue;
			const nx = x + dx;
			const ny = y + dy;
			if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
			const ni = ny * w + nx;
			if (seen[ni]) continue;
			seen[ni] = 1;
			const np = ni * 4;
			if (data[np + 3] < 24) continue;
			if (edges[ni] > edgeStop && scribble[ni] < 40) continue;
			const dist = colorDist(data[np], data[np + 1], data[np + 2], mr, mg, mb);
			const parent = colorDist(data[np], data[np + 1], data[np + 2], data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
			if (dist > maxDist && parent > maxDist * .55) continue;
			out[ni] = 255;
			queue.push(ni);
		}
	}
	const closed = new Uint8Array(out);
	for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
		const i = y * w + x;
		if (closed[i]) continue;
		if (data[i * 4 + 3] < 24) continue;
		let c = 0;
		if (out[i - 1]) c++;
		if (out[i + 1]) c++;
		if (out[i - w]) c++;
		if (out[i + w]) c++;
		if (c >= 3) closed[i] = 255;
	}
	return closed;
}
function eraseMaskedAlpha(image, mask, feather = 1) {
	const { width, height, data } = image;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const i = y * width + x;
		const m = mask[i];
		if (m === 0) continue;
		const p = i * 4;
		let t = m / 255;
		if (feather > 0) {
			let minM = m;
			const x0 = Math.max(0, x - feather);
			const x1 = Math.min(width - 1, x + feather);
			const y0 = Math.max(0, y - feather);
			const y1 = Math.min(height - 1, y + feather);
			for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) minM = Math.min(minM, mask[yy * width + xx]);
			t = m / 255 * (.65 + .35 * (minM / 255));
		}
		data[p + 3] = Math.round(data[p + 3] * (1 - t));
	}
}
var scratch = {
	src: null,
	dst: null
};
function canvas(kind, w, h) {
	const existing = scratch[kind];
	const el = existing ?? document.createElement("canvas");
	if (!existing) scratch[kind] = el;
	if (el.width !== w) el.width = w;
	if (el.height !== h) el.height = h;
	const ctx = el.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas tidak tersedia.");
	return {
		el,
		ctx
	};
}
function computeLayout(sourceW, sourceH, bounds, options) {
	const canvasW = Math.max(1, Math.round(options.canvasWidth));
	const canvasH = Math.max(1, Math.round(options.canvasHeight));
	const pad = Math.max(0, Math.min(40, options.paddingPct)) / 100;
	const cropped = detectCroppedSides(bounds, sourceW, sourceH);
	const ignore = options.ignoreCroppedSides;
	const padX = canvasW * pad;
	const padY = canvasH * pad;
	const left = ignore && cropped.left ? 0 : padX;
	const top = ignore && cropped.top ? 0 : padY;
	const right = ignore && cropped.right ? canvasW : canvasW - padX;
	const bottom = ignore && cropped.bottom ? canvasH : canvasH - padY;
	const availW = Math.max(1, right - left);
	const availH = Math.max(1, bottom - top);
	const bbox = bounds ?? {
		x: 0,
		y: 0,
		w: sourceW,
		h: sourceH
	};
	let scale;
	let dx;
	let dy;
	if (options.mode === "original") {
		scale = Math.min(availW / sourceW, availH / sourceH);
		dx = left + (availW - sourceW * scale) / 2;
		dy = top + (availH - sourceH * scale) / 2;
		if (ignore) {
			if (cropped.left && !cropped.right) dx = left;
			if (cropped.right && !cropped.left) dx = right - sourceW * scale;
			if (cropped.top && !cropped.bottom) dy = top;
			if (cropped.bottom && !cropped.top) dy = bottom - sourceH * scale;
		}
	} else {
		scale = Math.min(availW / Math.max(1, bbox.w), availH / Math.max(1, bbox.h));
		dx = left + (availW - bbox.w * scale) / 2 - bbox.x * scale;
		dy = top + (availH - bbox.h * scale) / 2 - bbox.y * scale;
	}
	if (options.mode === "custom") {
		dx += options.offsetX;
		dy += options.offsetY;
	}
	return {
		dx,
		dy,
		scale,
		canvasWidth: canvasW,
		canvasHeight: canvasH
	};
}
function isIdentityLayout(layout, sourceW, sourceH) {
	return layout.canvasWidth === sourceW && layout.canvasHeight === sourceH && Math.abs(layout.scale - 1) < 8e-4 && Math.abs(layout.dx) < .5 && Math.abs(layout.dy) < .5;
}
function renderLayout(subject, layout, fillColor) {
	const { canvasWidth: w, canvasHeight: h, dx, dy, scale } = layout;
	if (isIdentityLayout(layout, subject.width, subject.height) && !fillColor) return subject;
	const src = canvas("src", subject.width, subject.height);
	src.ctx.putImageData(subject, 0, 0);
	const dst = canvas("dst", w, h);
	dst.ctx.setTransform(1, 0, 0, 1, 0, 0);
	dst.ctx.clearRect(0, 0, w, h);
	if (fillColor) {
		const [r, g, b] = parseHex(fillColor);
		dst.ctx.fillStyle = `rgb(${r},${g},${b})`;
		dst.ctx.fillRect(0, 0, w, h);
	}
	dst.ctx.imageSmoothingEnabled = true;
	dst.ctx.imageSmoothingQuality = "high";
	dst.ctx.drawImage(src.el, 0, 0, subject.width, subject.height, dx, dy, subject.width * scale, subject.height * scale);
	return dst.ctx.getImageData(0, 0, w, h);
}
function canvasToSource(layout, x, y) {
	if (layout.scale === 0) return null;
	return {
		x: (x - layout.dx) / layout.scale,
		y: (y - layout.dy) / layout.scale
	};
}
function createMask(width, height) {
	return new Uint8Array(width * height);
}
function maskCoverage(mask) {
	let n = 0;
	for (let i = 0; i < mask.length; i++) if (mask[i] > 16) n++;
	return n;
}
function clearMask(mask) {
	mask.fill(0);
}
function cloneMask(mask) {
	return new Uint8Array(mask);
}
function paintMask(mask, width, height, cx, cy, radius, hardness, value = 255) {
	const r = Math.max(1, radius);
	const r2 = r * r;
	const inner = r * Math.max(0, Math.min(.96, hardness));
	const x0 = Math.max(0, Math.floor(cx - r));
	const y0 = Math.max(0, Math.floor(cy - r));
	const x1 = Math.min(width - 1, Math.ceil(cx + r));
	const y1 = Math.min(height - 1, Math.ceil(cy + r));
	const add = value >= 128;
	for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
		const dx = x + .5 - cx;
		const dy = y + .5 - cy;
		const d2 = dx * dx + dy * dy;
		if (d2 > r2) continue;
		const d = Math.sqrt(d2);
		let t = 1;
		if (d > inner) {
			const u = (d - inner) / Math.max(1e-4, r - inner);
			t = 1 - u * u * (3 - 2 * u);
		}
		const i = y * width + x;
		if (add) mask[i] = Math.max(mask[i], Math.round(value * t));
		else mask[i] = Math.round(mask[i] * (1 - t));
	}
}
function maskBounds(mask, width, height, threshold = 16) {
	let minX = width;
	let minY = height;
	let maxX = -1;
	let maxY = -1;
	for (let y = 0; y < height; y++) {
		const row = y * width;
		for (let x = 0; x < width; x++) {
			if (mask[row + x] <= threshold) continue;
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
	}
	if (maxX < 0) return null;
	return {
		x: minX,
		y: minY,
		w: maxX - minX + 1,
		h: maxY - minY + 1
	};
}
function dilateMask(mask, width, height, radius) {
	if (radius <= 0) return new Uint8Array(mask);
	const out = new Uint8Array(mask.length);
	const tmp = new Uint8Array(mask.length);
	const r = radius;
	for (let y = 0; y < height; y++) {
		const row = y * width;
		for (let x = 0; x < width; x++) {
			let m = 0;
			const x0 = Math.max(0, x - r);
			const x1 = Math.min(width - 1, x + r);
			for (let xx = x0; xx <= x1; xx++) m = Math.max(m, mask[row + xx]);
			tmp[row + x] = m;
		}
	}
	for (let x = 0; x < width; x++) for (let y = 0; y < height; y++) {
		let m = 0;
		const y0 = Math.max(0, y - r);
		const y1 = Math.min(height - 1, y + r);
		for (let yy = y0; yy <= y1; yy++) m = Math.max(m, tmp[yy * width + x]);
		out[y * width + x] = m;
	}
	return out;
}
function redOverlayFromMask(mask, width, height, alpha = 140) {
	const out = new ImageData(width, height);
	const data = out.data;
	for (let i = 0, p = 0; i < mask.length; i++, p += 4) {
		const m = mask[i];
		if (m === 0) continue;
		data[p] = 196;
		data[p + 1] = 52;
		data[p + 2] = 42;
		data[p + 3] = Math.round(m / 255 * alpha);
	}
	return out;
}
function yieldNow() {
	return new Promise((resolve) => {
		setTimeout(resolve, 0);
	});
}
/**
* Telea-style fast inpainting. Fills masked RGB from surrounding known pixels
* while preserving alpha. Best for watermarks and small objects.
*/
async function inpaintTelea(source, mask, onProgress) {
	const { width: w, height: h, data: src } = source;
	const out = new ImageData(new Uint8ClampedArray(src), w, h);
	const dst = out.data;
	const dilated = dilateMask(mask, w, h, 2);
	const hole = new Uint8Array(w * h);
	let remaining = 0;
	for (let i = 0; i < hole.length; i++) if (dilated[i] > 96) {
		hole[i] = 1;
		remaining++;
	}
	if (remaining === 0) return out;
	const known = new Uint8Array(w * h);
	for (let i = 0; i < hole.length; i++) known[i] = hole[i] ? 0 : 1;
	const radius = 5;
	const total = remaining;
	let processed = 0;
	let lastYield = performance.now();
	const offsets = [];
	for (let yy = -5; yy <= radius; yy++) for (let xx = -5; xx <= radius; xx++) {
		if (xx === 0 && yy === 0) continue;
		const dist = Math.hypot(xx, yy);
		if (dist <= 5.01) offsets.push({
			x: xx,
			y: yy,
			dist
		});
	}
	const isBoundary = (i) => {
		const x = i % w;
		const y = (i - x) / w;
		if (x > 0 && known[i - 1]) return true;
		if (x + 1 < w && known[i + 1]) return true;
		if (y > 0 && known[i - w]) return true;
		if (y + 1 < h && known[i + w]) return true;
		return false;
	};
	let frontier = [];
	for (let i = 0; i < hole.length; i++) if (hole[i] && isBoundary(i)) frontier.push(i);
	const next = [];
	const queued = new Uint8Array(w * h);
	while (remaining > 0 && frontier.length > 0) {
		next.length = 0;
		queued.fill(0);
		for (const i of frontier) {
			if (!hole[i]) continue;
			const x = i % w;
			const y = (i - x) / w;
			let wr = 0;
			let wg = 0;
			let wb = 0;
			let wsum = 0;
			for (const off of offsets) {
				const nx = x + off.x;
				const ny = y + off.y;
				if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
				const ni = ny * w + nx;
				if (!known[ni]) continue;
				const np = ni * 4;
				const dirx = -off.x / off.dist;
				const diry = -off.y / off.dist;
				const weight = Math.max(.08, dirx * -off.x + diry * -off.y) / (off.dist * off.dist) * (dst[np + 3] / 255 || 1);
				wr += dst[np] * weight;
				wg += dst[np + 1] * weight;
				wb += dst[np + 2] * weight;
				wsum += weight;
			}
			const p = i * 4;
			if (wsum > 0) {
				dst[p] = Math.round(wr / wsum);
				dst[p + 1] = Math.round(wg / wsum);
				dst[p + 2] = Math.round(wb / wsum);
			}
			hole[i] = 0;
			known[i] = 1;
			remaining--;
			processed++;
			const neighbors = [
				i - 1,
				i + 1,
				i - w,
				i + w
			];
			for (const ni of neighbors) {
				if (ni < 0 || ni >= hole.length) continue;
				if (!hole[ni] || queued[ni]) continue;
				queued[ni] = 1;
				next.push(ni);
			}
		}
		frontier = next.filter((i) => hole[i]);
		onProgress?.(Math.min(99, Math.round(processed / total * 100)));
		if (performance.now() - lastYield > 24) {
			lastYield = performance.now();
			await yieldNow();
		}
	}
	if (remaining > 0) {
		let sr = 0;
		let sg = 0;
		let sb = 0;
		let n = 0;
		for (let i = 0, p = 0; i < known.length; i++, p += 4) {
			if (!known[i] || dst[p + 3] < 8) continue;
			sr += dst[p];
			sg += dst[p + 1];
			sb += dst[p + 2];
			n++;
			if (n > 4e3) break;
		}
		const fr = n ? sr / n : 180;
		const fg = n ? sg / n : 180;
		const fb = n ? sb / n : 180;
		for (let i = 0; i < hole.length; i++) {
			if (!hole[i]) continue;
			const p = i * 4;
			dst[p] = fr;
			dst[p + 1] = fg;
			dst[p + 2] = fb;
		}
	}
	onProgress?.(100);
	return out;
}
function copyRgbKeepAlpha(target, source) {
	const t = target.data;
	const s = source.data;
	const n = Math.min(t.length, s.length);
	for (let p = 0; p < n; p += 4) {
		t[p] = s[p];
		t[p + 1] = s[p + 1];
		t[p + 2] = s[p + 2];
	}
}
function copyPatch(dest, src, x, y, w, h) {
	const x0 = Math.max(0, x);
	const y0 = Math.max(0, y);
	const x1 = Math.min(dest.width, x + w, x + src.width);
	const y1 = Math.min(dest.height, y + h, y + src.height);
	for (let yy = y0; yy < y1; yy++) {
		const destOffset = (yy * dest.width + x0) * 4;
		const srcOffset = ((yy - y) * src.width + (x0 - x)) * 4;
		dest.data.set(src.data.subarray(srcOffset, srcOffset + (x1 - x0) * 4), destOffset);
	}
}
function extractPatch(source, x, y, w, h) {
	const patch = new ImageData(w, h);
	const x0 = Math.max(0, x);
	const y0 = Math.max(0, y);
	const x1 = Math.min(source.width, x + w);
	const y1 = Math.min(source.height, y + h);
	for (let yy = y0; yy < y1; yy++) {
		const si = (yy * source.width + x0) * 4;
		const di = ((yy - y) * w + (x0 - x)) * 4;
		patch.data.set(source.data.subarray(si, si + (x1 - x0) * 4), di);
	}
	return patch;
}
function crc32(data) {
	let crc = 4294967295;
	for (let i = 0; i < data.length; i++) {
		crc ^= data[i];
		for (let j = 0; j < 8; j++) crc = crc >>> 1 ^ 3988292384 & -(crc & 1);
	}
	return (crc ^ 4294967295) >>> 0;
}
function u16(n) {
	const b = /* @__PURE__ */ new Uint8Array(2);
	b[0] = n & 255;
	b[1] = n >>> 8 & 255;
	return b;
}
function u32(n) {
	const b = /* @__PURE__ */ new Uint8Array(4);
	b[0] = n & 255;
	b[1] = n >>> 8 & 255;
	b[2] = n >>> 16 & 255;
	b[3] = n >>> 24 & 255;
	return b;
}
function concat(parts) {
	let len = 0;
	for (const p of parts) len += p.length;
	const out = new Uint8Array(len);
	let o = 0;
	for (const p of parts) {
		out.set(p, o);
		o += p.length;
	}
	return out;
}
function makeZip(files) {
	const encoder = new TextEncoder();
	const locals = [];
	const centrals = [];
	let offset = 0;
	for (const file of files) {
		const name = encoder.encode(file.name.replace(/\\/g, "/"));
		const crc = crc32(file.data);
		const local = concat([
			u32(67324752),
			u16(20),
			u16(0),
			u16(0),
			u16(0),
			u16(0),
			u32(crc),
			u32(file.data.length),
			u32(file.data.length),
			u16(name.length),
			u16(0),
			name,
			file.data
		]);
		const central = concat([
			u32(33639248),
			u16(20),
			u16(20),
			u16(0),
			u16(0),
			u16(0),
			u16(0),
			u32(crc),
			u32(file.data.length),
			u32(file.data.length),
			u16(name.length),
			u16(0),
			u16(0),
			u16(0),
			u16(0),
			u32(0),
			u32(offset),
			name
		]);
		locals.push(local);
		centrals.push(central);
		offset += local.length;
	}
	const centralDir = concat(centrals);
	const end = concat([
		u32(101010256),
		u16(0),
		u16(0),
		u16(files.length),
		u16(files.length),
		u32(centralDir.length),
		u32(offset),
		u16(0)
	]);
	const bytes = concat([
		...locals,
		centralDir,
		end
	]);
	return new Blob([bytes.buffer], { type: "application/zip" });
}
var MAX_UNDO = 16;
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function usePhotoSession() {
	const buffersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const originalRef = (0, import_react.useRef)(null);
	const retouchedRef = (0, import_react.useRef)(null);
	const baseRef = (0, import_react.useRef)(null);
	const workingRef = (0, import_react.useRef)(null);
	const maskRef = (0, import_react.useRef)(null);
	const undoRef = (0, import_react.useRef)([]);
	const redoRef = (0, import_react.useRef)([]);
	const lastPointRef = (0, import_react.useRef)(null);
	const paintingRef = (0, import_react.useRef)(false);
	const panningRef = (0, import_react.useRef)(false);
	const panStartRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(null);
	const layoutRef = (0, import_react.useRef)(null);
	const layoutKeyRef = (0, import_react.useRef)("");
	const boundsRef = (0, import_react.useRef)(null);
	const boundsKeyRef = (0, import_react.useRef)("");
	const batchBusyRef = (0, import_react.useRef)(false);
	const editingIdRef = (0, import_react.useRef)(null);
	const itemsRef = (0, import_react.useRef)([]);
	const thumbTimerRef = (0, import_react.useRef)(null);
	const [fileName, setFileName] = (0, import_react.useState)("foto");
	const [revision, setRevision] = (0, import_react.useState)(0);
	const [maskRevision, setMaskRevision] = (0, import_react.useState)(0);
	const [hasCutout, setHasCutout] = (0, import_react.useState)(false);
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)("home");
	const [activeTool, setActiveToolState] = (0, import_react.useState)("template");
	const [brushTool, setBrushTool] = (0, import_react.useState)("erase");
	const [cutoutMode, setCutoutMode] = (0, import_react.useState)("guide");
	const [brushSize, setBrushSize] = (0, import_react.useState)(36);
	const [brushHardness, setBrushHardness] = (0, import_react.useState)(.55);
	const [guideTolerance, setGuideTolerance] = (0, import_react.useState)(62);
	const [brightness, setBrightness] = (0, import_react.useState)(0);
	const [outlineWidth, setOutlineWidth] = (0, import_react.useState)(0);
	const [outlineColor, setOutlineColor] = (0, import_react.useState)("#ffffff");
	const [fillColor, setFillColor] = (0, import_react.useState)(null);
	const [model, setModel] = (0, import_react.useState)("fast");
	const [showOriginal, setShowOriginal] = (0, import_react.useState)(false);
	const [canUndo, setCanUndo] = (0, import_react.useState)(false);
	const [canRedo, setCanRedo] = (0, import_react.useState)(false);
	const [compareAvailable, setCompareAvailable] = (0, import_react.useState)(false);
	const [hasMask, setHasMask] = (0, import_react.useState)(false);
	const [positionMode, setPositionMode] = (0, import_react.useState)("original");
	const [paddingPct, setPaddingPct] = (0, import_react.useState)(0);
	const [ignoreCroppedSides, setIgnoreCroppedSides] = (0, import_react.useState)(false);
	const [offsetX, setOffsetX] = (0, import_react.useState)(0);
	const [offsetY, setOffsetY] = (0, import_react.useState)(0);
	const [canvasWidth, setCanvasWidth] = (0, import_react.useState)(1e3);
	const [canvasHeight, setCanvasHeight] = (0, import_react.useState)(1e3);
	const [presetId, setPresetId] = (0, import_react.useState)("original");
	const [lockAspect, setLockAspect] = (0, import_react.useState)(true);
	const [batchItems, setBatchItems] = (0, import_react.useState)([]);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [bgDialogOpen, setBgDialogOpen] = (0, import_react.useState)(false);
	itemsRef.current = batchItems;
	editingIdRef.current = editingId;
	const layoutSnapshot = {
		canvasWidth,
		canvasHeight,
		presetId,
		positionMode,
		paddingPct,
		ignoreCroppedSides,
		offsetX,
		offsetY,
		fillColor
	};
	const layoutSnapshotRef = (0, import_react.useRef)(layoutSnapshot);
	layoutSnapshotRef.current = layoutSnapshot;
	const bump = (0, import_react.useCallback)(() => {
		setRevision((n) => n + 1);
		setCanUndo(undoRef.current.length > 0);
		setCanRedo(redoRef.current.length > 0);
	}, []);
	const bumpMask = (0, import_react.useCallback)(() => {
		const coverage = maskRef.current ? maskCoverage(maskRef.current) : 0;
		setHasMask(coverage > 0);
		setMaskRevision((n) => n + 1);
	}, []);
	const bumpSoon = (0, import_react.useCallback)(() => {
		if (rafRef.current != null) return;
		rafRef.current = requestAnimationFrame(() => {
			rafRef.current = null;
			bump();
		});
	}, [bump]);
	const layoutOptionsFor = (0, import_react.useCallback)((sourceW, sourceH) => {
		const snap = layoutSnapshotRef.current;
		return {
			canvasWidth: snap.presetId === "original" ? sourceW : snap.canvasWidth,
			canvasHeight: snap.presetId === "original" ? sourceH : snap.canvasHeight,
			mode: snap.positionMode,
			paddingPct: snap.paddingPct,
			ignoreCroppedSides: snap.ignoreCroppedSides,
			offsetX: snap.offsetX,
			offsetY: snap.offsetY
		};
	}, []);
	const composeFrom = (0, import_react.useCallback)((working, itemOutlineWidth, itemOutlineColor, itemBrightness, live = false) => {
		const opts = layoutOptionsFor(working.width, working.height);
		const bounds = subjectBounds(working);
		const layout = computeLayout(working.width, working.height, bounds, opts);
		if (workingRef.current === working) layoutRef.current = layout;
		const identity = isIdentityLayout(layout, working.width, working.height);
		const composed = composeSubject(working, {
			brightness: itemBrightness,
			outlineWidth: itemOutlineWidth,
			outlineColor: itemOutlineColor,
			fillColor: identity ? layoutSnapshotRef.current.fillColor : null,
			skipOutline: live && paintingRef.current
		});
		if (identity) return composed;
		return renderLayout(composed, layout, layoutSnapshotRef.current.fillColor);
	}, [layoutOptionsFor]);
	const composeOutput = (0, import_react.useCallback)((working, live = false) => composeFrom(working, outlineWidth, outlineColor, brightness, live), [
		brightness,
		composeFrom,
		outlineColor,
		outlineWidth
	]);
	const getLayout = (0, import_react.useCallback)(() => {
		const working = workingRef.current;
		if (!working) return null;
		const opts = layoutOptionsFor(working.width, working.height);
		const boundsKey = `${working.width}x${working.height}:${revision}`;
		if (boundsKeyRef.current !== boundsKey) {
			boundsRef.current = subjectBounds(working);
			boundsKeyRef.current = boundsKey;
		}
		const key = `${boundsKey}:${opts.canvasWidth}x${opts.canvasHeight}:${opts.mode}:${opts.paddingPct}:${opts.ignoreCroppedSides}:${opts.offsetX}:${opts.offsetY}`;
		if (layoutRef.current && layoutKeyRef.current === key) return layoutRef.current;
		const layout = computeLayout(working.width, working.height, boundsRef.current, opts);
		layoutRef.current = layout;
		layoutKeyRef.current = key;
		return layout;
	}, [layoutOptionsFor, revision]);
	const patchItem = (0, import_react.useCallback)((id, patch) => {
		setBatchItems((prev) => prev.map((item) => item.id === id ? {
			...item,
			...patch
		} : item));
	}, []);
	const thumbForBuffer = (0, import_react.useCallback)((buf) => {
		const composed = composeFrom(buf.working, buf.outlineWidth, buf.outlineColor, buf.brightness, false);
		return {
			thumbUrl: imageDataToThumbUrl(composed),
			outW: composed.width,
			outH: composed.height
		};
	}, [composeFrom]);
	const refreshItemThumb = (0, import_react.useCallback)((id) => {
		const buf = buffersRef.current.get(id);
		if (!buf) return;
		const thumb = thumbForBuffer(buf);
		patchItem(id, {
			...thumb,
			hasCutout: buf.hasCutout
		});
	}, [patchItem, thumbForBuffer]);
	const refreshAllThumbs = (0, import_react.useCallback)(() => {
		setBatchItems((prev) => prev.map((item) => {
			const buf = buffersRef.current.get(item.id);
			if (!buf) return item;
			const thumb = thumbForBuffer(buf);
			return {
				...item,
				...thumb,
				hasCutout: buf.hasCutout
			};
		}));
	}, [thumbForBuffer]);
	const scheduleThumbRefresh = (0, import_react.useCallback)(() => {
		if (thumbTimerRef.current != null) window.clearTimeout(thumbTimerRef.current);
		thumbTimerRef.current = window.setTimeout(() => {
			thumbTimerRef.current = null;
			refreshAllThumbs();
		}, 70);
	}, [refreshAllThumbs]);
	(0, import_react.useEffect)(() => {
		if (batchItems.length === 0) return;
		scheduleThumbRefresh();
	}, [
		batchItems.length,
		canvasHeight,
		canvasWidth,
		fillColor,
		ignoreCroppedSides,
		offsetX,
		offsetY,
		paddingPct,
		positionMode,
		presetId,
		scheduleThumbRefresh
	]);
	const persistActiveEdits = (0, import_react.useCallback)(() => {
		const id = editingIdRef.current;
		if (!id) return;
		const buf = buffersRef.current.get(id);
		if (!buf || !workingRef.current) return;
		buf.working = workingRef.current;
		if (baseRef.current) buf.base = baseRef.current;
		if (retouchedRef.current) buf.retouched = retouchedRef.current;
		if (maskRef.current) buf.mask = maskRef.current;
		buf.undo = undoRef.current;
		buf.redo = redoRef.current;
		buf.hasCutout = hasCutout;
		buf.brightness = brightness;
		buf.outlineWidth = outlineWidth;
		buf.outlineColor = outlineColor;
		refreshItemThumb(id);
	}, [
		brightness,
		hasCutout,
		outlineColor,
		outlineWidth,
		refreshItemThumb
	]);
	const bumpAndSync = (0, import_react.useCallback)(() => {
		persistActiveEdits();
		bump();
	}, [bump, persistActiveEdits]);
	const loadItemIntoEditor = (0, import_react.useCallback)((id) => {
		const buf = buffersRef.current.get(id);
		if (!buf) return false;
		originalRef.current = buf.original;
		retouchedRef.current = buf.retouched;
		baseRef.current = buf.base;
		workingRef.current = buf.working;
		maskRef.current = buf.mask;
		undoRef.current = buf.undo;
		redoRef.current = buf.redo;
		lastPointRef.current = null;
		setHasCutout(buf.hasCutout);
		setCompareAvailable(buf.hasCutout);
		setShowOriginal(false);
		setBrightness(buf.brightness);
		setOutlineWidth(buf.outlineWidth);
		setOutlineColor(buf.outlineColor);
		setBrushTool("erase");
		setCutoutMode("guide");
		setHasMask(maskCoverage(buf.mask) > 0);
		setCanUndo(buf.undo.length > 0);
		setCanRedo(buf.redo.length > 0);
		setEditingId(id);
		setView("edit");
		setActiveToolState("cutout");
		bump();
		bumpMask();
		return true;
	}, [bump, bumpMask]);
	const addBatchFiles = (0, import_react.useCallback)(async (files) => {
		const images = files.filter((f) => f.type.startsWith("image/"));
		if (images.length === 0) {
			toast.error("Pilih berkas gambar.");
			return;
		}
		setProcessing(true);
		setProgress({
			percent: 4,
			label: "Membuka foto"
		});
		try {
			const next = [];
			for (let i = 0; i < images.length; i++) {
				const file = images[i];
				setProgress({
					percent: Math.round((i + .2) / images.length * 100),
					label: `Membuka ${i + 1}/${images.length}`
				});
				const loaded = await imageFromSource(file);
				const id = uid();
				const working = loaded.data;
				const buf = {
					original: cloneImageData(working),
					retouched: cloneImageData(working),
					base: cloneImageData(working),
					working,
					mask: createMask(working.width, working.height),
					undo: [],
					redo: [],
					hasCutout: false,
					brightness: 0,
					outlineWidth: 0,
					outlineColor: "#ffffff",
					naturalWidth: loaded.naturalWidth,
					naturalHeight: loaded.naturalHeight
				};
				buffersRef.current.set(id, buf);
				const thumb = thumbForBuffer(buf);
				next.push({
					id,
					name: file.name,
					status: "ready",
					hasCutout: false,
					naturalWidth: loaded.naturalWidth,
					naturalHeight: loaded.naturalHeight,
					...thumb
				});
			}
			setBatchItems((prev) => [...prev, ...next]);
			setView("batch");
			if (activeTool !== "template" && activeTool !== "resize" && activeTool !== "position" && activeTool !== "background") setActiveToolState("template");
			toast.success(next.length === 1 ? "Foto ditambahkan." : `${next.length} foto ditambahkan.`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gagal membuka foto.");
		} finally {
			setProcessing(false);
			setProgress(null);
		}
	}, [activeTool, thumbForBuffer]);
	const addFromUrl = (0, import_react.useCallback)(async (src, label) => {
		const res = await fetch(src);
		if (!res.ok) throw new Error("Gagal memuat contoh.");
		const blob = await res.blob();
		const file = new File([blob], `${label}.jpg`, { type: blob.type || "image/jpeg" });
		await addBatchFiles([file]);
	}, [addBatchFiles]);
	const removeBatchItem = (0, import_react.useCallback)((id) => {
		buffersRef.current.delete(id);
		setBatchItems((prev) => {
			const next = prev.filter((item) => item.id !== id);
			if (next.length === 0) {
				setView("home");
				setEditingId(null);
			} else if (editingIdRef.current === id) {
				setEditingId(null);
				setView("batch");
			}
			return next;
		});
		if (editingIdRef.current === id) {
			originalRef.current = null;
			workingRef.current = null;
			baseRef.current = null;
			retouchedRef.current = null;
			maskRef.current = null;
		}
	}, []);
	const clearBatch = (0, import_react.useCallback)(() => {
		buffersRef.current.clear();
		setBatchItems([]);
		setEditingId(null);
		setView("home");
		originalRef.current = null;
		workingRef.current = null;
		baseRef.current = null;
		retouchedRef.current = null;
		maskRef.current = null;
		undoRef.current = [];
		redoRef.current = [];
		setHasCutout(false);
		setHasMask(false);
		bump();
	}, [bump]);
	const clearSession = (0, import_react.useCallback)(() => {
		persistActiveEdits();
		if (view === "edit") {
			setEditingId(null);
			setView("batch");
			setActiveToolState("template");
			return;
		}
		clearBatch();
	}, [
		clearBatch,
		persistActiveEdits,
		view
	]);
	const openEdit = (0, import_react.useCallback)((id) => {
		persistActiveEdits();
		const item = itemsRef.current.find((it) => it.id === id);
		if (item) setFileName(item.name.replace(/\.[^.]+$/, "") || "foto");
		loadItemIntoEditor(id);
	}, [loadItemIntoEditor, persistActiveEdits]);
	const closeEdit = (0, import_react.useCallback)(() => {
		persistActiveEdits();
		setEditingId(null);
		setShowOriginal(false);
		setView("batch");
		setActiveToolState("template");
		if (maskRef.current) {
			clearMask(maskRef.current);
			bumpMask();
		}
	}, [bumpMask, persistActiveEdits]);
	const setActiveTool = (0, import_react.useCallback)((tool) => {
		if (tool !== "retouch" && maskRef.current) {
			clearMask(maskRef.current);
			bumpMask();
		}
		setActiveToolState(tool);
		if (tool === "cutout") setBrushTool("erase");
	}, [bumpMask]);
	const applyPreset = (0, import_react.useCallback)((id) => {
		const preset = findPreset(id);
		setPresetId(id);
		if (preset.width == null) {
			const first = itemsRef.current[0];
			const buf = first ? buffersRef.current.get(first.id) : null;
			if (buf) {
				setCanvasWidth(buf.working.width);
				setCanvasHeight(buf.working.height);
			}
		} else {
			setCanvasWidth(preset.width);
			setCanvasHeight(preset.height ?? preset.width);
		}
		setOffsetX(0);
		setOffsetY(0);
	}, []);
	const setCanvasSize = (0, import_react.useCallback)((nextW, nextH, from) => {
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
	}, [
		canvasHeight,
		canvasWidth,
		lockAspect
	]);
	const pushAlphaUndo = (0, import_react.useCallback)(() => {
		const working = workingRef.current;
		if (!working) return;
		undoRef.current.push({
			kind: "alpha",
			alpha: extractAlpha(working)
		});
		if (undoRef.current.length > MAX_UNDO) undoRef.current.shift();
		redoRef.current = [];
		setCanUndo(true);
		setCanRedo(false);
	}, []);
	const pushPatchUndo = (0, import_react.useCallback)((x, y, w, h) => {
		const working = workingRef.current;
		const base = baseRef.current;
		const retouched = retouchedRef.current;
		if (!working || !base || !retouched) return;
		const pad = 8;
		const px = Math.max(0, x - pad);
		const py = Math.max(0, y - pad);
		const pw = Math.min(working.width - px, w + 16);
		const ph = Math.min(working.height - py, h + 16);
		undoRef.current.push({
			kind: "patch",
			x: px,
			y: py,
			w: pw,
			h: ph,
			working: extractPatch(working, px, py, pw, ph),
			base: extractPatch(base, px, py, pw, ph),
			retouched: extractPatch(retouched, px, py, pw, ph)
		});
		if (undoRef.current.length > MAX_UNDO) undoRef.current.shift();
		redoRef.current = [];
		setCanUndo(true);
		setCanRedo(false);
	}, []);
	const snapshotFull = (0, import_react.useCallback)(() => {
		const working = workingRef.current;
		const base = baseRef.current;
		const retouched = retouchedRef.current;
		if (!working || !base || !retouched) return null;
		return {
			kind: "patch",
			x: 0,
			y: 0,
			w: working.width,
			h: working.height,
			working: cloneImageData(working),
			base: cloneImageData(base),
			retouched: cloneImageData(retouched)
		};
	}, []);
	const applyOp = (0, import_react.useCallback)((op, into) => {
		const working = workingRef.current;
		const base = baseRef.current;
		const retouched = retouchedRef.current;
		if (!working || !base || !retouched) return;
		if (op.kind === "alpha") {
			const current = extractAlpha(working);
			applyAlpha(working, op.alpha);
			const inverse = {
				kind: "alpha",
				alpha: current
			};
			if (into === "undo") redoRef.current.push(inverse);
			else undoRef.current.push(inverse);
		} else {
			const inverse = {
				kind: "patch",
				x: op.x,
				y: op.y,
				w: op.w,
				h: op.h,
				working: extractPatch(working, op.x, op.y, op.w, op.h),
				base: extractPatch(base, op.x, op.y, op.w, op.h),
				retouched: extractPatch(retouched, op.x, op.y, op.w, op.h)
			};
			copyPatch(working, op.working, op.x, op.y, op.w, op.h);
			copyPatch(base, op.base, op.x, op.y, op.w, op.h);
			copyPatch(retouched, op.retouched, op.x, op.y, op.w, op.h);
			if (into === "undo") redoRef.current.push(inverse);
			else undoRef.current.push(inverse);
		}
	}, []);
	const undo = (0, import_react.useCallback)(() => {
		if (view !== "edit") return;
		const op = undoRef.current.pop();
		if (!op) return;
		applyOp(op, "undo");
		bumpAndSync();
	}, [
		applyOp,
		bumpAndSync,
		view
	]);
	const redo = (0, import_react.useCallback)(() => {
		if (view !== "edit") return;
		const op = redoRef.current.pop();
		if (!op) return;
		applyOp(op, "redo");
		bumpAndSync();
	}, [
		applyOp,
		bumpAndSync,
		view
	]);
	const processAllBackgrounds = (0, import_react.useCallback)(async (nextModel) => {
		if (batchBusyRef.current) return;
		const ids = itemsRef.current.map((item) => item.id);
		if (ids.length === 0) {
			toast.error("Tambah foto dulu.");
			return;
		}
		persistActiveEdits();
		batchBusyRef.current = true;
		setModel(nextModel);
		setProcessing(true);
		setBgDialogOpen(false);
		try {
			for (let i = 0; i < ids.length; i++) {
				const id = ids[i];
				patchItem(id, {
					status: "processing",
					error: void 0
				});
				setProgress({
					percent: Math.round(i / ids.length * 100),
					label: `Batch ${i + 1}/${ids.length}`
				});
				try {
					const buf = buffersRef.current.get(id);
					if (!buf) continue;
					const cutout = await removeImageBackground(buf.retouched, nextModel, (percent, label) => {
						const overall = Math.round((i + percent / 100) / ids.length * 100);
						setProgress({
							percent: overall,
							label: `${label} · ${i + 1}/${ids.length}`
						});
					});
					buf.working = cutout;
					buf.base = cloneImageData(cutout);
					buf.hasCutout = true;
					buf.undo = [];
					buf.redo = [];
					if (editingIdRef.current === id) {
						workingRef.current = cutout;
						baseRef.current = buf.base;
						undoRef.current = [];
						redoRef.current = [];
						setHasCutout(true);
						setCompareAvailable(true);
						setCanUndo(false);
						setCanRedo(false);
					}
					const thumb = thumbForBuffer(buf);
					patchItem(id, {
						status: "done",
						hasCutout: true,
						...thumb
					});
				} catch (error) {
					const message = error instanceof Error ? error.message : "Gagal memproses.";
					patchItem(id, {
						status: "error",
						error: message
					});
				}
			}
			bump();
			toast.success("Background dihapus. Batch sudah diperbarui.");
		} finally {
			batchBusyRef.current = false;
			setProcessing(false);
			setProgress(null);
		}
	}, [
		bump,
		patchItem,
		persistActiveEdits,
		thumbForBuffer
	]);
	const paintAt = (0, import_react.useCallback)((x, y) => {
		const working = workingRef.current;
		const base = baseRef.current;
		const mask = maskRef.current;
		if (!working) return;
		if (activeTool === "retouch" && mask) {
			paintMask(mask, working.width, working.height, x, y, brushSize / 2, brushHardness, 255);
			return;
		}
		if (activeTool === "cutout" && cutoutMode === "guide" && mask) {
			paintMask(mask, working.width, working.height, x, y, brushSize / 2, .9, 255);
			return;
		}
		if (!base) return;
		paintBrush(working, base, x, y, brushSize / 2, brushHardness, brushTool);
	}, [
		activeTool,
		brushHardness,
		brushSize,
		brushTool,
		cutoutMode
	]);
	const isPaintTool = view === "edit" && (activeTool === "retouch" || activeTool === "cutout");
	const isPanTool = view === "edit" && activeTool === "position" && positionMode === "custom";
	const beginStroke = (0, import_react.useCallback)((canvasX, canvasY) => {
		if (!workingRef.current || processing || view !== "edit") return;
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
				oy: offsetY
			};
			return;
		}
		if (activeTool !== "retouch" && activeTool !== "cutout") return;
		if (activeTool === "cutout" && !hasCutout) return;
		paintingRef.current = true;
		if (activeTool === "cutout" && cutoutMode === "manual") pushAlphaUndo();
		paintAt(src.x, src.y);
		lastPointRef.current = src;
		if (activeTool === "retouch" || activeTool === "cutout" && cutoutMode === "guide") bumpMask();
		else bump();
	}, [
		activeTool,
		bump,
		bumpMask,
		cutoutMode,
		getLayout,
		hasCutout,
		isPanTool,
		offsetX,
		offsetY,
		paintAt,
		processing,
		pushAlphaUndo,
		view
	]);
	const moveStroke = (0, import_react.useCallback)((canvasX, canvasY) => {
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
		const step = Math.max(1, brushSize * .22);
		const steps = Math.max(1, Math.ceil(dist / step));
		for (let i = 1; i <= steps; i++) {
			const t = i / steps;
			paintAt(last.x + dx * t, last.y + dy * t);
		}
		lastPointRef.current = src;
		if (activeTool === "retouch" || activeTool === "cutout" && cutoutMode === "guide") bumpMask();
		else bumpSoon();
	}, [
		activeTool,
		brushSize,
		bumpMask,
		bumpSoon,
		cutoutMode,
		getLayout,
		paintAt
	]);
	const applyGuidedCutout = (0, import_react.useCallback)(() => {
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
		bumpAndSync();
	}, [
		bumpAndSync,
		bumpMask,
		guideTolerance,
		hasCutout,
		pushAlphaUndo
	]);
	const endStroke = (0, import_react.useCallback)(() => {
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
		if (wasPainting || wasPanning) bumpAndSync();
	}, [
		activeTool,
		applyGuidedCutout,
		bumpAndSync,
		cutoutMode
	]);
	const clearRetouchMask = (0, import_react.useCallback)(() => {
		if (!maskRef.current) return;
		clearMask(maskRef.current);
		bumpMask();
	}, [bumpMask]);
	const applyRetouch = (0, import_react.useCallback)(async () => {
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
		setProgress({
			percent: 6,
			label: "Menghapus objek"
		});
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
				setProgress({
					percent: Math.max(6, percent),
					label: "Mengisi area"
				});
			});
			retouchedRef.current = filled;
			copyRgbKeepAlpha(working, filled);
			copyRgbKeepAlpha(base, filled);
			const id = editingIdRef.current;
			if (id) {
				const buf = buffersRef.current.get(id);
				if (buf) buf.retouched = filled;
			}
			clearMask(mask);
			bumpMask();
			bumpAndSync();
			toast.success("Objek dihapus.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gagal meretouch foto.");
		} finally {
			setProcessing(false);
			setProgress(null);
		}
	}, [
		bumpAndSync,
		bumpMask,
		processing,
		pushPatchUndo,
		snapshotFull
	]);
	const getPreview = (0, import_react.useCallback)((live = false) => {
		if (showOriginal) return originalRef.current;
		const working = workingRef.current;
		if (!working) return null;
		return composeOutput(working, live);
	}, [composeOutput, showOriginal]);
	const getMaskOverlay = (0, import_react.useCallback)(() => {
		const mask = maskRef.current;
		const working = workingRef.current;
		if (!mask || !working || !hasMask) return null;
		return redOverlayFromMask(mask, working.width, working.height);
	}, [hasMask]);
	const exportCurrent = (0, import_react.useCallback)(async () => {
		persistActiveEdits();
		const targets = view === "edit" && editingIdRef.current ? itemsRef.current.filter((item) => item.id === editingIdRef.current) : itemsRef.current;
		if (targets.length === 0) {
			toast.error("Tidak ada foto untuk diunduh.");
			return;
		}
		const used = /* @__PURE__ */ new Map();
		if (targets.length === 1) {
			const item = targets[0];
			const buf = buffersRef.current.get(item.id);
			if (!buf) return;
			downloadBlob(await imageDataToJpegBlob(composeFrom(buf.working, buf.outlineWidth, buf.outlineColor, buf.brightness, false)), uniqueFileName(toJpgFileName(item.name), used));
			toast.success("JPG disimpan.");
			return;
		}
		const files = [];
		for (const item of targets) {
			const buf = buffersRef.current.get(item.id);
			if (!buf) continue;
			const blob = await imageDataToJpegBlob(composeFrom(buf.working, buf.outlineWidth, buf.outlineColor, buf.brightness, false));
			files.push({
				name: uniqueFileName(toJpgFileName(item.name), used),
				data: new Uint8Array(await blob.arrayBuffer())
			});
		}
		if (files.length === 0) return;
		downloadBlob(makeZip(files), "klaro-batch.zip");
		toast.success("ZIP JPG disimpan.");
	}, [
		composeFrom,
		persistActiveEdits,
		view
	]);
	const setItemOutlineWidth = (0, import_react.useCallback)((value) => {
		setOutlineWidth(value);
		const id = editingIdRef.current;
		if (!id) return;
		const buf = buffersRef.current.get(id);
		if (buf) buf.outlineWidth = value;
	}, []);
	const setItemOutlineColor = (0, import_react.useCallback)((value) => {
		setOutlineColor(value);
		const id = editingIdRef.current;
		if (!id) return;
		const buf = buffersRef.current.get(id);
		if (buf) buf.outlineColor = value;
	}, []);
	const setItemBrightness = (0, import_react.useCallback)((value) => {
		setBrightness(value);
		const id = editingIdRef.current;
		if (!id) return;
		const buf = buffersRef.current.get(id);
		if (buf) buf.brightness = value;
	}, []);
	(0, import_react.useEffect)(() => {
		if (view !== "edit" || !editingId) return;
		const t = window.setTimeout(() => refreshItemThumb(editingId), 50);
		return () => window.clearTimeout(t);
	}, [
		brightness,
		editingId,
		outlineColor,
		outlineWidth,
		refreshItemThumb,
		view
	]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
				event.preventDefault();
				if (event.shiftKey) redo();
				else undo();
			}
			if (event.key === "Escape" && view === "edit") {
				event.preventDefault();
				closeEdit();
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
	}, [
		closeEdit,
		isPanTool,
		redo,
		undo,
		view
	]);
	const sourceSize = workingRef.current ? {
		width: workingRef.current.width,
		height: workingRef.current.height
	} : null;
	const outputSize = sourceSize ? {
		width: presetId === "original" ? sourceSize.width : canvasWidth,
		height: presetId === "original" ? sourceSize.height : canvasHeight
	} : null;
	return {
		fileName,
		revision,
		maskRevision,
		hasImage: batchItems.length > 0,
		hasCutout,
		processing,
		progress,
		view,
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
		setBrightness: setItemBrightness,
		outlineWidth,
		setOutlineWidth: setItemOutlineWidth,
		outlineColor,
		setOutlineColor: setItemOutlineColor,
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
		setPositionMode: (mode) => {
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
		editingId,
		bgDialogOpen,
		setBgDialogOpen,
		addBatchFiles,
		addFromUrl,
		removeBatchItem,
		clearBatch,
		openEdit,
		closeEdit,
		processAllBackgrounds,
		loadFromSource: addFromUrl,
		clearSession,
		beginStroke,
		moveStroke,
		endStroke,
		undo,
		redo,
		getPreview,
		getMaskOverlay,
		getLayout,
		exportPng: exportCurrent,
		exportCurrent,
		resetAdjustments: () => {
			setBrightness(0);
			setOutlineWidth(0);
			setOutlineColor("#ffffff");
		},
		applyRetouch,
		clearRetouchMask,
		isPanTool,
		isPaintTool,
		imageSize: outputSize,
		sourceSize
	};
}
function TooltipProvider({ delayDuration = 400, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function TooltipContent({ className, sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 rounded-[var(--radius-sm)] bg-accent px-2.5 py-1.5 text-xs text-accent-fg shadow-[var(--shadow-border)]", "origin-[var(--radix-tooltip-content-transform-origin)]", "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
		...props
	}) });
}
function Tip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: label })] });
}
function statusHint(session) {
	if (session.view === "batch") return "Klik foto untuk edit atau hapus. Hapus BG memproses semua gambar.";
	if (session.activeTool === "retouch") return session.hasMask ? "Sapuan siap. Tekan Hapus objek." : "Sapu objek atau watermark, lalu terapkan.";
	if (session.activeTool === "cutout") {
		if (!session.hasCutout) return "Hapus background dulu untuk memotong cutout.";
		return session.cutoutMode === "guide" ? "Gambar garis pada bagian cutout yang ingin dibuang." : "Hapus atau pulihkan tepi secara manual.";
	}
	if (session.activeTool === "outline") return "Atur ukuran dan warna outline. Batch akan mengikuti hasil ini.";
	if (session.activeTool === "position") return session.positionMode === "custom" ? "Seret subjek, atur padding, atau kunci ke tengah." : "Asli menjaga letak foto. Tengah menempatkan subjek di kanvas.";
	if (session.activeTool === "resize" || session.activeTool === "template") return "Ukuran ini diterapkan ke semua foto di batch.";
	return "Pilih tool di kiri untuk mengatur batch.";
}
function PhotoEditor() {
	const session = usePhotoSession();
	const fileRef = (0, import_react.useRef)(null);
	async function handleFiles(list) {
		const files = list ? [...list] : [];
		const images = files.filter((f) => f.type.startsWith("image/"));
		if (images.length === 0) {
			if (files.length > 0) toast.error("Pilih berkas gambar.");
			return;
		}
		await session.addBatchFiles(images);
	}
	async function handleSample(src, label) {
		try {
			await session.addFromUrl(src, label);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gagal memuat contoh.");
		}
	}
	function openPicker() {
		fileRef.current?.click();
	}
	function onHome() {
		if (session.view === "edit") session.closeEdit();
	}
	const showStudio = session.hasImage;
	const showPanel = showStudio;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col bg-bg text-fg",
		onDragOver: (e) => {
			e.preventDefault();
		},
		onDrop: (e) => {
			e.preventDefault();
			handleFiles(e.dataTransfer.files);
		},
		onPaste: (e) => {
			const files = [...e.clipboardData.files].filter((f) => f.type.startsWith("image/"));
			if (files.length) handleFiles(files);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/jpg",
				multiple: true,
				className: "sr-only",
				"aria-hidden": "true",
				tabIndex: -1,
				suppressHydrationWarning: true,
				onChange: (e) => {
					handleFiles(e.target.files);
					e.currentTarget.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:h-14 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
							label: "Beranda",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: onHome,
								"aria-label": "Beranda",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 hidden h-5 w-px bg-border sm:block" }),
						showStudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: "Undo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									disabled: !session.canUndo || session.processing,
									onClick: session.undo,
									"aria-label": "Undo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: "Redo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									disabled: !session.canRedo || session.processing,
									onClick: session.redo,
									"aria-label": "Redo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, {})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 hidden h-5 w-px bg-border sm:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: openPicker,
								disabled: session.processing,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Tambah gambar"
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tracking-[-0.02em]",
							children: "Klaro"
						})
					]
				}), showStudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => void session.exportCurrent(),
					disabled: session.processing,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Unduh gambar"]
				}) : null]
			}),
			!showStudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStudio, {
				onPickFile: openPicker,
				onSample: handleSample
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolRail, {
						session,
						view: session.view,
						onRemoveBg: () => session.setBgDialogOpen(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-0 min-w-0 flex-1 flex-col",
						children: session.view === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-0 flex-1 flex-col gap-2 p-3 sm:p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, { session }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden text-sm text-muted sm:block",
									children: statusHint(session)
								}), session.compareAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 rounded-[var(--radius-sm)] bg-surface-2 px-3 text-sm font-medium",
									onPointerDown: () => session.setShowOriginal(true),
									onPointerUp: () => session.setShowOriginal(false),
									onPointerLeave: () => session.setShowOriginal(false),
									children: "Tahan untuk asli"
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchGrid, { session })
					}),
					showPanel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "min-h-0 max-h-[42vh] shrink-0 overflow-y-auto border-t border-border bg-surface px-4 py-4 lg:max-h-none lg:w-[20.5rem] lg:border-t-0 lg:border-l lg:px-5 lg:py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioPanel, {
							session,
							onRemoveBg: () => session.setBgDialogOpen(true)
						})
					}) : null
				]
			}),
			session.processing && session.progress && session.view !== "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-30 flex items-end bg-bg/40 p-4 sm:items-center sm:justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto w-full max-w-sm rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold text-fg",
							children: session.progress.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Model lokal dari folder model, tanpa unduhan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-1 overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
								style: { width: `${session.progress.percent}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm tabular-nums text-subtle",
							children: [session.progress.percent, "%"]
						})
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelDialog, {
				open: session.bgDialogOpen,
				selected: session.model,
				busy: session.processing,
				onClose: () => session.setBgDialogOpen(false),
				onSelect: (model) => void session.processAllBackgrounds(model)
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoEditor, {});
}
//#endregion
export { Home as component };
