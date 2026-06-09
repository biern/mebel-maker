import type {
  Board,
  BoardEdge,
  BoardLayoutAnchor,
  Bounds,
  ConnectionMark,
  InnerDimensions,
  Measurement,
  MeasurementAnchor,
  MeasurementAxis,
  OverlapRegion,
  PieceOrientation,
  Point,
  Rect,
  RectEdges,
  RectSnapResult,
  ResizeHandle,
  SketchState,
  SnapGuide,
  SnapResult
} from "./types";

const SNAP_THRESHOLD_SCREEN_PX = 28;

export function mm(value: number): string {
  return `${Math.round(value)} mm`;
}

export function boardLabel(board: Board): string {
  const rect = rectFromBoard(board);
  return `${board.name} · ${mm(rect.w)} × ${mm(rect.h)}`;
}

export function orientationForKind(kind: Board["kind"]): PieceOrientation {
  if (kind === "upright") return "vertical";
  if (kind === "shelf") return "horizontal";
  return "front";
}

export function physicalDimensions(board: Board): { width: number; height: number; thickness: number } {
  return board.dimensions;
}

export function boardSketchRect(board: Board): Rect {
  const dimensions = physicalDimensions(board);

  if (board.orientation === "vertical") return { x: board.x, y: board.y, w: dimensions.thickness, h: dimensions.height };
  if (board.orientation === "horizontal") return { x: board.x, y: board.y, w: dimensions.width, h: dimensions.thickness };
  return { x: board.x, y: board.y, w: dimensions.width, h: dimensions.height };
}

export function updateDimensionsFromSketchRect(board: Board, rect: Rect): void {
  const current = physicalDimensions(board);

  if (board.orientation === "vertical") {
    board.dimensions = { width: current.width, height: Math.round(rect.h), thickness: current.thickness };
  } else if (board.orientation === "horizontal") {
    board.dimensions = { width: Math.round(rect.w), height: current.height, thickness: current.thickness };
  } else {
    board.dimensions = { width: Math.round(rect.w), height: Math.round(rect.h), thickness: current.thickness };
  }

  board.x = Math.round(rect.x);
  board.y = Math.round(rect.y);
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
  return edgesForRect(rectFromBoard(board));
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
  const rect = rectFromBoard(board);
  const slop = rect.w < 32 || rect.h < 32 ? 14 : 0;
  return point.x >= rect.x - slop &&
    point.x <= rect.x + rect.w + slop &&
    point.y >= rect.y - slop &&
    point.y <= rect.y + rect.h + slop;
}

export function boundsFor(boards: Board[]): Bounds | null {
  if (!boards.length) return null;
  const rects = boards.map(rectFromBoard);
  const left = Math.min(...rects.map((rect) => rect.x));
  const top = Math.min(...rects.map((rect) => rect.y));
  const right = Math.max(...rects.map((rect) => rect.x + rect.w));
  const bottom = Math.max(...rects.map((rect) => rect.y + rect.h));
  return { left, top, right, bottom, w: right - left, h: bottom - top };
}

export function rectFromBoard(board: Board): Rect {
  return boardSketchRect(board);
}

export function effectiveDepth(board: Board, defaultDepth: number): number {
  void defaultDepth;
  if (board.orientation === "vertical") return board.dimensions.width;
  if (board.orientation === "horizontal") return board.dimensions.height;
  return defaultDepth;
}

export function effectiveThickness(board: Board, defaultThickness: number): number {
  void defaultThickness;
  return board.dimensions.thickness;
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

  const leftPanel = frameBoards.find((board) => {
    const rect = rectFromBoard(board);
    return Math.abs(rect.x - bounds.left) <= 0.5 && rect.h > thickness * 2;
  });
  const rightPanel = frameBoards.find((board) => {
    const rect = rectFromBoard(board);
    return Math.abs(rect.x + rect.w - bounds.right) <= 0.5 && rect.h > thickness * 2;
  });
  const topPanel = frameBoards.find((board) => {
    const rect = rectFromBoard(board);
    return Math.abs(rect.y - bounds.top) <= 0.5 && rect.w > thickness * 2;
  });
  const bottomPanel = frameBoards.find((board) => {
    const rect = rectFromBoard(board);
    return Math.abs(rect.y + rect.h - bounds.bottom) <= 0.5 && rect.w > thickness * 2;
  });

  const innerW = Math.max(0, bounds.w - (leftPanel ? rectFromBoard(leftPanel).w : 0) - (rightPanel ? rectFromBoard(rightPanel).w : 0));
  const innerH = Math.max(0, bounds.h - (topPanel ? rectFromBoard(topPanel).h : 0) - (bottomPanel ? rectFromBoard(bottomPanel).h : 0));
  return { innerW, innerH, hasFrame: Boolean(leftPanel || rightPanel || topPanel || bottomPanel) };
}

