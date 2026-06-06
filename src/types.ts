export type BoardKind = "upright" | "shelf" | "panel" | "back" | "front";
export type AutoThicknessAxis = "width" | "height" | "none";
export type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
export type BoardEdge = "left" | "right" | "top" | "bottom";
export type MeasurementAxis = "horizontal" | "vertical";

export interface Board {
  id: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: BoardKind;
  autoThickness: AutoThicknessAxis;
  materialId: string;
  depthOverride: number | null;
  laminate: LaminateEdges;
  ignoreInOrder: boolean;
  group: number;
}

export interface Material {
  id: string;
  name: string;
  color: string;
}

export interface LaminateEdges {
  left: boolean;
  right: boolean;
  front: boolean;
  back: boolean;
}

export interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  w: number;
  h: number;
}

export interface InnerDimensions {
  innerW: number;
  innerH: number;
  hasFrame: boolean;
}

export interface SketchState {
  boards: Board[];
  anchors: BoardAnchor[];
  measurements: Measurement[];
  materials: Material[];
  selectedId: number | null;
  nextId: number;
  nextAnchorId: number;
  nextMeasurementId: number;
  thickness: number;
  depth: number;
  grid: number;
  gridOriginX: number;
  gridOriginY: number;
  snap: boolean;
  showDimensions: boolean;
  showFrontPanels: boolean;
  scale: number;
  panX: number;
  panY: number;
  dragging: DragState | null;
  resizing: ResizeState | null;
  panning: PanState | null;
  snapGuides: SnapGuide[];
  tool: SketchTool;
  pendingMeasurementAnchor: MeasurementAnchor | null;
  lastSnap: string;
}

export type SketchTool = "select" | "measure";

export interface BoardAnchor {
  id: number;
  boardId: number;
  edge: BoardEdge;
  targetBoardId: number;
  targetEdge: BoardEdge;
}

export interface DragState {
  id: number;
  offsetX: number;
  offsetY: number;
}

export interface PanState {
  startX: number;
  startY: number;
  panX: number;
  panY: number;
}

export interface ResizeState {
  id: number;
  handle: ResizeHandle;
  startPoint: Point;
  startRect: Rect;
}

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RectEdges {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

export interface SnapResult {
  x: number;
  y: number;
  label: string;
  guides: SnapGuide[];
}

export interface RectSnapResult {
  rect: Rect;
  label: string;
  guides: SnapGuide[];
}

export interface SnapGuide {
  orientation: "vertical" | "horizontal";
  position: number;
  label: string;
}

export interface Measurement {
  id: number;
  name: string;
  a: MeasurementAnchor;
  b: MeasurementAnchor;
  axis: MeasurementAxis;
}

export type MeasurementAnchor = BoardEdgeAnchor | GridAnchor;

export interface BoardEdgeAnchor {
  kind: "board-edge";
  boardId: number;
  edge: BoardEdge;
  offset: number;
}

export interface GridAnchor {
  kind: "grid";
  x: number;
  y: number;
}

export interface OverlapRegion extends Rect {
  boardIds: [number, number];
}
