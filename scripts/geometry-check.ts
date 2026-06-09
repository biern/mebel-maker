import {
  computeGroups,
  connectionMarks,
  computeOverlaps,
  groupBoards,
  hitResizeHandle,
  hitTest,
  innerDimensions,
  measurementDisplayLine,
  measurementAxis,
  nearestMeasurementAnchor,
  physicalDimensions,
  rectFromBoard,
  resizeBoard,
  resolveMeasurementAnchor,
  snapBoard,
  snapValueToGrid,
  selectedBoards,
  updateDimensionsFromSketchRect
} from "../src/geometry";
import type { Board, BoardKind, LaminateEdges, MeasurementAnchor, PieceOrientation, SketchState } from "../src/types";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function laminate(): LaminateEdges {
  return { left: false, right: false, top: false, bottom: false, front: false, back: false };
}

type SavedBoardV1 = {
  id: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: BoardKind;
  autoThickness: "width" | "height" | "none";
  materialId: string;
  thicknessOverride: number | null;
  depthOverride: number | null;
  laminate: LaminateEdges;
  ignoreInOrder: boolean;
  group: number;
};

function orientationFromV1(axis: SavedBoardV1["autoThickness"]): PieceOrientation {
  if (axis === "width") return "vertical";
  if (axis === "height") return "horizontal";
  return "front";
}

function boardFromV1(board: SavedBoardV1, defaultThickness: number, defaultDepth: number): Board {
  const orientation = orientationFromV1(board.autoThickness);
  const thickness = board.thicknessOverride ?? defaultThickness;
  const dimensions = orientation === "vertical"
    ? { width: board.depthOverride ?? defaultDepth, height: board.h, thickness }
    : orientation === "horizontal"
      ? { width: board.w, height: board.depthOverride ?? defaultDepth, thickness }
      : { width: board.w, height: board.h, thickness };
  return {
    id: board.id,
    name: board.name,
    x: board.x,
    y: board.y,
    dimensions,
    orientation,
    kind: board.kind,
    materialId: board.materialId,
    laminate: board.laminate,
    ignoreInOrder: board.ignoreInOrder,
    group: board.group
  };
}

