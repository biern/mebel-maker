import { boundsFor, displayOrderedBoards, effectiveDepth, mm } from "./geometry";
import type { Board, Material, Point, SketchState } from "./types";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint extends Point {
  depth: number;
}

interface Face {
  board: Board;
  name: "front" | "back" | "left" | "right" | "top" | "bottom";
  points: Point3D[];
  fill: string;
  alpha: number;
}

interface CameraDrag {
  startX: number;
  startY: number;
  yaw: number;
  pitch: number;
}

const selectedStroke = "#1f6659";
const normalStroke = "rgba(32, 37, 34, 0.26)";

export class Visualization3DRenderer {
  private readonly ctx: CanvasRenderingContext2D;
  private yaw = -0.72;
  private pitch = 0.56;
  private zoom = 1;
  private drag: CameraDrag | null = null;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly state: SketchState) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("3D canvas rendering is not available.");
    this.ctx = context;
  }

  bindInteractions(options: AddEventListenerOptions): void {
    this.canvas.addEventListener("pointerdown", (event) => {
      this.drag = {
        startX: event.clientX,
        startY: event.clientY,
        yaw: this.yaw,
        pitch: this.pitch
      };
      this.canvas.setPointerCapture(event.pointerId);
      this.canvas.style.cursor = "grabbing";
    }, options);

    this.canvas.addEventListener("pointermove", (event) => {
      if (!this.drag) return;
      this.yaw = this.drag.yaw + (event.clientX - this.drag.startX) * 0.008;
      this.pitch = Math.max(0.18, Math.min(1.14, this.drag.pitch + (event.clientY - this.drag.startY) * 0.006));
      this.draw();
    }, options);

    this.canvas.addEventListener("pointerup", (event) => {
      this.drag = null;
      if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
      this.canvas.style.cursor = "grab";
    }, options);

    this.canvas.addEventListener("pointerleave", () => {
      if (!this.drag) this.canvas.style.cursor = "grab";
    }, options);

    this.canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      this.zoom = Math.max(0.45, Math.min(2.1, this.zoom * (event.deltaY > 0 ? 0.92 : 1.08)));
      this.draw();
    }, { ...options, passive: false });
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  draw(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    this.ctx.fillStyle = "#fbfcf8";
    this.ctx.fillRect(0, 0, rect.width, rect.height);

    const bounds = boundsFor(this.state.boards);
    if (!bounds) {
      this.ctx.fillStyle = "#69736d";
      this.ctx.font = "13px system-ui";
      this.ctx.fillText("No boards in the sketch.", 18, 28);
      return;
    }

    const maxDepth = Math.max(this.state.depth, ...this.state.boards.map((board) => effectiveDepth(board, this.state.depth)));
    const scale = this.viewScale(rect.width, rect.height, bounds.w, bounds.h, maxDepth);
    const center = { x: rect.width / 2, y: rect.height / 2 + 10 };
    this.drawGround(center, scale, bounds.w, maxDepth);

    const faces = displayOrderedBoards(this.state.boards)
      .flatMap((board) => this.facesForBoard(board, bounds.left + bounds.w / 2, bounds.top + bounds.h / 2, maxDepth));

    faces
      .map((face) => {
        const points = face.points.map((point) => this.project(point, center, scale));
        const depth = points.reduce((total, point) => total + point.depth, 0) / points.length;
        return { ...face, screenPoints: points, depth };
      })
      .sort((a, b) => a.depth - b.depth)
      .forEach((face) => this.drawFace(face));

    this.drawLabels(center, scale, bounds.left + bounds.w / 2, bounds.top + bounds.h / 2, maxDepth);
  }

  private viewScale(width: number, height: number, modelW: number, modelH: number, modelD: number): number {
    const span = Math.max(modelW + modelD * 0.7, modelH + modelD * 0.42, 1);
    return Math.max(0.08, Math.min(width / span, height / span) * 1.38 * this.zoom);
  }

  private facesForBoard(board: Board, centerX: number, centerY: number, maxDepth: number): Face[] {
    const material = this.materialFor(board);
    const depth = effectiveDepth(board, this.state.depth);
    const overlayThickness = Math.max(4, Math.min(this.state.thickness, depth, maxDepth * 0.08));
    const z = this.zRangeForBoard(board, depth, overlayThickness);
    const x0 = board.x - centerX;
    const x1 = board.x + board.w - centerX;
    const y0 = centerY - (board.y + board.h);
    const y1 = centerY - board.y;
    const z0 = z.front - maxDepth / 2;
    const z1 = z.back - maxDepth / 2;
    const alpha = board.kind === "front" && !this.state.showFrontPanels ? 0.18 : board.kind === "front" ? 0.68 : 1;
    const colors = this.faceColors(material.color);

    return [
      { board, name: "back", points: [{ x: x0, y: y0, z: z1 }, { x: x1, y: y0, z: z1 }, { x: x1, y: y1, z: z1 }, { x: x0, y: y1, z: z1 }], fill: colors.back, alpha },
      { board, name: "left", points: [{ x: x0, y: y0, z: z0 }, { x: x0, y: y0, z: z1 }, { x: x0, y: y1, z: z1 }, { x: x0, y: y1, z: z0 }], fill: colors.left, alpha },
      { board, name: "right", points: [{ x: x1, y: y0, z: z0 }, { x: x1, y: y0, z: z1 }, { x: x1, y: y1, z: z1 }, { x: x1, y: y1, z: z0 }], fill: colors.right, alpha },
      { board, name: "bottom", points: [{ x: x0, y: y0, z: z0 }, { x: x1, y: y0, z: z0 }, { x: x1, y: y0, z: z1 }, { x: x0, y: y0, z: z1 }], fill: colors.bottom, alpha },
      { board, name: "top", points: [{ x: x0, y: y1, z: z0 }, { x: x1, y: y1, z: z0 }, { x: x1, y: y1, z: z1 }, { x: x0, y: y1, z: z1 }], fill: colors.top, alpha },
      { board, name: "front", points: [{ x: x0, y: y0, z: z0 }, { x: x1, y: y0, z: z0 }, { x: x1, y: y1, z: z0 }, { x: x0, y: y1, z: z0 }], fill: colors.front, alpha }
    ];
  }

  private zRangeForBoard(board: Board, depth: number, overlayThickness: number): { front: number; back: number } {
    if (board.kind === "front") return { front: -overlayThickness, back: 0 };
    if (board.kind === "back") return { front: Math.max(0, depth - overlayThickness), back: depth };
    return { front: 0, back: depth };
  }

  private drawFace(face: Face & { screenPoints: ProjectedPoint[] }): void {
    const selected = this.state.selectedIds.includes(face.board.id) || this.state.selectedId === face.board.id;

    this.ctx.save();
    this.ctx.globalAlpha = face.alpha;
    this.ctx.beginPath();
    face.screenPoints.forEach((point, index) => {
      if (index === 0) this.ctx.moveTo(point.x, point.y);
      else this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.closePath();
    this.ctx.fillStyle = face.fill;
    this.ctx.strokeStyle = selected ? selectedStroke : normalStroke;
    this.ctx.lineWidth = selected ? 1.8 : 1;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawLabels(center: Point, scale: number, centerX: number, centerY: number, maxDepth: number): void {
    const selectedIds = new Set(this.state.selectedIds);
    if (this.state.selectedId !== null) selectedIds.add(this.state.selectedId);

    this.ctx.save();
    this.ctx.font = "12px system-ui";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    displayOrderedBoards(this.state.boards).forEach((board) => {
      const depth = effectiveDepth(board, this.state.depth);
      const isSelected = selectedIds.has(board.id);
      const visibleLabel = isSelected || board.w * scale > 42 || board.h * scale > 42;
      if (!visibleLabel) return;
      const z = board.kind === "front" ? -Math.min(this.state.thickness, depth) : board.kind === "back" ? depth : depth * 0.5;
      const point = this.project({
        x: board.x + board.w / 2 - centerX,
        y: centerY - (board.y + board.h / 2),
        z: z - maxDepth / 2
      }, center, scale);

      const label = isSelected ? `${board.name} ${mm(depth)}` : board.name;
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
      const metrics = this.ctx.measureText(label);
      this.ctx.fillRect(point.x - metrics.width / 2 - 5, point.y - 9, metrics.width + 10, 18);
      this.ctx.fillStyle = isSelected ? selectedStroke : "#27302b";
      this.ctx.fillText(label, point.x, point.y);
    });

    this.ctx.restore();
  }

  private drawGround(center: Point, scale: number, width: number, depth: number): void {
    const halfW = Math.max(width / 2, 300);
    const halfD = Math.max(depth / 2, 240);
    const y = -18;
    const corners = [
      this.project({ x: -halfW, y, z: -halfD }, center, scale),
      this.project({ x: halfW, y, z: -halfD }, center, scale),
      this.project({ x: halfW, y, z: halfD }, center, scale),
      this.project({ x: -halfW, y, z: halfD }, center, scale)
    ];

    this.ctx.save();
    this.ctx.fillStyle = "rgba(231, 238, 232, 0.52)";
    this.ctx.strokeStyle = "rgba(31, 102, 89, 0.18)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    corners.forEach((point, index) => {
      if (index === 0) this.ctx.moveTo(point.x, point.y);
      else this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  private project(point: Point3D, center: Point, scale: number): ProjectedPoint {
    const yawCos = Math.cos(this.yaw);
    const yawSin = Math.sin(this.yaw);
    const pitchCos = Math.cos(this.pitch);
    const pitchSin = Math.sin(this.pitch);

    const x = point.x * yawCos - point.z * yawSin;
    const z = point.x * yawSin + point.z * yawCos;
    const y = point.y * pitchCos - z * pitchSin;
    const depth = point.y * pitchSin + z * pitchCos;

    return {
      x: center.x + x * scale,
      y: center.y - y * scale,
      depth
    };
  }

  private materialFor(board: Board): Material {
    return this.state.materials.find((material) => material.id === board.materialId) ?? this.state.materials[0];
  }

  private faceColors(color: string): Record<Face["name"], string> {
    return {
      front: this.shade(color, 1.04),
      back: this.shade(color, 0.74),
      left: this.shade(color, 0.78),
      right: this.shade(color, 0.88),
      top: this.shade(color, 1.15),
      bottom: this.shade(color, 0.65)
    };
  }

  private shade(color: string, factor: number): string {
    const match = /^#([0-9a-f]{6})$/i.exec(color);
    if (!match) return color;
    const value = match[1];
    const channels = [value.slice(0, 2), value.slice(2, 4), value.slice(4, 6)]
      .map((channel) => Math.max(0, Math.min(255, Math.round(parseInt(channel, 16) * factor))));
    return `rgb(${channels.join(", ")})`;
  }
}
