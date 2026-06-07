import type {
  Board,
  BoardEdge,
  BoardLayoutAnchor,
  Bounds,
  InnerDimensions,
  Measurement,
  MeasurementAnchor,
  MeasurementAxis,
  OverlapRegion,
  Point,
  Rect,
  RectEdges,
  RectSnapResult,
  ResizeHandle,
  SketchState,
  SnapGuide,
  SnapResult
} from "./types";

export function mm(value: number): string {
  return `${Math.round(value)} mm`;
}

export function boardLabel(board: Board): string {
  return `${board.name} · ${mm(board.w)} × ${mm(board.h)}`;
}

export function selectedBoard(state: SketchState): Board | null {
  return state.boards.find((board) => board.id === state.selectedId) ?? null;
}

export function selectedBoards(state: SketchState): Board[] {
  const selected = new Set(state.selectedIds);
  if (state.selectedId !== null) selected.add(state.selectedId);
  return state.boards.filter((board) => selected.has(board.id));
}

export function selectedMeasurement(state: SketchState): Measurement | null {
  return state.measurements.find((measurement) => measurement.id === state.selectedMeasurementId) ?? null;
}

export function screenToWorld(state: SketchState, x: number, y: number): Point {
  return {
    x: (x - state.panX) / state.scale,
    y: (y - state.panY) / state.scale
  };
}

export function worldToScreen(state: SketchState, x: number, y: number): Point {
  return {
    x: x * state.scale + state.panX,
    y: y * state.scale + state.panY
  };
}

export function rectEdges(board: Board): RectEdges {
  return edgesForRect(board);
}

export function edgesForRect(rect: Rect): RectEdges {
  return {
    left: rect.x,
    right: rect.x + rect.w,
    top: rect.y,
    bottom: rect.y + rect.h,
    centerX: rect.x + rect.w / 2,
    centerY: rect.y + rect.h / 2
  };
}

export function boardLayerOrder(board: Board): number {
  if (board.kind === "back") return 0;
  if (board.kind === "front") return 2;
  return 1;
}

export function displayOrderedBoards(boards: Board[]): Board[] {
  return boards
    .map((board, index) => ({ board, index }))
    .sort((a, b) => boardLayerOrder(a.board) - boardLayerOrder(b.board) || a.index - b.index)
    .map(({ board }) => board);
}

export function hitTest(state: Pick<SketchState, "boards" | "showFrontPanels">, point: Point): Board | null {
  const drawOrder = displayOrderedBoards(state.boards);
  for (let i = drawOrder.length - 1; i >= 0; i -= 1) {
    const board = drawOrder[i];
    if (board.kind === "front" && !state.showFrontPanels) continue;
    if (pointInBoard(board, point)) return board;
  }
  return null;
}

function pointInBoard(board: Board, point: Point): boolean {
  const slop = board.w < 32 || board.h < 32 ? 14 : 0;
  return point.x >= board.x - slop &&
    point.x <= board.x + board.w + slop &&
    point.y >= board.y - slop &&
    point.y <= board.y + board.h + slop;
}

export function boundsFor(boards: Board[]): Bounds | null {
  if (!boards.length) return null;
  const left = Math.min(...boards.map((board) => board.x));
  const top = Math.min(...boards.map((board) => board.y));
  const right = Math.max(...boards.map((board) => board.x + board.w));
  const bottom = Math.max(...boards.map((board) => board.y + board.h));
  return { left, top, right, bottom, w: right - left, h: bottom - top };
}

export function rectFromBoard(board: Board): Rect {
  return { x: board.x, y: board.y, w: board.w, h: board.h };
}

export function effectiveDepth(board: Board, defaultDepth: number): number {
  return board.depthOverride ?? defaultDepth;
}

export function snapValueToGrid(state: SketchState, value: number, axis: "x" | "y"): number {
  const origin = axis === "x" ? state.gridOriginX : state.gridOriginY;
  return origin + Math.round((value - origin) / state.grid) * state.grid;
}