function starterState(): SketchState {
  const thickness = 18;
  const depth = 560;
  const materialId = "birch-plywood";
  const boards: Board[] = [
    boardFromV1({ id: 1, name: "Left side", x: 160, y: 120, w: thickness, h: 560, kind: "upright", autoThickness: "width", materialId, thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, thickness, depth),
    boardFromV1({ id: 2, name: "Right side", x: 962, y: 120, w: thickness, h: 560, kind: "upright", autoThickness: "width", materialId, thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, thickness, depth),
    boardFromV1({ id: 3, name: "Top", x: 178, y: 120, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, thickness, depth),
    boardFromV1({ id: 4, name: "Bottom", x: 178, y: 662, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, thickness, depth),
    boardFromV1({ id: 5, name: "Middle shelf", x: 178, y: 395, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, thickness, depth)
  ];
  return {
    boards,
    anchors: [],
    layoutAnchors: [],
    measurements: [],
    materials: [{ id: materialId, name: "Birch plywood", color: "#d9b77e" }],
    selectedId: 1,
    selectedIds: [1],
    selectedMeasurementId: null,
    nextId: 6,
    nextAnchorId: 1,
    nextLayoutAnchorId: 1,
    nextMeasurementId: 1,
    thickness,
    depth,
    grid: 25,
    gridOriginX: 160,
    gridOriginY: 120,
    snap: true,
    showDimensions: true,
    showFrontPanels: true,
    showConnectionMarks: true,
    scale: 0.5,
    panX: 0,
    panY: 0,
    dragging: null,
    resizing: null,
    measurementDragging: null,
    panning: null,
    selectionBox: null,
    snapGuides: [],
    tool: "select",
    pendingMeasurementAnchor: null,
    previewMeasurementAnchor: null,
    lastSnap: "Ready"
  };
}

const state = starterState();
computeGroups(state.boards);

assert(hitTest(state, { x: 500, y: 404 })?.name === "Middle shelf", "thin horizontal shelf should be hittable");
assert(selectedBoards(state).length === 1, "single primary selection should resolve as one selected board");
state.selectedIds = [1, 2];
assert(selectedBoards(state).length === 2, "selected board sets should resolve multiple boards");
state.selectedIds = [1];
assert(groupBoards(state, 1).length === 5, "starter cabinet should be one connected structural group");
assert(computeOverlaps(state.boards).length === 0, "starter cabinet should not begin with overlaps");
assert(snapValueToGrid(state, 171, "x") === 160, "grid snapping should use the drawing origin");

const inner = innerDimensions(groupBoards(state, 1), state.thickness);
assert(inner?.innerW === 784 && inner.innerH === 524, "inner dimensions should account for material thickness");

const leftSide = state.boards.find((board) => board.name === "Left side");
const topShelf = state.boards.find((board) => board.name === "Top");
assert(leftSide, "left side exists");
assert(topShelf, "top shelf exists");
const leftSideRect = rectFromBoard(leftSide);
const topShelfRect = rectFromBoard(topShelf);
assert(leftSide.orientation === "vertical" && leftSideRect.w === state.thickness && leftSideRect.h === 560, "schema v1 upright should project to the original sketch rectangle");
assert(topShelf.orientation === "horizontal" && topShelfRect.w === 784 && topShelfRect.h === state.thickness, "schema v1 shelf should project to the original sketch rectangle");
const leftSidePhysical = physicalDimensions(leftSide);
const topShelfPhysical = physicalDimensions(topShelf);
assert(leftSidePhysical.width === state.depth && leftSidePhysical.height === 560 && leftSidePhysical.thickness === state.thickness, "upright physical dimensions should use depth x sketch height x thickness");
assert(topShelfPhysical.width === 784 && topShelfPhysical.height === state.depth && topShelfPhysical.thickness === state.thickness, "shelf physical dimensions should use sketch width x depth x thickness");
const panelPhysical = physicalDimensions(boardFromV1({ id: 50, name: "Panel", x: 0, y: 0, w: 320, h: 240, kind: "panel", autoThickness: "none", materialId: "birch-plywood", thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, state.thickness, state.depth));
assert(panelPhysical.width === 320 && panelPhysical.height === 240 && panelPhysical.thickness === state.thickness, "front-facing panel physical dimensions should use sketch width x height x thickness");

let marks = connectionMarks(state.boards);
const topShelfOnLeftSide = marks.find((mark) => mark.hostBoardId === leftSide.id && mark.targetBoardId === topShelf.id);
assert(topShelfOnLeftSide?.axis === "vertical" && topShelfOnLeftSide.edge === "right", "horizontal shelf short edge should mark the vertical side long edge");
assert(topShelfOnLeftSide.offset === state.thickness / 2, "vertical host mark should measure the shelf centerline from the side top");

const shelf = state.boards.find((board) => board.name === "Middle shelf");
assert(shelf, "middle shelf exists");
assert(snapBoard(state, shelf, 178, 120).guides.length > 0, "moving a shelf near another shelf should expose snap guides");
const shelfRect = rectFromBoard(shelf);
state.layoutAnchors.push({ id: state.nextLayoutAnchorId, boardId: shelf.id, axis: "x", offset: shelfRect.w / 2 });
state.nextLayoutAnchorId += 1;
const divider: Board = boardFromV1({ id: 6, name: "Divider preview", x: 400, y: 138, w: state.thickness, h: 524, kind: "upright", autoThickness: "width", materialId: "birch-plywood", thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, state.thickness, state.depth);
const dividerRect = rectFromBoard(divider);
const anchorX = shelfRect.x + shelfRect.w / 2;
const dividerSnap = snapBoard(state, divider, anchorX - dividerRect.w / 2 + 6, divider.y);
assert(dividerSnap.x === anchorX - dividerRect.w / 2, "upright divider center should snap to a shelf layout anchor");
assert(dividerSnap.guides.some((guide) => guide.orientation === "vertical"), "layout anchor snap should expose a vertical guide");

const dividerBoard: Board = { ...divider, id: 60, name: "Connection divider", x: 560, dimensions: { ...divider.dimensions, height: 257 } };
state.boards.push(dividerBoard);
marks = connectionMarks(state.boards);
const dividerOnTopShelf = marks.find((mark) => mark.hostBoardId === topShelf.id && mark.targetBoardId === dividerBoard.id);
assert(dividerOnTopShelf?.axis === "horizontal" && dividerOnTopShelf.edge === "bottom", "vertical divider short edge should mark the horizontal shelf long edge");
assert(dividerOnTopShelf.offset === dividerBoard.x + state.thickness / 2 - topShelfRect.x, "horizontal host mark should measure the divider centerline from the shelf left");
const anchorCountBeforeConnectionMarks = state.anchors.length;
dividerBoard.x += 25;
const movedDividerMark = connectionMarks(state.boards).find((mark) => mark.hostBoardId === topShelf.id && mark.targetBoardId === dividerBoard.id);
assert(movedDividerMark?.offset === dividerOnTopShelf.offset + 25, "connection marks should update from current board geometry");
assert(state.anchors.length === anchorCountBeforeConnectionMarks, "derived connection marks should not add saved anchors");
state.boards = state.boards.filter((board) => board.id !== dividerBoard.id);

const shelfResize = resizeBoard(state, shelf, "e", shelfRect, { x: shelfRect.x + shelfRect.w, y: shelfRect.y + shelfRect.h / 2 }, { x: shelfRect.x + shelfRect.w + 90, y: shelfRect.y + 120 });
assert(shelfResize.rect.h === state.thickness, "shelf resize should keep thickness locked");
assert(shelfResize.rect.w > shelfRect.w, "shelf end-handle resize should change length");
const resizedShelf = { ...shelf, dimensions: { ...shelf.dimensions } };
updateDimensionsFromSketchRect(resizedShelf, shelfResize.rect);
assert(resizedShelf.dimensions.width === shelfResize.rect.w && resizedShelf.dimensions.height === state.depth, "shelf resize should update physical width while preserving physical depth");
const narrowShelf: Board = { ...shelf, id: 9, name: "Narrow shelf", dimensions: { ...shelf.dimensions, width: 700 } };
const narrowShelfRect = rectFromBoard(narrowShelf);
const narrowShelfResize = resizeBoard(
  state,
  narrowShelf,
  "e",
  narrowShelfRect,
  { x: narrowShelfRect.x + narrowShelfRect.w, y: narrowShelfRect.y + narrowShelfRect.h / 2 },
  { x: 950, y: narrowShelfRect.y + narrowShelfRect.h / 2 }
);
assert(narrowShelfResize.rect.x + narrowShelfResize.rect.w === 962, "resize should prefer nearby board edges over nearby grid lines");
assert(narrowShelfResize.guides.some((guide) => guide.linkPoint), "resize edge-to-edge snap should expose a link icon preview point");

const upright = state.boards.find((board) => board.name === "Left side");
assert(upright, "left side exists");
const uprightRect = rectFromBoard(upright);
const uprightResize = resizeBoard(state, upright, "s", uprightRect, { x: uprightRect.x + uprightRect.w / 2, y: uprightRect.y + uprightRect.h }, { x: uprightRect.x + 80, y: uprightRect.y + uprightRect.h + 90 });
assert(uprightResize.rect.w === state.thickness, "upright resize should keep thickness locked");
assert(uprightResize.rect.h > uprightRect.h, "upright end-handle resize should change height");
const resizedUpright = { ...upright, dimensions: { ...upright.dimensions } };
updateDimensionsFromSketchRect(resizedUpright, uprightResize.rect);
assert(resizedUpright.dimensions.width === state.depth && resizedUpright.dimensions.height === uprightResize.rect.h, "upright resize should update physical height while preserving physical depth");

const keptThickness = { ...upright, dimensions: { ...upright.dimensions, thickness: physicalDimensions(upright).thickness } };
assert(rectFromBoard(keptThickness).w === state.thickness && keptThickness.dimensions.thickness === 18, "thickness opt-out should preserve existing sketch thickness");
const updatedDepthShelf = { ...shelf, dimensions: { ...shelf.dimensions, height: 620 } };
assert(physicalDimensions(updatedDepthShelf).height === 620 && rectFromBoard(updatedDepthShelf).h === state.thickness, "depth updates should change physical depth without changing shelf sketch thickness");

const rotatePreview = { ...shelf, dimensions: { ...shelf.dimensions } };
const beforeRotate = physicalDimensions(rotatePreview);
rotatePreview.orientation = "vertical";
rotatePreview.kind = "upright";
const afterRotate = physicalDimensions(rotatePreview);
assert(beforeRotate.width === afterRotate.width && beforeRotate.height === afterRotate.height && beforeRotate.thickness === afterRotate.thickness, "orientation rotation should preserve physical dimensions");
assert(rectFromBoard(rotatePreview).w === state.thickness && rectFromBoard(rotatePreview).h === beforeRotate.height, "orientation rotation should re-project the sketch rectangle from preserved physical dimensions");

state.scale = 0.09;
const handleOffsetPx = 16 / state.scale;
assert(hitResizeHandle(state, upright, { x: uprightRect.x + uprightRect.w / 2 + handleOffsetPx, y: uprightRect.y + uprightRect.h }) === "s", "resize handle hit area should stay screen-sized while zoomed out");
state.scale = 0.5;

const heightA: MeasurementAnchor = { kind: "board-edge", boardId: upright.id, edge: "top", offset: uprightRect.w + 22 };
const heightB: MeasurementAnchor = { kind: "board-edge", boardId: upright.id, edge: "bottom", offset: uprightRect.w + 22 };
const beforeA = resolveMeasurementAnchor(state, heightA);
const beforeB = resolveMeasurementAnchor(state, heightB);
assert(beforeA && beforeB && measurementAxis(beforeA, beforeB) === "vertical", "edge anchors should resolve as vertical measurement");
const centeredAnchor = nearestMeasurementAnchor(state, { x: uprightRect.x, y: uprightRect.y + uprightRect.h / 2 + 5 });
assert(centeredAnchor.kind === "board-edge" && centeredAnchor.offset === uprightRect.h / 2, "measurement anchors should snap to an edge midpoint");
const displayLine = measurementDisplayLine(state, { id: 1, name: "M1", a: heightA, b: heightB, axis: "vertical", displayOffset: -24 }, 0);
assert(displayLine?.lineStart.x === Math.max(beforeA.x, beforeB.x) - 24, "measurement display offset should move the dimension line without changing anchors");
upright.dimensions.height = 610;
const afterA = resolveMeasurementAnchor(state, heightA);
const afterB = resolveMeasurementAnchor(state, heightB);
assert(afterA && afterB && Math.abs(afterB.y - afterA.y) === 610, "edge-anchored measurement should update after resize");

state.boards.push(boardFromV1({ id: 6, name: "Back", x: 160, y: 120, w: 820, h: 560, kind: "back", autoThickness: "none", materialId: "birch-plywood", thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, state.thickness, state.depth));
computeGroups(state.boards);
assert(computeOverlaps(state.boards).length === 0, "back panel should not create structural overlap warnings");
assert(hitTest(state, { x: 500, y: 404 })?.name === "Middle shelf", "back panel should not block selecting foreground shelf");
assert(connectionMarks(state.boards).every((mark) => mark.hostBoardId !== 6 && mark.targetBoardId !== 6), "back panel should not create connection marks");

state.boards.push(boardFromV1({ id: 7, name: "Front", x: 160, y: 120, w: 820, h: 560, kind: "front", autoThickness: "none", materialId: "birch-plywood", thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, state.thickness, state.depth));
computeGroups(state.boards);
assert(computeOverlaps(state.boards).length === 0, "front panel should not create structural overlap warnings");
assert(hitTest(state, { x: 500, y: 404 })?.name === "Front", "visible front panel should capture clicks above structural boards");
assert(connectionMarks(state.boards).every((mark) => mark.hostBoardId !== 7 && mark.targetBoardId !== 7), "front panel should not create connection marks");
state.showFrontPanels = false;
assert(hitTest(state, { x: 500, y: 404 })?.name === "Middle shelf", "disabled front panels should not capture clicks");
state.showFrontPanels = true;

state.boards.push(boardFromV1({ id: 8, name: "Loose shelf", x: 178, y: 400, w: 784, h: state.thickness, kind: "shelf", autoThickness: "height", materialId: "birch-plywood", thicknessOverride: null, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }, state.thickness, state.depth));
assert(computeOverlaps(state.boards).length > 0, "real overlapping shelves should create overlap feedback");

console.log("geometry smoke checks passed");
