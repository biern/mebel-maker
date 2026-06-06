import type {
  Board,
  BoardEdge,
  Bounds,
  InnerDimensions,
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

export function hitTest(boards: Board[], point: Point): Board | null {
  for (let i = boards.length - 1; i >= 0; i -= 1) {
    const board = boards[i];
    if (board.kind === "back") continue;
    if (pointInBoard(board, point)) {
      return board;
    }
  }
  for (let i = boards.length - 1; i >= 0; i -= 1) {
    const board = boards[i];
    if (board.kind !== "back") continue;
    if (pointInBoard(board, point)) {
      return board;
    }
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

export function snapValueToGrid(state: SketchState, value: number, axis: "x" | "y"): number {
  const origin = axis === "x" ? state.gridOriginX : state.gridOriginY;
  return origin + Math.round((value - origin) / state.grid) * state.grid;
}

export function alignGridOriginToBounds(state: SketchState): void {
  const bounds = boundsFor(state.boards.filter((board) => board.kind !== "back")) ?? boundsFor(state.boards);
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
  const frameBoards = boards.filter((board) => board.kind !== "back");

  const leftPanel = frameBoards.find((board) => Math.abs(board.x - bounds.left) <= 0.5 && board.h > thickness * 2);
  const rightPanel = frameBoards.find((board) => Math.abs(board.x + board.w - bounds.right) <= 0.5 && board.h > thickness * 2);
  const topPanel = frameBoards.find((board) => Math.abs(board.y - bounds.top) <= 0.5 && board.w > thickness * 2);
  const bottomPanel = frameBoards.find((board) => Math.abs(board.y + board.h - bounds.bottom) <= 0.5 && board.w > thickness * 2);

  const innerW = Math.max(0, bounds.w - (leftPanel?.w ?? 0) - (rightPanel?.w ?? 0));
  const innerH = Math.max(0, bounds.h - (topPanel?.h ?? 0) - (bottomPanel?.h ?? 0));
  return { innerW, innerH, hasFrame: Boolean(leftPanel || rightPanel || topPanel || bottomPanel) };
}

export function snapBoard(state: SketchState, board: Board, targetX: number, targetY: number): SnapResult {
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
    if (other.id === board.id) return;
    const oe = rectEdges(other);
    const xPairs: Array<[number, number, string]> = [
      [me.left, oe.left, "left aligned"],
      [me.right, oe.right, "right aligned"],
      [me.centerX, oe.centerX, "center aligned"],
      [me.left, oe.right, "flush right edge"],
      [me.right, oe.left, "flush left edge"]
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

  return { ...snapped, label, guides: guides.filter(Boolean) };
}

export function hitResizeHandle(state: SketchState, board: Board, point: Point): ResizeHandle | null {
  const threshold = 7 / state.scale;
  const edges = rectEdges(board);
  const nearLeft = Math.abs(point.x - edges.left) <= threshold;
  const nearRight = Math.abs(point.x - edges.right) <= threshold;
  const nearTop = Math.abs(point.y - edges.top) <= threshold;
  const nearBottom = Math.abs(point.y - edges.bottom) <= threshold;
  const insideX = point.x >= edges.left - threshold && point.x <= edges.right + threshold;
  const insideY = point.y >= edges.top - threshold && point.y <= edges.bottom + threshold;

  const handle =
    nearLeft && nearTop ? "nw" :
      nearRight && nearTop ? "ne" :
        nearLeft && nearBottom ? "sw" :
          nearRight && nearBottom ? "se" :
            nearTop && insideX ? "n" :
              nearBottom && insideX ? "s" :
                nearLeft && insideY ? "w" :
                  nearRight && insideY ? "e" :
                    null;
  return handle && resizeHandlesForBoard(board).includes(handle) ? handle : null;
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
        bestAnchor = { kind: "board-edge", boardId: board.id, edge: candidate.edge, offset: candidate.offset };
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

export function computeOverlaps(boards: Board[]): OverlapRegion[] {
  const overlapsFound: OverlapRegion[] = [];
  for (let i = 0; i < boards.length; i += 1) {
    for (let j = i + 1; j < boards.length; j += 1) {
      const a = boards[i];
      const b = boards[j];
      if (a.kind === "back" || b.kind === "back") continue;
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

    applyEdgeDelta(snapped, edge, nextDelta, state.thickness);
    label = bestLabel;
    if (bestGuide) guides.push(bestGuide);
  });

  return { rect: snapped, label, guides };
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
  if (a.kind === "back" || b.kind === "back") return false;
  if (intersects(a, b)) return true;
  const ae = rectEdges(a);
  const be = rectEdges(b);
  const verticalTouch = Math.abs(ae.right - be.left) <= 0.5 || Math.abs(be.right - ae.left) <= 0.5;
  const horizontalTouch = Math.abs(ae.bottom - be.top) <= 0.5 || Math.abs(be.bottom - ae.top) <= 0.5;
  return (verticalTouch && overlaps(ae.top, ae.bottom, be.top, be.bottom)) ||
    (horizontalTouch && overlaps(ae.left, ae.right, be.left, be.right));
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
