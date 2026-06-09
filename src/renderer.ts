import {
  boundsFor,
  connectionMarks,
  computeOverlaps,
  displayOrderedBoards,
  groupBoards,
  innerDimensions,
  measurementDisplayLine,
  measurementAxis,
  mm,
  rectFromBoard,
  resizeHandlesForBoard,
  resolveMeasurementAnchor,
  selectedBoard,
  selectedBoards,
  worldToScreen
} from "./geometry";
import { translate } from "./i18n";
import type { Board, ConnectionMark, Material, MeasurementAxis, Point, SketchState } from "./types";

const colors = ["#5c8d89", "#d19041", "#725d9f", "#538052", "#bb5d50", "#3f75a3"];

function t(id: string): string {
  return translate(id);
}

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
    this.drawLayoutAnchors();
    this.drawOverlaps();
    this.drawConnectionMarks();
    this.drawSelectionBox();
    this.drawSnapGuides(rect.width, rect.height);
    this.drawMeasurements();
    this.drawDimensions();
    this.drawResizeHandles();
    this.drawOriginAxis(rect.width, rect.height);
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

  private drawOriginAxis(width: number, height: number): void {
    const origin = worldToScreen(this.state, 0, 0);
    const axisLength = 42;
    const visibilityMargin = axisLength + 18;
    if (
      origin.x < -visibilityMargin ||
      origin.x > width + visibilityMargin ||
      origin.y < -visibilityMargin ||
      origin.y > height + visibilityMargin
    ) return;

    const axisX = Math.max(1, Math.min(width - 1, origin.x));
    const axisY = Math.max(1, Math.min(height - 1, origin.y));
    const yLabelNearEdge = axisX < 12;

    this.ctx.save();
    this.ctx.strokeStyle = "#1f6659";
    this.ctx.fillStyle = "#1f6659";
    this.ctx.lineWidth = 2;
    this.ctx.font = "11px system-ui";
    this.ctx.textBaseline = "middle";

    this.drawArrow(axisX, axisY, axisX + axisLength, axisY);
    this.drawArrow(axisX, axisY, axisX, axisY - axisLength);
    this.ctx.beginPath();
    this.ctx.arc(axisX, axisY, 3, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.textAlign = "left";
    this.ctx.fillText("X", axisX + axisLength + 7, axisY);
    this.ctx.fillText("0,0", axisX + 6, axisY + 13);
    this.ctx.textAlign = yLabelNearEdge ? "left" : "center";
    this.ctx.fillText("Y", axisX + (yLabelNearEdge ? 7 : 0), axisY - axisLength - 10);
    this.ctx.restore();
  }

  private drawBoard(board: Board): void {
    const rect = rectFromBoard(board);
    const point = worldToScreen(this.state, rect.x, rect.y);
    const w = rect.w * this.state.scale;
    const h = rect.h * this.state.scale;
    const selected = this.state.selectedIds.includes(board.id) || board.id === this.state.selectedId;
    const primary = board.id === this.state.selectedId;
    const resizing = board.id === this.state.resizing?.id;
    const groupColor = colors[(board.group - 1) % colors.length] ?? colors[0];
    const material = this.materialFor(board);
    const opacity = this.boardOpacity(board, selected || resizing);

    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = board.kind === "back" ? this.withAlpha(material.color, 0.36) : material.color;
    this.ctx.strokeStyle = primary ? "#1f6659" : selected ? "#2f78b7" : groupColor;
    this.ctx.lineWidth = board.kind === "back" ? 1.5 : primary ? 3 : selected ? 2.5 : 2;
    this.ctx.fillRect(point.x, point.y, w, h);
    this.ctx.strokeRect(point.x, point.y, w, h);
    this.drawLaminateEdges(board, point.x, point.y, w, h);

    this.ctx.strokeStyle = "rgba(99, 72, 37, 0.28)";
    this.ctx.lineWidth = 1;
    const grainGap = Math.max(10, 28 * this.state.scale);
    if (rect.w >= rect.h) {
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
      [board.laminate.top || board.laminate.back, x, y, x + w, y],
      [board.laminate.bottom || board.laminate.front, x, y + h, x + w, y + h]
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

  private drawConnectionMarks(): void {
    if (!this.state.showConnectionMarks) return;
    const marks = connectionMarks(this.state.boards);
    if (!marks.length) return;

    this.ctx.save();
    this.ctx.strokeStyle = "#805a2f";
    this.ctx.fillStyle = "#805a2f";
    this.ctx.lineWidth = 1.6;
    this.ctx.font = "12px system-ui";
    this.ctx.setLineDash([2, 3]);
    marks.forEach((mark) => this.drawConnectionMark(mark));
    this.ctx.restore();
  }

  private drawConnectionMark(mark: ConnectionMark): void {
    const point = worldToScreen(this.state, mark.point.x, mark.point.y);
    const label = mm(mark.offset);
    const tick = 9;
    this.ctx.save();
    this.ctx.setLineDash([]);
    if (mark.axis === "horizontal") {
      this.line(point.x, point.y - tick, point.x, point.y + tick);
      const above = mark.edge === "top";
      this.drawOutlinedText(label, point.x, point.y + (above ? -15 : 15), "center", above ? "bottom" : "top");
    } else {
      this.line(point.x - tick, point.y, point.x + tick, point.y);
      const left = mark.edge === "left";
      this.drawOutlinedText(label, point.x + (left ? -12 : 12), point.y, left ? "right" : "left", "middle");
    }
    this.ctx.restore();
  }

  private drawLayoutAnchors(): void {
    if (!this.state.layoutAnchors.length) return;
    const selectedIds = new Set(this.state.selectedIds);
    if (this.state.selectedId !== null) selectedIds.add(this.state.selectedId);

    this.ctx.save();
    this.state.layoutAnchors.forEach((anchor) => {
      const board = this.state.boards.find((candidate) => candidate.id === anchor.boardId);
      if (!board) return;
      const selected = selectedIds.has(board.id);
      const color = selected ? "#1f6659" : "rgba(31, 102, 89, 0.52)";
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = selected ? "#ffffff" : "#e7f3f0";
      this.ctx.lineWidth = selected ? 2 : 1.4;
      this.ctx.setLineDash(selected ? [5, 4] : [3, 5]);

      if (anchor.axis === "x") {
        const rect = rectFromBoard(board);
        const x = rect.x + anchor.offset;
        if (anchor.offset < 0 || anchor.offset > rect.w) return;
        const a = worldToScreen(this.state, x, rect.y);
        const b = worldToScreen(this.state, x, rect.y + rect.h);
        this.line(a.x, a.y, b.x, b.y);
        this.drawLayoutAnchorDot(a.x, (a.y + b.y) / 2, color);
        return;
      }

      const rect = rectFromBoard(board);
      const y = rect.y + anchor.offset;
      if (anchor.offset < 0 || anchor.offset > rect.h) return;
      const a = worldToScreen(this.state, rect.x, y);
      const b = worldToScreen(this.state, rect.x + rect.w, y);
      this.line(a.x, a.y, b.x, b.y);
      this.drawLayoutAnchorDot((a.x + b.x) / 2, a.y, color);
    });
    this.ctx.restore();
  }

  private drawSelectionBox(): void {
    const box = this.state.selectionBox;
    if (!box) return;
    const a = worldToScreen(this.state, box.start.x, box.start.y);
    const b = worldToScreen(this.state, box.current.x, box.current.y);
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const w = Math.abs(a.x - b.x);
    const h = Math.abs(a.y - b.y);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(47, 120, 183, 0.12)";
    this.ctx.strokeStyle = "#2f78b7";
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([6, 4]);
    this.ctx.fillRect(x, y, w, h);
    this.ctx.strokeRect(x, y, w, h);
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
      const layout = measurementDisplayLine(this.state, measurement, index);
      if (!layout) return;
      const selected = measurement.id === this.state.selectedMeasurementId;
      const color = selected ? "#b8483b" : "#4152a3";
      this.drawMeasurementLine(layout.a, layout.b, layout.lineStart, layout.lineEnd, measurement.axis, color, measurement.name, selected);
      this.drawAnchorDot(layout.a.x, layout.a.y, selected ? "#fff7f5" : "#ffffff", color);
      this.drawAnchorDot(layout.b.x, layout.b.y, selected ? "#fff7f5" : "#ffffff", color);
    });

    if (this.state.pendingMeasurementAnchor) {
      const anchor = resolveMeasurementAnchor(this.state, this.state.pendingMeasurementAnchor);
      if (anchor) this.drawAnchorDot(anchor.x, anchor.y, "#4152a3");
    }

    if (this.state.pendingMeasurementAnchor && this.state.previewMeasurementAnchor) {
      const a = resolveMeasurementAnchor(this.state, this.state.pendingMeasurementAnchor);
      const b = resolveMeasurementAnchor(this.state, this.state.previewMeasurementAnchor);
      if (!a || !b) return;
      this.ctx.save();
      this.ctx.globalAlpha = 0.82;
      this.drawMeasurement(a, b, measurementAxis(a, b), 46 + this.state.measurements.length * 14, "#2398b6");
      this.ctx.restore();
      this.drawAnchorDot(a.x, a.y, "#4152a3");
      this.drawAnchorDot(b.x, b.y, "#2398b6");
    }
  }

  private measurementLabel(name: string, value: string): string {
    const trimmed = name.trim();
    return trimmed ? `${trimmed} ${value}` : value;
  }

  private drawMeasurement(a: Point, b: Point, axis: MeasurementAxis, offset: number, color: string, name = ""): void {
    if (axis === "horizontal") {
      const y = Math.min(a.y, b.y) - offset;
      this.drawDimensionLine(a.x, y, b.x, y, this.measurementLabel(name, mm(Math.abs(b.x - a.x))), 0, color);
      this.drawExtension(a.x, a.y, a.x, y, color);
      this.drawExtension(b.x, b.y, b.x, y, color);
      return;
    }

    const x = Math.max(a.x, b.x) + offset;
    this.drawDimensionLine(x, a.y, x, b.y, this.measurementLabel(name, mm(Math.abs(b.y - a.y))), 0, color);
    this.drawExtension(a.x, a.y, x, a.y, color);
    this.drawExtension(b.x, b.y, x, b.y, color);
  }

  private drawMeasurementLine(a: Point, b: Point, lineStart: Point, lineEnd: Point, axis: MeasurementAxis, color: string, name: string, selected: boolean): void {
    const value = axis === "horizontal" ? mm(Math.abs(b.x - a.x)) : mm(Math.abs(b.y - a.y));
    this.drawDimensionLine(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, this.measurementLabel(name, value), 0, color, selected ? 2.4 : 1.5);
    this.drawExtension(a.x, a.y, lineStart.x, lineStart.y, color);
    this.drawExtension(b.x, b.y, lineEnd.x, lineEnd.y, color);
  }

  private drawDimensions(): void {
    if (!this.state.showDimensions) return;
    const selected = selectedBoard(this.state);
    const selectedSet = selectedBoards(this.state);
    const boards = selectedSet.length > 1 ? selectedSet : selected ? groupBoards(this.state, selected.group) : this.state.boards;
    const bounds = boundsFor(boards);
    if (!bounds) return;

    this.drawDimensionLine(bounds.left, bounds.top, bounds.right, bounds.top, `${t("metrics.outer")} ${mm(bounds.w)}`, -28, "#255e55");
    this.drawDimensionLine(bounds.right, bounds.top, bounds.right, bounds.bottom, `${t("metrics.outer")} ${mm(bounds.h)}`, 30, "#255e55");

    const inner = innerDimensions(boards, this.state.thickness);
    if (inner?.hasFrame) {
      this.drawDimensionLine(bounds.left + this.state.thickness, bounds.bottom, bounds.right - this.state.thickness, bounds.bottom, `${t("metrics.inner")} ${mm(inner.innerW)}`, 28, "#a45f1b");
      this.drawDimensionLine(bounds.left, bounds.top + this.state.thickness, bounds.left, bounds.bottom - this.state.thickness, `${t("metrics.inner")} ${mm(inner.innerH)}`, -30, "#a45f1b");
    }

    if (selected && selectedSet.length <= 1) {
      const rect = rectFromBoard(selected);
      this.drawDimensionLine(rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h, mm(rect.w), 18, "#6e4d83");
      this.drawDimensionLine(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h, mm(rect.h), 18, "#6e4d83");
    }
  }

  private drawResizeHandles(): void {
    if (selectedBoards(this.state).length > 1) return;
    const selected = selectedBoard(this.state);
    if (!selected) return;
    const rect = rectFromBoard(selected);
    const point = worldToScreen(this.state, rect.x, rect.y);
    const w = rect.w * this.state.scale;
    const h = rect.h * this.state.scale;
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

  private drawOutlinedText(label: string, x: number, y: number, align: CanvasTextAlign, baseline: CanvasTextBaseline): void {
    this.ctx.save();
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
    this.ctx.strokeText(label, x, y);
    this.ctx.fillStyle = "#805a2f";
    this.ctx.fillText(label, x, y);
    this.ctx.restore();
  }

  private drawDimensionLine(x1: number, y1: number, x2: number, y2: number, label: string, offset = 0, color = "#2c6159", lineWidth = 1.5): void {
    const a = worldToScreen(this.state, x1, y1);
    const b = worldToScreen(this.state, x2, y2);
    const horizontal = Math.abs(y1 - y2) < 0.01;
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = lineWidth;
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

  private drawArrow(x1: number, y1: number, x2: number, y2: number): void {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 7;
    this.line(x1, y1, x2, y2);
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(
      x2 - arrowSize * Math.cos(angle - Math.PI / 6),
      y2 - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.lineTo(
      x2 - arrowSize * Math.cos(angle + Math.PI / 6),
      y2 - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.closePath();
    this.ctx.fill();
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

  private drawAnchorDot(x: number, y: number, color = "#ffffff", stroke = "#4152a3"): void {
    const point = worldToScreen(this.state, x, y);
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawLayoutAnchorDot(x: number, y: number, stroke: string): void {
    this.ctx.save();
    this.ctx.setLineDash([]);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}
