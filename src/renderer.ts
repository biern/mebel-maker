import {
  boundsFor,
  computeOverlaps,
  displayOrderedBoards,
  groupBoards,
  innerDimensions,
  mm,
  resizeHandlesForBoard,
  resolveMeasurementAnchor,
  selectedBoard,
  worldToScreen
} from "./geometry";
import type { Board, Material, SketchState } from "./types";

const colors = ["#5c8d89", "#d19041", "#725d9f", "#538052", "#bb5d50", "#3f75a3"];

export class SketchRenderer {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly state: SketchState) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas rendering is not available.");
    this.ctx = context;
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
    this.drawGrid(rect.width, rect.height);
    displayOrderedBoards(this.state.boards).forEach((board) => this.drawBoard(board));
    this.drawOverlaps();
    this.drawSnapGuides(rect.width, rect.height);
    this.drawMeasurements();
    this.drawDimensions();
    this.drawResizeHandles();
  }

  private drawGrid(width: number, height: number): void {
    const gridPx = this.scaledGridPx();
    this.ctx.save();
    this.ctx.strokeStyle = "#e1e8e2";
    this.ctx.lineWidth = 1;
    const origin = worldToScreen(this.state, this.state.gridOriginX, this.state.gridOriginY);
    const startX = ((origin.x % gridPx) + gridPx) % gridPx;
    const startY = ((origin.y % gridPx) + gridPx) % gridPx;
    for (let x = startX; x < width; x += gridPx) this.line(x, 0, x, height);
    for (let y = startY; y < height; y += gridPx) this.line(0, y, width, y);
    this.ctx.restore();
  }

  private scaledGridPx(): number {
    const baseGridPx = this.state.grid * this.state.scale;
    const minimumGridPx = 12;
    if (baseGridPx >= minimumGridPx) return baseGridPx;

    const multiplier = this.niceGridMultiplier(minimumGridPx / Math.max(0.1, baseGridPx));
    return baseGridPx * multiplier;
  }

  private niceGridMultiplier(target: number): number {
    const exponent = Math.floor(Math.log10(target));
    const base = 10 ** exponent;
    const fraction = target / base;
    if (fraction <= 2) return 2 * base;
    if (fraction <= 5) return 5 * base;
    return 10 * base;
  }

  private drawBoard(board: Board): void {
    const point = worldToScreen(this.state, board.x, board.y);
    const w = board.w * this.state.scale;
    const h = board.h * this.state.scale;
    const selected = board.id === this.state.selectedId;
    const resizing = board.id === this.state.resizing?.id;
    const groupColor = colors[(board.group - 1) % colors.length] ?? colors[0];
    const material = this.materialFor(board);
    const opacity = this.boardOpacity(board, selected || resizing);

    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = board.kind === "back" ? this.withAlpha(material.color, 0.36) : material.color;
    this.ctx.strokeStyle = selected ? "#1f6659" : groupColor;
    this.ctx.lineWidth = board.kind === "back" ? 1.5 : selected ? 3 : 2;
    this.ctx.fillRect(point.x, point.y, w, h);
    this.ctx.strokeRect(point.x, point.y, w, h);
    this.drawLaminateEdges(board, point.x, point.y, w, h);

    this.ctx.strokeStyle = "rgba(99, 72, 37, 0.28)";
    this.ctx.lineWidth = 1;
    const grainGap = Math.max(10, 28 * this.state.scale);
    if (board.w >= board.h) {
      for (let y = point.y + grainGap; y < point.y + h; y += grainGap) this.line(point.x + 4, y, point.x + w - 4, y);
    } else {
      for (let x = point.x + grainGap; x < point.x + w; x += grainGap) this.line(x, point.y + 4, x, point.y + h - 4);
    }

    this.ctx.fillStyle = "#27302b";
    this.ctx.font = "12px system-ui";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(board.name, point.x + 7, point.y + 6);
    this.ctx.restore();
  }

  private boardOpacity(board: Board, active: boolean): number {
    if (board.kind !== "front") return 1;
    if (active) return 0.5;
    return this.state.showFrontPanels ? 1 : 0.3;
  }

  private materialFor(board: Board): Material {
    return this.state.materials.find((material) => material.id === board.materialId) ?? this.state.materials[0];
  }

  private withAlpha(color: string, alpha: number): string {
    const match = /^#([0-9a-f]{6})$/i.exec(color);
    if (!match) return color;
    const value = match[1];
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private drawLaminateEdges(board: Board, x: number, y: number, w: number, h: number): void {
    const edges: Array<[boolean, number, number, number, number]> = [
      [board.laminate.left, x, y, x, y + h],
      [board.laminate.right, x + w, y, x + w, y + h],
      [board.laminate.front, x, y + h, x + w, y + h],
      [board.laminate.back, x, y, x + w, y]
    ];
    if (!edges.some(([enabled]) => enabled)) return;

    this.ctx.save();
    this.ctx.strokeStyle = "#d58b28";
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = Math.max(3, 5 * this.state.scale);
    edges.forEach(([enabled, x1, y1, x2, y2]) => {
      if (enabled) this.line(x1, y1, x2, y2);
    });
    this.ctx.restore();
  }

  private drawOverlaps(): void {
    const overlaps = computeOverlaps(this.state.boards);
    if (!overlaps.length) return;

    this.ctx.save();
    overlaps.forEach((overlap) => {
      const point = worldToScreen(this.state, overlap.x, overlap.y);
      const w = overlap.w * this.state.scale;
      const h = overlap.h * this.state.scale;
      this.ctx.fillStyle = "rgba(184, 72, 59, 0.22)";
      this.ctx.fillRect(point.x, point.y, w, h);
      this.ctx.strokeStyle = "rgba(184, 72, 59, 0.9)";
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeRect(point.x, point.y, w, h);
      this.ctx.beginPath();
      for (let x = point.x - h; x < point.x + w + h; x += 8) {
        this.ctx.moveTo(x, point.y + h);
        this.ctx.lineTo(x + h, point.y);
      }
      this.ctx.stroke();
    });
    this.ctx.restore();
  }

  private drawSnapGuides(width: number, height: number): void {
    if (!this.state.snapGuides.length) return;
    this.ctx.save();
    this.ctx.strokeStyle = "#2398b6";
    this.ctx.fillStyle = "#1b728a";
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([6, 5]);
    this.ctx.font = "12px system-ui";
    this.state.snapGuides.forEach((guide) => {
      if (guide.orientation === "vertical") {
        const point = worldToScreen(this.state, guide.position, 0);
        this.line(point.x, 0, point.x, height);
        this.drawGuideLabel(guide.label, point.x + 8, height - 18, width, height);
      } else {
        const point = worldToScreen(this.state, 0, guide.position);
        this.line(0, point.y, width, point.y);
        this.drawGuideLabel(guide.label, width - 12, point.y - 8, width, height, "right");
      }
    });
    this.ctx.restore();
  }

  private drawMeasurements(): void {
    this.state.measurements.forEach((measurement, index) => {
      const a = resolveMeasurementAnchor(this.state, measurement.a);
      const b = resolveMeasurementAnchor(this.state, measurement.b);
      if (!a || !b) return;
      const offset = 46 + index * 14;
      if (measurement.axis === "horizontal") {
        const y = Math.min(a.y, b.y) - offset;
        this.drawDimensionLine(a.x, y, b.x, y, this.measurementLabel(measurement.name, mm(Math.abs(b.x - a.x))), 0, "#4152a3");
        this.drawExtension(a.x, a.y, a.x, y, "#4152a3");
        this.drawExtension(b.x, b.y, b.x, y, "#4152a3");
      } else {
        const x = Math.max(a.x, b.x) + offset;
        this.drawDimensionLine(x, a.y, x, b.y, this.measurementLabel(measurement.name, mm(Math.abs(b.y - a.y))), 0, "#4152a3");
        this.drawExtension(a.x, a.y, x, a.y, "#4152a3");
        this.drawExtension(b.x, b.y, x, b.y, "#4152a3");
      }
      this.drawAnchorDot(a.x, a.y);
      this.drawAnchorDot(b.x, b.y);
    });

    if (this.state.pendingMeasurementAnchor) {
      const anchor = resolveMeasurementAnchor(this.state, this.state.pendingMeasurementAnchor);
      if (anchor) this.drawAnchorDot(anchor.x, anchor.y, "#4152a3");
    }
  }

  private measurementLabel(name: string, value: string): string {
    const trimmed = name.trim();
    return trimmed ? `${trimmed} ${value}` : value;
  }

  private drawDimensions(): void {
    if (!this.state.showDimensions) return;
    const selected = selectedBoard(this.state);
    const boards = selected ? groupBoards(this.state, selected.group) : this.state.boards;
    const bounds = boundsFor(boards);
    if (!bounds) return;

    this.drawDimensionLine(bounds.left, bounds.top, bounds.right, bounds.top, `Outer ${mm(bounds.w)}`, -28, "#255e55");
    this.drawDimensionLine(bounds.right, bounds.top, bounds.right, bounds.bottom, `Outer ${mm(bounds.h)}`, 30, "#255e55");

    const inner = innerDimensions(boards, this.state.thickness);
    if (inner?.hasFrame) {
      this.drawDimensionLine(bounds.left + this.state.thickness, bounds.bottom, bounds.right - this.state.thickness, bounds.bottom, `Inner ${mm(inner.innerW)}`, 28, "#a45f1b");
      this.drawDimensionLine(bounds.left, bounds.top + this.state.thickness, bounds.left, bounds.bottom - this.state.thickness, `Inner ${mm(inner.innerH)}`, -30, "#a45f1b");
    }

    if (selected) {
      this.drawDimensionLine(selected.x, selected.y + selected.h, selected.x + selected.w, selected.y + selected.h, mm(selected.w), 18, "#6e4d83");
      this.drawDimensionLine(selected.x + selected.w, selected.y, selected.x + selected.w, selected.y + selected.h, mm(selected.h), 18, "#6e4d83");
    }
  }

  private drawResizeHandles(): void {
    const selected = selectedBoard(this.state);
    if (!selected) return;
    const point = worldToScreen(this.state, selected.x, selected.y);
    const w = selected.w * this.state.scale;
    const h = selected.h * this.state.scale;
    const handlePoints: Record<string, [number, number]> = {
      nw: [point.x, point.y],
      n: [point.x + w / 2, point.y],
      ne: [point.x + w, point.y],
      w: [point.x, point.y + h / 2],
      e: [point.x + w, point.y + h / 2],
      sw: [point.x, point.y + h],
      s: [point.x + w / 2, point.y + h],
      se: [point.x + w, point.y + h]
    };
    const handles = resizeHandlesForBoard(selected).map((handle) => handlePoints[handle]);

    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = "#1f6659";
    this.ctx.lineWidth = 1.5;
    const handleSize = 10;
    const handleOffset = handleSize / 2;
    handles.forEach(([x, y]) => {
      this.ctx.fillRect(x - handleOffset, y - handleOffset, handleSize, handleSize);
      this.ctx.strokeRect(x - handleOffset, y - handleOffset, handleSize, handleSize);
    });
    this.ctx.restore();
  }

  private drawGuideLabel(
    label: string,
    x: number,
    y: number,
    width: number,
    height: number,
    align: CanvasTextAlign = "left"
  ): void {
    const metrics = this.ctx.measureText(label);
    const labelWidth = metrics.width;
    const padding = 10;
    const textX = align === "right"
      ? Math.max(padding + labelWidth, Math.min(width - padding, x))
      : Math.max(padding, Math.min(width - padding - labelWidth, x));
    const textY = Math.max(18, Math.min(height - 10, y));
    this.ctx.save();
    this.ctx.setLineDash([]);
    this.ctx.textAlign = align;
    this.ctx.textBaseline = "alphabetic";
    this.ctx.fillText(label, textX, textY);
    this.ctx.restore();
  }

  private drawDimensionLine(x1: number, y1: number, x2: number, y2: number, label: string, offset = 0, color = "#2c6159"): void {
    const a = worldToScreen(this.state, x1, y1);
    const b = worldToScreen(this.state, x2, y2);
    const horizontal = Math.abs(y1 - y2) < 0.01;
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 1.5;
    this.ctx.font = "12px system-ui";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    if (horizontal) {
      a.y += offset;
      b.y += offset;
      this.line(a.x, a.y, b.x, b.y);
      this.line(a.x, a.y - 5, a.x, a.y + 5);
      this.line(b.x, b.y - 5, b.x, b.y + 5);
      this.ctx.fillText(label, (a.x + b.x) / 2, a.y - 13);
    } else {
      a.x += offset;
      b.x += offset;
      this.line(a.x, a.y, b.x, b.y);
      this.line(a.x - 5, a.y, a.x + 5, a.y);
      this.line(b.x - 5, b.y, b.x + 5, b.y);
      this.ctx.translate(a.x - 16, (a.y + b.y) / 2);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillText(label, 0, 0);
    }
    this.ctx.restore();
  }

  private line(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  private drawExtension(x1: number, y1: number, x2: number, y2: number, color: string): void {
    const a = worldToScreen(this.state, x1, y1);
    const b = worldToScreen(this.state, x2, y2);
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.line(a.x, a.y, b.x, b.y);
    this.ctx.restore();
  }

  private drawAnchorDot(x: number, y: number, color = "#ffffff"): void {
    const point = worldToScreen(this.state, x, y);
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "#4152a3";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}