export function alignGridOriginToBounds(state: SketchState): void {
  const bounds = boundsFor(state.boards.filter((board) => !isOverlayPanel(board))) ?? boundsFor(state.boards);
  if (!bounds) return;
  state.gridOriginX = bounds.left;
  state.gridOriginY = bounds.top;
}

export function groupBoards(state: SketchState, groupId: number): Board[] {
  return state.boards.filter((board) => board.group === groupId);
}

export function computeGroups(boards: Board[]): void {
  let groupId = 1;
  const visited = new Set<number>();

  boards.forEach((board) => {
    if (visited.has(board.id)) return;
    const queue = [board];
    visited.add(board.id);
    board.group = groupId;

    while (queue.length) {
      const current = queue.shift();
      if (!current) continue;
      boards.forEach((candidate) => {
        if (visited.has(candidate.id) || !connected(current, candidate)) return;
        candidate.group = groupId;
        visited.add(candidate.id);
        queue.push(candidate);
      });
    }
    groupId += 1;
  });
}

export function innerDimensions(boards: Board[], thickness: number): InnerDimensions | null {
  const bounds = boundsFor(boards);
  if (!bounds) return null;
  const frameBoards = boards.filter((board) => !isOverlayPanel(board));

  const leftPanel = frameBoards.find((board) => Math.abs(board.x - bounds.left) <= 0.5 && board.h > thickness * 2);
  const rightPanel = frameBoards.find((board) => Math.abs(board.x + board.w - bounds.right) <= 0.5 && board.h > thickness * 2);
  const topPanel = frameBoards.find((board) => Math.abs(board.y - bounds.top) <= 0.5 && board.w > thickness * 2);
  const bottomPanel = frameBoards.find((board) => Math.abs(board.y + board.h - bounds.bottom) <= 0.5 && board.w > thickness * 2);

  const innerW = Math.max(0, bounds.w - (leftPanel?.w ?? 0) - (rightPanel?.w ?? 0));
  const innerH = Math.max(0, bounds.h - (topPanel?.h ?? 0) - (bottomPanel?.h ?? 0));
  return { innerW, innerH, hasFrame: Boolean(leftPanel || rightPanel || topPanel || bottomPanel) };
}

export function snapBoard(state: SketchState, board: Board, targetX: number, targetY: number, ignoreIds = new Set([board.id])): SnapResult {
  if (!state.snap) return { x: targetX, y: targetY, label: "Snap off", guides: [] };
  const threshold = 14 / state.scale;
  const snapped = {
    x: snapValueToGrid(state, targetX, "x"),
    y: snapValueToGrid(state, targetY, "y")
  };
  let label = `Grid ${state.grid} mm`;
  let bestX = threshold;
  let bestY = threshold;
  const guides: SnapGuide[] = [];
  const moving = { ...board, x: targetX, y: targetY };
  const me = rectEdges(moving);

  state.boards.forEach((other) => {
    if (ignoreIds.has(other.id)) return;
    const oe = rectEdges(other);
    const xPairs: Array<[number, number, string]> = [
      [me.left, oe.left, "left aligned"],
      [me.right, oe.right, "right aligned"],
      [me.centerX, oe.centerX, "center aligned"],
      [me.left, oe.right, "touching right edge"],
      [me.right, oe.left, "touching left edge"]
    ];
    const yPairs: Array<[number, number, string]> = [
      [me.top, oe.top, "top aligned"],
      [me.bottom, oe.bottom, "bottom aligned"],
      [me.centerY, oe.centerY, "middle aligned"],
      [me.top, oe.bottom, "flush below"],
      [me.bottom, oe.top, "flush above"]
    ];

    xPairs.forEach(([from, to, note]) => {
      const delta = to - from;
      if (Math.abs(delta) < bestX) {
        snapped.x = targetX + delta;
        bestX = Math.abs(delta);
        label = note;
        guides[0] = { orientation: "vertical", position: to, label: note };
      }
    });

    yPairs.forEach(([from, to, note]) => {
      const delta = to - from;
      if (Math.abs(delta) < bestY) {
        snapped.y = targetY + delta;
        bestY = Math.abs(delta);
        label = note;
        guides[1] = { orientation: "horizontal", position: to, label: note };
      }
    });
  });

  layoutAnchorTargets(state, ignoreIds).forEach(({ anchor, board: source, position }) => {
    if (anchor.axis === "x") {
      const delta = position - me.centerX;
      if (Math.abs(delta) < bestX) {
        snapped.x = targetX + delta;
        bestX = Math.abs(delta);
        label = `${source.name} layout anchor`;
        guides[0] = { orientation: "vertical", position, label };
      }
      return;
    }

    const delta = position - me.centerY;
    if (Math.abs(delta) < bestY) {
      snapped.y = targetY + delta;
      bestY = Math.abs(delta);
      label = `${source.name} layout anchor`;
      guides[1] = { orientation: "horizontal", position, label };
    }
  });

  return { ...snapped, label, guides: guides.filter(Boolean) };
}

