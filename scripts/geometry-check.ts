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
import { bandingEdgeLength, bandingOrderIssue, bandingView, boardOrderKey, frontBandingEdge, groupOrderBoards, nominalCoreDimensions, normalizeBoardBanding, setBoardEdgeBanding } from "../src/edgeBanding";
import { faceDirections, flatFaceMeshIndices, isFaceLaminated, normalizeFaceLamination } from "../src/faceLamination";

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
    faceLamination: normalizeFaceLamination(undefined),
    ...normalizeBoardBanding(board),
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
    edgeBandingProfiles: [],
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
assert(topShelfOnLeftSide.labelOffset === state.thickness / 2, "near-edge connection mark labels should keep the local offset");
const bottomShelf = state.boards.find((board) => board.name === "Bottom");
assert(bottomShelf, "bottom shelf exists");
const bottomShelfOnLeftSide = marks.find((mark) => mark.hostBoardId === leftSide.id && mark.targetBoardId === bottomShelf.id);
assert(bottomShelfOnLeftSide?.offset === leftSideRect.h - state.thickness / 2, "far-edge connection mark should keep its true tick position");
assert(bottomShelfOnLeftSide.labelOffset === -state.thickness / 2, "far-edge connection mark labels should use negative half thickness");

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
assert(dividerOnTopShelf.labelOffset === dividerOnTopShelf.offset, "non-edge horizontal marks should display their true offset");
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

const bandingShelf: Board = { ...state.boards[2], dimensions: { width: 760, height: 400, thickness: 18 }, ...normalizeBoardBanding({}) };
const abs2 = { id: "oak-2", type: "ABS" as const, decor: "Oak", thickness: 2 };
const abs08 = { ...abs2, id: "oak-08", thickness: 0.8 };
const unspecifiedBand = { ...abs2, id: "oak-yes", thickness: null };
setBoardEdgeBanding(bandingShelf, "a1", unspecifiedBand);
assert(nominalCoreDimensions(bandingShelf).height === 400, "unspecified banding must preserve dimensions without assuming a thickness");
const reloadedUnspecified = normalizeBoardBanding(JSON.parse(JSON.stringify(bandingShelf)));
assert(reloadedUnspecified.edgeBanding.a1?.thickness === null && !reloadedUnspecified.bandingNeedsReview, "banding without thickness must survive project reload");
assert(boardOrderKey(bandingShelf) !== boardOrderKey({ ...bandingShelf, edgeBanding: { ...bandingShelf.edgeBanding, a1: null } }), "unspecified banding must stay distinct from no banding in orders");

setBoardEdgeBanding(bandingShelf, "a1", abs2);
assert(frontBandingEdge(bandingShelf) === "a1" && bandingEdgeLength(bandingShelf, "a1") === 760, "front shelf banding should use its full physical width");
assert(bandingView(bandingShelf.orientation).edges.bottom === frontBandingEdge(bandingShelf), "shelf inspector must show the physical front edge at the bottom");
assert(nominalCoreDimensions(bandingShelf).height === 398 && nominalCoreDimensions(bandingShelf).width === 760, "front shelf banding should reduce only nominal depth");
assert(bandingShelf.dimensions.height === 400 && rectFromBoard(bandingShelf).h === 18, "banding must preserve finished geometry and drawing dimensions");
setBoardEdgeBanding(bandingShelf, "b1", abs08);
setBoardEdgeBanding(bandingShelf, "b2", abs08);
assert(nominalCoreDimensions(bandingShelf).width === 758.4, "two 0.8 mm bands must preserve fractional core dimensions");
setBoardEdgeBanding(bandingShelf, "a2", abs08);
setBoardEdgeBanding(bandingShelf, "a1", null);
assert(bandingShelf.edgeBanding.a2?.thickness === 0.8 && bandingShelf.edgeBanding.b1?.thickness === 0.8, "editing one edge must preserve other profiles");
assert(bandingShelf.edgeBanding.a2 !== abs08 && bandingShelf.edgeBanding.a2 !== bandingShelf.edgeBanding.b1, "profiles must be independent snapshots on each edge");

