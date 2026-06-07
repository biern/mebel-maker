import {
  computeGroups,
  computeOverlaps,
  groupBoards,
  hitResizeHandle,
  hitTest,
  innerDimensions,
  measurementAxis,
  rectFromBoard,
  resizeBoard,
  resolveMeasurementAnchor,
  snapBoard,
  snapValueToGrid,
  selectedBoards
} from "../src/geometry";
import type { Board, MeasurementAnchor, SketchState } from "../src/types";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function starterState(): SketchState {
  const thickness = 18;
  const depth = 560;
  const laminate = () => ({ left: false, right: false, front: false, back: false });
  const materialId = "birch-plywood";
  const boards: Board[] = [
    { id: 1, name: "Left side", x: 160, y: 120, w: thickness, h: 560, kind: "upright", autoThickness: "width", materialId, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 },
    { id: 2, name: "Right side", x: 962, y: 120, w: thickness, h: 560, kind: "upright", autoThickness: "width", materialId, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 },
    { id: 3, name: "Top", x: 178, y: 120, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 },
    { id: 4, name: "Bottom", x: 178, y: 662, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 },
    { id: 5, name: "Middle shelf", x: 178, y: 395, w: 784, h: thickness, kind: "shelf", autoThickness: "height", materialId, depthOverride: null, laminate: laminate(), ignoreInOrder: false, group: 0 }
  ];
  return {
    boards,
    anchors: [],
    measurements: [],
    materials: [{ id: materialId, name: "Birch plywood", color: "#d9b77e" }],
    selectedId: 1,
    selectedIds: [1],
    nextId: 6,
    nextAnchorId: 1,
    nextMeasurementId: 1,
    thickness,
    depth,
    grid: 25,
    gridOriginX: 160,
    gridOriginY: 120,
    snap: true,
    showDimensions: true,
    showFrontPanels: true,
    scale: 0.5,
    panX: 0,
    panY: 0,
    dragging: null,
    resizing: null,
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

const shelf = state.boards.find((board) => board.name === "Middle shelf");
assert(shelf, "middle shelf exists");
assert(snapBoard(state, shelf, 178, 120).guides.length > 0, "moving a shelf near another shelf should expose snap guides");

const shelfResize = resizeBoard(state, shelf, "e", rectFromBoard(shelf), { x: shelf.x + shelf.w, y: shelf.y + shelf.h / 2 }, { x: shelf.x + shelf.w + 90, y: shelf.y + 120 });
assert(shelfResize.rect.h === state.thickness, "shelf resize should keep thickness locked");
assert(shelfResize.rect.w > shelf.w, "shelf end-handle resize should change length");

const upright = state.boards.find((board) => board.name === "Left side");
assert(upright, "left side exists");
const uprightResize = resizeBoard(state, upright, "s", rectFromBoard(upright), { x: upright.x + upright.w / 2, y: upright.y + upright.h }, { x: upright.x + 80, y: upright.y + upright.h + 90 });
assert(uprightResize.rect.w === state.thickness, "upright resize should keep thickness locked");
assert(uprightResize.rect.h > upright.h, "upright end-handle resize should change height");

state.scale = 0.09;
const handleOffsetPx = 16 / state.scale;
assert(hitResizeHandle(state, upright, { x: upright.x + upright.w / 2 + handleOffsetPx, y: upright.y + upright.h }) === "s", "resize handle hit area should stay screen-sized while zoomed out");
state.scale = 0.5;

const heightA: MeasurementAnchor = { kind: "board-edge", boardId: upright.id, edge: "top", offset: upright.w + 22 };
const heightB: MeasurementAnchor = { kind: "board-edge", boardId: upright.id, edge: "bottom", offset: upright.w + 22 };
const beforeA = resolveMeasurementAnchor(state, heightA);
const beforeB = resolveMeasurementAnchor(state, heightB);
assert(beforeA && beforeB && measurementAxis(beforeA, beforeB) === "vertical", "edge anchors should resolve as vertical measurement");
upright.h = 610;
const afterA = resolveMeasurementAnchor(state, heightA);
const afterB = resolveMeasurementAnchor(state, heightB);
assert(afterA && afterB && Math.abs(afterB.y - afterA.y) === 610, "edge-anchored measurement should update after resize");

state.boards.push({ id: 6, name: "Back", x: 160, y: 120, w: 820, h: 560, kind: "back", autoThickness: "none", materialId: "birch-plywood", depthOverride: null, laminate: { left: false, right: false, front: false, back: false }, ignoreInOrder: false, group: 0 });
computeGroups(state.boards);
assert(computeOverlaps(state.boards).length === 0, "back panel should not create structural overlap warnings");
assert(hitTest(state, { x: 500, y: 404 })?.name === "Middle shelf", "back panel should not block selecting foreground shelf");

state.boards.push({ id: 7, name: "Front", x: 160, y: 120, w: 820, h: 560, kind: "front", autoThickness: "none", materialId: "birch-plywood", depthOverride: null, laminate: { left: false, right: false, front: false, back: false }, ignoreInOrder: false, group: 0 });
computeGroups(state.boards);
assert(computeOverlaps(state.boards).length === 0, "front panel should not create structural overlap warnings");
assert(hitTest(state, { x: 500, y: 404 })?.name === "Front", "visible front panel should capture clicks above structural boards");
state.showFrontPanels = false;
assert(hitTest(state, { x: 500, y: 404 })?.name === "Middle shelf", "disabled front panels should not capture clicks");
state.showFrontPanels = true;

state.boards.push({ id: 8, name: "Loose shelf", x: 178, y: 400, w: 784, h: state.thickness, kind: "shelf", autoThickness: "height", materialId: "birch-plywood", depthOverride: null, laminate: { left: false, right: false, front: false, back: false }, ignoreInOrder: false, group: 0 });
assert(computeOverlaps(state.boards).length > 0, "real overlapping shelves should create overlap feedback");

console.log("geometry smoke checks passed");