export function hitResizeHandle(state: SketchState, board: Board, point: Point): ResizeHandle | null {
  const threshold = 18;
  const screenPoint = worldToScreen(state, point.x, point.y);
  const boardPoint = worldToScreen(state, board.x, board.y);
  const w = board.w * state.scale;
  const h = board.h * state.scale;
  const handlePoints: Record<ResizeHandle, Point> = {
    nw: { x: boardPoint.x, y: boardPoint.y },
    n: { x: boardPoint.x + w / 2, y: boardPoint.y },
    ne: { x: boardPoint.x + w, y: boardPoint.y },
    w: { x: boardPoint.x, y: boardPoint.y + h / 2 },
    e: { x: boardPoint.x + w, y: boardPoint.y + h / 2 },
    sw: { x: boardPoint.x, y: boardPoint.y + h },
    s: { x: boardPoint.x + w / 2, y: boardPoint.y + h },
    se: { x: boardPoint.x + w, y: boardPoint.y + h }
  };

  return resizeHandlesForBoard(board).reduce<{ handle: ResizeHandle | null; distance: number }>((best, handle) => {
    const handlePoint = handlePoints[handle];
    const dx = Math.abs(screenPoint.x - handlePoint.x);
    const dy = Math.abs(screenPoint.y - handlePoint.y);
    if (dx > threshold || dy > threshold) return best;
    const distance = dx * dx + dy * dy;
    return distance < best.distance ? { handle, distance } : best;
  }, { handle: null, distance: Number.POSITIVE_INFINITY }).handle;
}

export function resizeBoard(state: SketchState, board: Board, handle: ResizeHandle, startRect: Rect, startPoint: Point, point: Point): RectSnapResult {
  const dx = point.x - startPoint.x;
  const dy = point.y - startPoint.y;
  const rect = { ...startRect };

  if (handle.includes("e")) rect.w = startRect.w + dx;
  if (handle.includes("s")) rect.h = startRect.h + dy;
  if (handle.includes("w")) {
    rect.x = startRect.x + dx;
    rect.w = startRect.w - dx;
  }
  if (handle.includes("n")) {
    rect.y = startRect.y + dy;
    rect.h = startRect.h - dy;
  }

  if (board.autoThickness === "width") {
    rect.x = startRect.x;
    rect.w = startRect.w;
  }
  if (board.autoThickness === "height") {
    rect.y = startRect.y;
    rect.h = startRect.h;
  }

  return snapRect(state, board, normalizeRect(rect, state.thickness), movingEdgesForHandle(handle));
}

export function resizeHandlesForBoard(board: Board): ResizeHandle[] {
  if (board.autoThickness === "width") return ["n", "s"];
  if (board.autoThickness === "height") return ["w", "e"];
  return ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
}