export function connectionMarks(boards: Board[]): ConnectionMark[] {
  const marks: ConnectionMark[] = [];
  const seen = new Set<string>();
  const structuralBoards = boards.filter((board) => !isOverlayPanel(board));

  structuralBoards.forEach((host) => {
    if (host.orientation !== "horizontal" && host.orientation !== "vertical") return;
    structuralBoards.forEach((target) => {
      if (host.id === target.id) return;
      if (host.orientation === "horizontal" && target.orientation === "vertical") {
        addHorizontalConnectionMarks(host, target, marks, seen);
      }
      if (host.orientation === "vertical" && target.orientation === "horizontal") {
        addVerticalConnectionMarks(host, target, marks, seen);
      }
    });
  });

  return marks.sort((a, b) => a.hostBoardId - b.hostBoardId || a.offset - b.offset || a.targetBoardId - b.targetBoardId);
}

export function snapBoard(state: SketchState, board: Board, targetX: number, targetY: number, ignoreIds = new Set([board.id])): SnapResult {
  if (!state.snap) return { x: targetX, y: targetY, label: "Snap off", guides: [] };
  const threshold = SNAP_THRESHOLD_SCREEN_PX / state.scale;
  const snapped = {
    x: snapValueToGrid(state, targetX, "x"),
    y: snapValueToGrid(state, targetY, "y")
  };
  let label = `Grid ${state.grid} mm`;
  let bestX = threshold;
  let bestY = threshold;
  const guides: SnapGuide[] = [];
  const guideLinks: Array<{ edge: BoardEdge; target: Board; targetEdge: BoardEdge } | null> = [];
  const moving = { ...board, x: targetX, y: targetY };
  const me = rectEdges(moving);

  state.boards.forEach((other) => {
    if (ignoreIds.has(other.id)) return;
    const oe = rectEdges(other);
    const xPairs: Array<[number, number, string, BoardEdge | null, BoardEdge | null]> = [
      [me.left, oe.left, "left aligned", null, null],
      [me.right, oe.right, "right aligned", null, null],
      [me.centerX, oe.centerX, "center aligned", null, null],
      [me.left, oe.right, "touching right edge", "left", "right"],
      [me.right, oe.left, "touching left edge", "right", "left"]
    ];
    const yPairs: Array<[number, number, string, BoardEdge | null, BoardEdge | null]> = [
      [me.top, oe.top, "top aligned", null, null],
      [me.bottom, oe.bottom, "bottom aligned", null, null],
      [me.centerY, oe.centerY, "middle aligned", null, null],
      [me.top, oe.bottom, "flush below", "top", "bottom"],
      [me.bottom, oe.top, "flush above", "bottom", "top"]
    ];

    xPairs.forEach(([from, to, note, edge, targetEdge]) => {
      const delta = to - from;
      if (Math.abs(delta) < bestX) {
        snapped.x = targetX + delta;
        bestX = Math.abs(delta);
        label = note;
        guideLinks[0] = edge && targetEdge ? { edge, target: other, targetEdge } : null;
        guides[0] = { orientation: "vertical", position: to, label: note };
      }
    });

    yPairs.forEach(([from, to, note, edge, targetEdge]) => {
      const delta = to - from;
      if (Math.abs(delta) < bestY) {
        snapped.y = targetY + delta;
        bestY = Math.abs(delta);
        label = note;
        guideLinks[1] = edge && targetEdge ? { edge, target: other, targetEdge } : null;
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
        guideLinks[0] = null;
        guides[0] = { orientation: "vertical", position, label };
      }
      return;
    }

    const delta = position - me.centerY;
    if (Math.abs(delta) < bestY) {
      snapped.y = targetY + delta;
      bestY = Math.abs(delta);
      label = `${source.name} layout anchor`;
      guideLinks[1] = null;
      guides[1] = { orientation: "horizontal", position, label };
    }
  });

  const finalMoving = { ...rectFromBoard(board), x: snapped.x, y: snapped.y };
  guideLinks.forEach((link, index) => {
    if (!link || !guides[index]) return;
    guides[index].linkPoint = connectionPreviewPoint(board, finalMoving, link.edge, link.target, link.targetEdge);
  });

  return { ...snapped, label, guides: guides.filter(Boolean) };
}

export function hitResizeHandle(state: SketchState, board: Board, point: Point): ResizeHandle | null {
  const threshold = 18;
  const screenPoint = worldToScreen(state, point.x, point.y);
  const rect = rectFromBoard(board);
  const boardPoint = worldToScreen(state, rect.x, rect.y);
  const w = rect.w * state.scale;
  const h = rect.h * state.scale;
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

  if (board.orientation === "vertical") {
    rect.x = startRect.x;
    rect.w = startRect.w;
  }
  if (board.orientation === "horizontal") {
    rect.y = startRect.y;
    rect.h = startRect.h;
  }

  return snapRect(state, board, normalizeRect(rect, state.thickness), movingEdgesForHandle(handle));
}

export function resizeHandlesForBoard(board: Board): ResizeHandle[] {
  if (board.orientation === "vertical") return ["n", "s"];
  if (board.orientation === "horizontal") return ["w", "e"];
  return ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
}

export function nearestMeasurementAnchor(state: SketchState, point: Point): MeasurementAnchor {
  const threshold = Math.max(10, 12 / state.scale);
  const centerThreshold = Math.max(10, 16 / state.scale);
  let bestAnchor: MeasurementAnchor | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  state.boards.forEach((board) => {
    const rect = rectFromBoard(board);
    const edges = rectEdges(board);
    const candidates: Array<{ edge: BoardEdge; distance: number; offset: number }> = [
      { edge: "left", distance: Math.abs(point.x - edges.left), offset: point.y - rect.y },
      { edge: "right", distance: Math.abs(point.x - edges.right), offset: point.y - rect.y },
      { edge: "top", distance: Math.abs(point.y - edges.top), offset: point.x - rect.x },
      { edge: "bottom", distance: Math.abs(point.y - edges.bottom), offset: point.x - rect.x }
    ];

    candidates.forEach((candidate) => {
      const onVerticalEdge = (candidate.edge === "left" || candidate.edge === "right") &&
        point.y >= rect.y - threshold && point.y <= rect.y + rect.h + threshold;
      const onHorizontalEdge = (candidate.edge === "top" || candidate.edge === "bottom") &&
        point.x >= rect.x - threshold && point.x <= rect.x + rect.w + threshold;
      if (!(onVerticalEdge || onHorizontalEdge) || candidate.distance > threshold) return;
      if (candidate.distance < bestDistance) {
        const center = candidate.edge === "left" || candidate.edge === "right" ? rect.h / 2 : rect.w / 2;
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
  const rect = rectFromBoard(board);
  const edges = rectEdges(board);
  if (anchor.edge === "left" || anchor.edge === "right") {
    return {
      x: anchor.edge === "left" ? edges.left : edges.right,
      y: rect.y + clamp(anchor.offset, 0, rect.h)
    };
  }
  return {
    x: rect.x + clamp(anchor.offset, 0, rect.w),
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
      const ar = rectFromBoard(a);
      const br = rectFromBoard(b);
      const x = Math.max(ar.x, br.x);
      const y = Math.max(ar.y, br.y);
      const right = Math.min(ar.x + ar.w, br.x + br.w);
      const bottom = Math.min(ar.y + ar.h, br.y + br.h);
      if (right - x > 0.5 && bottom - y > 0.5) {
        overlapsFound.push({ x, y, w: right - x, h: bottom - y, boardIds: [a.id, b.id] });
      }
    }
  }
  return overlapsFound;
}

function snapRect(state: SketchState, board: Board, rect: Rect, movingEdges: BoardEdge[]): RectSnapResult {
  if (!state.snap) return { rect, label: "Snap off", guides: [] };
  const threshold = SNAP_THRESHOLD_SCREEN_PX / state.scale;
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

    if (Math.abs(nextDelta) <= threshold) {
      bestLabel = `Grid ${state.grid} mm`;
    }

    state.boards.forEach((other) => {
      if (other.id === board.id) return;
      const otherEdges = rectEdges(other);
      snapTargetsForEdge(otherEdges, edge).forEach(([target, targetLabel, targetEdge]) => {
        const delta = target - currentValue;
        if (Math.abs(delta) < bestDelta) {
          bestDelta = Math.abs(delta);
          nextDelta = delta;
          bestLabel = targetLabel;
          const previewRect = applyPreviewEdgeDelta(snapped, edge, delta, state.thickness);
          const linkPoint = targetEdge ? connectionPreviewPoint(board, previewRect, edge, other, targetEdge) : undefined;
          bestGuide = {
            orientation: edge === "left" || edge === "right" ? "vertical" : "horizontal",
            position: target,
            label: targetLabel,
            linkPoint
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
    const rect = rectFromBoard(board);
    const span = anchor.axis === "x" ? rect.w : rect.h;
    if (anchor.offset < 0 || anchor.offset > span) return [];
    return [{ anchor, board, position: (anchor.axis === "x" ? rect.x : rect.y) + anchor.offset }];
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

function snapTargetsForEdge(edges: RectEdges, edge: BoardEdge): Array<[number, string, BoardEdge | null]> {
  if (edge === "left" || edge === "right") {
    return [
      [edges.left, "left edge", edge === "right" ? "left" : null],
      [edges.right, "right edge", edge === "left" ? "right" : null],
      [edges.centerX, "vertical center", null]
    ];
  }
  return [
    [edges.top, "top edge", edge === "bottom" ? "top" : null],
    [edges.bottom, "bottom edge", edge === "top" ? "bottom" : null],
    [edges.centerY, "horizontal center", null]
  ];
}

function applyPreviewEdgeDelta(rect: Rect, edge: BoardEdge, delta: number, minSize: number): Rect {
  const preview = { ...rect };
  applyEdgeDelta(preview, edge, delta, minSize);
  return preview;
}

function connectionPreviewPoint(board: Board, rect: Rect, edge: BoardEdge, target: Board, targetEdge: BoardEdge): Point | undefined {
  if (isOverlayPanel(board) || isOverlayPanel(target)) return undefined;
  const edges = edgesForRect(rect);
  const targetRect = rectFromBoard(target);
  const targetEdges = edgesForRect(targetRect);
  const sharedEdge = edgeValue(edges, edge);
  const targetSharedEdge = edgeValue(targetEdges, targetEdge);
  if (Math.abs(sharedEdge - targetSharedEdge) > 0.5) return undefined;

  if (edge === "left" || edge === "right") {
    const top = Math.max(rect.y, targetRect.y);
    const bottom = Math.min(rect.y + rect.h, targetRect.y + targetRect.h);
    if (top > bottom + 0.5) return undefined;
    return { x: sharedEdge, y: (top + bottom) / 2 };
  }

  const left = Math.max(rect.x, targetRect.x);
  const right = Math.min(rect.x + rect.w, targetRect.x + targetRect.w);
  if (left > right + 0.5) return undefined;
  return { x: (left + right) / 2, y: sharedEdge };
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

function addHorizontalConnectionMarks(host: Board, target: Board, marks: ConnectionMark[], seen: Set<string>): void {
  const tolerance = 0.5;
  const hostRect = rectFromBoard(host);
  const targetRect = rectFromBoard(target);
  const contacts: Array<[BoardEdge, BoardEdge, number, number]> = [
    ["top", "bottom", hostRect.y, targetRect.y + targetRect.h],
    ["bottom", "top", hostRect.y + hostRect.h, targetRect.y]
  ];

  contacts.forEach(([edge, targetEdge, hostValue, targetValue]) => {
    if (Math.abs(hostValue - targetValue) > tolerance) return;
    if (overlapLength(hostRect.x, hostRect.x + hostRect.w, targetRect.x, targetRect.x + targetRect.w) <= tolerance) return;
    const offset = targetRect.x + targetRect.w / 2 - hostRect.x;
    if (offset < -tolerance || offset > hostRect.w + tolerance) return;
    addConnectionMark(marks, seen, {
      hostBoardId: host.id,
      targetBoardId: target.id,
      axis: "horizontal",
      edge,
      offset,
      point: { x: hostRect.x + offset, y: hostValue }
    }, targetEdge);
  });
}

function addVerticalConnectionMarks(host: Board, target: Board, marks: ConnectionMark[], seen: Set<string>): void {
  const tolerance = 0.5;
  const hostRect = rectFromBoard(host);
  const targetRect = rectFromBoard(target);
  const contacts: Array<[BoardEdge, BoardEdge, number, number]> = [
    ["left", "right", hostRect.x, targetRect.x + targetRect.w],
    ["right", "left", hostRect.x + hostRect.w, targetRect.x]
  ];

  contacts.forEach(([edge, targetEdge, hostValue, targetValue]) => {
    if (Math.abs(hostValue - targetValue) > tolerance) return;
    if (overlapLength(hostRect.y, hostRect.y + hostRect.h, targetRect.y, targetRect.y + targetRect.h) <= tolerance) return;
    const offset = targetRect.y + targetRect.h / 2 - hostRect.y;
    if (offset < -tolerance || offset > hostRect.h + tolerance) return;
    addConnectionMark(marks, seen, {
      hostBoardId: host.id,
      targetBoardId: target.id,
      axis: "vertical",
      edge,
      offset,
      point: { x: hostValue, y: hostRect.y + offset }
    }, targetEdge);
  });
}

function addConnectionMark(marks: ConnectionMark[], seen: Set<string>, mark: ConnectionMark, targetEdge: BoardEdge): void {
  const key = `${mark.hostBoardId}:${mark.targetBoardId}:${mark.edge}:${targetEdge}:${Math.round(mark.offset * 1000)}`;
  if (seen.has(key)) return;
  seen.add(key);
  marks.push(mark);
}

function overlapLength(a1: number, a2: number, b1: number, b2: number): number {
  return Math.min(a2, b2) - Math.max(a1, b1);
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
  const ar = rectFromBoard(a);
  const br = rectFromBoard(b);
  return ar.x < br.x + br.w - 0.5 &&
    ar.x + ar.w > br.x + 0.5 &&
    ar.y < br.y + br.h - 0.5 &&
    ar.y + ar.h > br.y + 0.5;
}