const bandingSide: Board = { ...state.boards[0], dimensions: { width: 400, height: 720, thickness: 18 }, ...normalizeBoardBanding({}) };
setBoardEdgeBanding(bandingSide, "b1", abs2);
assert(frontBandingEdge(bandingSide) === "b1" && bandingEdgeLength(bandingSide, "b1") === 720, "upright front band must use height rather than projected 18 mm thickness");
assert(bandingView(bandingSide.orientation).edges.bottom === frontBandingEdge(bandingSide) && bandingView(bandingSide.orientation).horizontalAxis === "B", "upright inspector must rotate its flat view to show front at the bottom");
assert(nominalCoreDimensions(bandingSide).width === 398 && nominalCoreDimensions(bandingSide).height === 720, "front upright band should reduce only nominal depth");
const signature = boardOrderKey(bandingSide);
bandingSide.orientation = "horizontal";
assert(boardOrderKey(bandingSide) === signature && bandingSide.edgeBanding.b1?.thickness === 2, "changing projection must preserve physical edge identity and order grouping");
const sameSide: Board = { ...bandingSide, id: 501, ...normalizeBoardBanding(bandingSide) };
assert(groupOrderBoards([bandingSide, sameSide]).length === 1, "manufacturing-identical pieces should group despite IDs");
sameSide.faceLamination = "s1";
assert(groupOrderBoards([bandingSide, sameSide]).length === 2, "different flat-face lamination must separate order rows");
sameSide.faceLamination = "s2";
assert(boardOrderKey(sameSide) !== signature, "opposite laminated faces must stay distinct in orders");
sameSide.faceLamination = "both";
sameSide.grainDirection = "a";
assert(groupOrderBoards([bandingSide, sameSide]).length === 2, "grain directions must separate order rows");
sameSide.grainDirection = "none";
setBoardEdgeBanding(sameSide, "b1", { ...abs2, decor: "Graphite" });
assert(boardOrderKey(sameSide) !== signature, "different banding decors must not group");
setBoardEdgeBanding(sameSide, "b1", abs08);
assert(boardOrderKey(sameSide) !== signature, "different band thicknesses must not group");
setBoardEdgeBanding(sameSide, "b1", null);
setBoardEdgeBanding(sameSide, "b2", abs2);
assert(boardOrderKey(sameSide) !== signature, "opposite banded edges must remain distinct");
sameSide.dimensions = { width: 1, height: 720, thickness: 18 };
assert(bandingOrderIssue(sameSide) === "invalidCore", "nonpositive core must block order output");
sameSide.ignoreInOrder = true;
assert(groupOrderBoards([bandingSide, sameSide].filter((board) => !board.ignoreInOrder)).length === 1, "ignored pieces must be excluded from order grouping");

const legacyFlags = { ...laminate(), front: true, left: true };
const legacyBoard: Board = { ...bandingSide, ...normalizeBoardBanding({ laminate: legacyFlags }) };
assert(bandingOrderIssue(legacyBoard) === "review" && legacyBoard.legacyLaminate?.front && legacyBoard.legacyLaminate.left, "legacy banding flags must survive with explicit order review");
assert(Object.values(legacyBoard.edgeBanding).every((profile) => profile === null), "legacy migration must not invent physical edges, decor or thickness");
const reloadedLegacy = normalizeBoardBanding(JSON.parse(JSON.stringify(legacyBoard)));
assert(reloadedLegacy.bandingNeedsReview && reloadedLegacy.legacyLaminate?.left, "saved migration review must survive reload");
const reloadedBanding = normalizeBoardBanding(JSON.parse(JSON.stringify(bandingShelf)));
assert(reloadedBanding.edgeBanding.a2?.thickness === 0.8 && !reloadedBanding.bandingNeedsReview, "new per-edge profiles must survive reload without legacy review");
assert(normalizeBoardBanding({ edgeBanding: { a1: { ...abs2, thickness: -2 } } }).bandingNeedsReview, "invalid imported banding profiles must require review");
assert(!normalizeBoardBanding({ laminate: laminate() }).bandingNeedsReview, "older boards without banding should load without unnecessary review");

assert(normalizeFaceLamination(undefined) === "both", "older projects must default to double-sided flat-face lamination");
assert(normalizeFaceLamination("unknown") === "both", "unknown flat-face modes should use the requested default");
assert(isFaceLaminated("both", "s1") && isFaceLaminated("both", "s2"), "both flat faces must be finished by default");
assert(isFaceLaminated("s1", "s1") && !isFaceLaminated("s1", "s2"), "single-sided finish must affect only its selected face");
assert(!isFaceLaminated("none", "s1") && !isFaceLaminated("none", "s2"), "no finish must leave both broad faces bare");
assert(faceDirections("horizontal").join(",") === "bottom,top" && faceDirections("vertical").join(",") === "right,left" && faceDirections("front").join(",") === "front,back", "face names must identify the selected physical sides in each orientation");
assert(flatFaceMeshIndices("horizontal").join(",") === "3,2" && flatFaceMeshIndices("vertical").join(",") === "0,1" && flatFaceMeshIndices("front").join(",") === "4,5", "3D finish must affect the broad faces, independently of edge banding");
assert(bandingView("horizontal").visibleFace === "s2" && bandingView("vertical").visibleFace === "s1", "rotating the flat inspector view must preserve the reference face identity, including shelf flips");
const finishedDimensions = JSON.stringify(bandingShelf.dimensions);
const finishedEdges = JSON.stringify(bandingShelf.edgeBanding);
bandingShelf.faceLamination = "s2";
const reloadedFaces = JSON.parse(JSON.stringify(bandingShelf));
assert(normalizeFaceLamination(reloadedFaces.faceLamination) === "s2", "selected flat-face finish must survive project serialization");
assert(JSON.stringify(bandingShelf.dimensions) === finishedDimensions && JSON.stringify(bandingShelf.edgeBanding) === finishedEdges, "flat-face finish changes must preserve dimensions and edge profiles");

console.log("geometry, edge banding and flat-face lamination smoke checks passed");