export function nearestMeasurementAnchor(state: SketchState, point: Point): MeasurementAnchor {
  const threshold = Math.max(10, 12 / state.scale);
  const centerThreshold = Math.max(10, 16 / state.scale);
  let bestAnchor: MeasurementAnchor | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  state.boards.forEach((board) => {
    const edges = rectEdges(board);
    const candidates: Array<{ edge: BoardEdge; distance: number; offset: number }> = [
      { edge: "left", distance: Math.abs(point.x - edges.left), offset: point.y - board.y },
      { edge: "right", distance: Math.abs(point.x - edges.right), offset: point.y - board.y },
      { edge: "top", distance: Math.abs(point.y - edges.top), offset: point.x - board.x },
      { edge: "bottom", distance: Math.abs(point.y - edges.bottom), offset: point.x - board.x }
    ];

    candidates.forEach((candidate) => {
      const onVerticalEdge = (candidate.edge === "left" || candidate.edge === "right") &&
        point.y >= board.y - threshold && point.y <= board.y + board.h + threshold;
      const onHorizontalEdge = (candidate.edge === "top" || candidate.edge === "bottom") &&
        point.x >= board.x - threshold && point.x <= board.x + board.w + threshold;
      if (!(onVerticalEdge || onHorizontalEdge) || candidate.distance > threshold) return;
      if (candidate.distance < bestDistance) {
        const center = candidate.edge === "left" || candidate.edge === "right" ? board.h / 2 : board.w / 2;
        const offset = Math.abs(candidate.offset - center) <= centerThreshold ? center : candidate.offset;
        bestAnchor = { kind: "board-edge", boardId: board.id, edge: candidate.edge, offset };
        bestDistance = candidate.distance;
      }
    });
  });

  return bestAnchor ?? {
    kind: "grid",
    x: snapValueToGrid(state, point.x, "x"),
    y: snapValueToGrid(state, point.y, "y")
  };
}

export function resolveMeasurementAnchor(state: SketchState, anchor: MeasurementAnchor): Point | null {
  if (anchor.kind === "grid") return { x: anchor.x, y: anchor.y };
  const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
  if (!board) return null;
  const edges = rectEdges(board);
  if (anchor.edge === "left" || anchor.edge === "right") {
    return {
      x: anchor.edge === "left" ? edges.left : edges.right,
      y: board.y + clamp(anchor.offset, 0, board.h)
    };
  }
  return {
    x: board.x + clamp(anchor.offset, 0, board.w),
    y: anchor.edge === "top" ? edges.top : edges.bottom
  };
}

export function measurementAxis(a: Point, b: Point): MeasurementAxis {
  return Math.abs(a.x - b.x) >= Math.abs(a.y - b.y) ? "horizontal" : "vertical";
}

export function defaultMeasurementDisplayOffset(index: number): number {
  return 46 + index * 14;
}

export function measurementDisplayOffset(measurement: Measurement, index: number): number {
  return measurement.displayOffset ?? defaultMeasurementDisplayOffset(index);
}

export function measurementDisplayLine(
  state: SketchState,
  measurement: Measurement,
  index: number
): { a: Point; b: Point; axis: MeasurementAxis; offset: number; lineStart: Point; lineEnd: Point; labelPoint: Point } | null {
  const a = resolveMeasurementAnchor(state, measurement.a);
  const b = resolveMeasurementAnchor(state, measurement.b);
  if (!a || !b) return null;
  const offset = measurementDisplayOffset(measurement, index);

  if (measurement.axis === "horizontal") {
    const y = Math.min(a.y, b.y) - offset;
    return {
      a,
      b,
      axis: measurement.axis,
      offset,
      lineStart: { x: a.x, y },
      lineEnd: { x: b.x, y },
      labelPoint: { x: (a.x + b.x) / 2, y: y - 13 / state.scale }
    };
  }

  const x = Math.max(a.x, b.x) + offset;
  return {
    a,
    b,
    axis: measurement.axis,
    offset,
    lineStart: { x, y: a.y },
    lineEnd: { x, y: b.y },
    labelPoint: { x: x - 16 / state.scale, y: (a.y + b.y) / 2 }
  };
}

export function hitTestMeasurement(state: SketchState, point: Point): Measurement | null {
  const lineThreshold = Math.max(8, 10 / state.scale);
  const labelHalfWidth = 42 / state.scale;
  const labelHalfHeight = 18 / state.scale;

  for (let index = state.measurements.length - 1; index >= 0; index -= 1) {
    const measurement = state.measurements[index];
    const layout = measurementDisplayLine(state, measurement, index);
    if (!layout) continue;
    const minX = Math.min(layout.lineStart.x, layout.lineEnd.x) - lineThreshold;
    const maxX = Math.max(layout.lineStart.x, layout.lineEnd.x) + lineThreshold;
    const minY = Math.min(layout.lineStart.y, layout.lineEnd.y) - lineThreshold;
    const maxY = Math.max(layout.lineStart.y, layout.lineEnd.y) + lineThreshold;
    const onLine = point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    const onLabel = Math.abs(point.x - layout.labelPoint.x) <= labelHalfWidth &&
      Math.abs(point.y - layout.labelPoint.y) <= labelHalfHeight;
    if (onLine || onLabel) return measurement;
  }

  return null;
}

export function computeOverlaps(boards: Board[]): OverlapRegion[] {
  const overlapsFound: OverlapRegion[] = [];
  for (let i = 0; i < boards.length; i += 1) {
    for (let j = i + 1; j < boards.length; j += 1) {
      const a = boards[i];
      const b = boards[j];
      if (isOverlayPanel(a) || isOverlayPanel(b)) continue;
      const x = Math.max(a.x, b.x);
      const y = Math.max(a.y, b.y);
      const right = Math.min(a.x + a.w, b.x + b.w);
      const bottom = Math.min(a.y + a.h, b.y + b.h);
      if (right - x > 0.5 && bottom - y > 0.5) {
        overlapsFound.push({ x, y, w: right - x, h: bottom - y, boardIds: [a.id, b.id] });
      }
    }
  }
  return overlapsFound;
}

function snapRect(state: SketchState, board: Board, rect: Rect, movingEdges: BoardEdge[]): RectSnapResult {
  if (!state.snap) return { rect, label: "Snap off", guides: [] };
  const threshold = 14 / state.scale;
  const snapped = { ...rect };
  let label = `Grid ${state.grid} mm`;
  const guides: SnapGuide[] = [];

  movingEdges.forEach((edge) => {
    let bestDelta = threshold;
    let bestLabel = label;
    let bestGuide: SnapGuide | null = null;
    const currentValue = edgeValue(edgesForRect(snapped), edge);
    const gridValue = snapValueToGrid(state, currentValue, edge === "left" || edge === "right" ? "x" : "y");
    let nextDelta = gridValue - currentValue;

    if (Math.abs(nextDelta) < bestDelta) {
      bestDelta = Math.abs(nextDelta);
      bestLabel = `Grid ${state.grid} mm`;
    }

    state.boards.forEach((other) => {
      if (other.id === board.id) return;
      const otherEdges = rectEdges(other);
      snapTargetsForEdge(otherEdges, edge).forEach(([target, targetLabel]) => {
        const delta = target - currentValue;
        if (Math.abs(delta) < bestDelta) {
          bestDelta = Math.abs(delta);
          nextDelta = delta;
          bestLabel = targetLabel;
          bestGuide = {
            orientation: edge === "left" || edge === "right" ? "vertical" : "horizontal",
            position: target,
            label: targetLabel
          };
        }
      });
    });

    layoutAnchorTargets(state, new Set([board.id])).forEach(({ anchor, board: source, position }) => {
      const edgeIsVertical = edge === "left" || edge === "right";
      if ((edgeIsVertical && anchor.axis !== "x") || (!edgeIsVertical && anchor.axis !== "y")) return;
      const delta = position - currentValue;
      if (Math.abs(delta) < bestDelta) {
        bestDelta = Math.abs(delta);
        nextDelta = delta;
        bestLabel = `${source.name} layout anchor`;
        bestGuide = {
          orientation: edgeIsVertical ? "vertical" : "horizontal",
          position,
          label: bestLabel
        };
      }
    });

    applyEdgeDelta(snapped, edge, nextDelta, state.thickness);
    label = bestLabel;
    if (bestGuide) guides.push(bestGuide);
  });

  return { rect: snapped, label, guides };
}

function layoutAnchorTargets(
  state: SketchState,
  ignoreIds: Set<number>
): Array<{ anchor: BoardLayoutAnchor; board: Board; position: number }> {
  return state.layoutAnchors.flatMap((anchor) => {
    if (ignoreIds.has(anchor.boardId)) return [];
    const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
    if (!board) return [];
    const span = anchor.axis === "x" ? board.w : board.h;
    if (anchor.offset < 0 || anchor.offset > span) return [];
    return [{ anchor, board, position: (anchor.axis === "x" ? board.x : board.y) + anchor.offset }];
  });
}

function movingEdgesForHandle(handle: ResizeHandle): BoardEdge[] {
  const edges: BoardEdge[] = [];
  if (handle.includes("n")) edges.push("top");
  if (handle.includes("s")) edges.push("bottom");
  if (handle.includes("w")) edges.push("left");
  if (handle.includes("e")) edges.push("right");
  return edges;
}

function normalizeRect(rect: Rect, minSize: number): Rect {
  const normalized = { ...rect };
  const minimum = Math.max(8, minSize);
  if (normalized.w < minimum) {
    normalized.x += normalized.w - minimum;
    normalized.w = minimum;
  }
  if (normalized.h < minimum) {
    normalized.y += normalized.h - minimum;
    normalized.h = minimum;
  }
  return normalized;
}

function edgeValue(edges: RectEdges, edge: BoardEdge): number {
  if (edge === "left") return edges.left;
  if (edge === "right") return edges.right;
  if (edge === "top") return edges.top;
  return edges.bottom;
}

function snapTargetsForEdge(edges: RectEdges, edge: BoardEdge): Array<[number, string]> {
  if (edge === "left" || edge === "right") {
    return [
      [edges.left, "left edge"],
      [edges.right, "right edge"],
      [edges.centerX, "vertical center"]
    ];
  }
  return [
    [edges.top, "top edge"],
    [edges.bottom, "bottom edge"],
    [edges.centerY, "horizontal center"]
  ];
}

function applyEdgeDelta(rect: Rect, edge: BoardEdge, delta: number, minSize: number): void {
  if (edge === "left") {
    rect.x += delta;
    rect.w -= delta;
  }
  if (edge === "right") rect.w += delta;
  if (edge === "top") {
    rect.y += delta;
    rect.h -= delta;
  }
  if (edge === "bottom") rect.h += delta;
  const normalized = normalizeRect(rect, minSize);
  rect.x = normalized.x;
  rect.y = normalized.y;
  rect.w = normalized.w;
  rect.h = normalized.h;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function connected(a: Board, b: Board): boolean {
  if (isOverlayPanel(a) || isOverlayPanel(b)) return false;
  if (intersects(a, b)) return true;
  const ae = rectEdges(a);
  const be = rectEdges(b);
  const verticalTouch = Math.abs(ae.right - be.left) <= 0.5 || Math.abs(be.right - ae.left) <= 0.5;
  const horizontalTouch = Math.abs(ae.bottom - be.top) <= 0.5 || Math.abs(be.bottom - ae.top) <= 0.5;
  return (verticalTouch && overlaps(ae.top, ae.bottom, be.top, be.bottom)) ||
    (horizontalTouch && overlaps(ae.left, ae.right, be.left, be.right));
}

function isOverlayPanel(board: Board): boolean {
  return board.kind === "back" || board.kind === "front";
}

function overlaps(a1: number, a2: number, b1: number, b2: number): boolean {
  return Math.max(a1, b1) <= Math.min(a2, b2) + 0.5;
}

function intersects(a: Board, b: Board): boolean {
  return a.x < b.x + b.w - 0.5 &&
    a.x + a.w > b.x + 0.5 &&
    a.y < b.y + b.h - 0.5 &&
    a.y + a.h > b.y + 0.5;
}
