import { boardAreaM2, orderAreaSummary } from "./orderArea";
import { SketchRenderer } from "./renderer";
import { Visualization3DRenderer } from "./visualization3d";
import { translate } from "./i18n";
import complexTemplateSource from "../templates/complex.mebel?raw";
import { bandingEdgeDirection, bandingEdgeLength, bandingOrderIssue, bandingProfileKey, bandingView, edgeBandingEdges, frontBandingEdge, groupOrderBoards, legacyLaminateEdges, nominalCoreDimensions, normalizeBandingProfile, normalizeBoardBanding, setBoardEdgeBanding } from "./edgeBanding";
import { faceDirections, isFaceLaminated, normalizeFaceLamination } from "./faceLamination";
import {
  boardLabel,
  boundsFor,
  computeGroups,
  computeOverlaps,
  defaultMeasurementDisplayOffset,
  effectiveDepth,
  effectiveThickness,
  groupBoards,
  hitTest,
  hitResizeHandle,
  hitTestMeasurement,
  innerDimensions,
  measurementDisplayLine,
  measurementDisplayOffset,
  measurementAxis,
  mm,
  nearestMeasurementAnchor,
  orientationForKind,
  rectFromBoard,
  resizeBoard,
  resolveMeasurementAnchor,
  screenToWorld,
  selectedBoard,
  selectedBoards,
  selectedMeasurement,
  snapBoard,
  snapValueToGrid,
  updateDimensionsFromSketchRect,
  worldToScreen
} from "./geometry";
import type { Board, BoardAnchor, BoardEdge, BoardKind, BoardLayoutAnchor, EdgeBandingEdge, EdgeBandingProfile, LaminateEdges, LayoutAnchorAxis, Material, MeasurementAnchor, MeasurementAxis, PieceDimensions, PieceOrientation, Point, Rect, ResizeHandle, SketchState } from "./types";

declare global {
  interface Window {
    mebleBuilderDebug?: {
      state: SketchState;
      hitTestWorld: (point: Point) => string | null;
      snapPreview: (boardName: string, x: number, y: number) => number;
      overlaps: () => number;
      refresh: () => void;
    };
  }
}

const canvas = query<HTMLCanvasElement>("#sketchCanvas");
const view3dCanvas = query<HTMLCanvasElement>("#view3dCanvas");
const ui = {
  projectNameInput: query<HTMLInputElement>("#projectNameInput"),
  templateChooser: query<HTMLElement>("#templateChooser"),
  canvasWrap: query<HTMLElement>("#canvasWrap"),
  templateList: query<HTMLElement>("#templateList"),
  measureModeBtn: query<HTMLButtonElement>("#measureModeBtn"),
  presetList: query<HTMLElement>("#presetList"),
  thicknessInput: query<HTMLInputElement>("#thicknessInput"),
  depthInput: query<HTMLInputElement>("#depthInput"),
  gridInput: query<HTMLInputElement>("#gridInput"),
  snapToggle: query<HTMLInputElement>("#snapToggle"),
  dimToggle: query<HTMLInputElement>("#dimToggle"),
  frontLayerToggle: query<HTMLInputElement>("#frontLayerToggle"),
  connectionMarksToggle: query<HTMLInputElement>("#connectionMarksToggle"),
  duplicateBtn: query<HTMLButtonElement>("#duplicateBtn"),
  rotateBtn: query<HTMLButtonElement>("#rotateBtn"),
  undoBtn: query<HTMLButtonElement>("#undoBtn"),
  redoBtn: query<HTMLButtonElement>("#redoBtn"),
  measureWidthBtn: query<HTMLButtonElement>("#measureWidthBtn"),
  measureHeightBtn: query<HTMLButtonElement>("#measureHeightBtn"),
  saveBtn: query<HTMLButtonElement>("#saveBtn"),
  loadBtn: query<HTMLButtonElement>("#loadBtn"),
  newProjectBtn: query<HTMLButtonElement>("#newProjectBtn"),
  projectFileInput: query<HTMLInputElement>("#projectFileInput"),
  deleteBtn: query<HTMLButtonElement>("#deleteBtn"),
  fitBtn: query<HTMLButtonElement>("#fitBtn"),
  printSketchBtn: query<HTMLButtonElement>("#printSketchBtn"),
  view3dBtn: query<HTMLButtonElement>("#view3dBtn"),
  copyCsvBtn: query<HTMLButtonElement>("#copyCsvBtn"),
  exportBtn: query<HTMLButtonElement>("#exportBtn"),
  printOrderBtn: query<HTMLButtonElement>("#printOrderBtn"),
  notificationToast: query<HTMLElement>("#notificationToast"),
  selectionStatus: query<HTMLElement>("#selectionStatus"),
  snapStatus: query<HTMLElement>("#snapStatus"),
  emptySelection: query<HTMLElement>("#emptySelection"),
  inspector: query<HTMLFormElement>("#inspector"),
  nameInput: query<HTMLInputElement>("#nameInput"),
  xInput: query<HTMLInputElement>("#xInput"),
  yInput: query<HTMLInputElement>("#yInput"),
  wInput: query<HTMLInputElement>("#wInput"),
  hInput: query<HTMLInputElement>("#hInput"),
  depthOverrideInput: query<HTMLInputElement>("#depthOverrideInput"),
  layoutAnchorAxisInput: query<HTMLSelectElement>("#layoutAnchorAxisInput"),
  layoutAnchorCountInput: query<HTMLInputElement>("#layoutAnchorCountInput"),
  layoutAnchorBalanceInput: query<HTMLInputElement>("#layoutAnchorBalanceInput"),
  layoutAnchorStartInput: query<HTMLSelectElement>("#layoutAnchorStartInput"),
  layoutAnchorEndInput: query<HTMLSelectElement>("#layoutAnchorEndInput"),
  layoutAnchorStartLabel: query<HTMLElement>("#layoutAnchorStartLabel"),
  layoutAnchorEndLabel: query<HTMLElement>("#layoutAnchorEndLabel"),
  layoutAnchorThicknessInput: query<HTMLInputElement>("#layoutAnchorThicknessInput"),
  layoutAnchorApplyBtn: query<HTMLButtonElement>("#layoutAnchorApplyBtn"),
  layoutAnchorClearBtn: query<HTMLButtonElement>("#layoutAnchorClearBtn"),
  layoutAnchorSummary: query<HTMLElement>("#layoutAnchorSummary"),
  materialSelect: query<HTMLElement>("#materialSelect"),
  materialSelectButton: query<HTMLButtonElement>("#materialSelectButton"),
  materialSelectList: query<HTMLElement>("#materialSelectList"),
  materialSelectSwatch: query<HTMLElement>("#materialSelectSwatch"),
  materialSelectText: query<HTMLElement>("#materialSelectText"),
  materialInput: query<HTMLSelectElement>("#materialInput"),
  materialLabelSwatch: query<HTMLElement>("#materialLabelSwatch"),
  faceLaminationInput: query<HTMLSelectElement>("#faceLaminationInput"),
  faceLaminationHint: query<HTMLElement>("#faceLaminationHint"),
  materialForm: query<HTMLFormElement>("#materialForm"),
  materialNameInput: query<HTMLInputElement>("#materialNameInput"),
  materialColorInput: query<HTMLInputElement>("#materialColorInput"),
  addMaterialBtn: query<HTMLButtonElement>("#addMaterialBtn"),
  bandingProfileInput: query<HTMLSelectElement>("#bandingProfileInput"),
  bandingDiagram: query<HTMLElement>("#bandingDiagram"),
  bandingViewLabel: query<HTMLElement>("#bandingViewLabel"),
  bandingBoardFace: query<HTMLElement>("#bandingBoardFace"),
  bandingEdgeFields: query<HTMLElement>("#bandingEdgeFields"),
  bandingPresets: query<HTMLElement>("#bandingPresets"),
  bandingTypeInput: query<HTMLSelectElement>("#bandingTypeInput"),
  bandingDecorInput: query<HTMLInputElement>("#bandingDecorInput"),
  bandingThicknessInput: query<HTMLInputElement>("#bandingThicknessInput"),
  addBandingProfileBtn: query<HTMLButtonElement>("#addBandingProfileBtn"),
  grainInput: query<HTMLSelectElement>("#grainInput"),
  bandingDimensions: query<HTMLElement>("#bandingDimensions"),
  bandingReview: query<HTMLElement>("#bandingReview"),
  bandingReviewText: query<HTMLElement>("#bandingReviewText"),
  confirmBandingBtn: query<HTMLButtonElement>("#confirmBandingBtn"),
  ignoreOrderInput: query<HTMLInputElement>("#ignoreOrderInput"),
  measureList: query<HTMLElement>("#measureList"),
  warningList: query<HTMLElement>("#warningList"),
  cutList: query<HTMLElement>("#cutList"),
  orderLegend: query<HTMLElement>("#orderLegend"),
  ignoredCutList: query<HTMLElement>("#ignoredCutList"),
  rightPanelTools: query<HTMLElement>("#rightPanelTools"),
  woodOrderPanel: query<HTMLElement>("#woodOrderPanel"),
  woodOrderToggleBtn: query<HTMLButtonElement>("#woodOrderToggleBtn"),
  woodOrderBackBtn: query<HTMLButtonElement>("#woodOrderBackBtn"),
  materialList: query<HTMLElement>("#materialList"),
  anchorOverlay: query<HTMLElement>("#anchorOverlay"),
  overlayScaleBar: query<HTMLElement>("#overlayScaleBar"),
  overlayScaleLabel: query<HTMLElement>("#overlayScaleLabel"),
  overlayZoomLabel: query<HTMLElement>("#overlayZoomLabel"),
  measureRenameForm: query<HTMLFormElement>("#measureRenameForm"),
  measureRenameInput: query<HTMLInputElement>("#measureRenameInput"),
  measureRenameCancelBtn: query<HTMLButtonElement>("#measureRenameCancelBtn")
};

const state: SketchState = {
  projectName: "",
  boards: [],
  anchors: [],
  layoutAnchors: [],
  measurements: [],
  materials: defaultMaterials(),
  edgeBandingProfiles: [],
  selectedId: null,
  selectedIds: [],
  selectedMeasurementId: null,
  nextId: 1,
  nextAnchorId: 1,
  nextLayoutAnchorId: 1,
  nextMeasurementId: 1,
  thickness: 18,
  depth: 560,
  grid: 25,
  gridOriginX: 160,
  gridOriginY: 120,
  snap: true,
  showDimensions: true,
  showFrontPanels: false,
  showConnectionMarks: true,
  scale: 0.62,
  panX: 160,
  panY: 110,
  dragging: null,
  resizing: null,
  measurementDragging: null,
  panning: null,
  selectionBox: null,
  snapGuides: [],
  tool: "select",
  pendingMeasurementAnchor: null,
  previewMeasurementAnchor: null,
  lastSnap: t("common.ready")
};

const renderer = new SketchRenderer(canvas, state);
const visualization3d = new Visualization3DRenderer(view3dCanvas, state);
const storageKey = "mebel-maker-project";
const appVersion = import.meta.env.VITE_APP_VERSION;
const historyLimit = 80;
const minFitScale = 0.125;
const minWheelScale = 0.09;
const maxFitScale = 1.3;
const maxWheelScale = 2;
const originViewMargin = 46;
const controllerEvents = new AbortController();
const listenerOptions = { signal: controllerEvents.signal };
const undoStack: SavedProject[] = [];
const redoStack: SavedProject[] = [];
let notificationTimer: number | undefined;
let renamingMeasurementId: number | null = null;
let activeView: "sketch" | "3d" = "sketch";
let woodOrderOpen = false;
let bandingBrush = "matching-yes";
let sketchPrintRestore: { showConnectionMarks: boolean; showFrontPanels: boolean; view: "sketch" | "3d" } | null = null;
let sketchPrintRestoreTimer: number | undefined;

interface SavedProject {
  schemaVersion?: 1 | 2 | 3 | 4;
  version: 1 | string;
  appVersion?: string;
  projectName?: string;
  boards: SavedBoard[];
  anchors?: BoardAnchor[];
  layoutAnchors?: BoardLayoutAnchor[];
  measurements: SketchState["measurements"];
  materials?: Material[];
  edgeBandingProfiles?: EdgeBandingProfile[];
  selectedId: number | null;
  selectedIds?: number[];
  selectedMeasurementId?: number | null;
  nextId: number;
  nextAnchorId?: number;
  nextLayoutAnchorId?: number;
  nextMeasurementId: number;
  thickness: number;
  grid: number;
  gridOriginX: number;
  gridOriginY: number;
  snap: boolean;
  showDimensions: boolean;
  showFrontPanels?: boolean;
  showConnectionMarks?: boolean;
  scale: number;
  panX: number;
  panY: number;
  depth?: number;
}

type LegacyAutoThicknessAxis = "width" | "height" | "none";

type SavedBoard = Partial<Board> & {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  kind?: BoardKind;
  autoThickness?: LegacyAutoThicknessAxis;
  thicknessOverride?: number | null;
  depthOverride?: number | null;
  laminate?: Partial<LaminateEdges>;
};

interface PiecePreset {
  name: string;
  kind: BoardKind;
  orientation: PieceOrientation;
  w: () => number;
  h: () => number;
}

type TemplateId = "cabinet" | "bookcase" | "base-cabinet" | "wall-cabinet" | "simple-box" | "complex";

const presets: Record<string, PiecePreset> = {
  side: { name: t("pieces.side"), kind: "upright", orientation: "vertical", w: () => state.thickness, h: () => 560 },
  shelf: { name: t("pieces.shelf"), kind: "shelf", orientation: "horizontal", w: () => 820 - state.thickness * 2, h: () => state.thickness },
  divider: { name: t("pieces.divider"), kind: "upright", orientation: "vertical", w: () => state.thickness, h: () => 560 - state.thickness * 2 },
  back: { name: t("pieces.back"), kind: "back", orientation: "front", w: () => 820, h: () => 560 },
  front: { name: t("pieces.front"), kind: "front", orientation: "front", w: () => 820, h: () => 560 }
};

const defaultMaterialId = "birch-plywood";

function query<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

function t(id: string, values?: Record<string, string | number | boolean | Date | null | undefined>): string {
  return translate(id, values ? { values } : undefined);
}

function defaultMaterials(): Material[] {
  return [
    { id: "birch-plywood", name: defaultMaterialName("birch-plywood"), color: "#d9b77e" },
    { id: "oak", name: defaultMaterialName("oak"), color: "#c99756" },
    { id: "walnut", name: defaultMaterialName("walnut"), color: "#7a4f34" },
    { id: "pine", name: defaultMaterialName("pine"), color: "#e1c889" },
    { id: "white-melamine", name: defaultMaterialName("white-melamine"), color: "#f5f3ec" },
    { id: "black", name: defaultMaterialName("black"), color: "#252525" },
    { id: "white", name: defaultMaterialName("white"), color: "#ffffff" },
    { id: "gray", name: defaultMaterialName("gray"), color: "#9aa0a6" },
    { id: "red", name: defaultMaterialName("red"), color: "#b8483b" },
    { id: "blue", name: defaultMaterialName("blue"), color: "#3f75a3" },
    { id: "green", name: defaultMaterialName("green"), color: "#538052" }
  ];
}

function defaultMaterialName(materialId: string): string {
  const names: Record<string, string> = {
    "birch-plywood": t("materials.birchPlywood"),
    oak: t("materials.oak"),
    walnut: t("materials.walnut"),
    pine: t("materials.pine"),
    "white-melamine": t("materials.whiteMelamine"),
    black: t("materials.black"),
    white: t("materials.white"),
    gray: t("materials.gray"),
    red: t("materials.red"),
    blue: t("materials.blue"),
    green: t("materials.green")
  };
  return names[materialId] ?? "";
}

function displayMaterialName(material: Material): string {
  return defaultMaterialName(material.id) || material.name;
}

function normalizedMaterials(materials?: Material[]): Material[] {
  const defaults = defaultMaterials();
  if (!materials?.length) return defaults;
  const seen = new Set<string>();
  const valid = materials.filter((material) => {
    const ok = material.id && material.name && /^#[0-9a-f]{6}$/i.test(material.color) && !seen.has(material.id);
    if (ok) seen.add(material.id);
    return ok;
  });
  return valid.some((material) => material.id === defaultMaterialId) ? valid : [...defaults, ...valid];
}

function normalizedAnchors(anchors?: BoardAnchor[]): BoardAnchor[] {
  if (!anchors?.length) return [];
  const boardIds = new Set(state.boards.map((board) => board.id));
  const validEdges: BoardEdge[] = ["left", "right", "top", "bottom"];
  const seen = new Set<string>();
  return anchors.filter((anchor) => {
    const key = `${anchor.boardId}:${anchor.edge}:${anchor.targetBoardId}:${anchor.targetEdge}`;
    const ok = boardIds.has(anchor.boardId) &&
      boardIds.has(anchor.targetBoardId) &&
      anchor.boardId !== anchor.targetBoardId &&
      validEdges.includes(anchor.edge) &&
      validEdges.includes(anchor.targetEdge) &&
      !seen.has(key);
    if (ok) seen.add(key);
    return ok;
  });
}

function normalizedLayoutAnchors(layoutAnchors?: BoardLayoutAnchor[]): BoardLayoutAnchor[] {
  if (!layoutAnchors?.length) return [];
  const boardIds = new Set(state.boards.map((board) => board.id));
  const seen = new Set<string>();
  return layoutAnchors.filter((anchor) => {
    const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
    const offset = Number(anchor.offset);
    const rect = board ? rectFromBoard(board) : null;
    const span = anchor.axis === "x" ? rect?.w : rect?.h;
    const key = `${anchor.boardId}:${anchor.axis}:${Math.round(offset * 1000)}`;
    const ok = boardIds.has(anchor.boardId) &&
      (anchor.axis === "x" || anchor.axis === "y") &&
      Number.isFinite(offset) &&
      offset >= 0 &&
      span !== undefined &&
      offset <= span &&
      !seen.has(key);
    if (ok) seen.add(key);
    return ok;
  }).map((anchor) => ({ ...anchor, offset: Math.round(anchor.offset) }));
}

function defaultPieceName(id: number): string {
  return `P${id}`;
}

function defaultMeasureName(id: number): string {
  return `M${id}`;
}

function isLegacyDefaultPieceName(name: string): boolean {
  return /^(Board \d+|Side|Shelf|Shelf \d+|Divider|Back|Front|Left side|Right side|Top|Bottom|Middle shelf|Left adjustable shelf|Right adjustable shelf|Center divider)( copy)?$/.test(name);
}

function normalizedPieceName(name: string | undefined, id: number): string {
  const trimmed = name?.trim() ?? "";
  return !trimmed || isLegacyDefaultPieceName(trimmed) ? defaultPieceName(id) : trimmed;
}

function selectedIdSet(): Set<number> {
  const ids = new Set(state.selectedIds);
  if (state.selectedId !== null) ids.add(state.selectedId);
  return ids;
}

function setSelection(ids: number[], primaryId: number | null = ids[0] ?? null): void {
  const boardIds = new Set(state.boards.map((board) => board.id));
  const unique = [...new Set(ids)].filter((id) => boardIds.has(id));
  const primary = primaryId !== null && unique.includes(primaryId) ? primaryId : unique[0] ?? null;
  state.selectedId = primary;
  state.selectedIds = unique;
  if (unique.length) state.selectedMeasurementId = null;
}

function clearSelection(): void {
  setSelection([]);
}

function setMeasurementSelection(id: number | null): void {
  state.selectedMeasurementId = id !== null && state.measurements.some((measurement) => measurement.id === id) ? id : null;
  if (state.selectedMeasurementId !== null) {
    state.selectedId = null;
    state.selectedIds = [];
  }
}

function toggleBoardSelection(boardId: number): void {
  const ids = selectedIdSet();
  if (ids.has(boardId)) ids.delete(boardId);
  else ids.add(boardId);
  setSelection([...ids], ids.has(boardId) ? boardId : [...ids][0] ?? null);
}

function normalizedMeasureName(name: string | undefined, id: number): string {
  const trimmed = name?.trim() ?? "";
  return trimmed || defaultMeasureName(id);
}

function withDefaults(board: SavedBoard): Board {
  const materialId = board.materialId && state.materials.some((material) => material.id === board.materialId)
    ? board.materialId
    : defaultMaterialId;
  const kind = board.kind ?? "panel";
  const orientation = normalizePieceOrientation(board.orientation, kind, board.autoThickness);
  const normalized: Board = {
    id: board.id,
    name: normalizedPieceName(board.name, board.id),
    x: Number.isFinite(Number(board.x)) ? Math.round(Number(board.x)) : 120,
    y: Number.isFinite(Number(board.y)) ? Math.round(Number(board.y)) : 120,
    dimensions: normalizePieceDimensions(board, orientation),
    orientation,
    kind,
    materialId,
    faceLamination: normalizeFaceLamination(board.faceLamination),
    ...normalizeBoardBanding(board),
    ignoreInOrder: board.ignoreInOrder ?? false,
    group: board.group ?? 0
  };
  return normalized;
}

function nextBoardId(boards: Board[] = state.boards): number {
  return Math.max(0, ...boards.map((board) => board.id)) + 1;
}

function nextMeasureId(measurements = state.measurements): number {
  return Math.max(0, ...measurements.map((measurement) => measurement.id)) + 1;
}

function nextAnchorId(anchors = state.anchors): number {
  return Math.max(0, ...anchors.map((anchor) => anchor.id)) + 1;
}

function nextLayoutAnchorId(layoutAnchors = state.layoutAnchors): number {
  return Math.max(0, ...layoutAnchors.map((anchor) => anchor.id)) + 1;
}

function edgeLabel(edge: keyof LaminateEdges | BoardEdge): string {
  const labels: Record<keyof LaminateEdges | BoardEdge, string> = {
    left: t("inspector.left"),
    right: t("inspector.right"),
    top: t("inspector.top"),
    bottom: t("inspector.bottom"),
    front: t("inspector.front"),
    back: t("inspector.back")
  };
  return labels[edge];
}

function bandingNumber(value: number): string {
  return new Intl.NumberFormat(document.documentElement.lang || "en", { maximumFractionDigits: 3 }).format(value);
}

function physicalSizeLabel(dimensions: PieceDimensions): string {
  return `${bandingNumber(dimensions.width)} × ${bandingNumber(dimensions.height)} × ${bandingNumber(dimensions.thickness)} mm`;
}

function bandingExportLabel(profile: EdgeBandingProfile | null): string {
  if (!profile) return t("metrics.none");
  return profile.thickness === null ? t("banding.yes") : `${bandingNumber(profile.thickness)} mm`;
}

function bandingProfileLabel(profile: EdgeBandingProfile | null, compact = false): string {
  if (!profile) return t("metrics.none");
  if (compact && profile.id.startsWith("match-")) return bandingExportLabel(profile);
  return `${profile.type === "veneer" ? t("banding.veneer") : profile.type} · ${profile.decor} · ${bandingExportLabel(profile)}`;
}

function bandingProfileOptions(): string {
  return [
    `<option value="matching-yes">${escapeHtml(t("banding.yes"))}</option>`,
    `<option value="matching-08">${escapeHtml(t("banding.matching", { thickness: bandingNumber(0.8) }))}</option>`,
    `<option value="matching-2">${escapeHtml(t("banding.matching", { thickness: 2 }))}</option>`,
    ...state.edgeBandingProfiles.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(bandingProfileLabel(profile))}</option>`)
  ].join("");
}

function profileForChoice(choice: string, board: Board): EdgeBandingProfile | null {
  if (choice === "matching-yes" || choice === "matching-08" || choice === "matching-2") {
    const thickness = choice === "matching-yes" ? null : choice === "matching-08" ? 0.8 : 2;
    return { id: `match-${board.materialId}-${thickness}`, type: "ABS", decor: materialName(board.materialId), thickness };
  }
  return state.edgeBandingProfiles.find((profile) => profile.id === choice) ?? null;
}

function legacyBandingLabel(board: Board): string {
  return board.legacyLaminate
    ? legacyLaminateEdges.filter((edge) => board.legacyLaminate![edge]).map(edgeLabel).join(", ")
    : "";
}

function grainLabel(board: Board): string {
  return t(board.grainDirection === "a" ? "banding.grainA" : board.grainDirection === "b" ? "banding.grainB" : "banding.grainNone");
}

function faceLaminationLabel(board: Board): string {
  const labels = { both: "both", s1: "onlyS1", s2: "onlyS2", none: "none" };
  return t(`faceLamination.${labels[normalizeFaceLamination(board.faceLamination)]}`);
}

function updateFaceLaminationInspector(boards: Board[]): void {
  ui.faceLaminationInput.value = commonValue(boards, (board) => board.faceLamination) ?? "";
  const orientation = boards.every((board) => board.orientation === boards[0].orientation) ? boards[0].orientation : null;
  const directions = orientation ? faceDirections(orientation).map(edgeLabel) : null;
  (["s1", "s2"] as const).forEach((side, index) => {
    ui.faceLaminationInput.querySelector<HTMLOptionElement>(`option[value='${side}']`)!.textContent = directions
      ? t("faceLamination.onlyDirection", { side: side.toUpperCase(), direction: directions[index] })
      : t(side === "s1" ? "faceLamination.onlyS1" : "faceLamination.onlyS2");
  });
  ui.faceLaminationHint.textContent = directions
    ? t("faceLamination.directionHint", { first: directions[0], second: directions[1] })
    : t("faceLamination.referenceHint");
}

function updateBandingInspector(boards: Board[]): void {
  const first = boards[0];
  const view = bandingView(boards.every((board) => board.orientation === first.orientation) ? first.orientation : null);
  ui.bandingViewLabel.textContent = t("banding.flatViewAxes", { horizontal: view.horizontalAxis, vertical: view.verticalAxis, arrow: view.verticalArrow });
  if (bandingBrush !== "matching-yes" && bandingBrush !== "matching-08" && bandingBrush !== "matching-2" && !state.edgeBandingProfiles.some((profile) => profile.id === bandingBrush)) bandingBrush = "matching-yes";
  const options = bandingProfileOptions();
  ui.bandingProfileInput.innerHTML = options;
  ui.bandingProfileInput.value = bandingBrush;
  ui.bandingPresets.querySelector<HTMLButtonElement>("[data-banding-preset='front']")!.hidden = !boards.every((board) => frontBandingEdge(board));
  edgeBandingEdges.forEach((edge) => {
    const direction = commonValue(boards, (board) => bandingEdgeDirection(board, edge));
    const name = direction ? `${edgeLabel(direction as keyof LaminateEdges)} · ${edge.toUpperCase()}` : `${edge.toUpperCase()} · ${t("banding.mixedNames")}`;
    const length = commonValue(boards, (board) => String(bandingEdgeLength(board, edge)));
    const lengthLabel = length === null ? t("common.mixed") : `${bandingNumber(Number(length))} mm`;
    const commonProfile = commonValue(boards, (board) => bandingProfileKey(board.edgeBanding[edge]));
    const profile = first.edgeBanding[edge];
    const label = commonProfile === null ? t("common.mixed") : bandingProfileLabel(profile, true);
    const button = ui.bandingDiagram.querySelector<HTMLButtonElement>(`[data-banding-edge='${edge}']`)!;
    const pressed = commonProfile === null ? "mixed" : profile ? "true" : "false";
    button.setAttribute("aria-pressed", pressed);
    button.setAttribute("aria-label", `${name}, ${lengthLabel}, ${label}`);
    button.title = `${name}: ${label}`;
    button.innerHTML = `<span>${escapeHtml(name)}</span><span>${escapeHtml(lengthLabel)}</span><span>${escapeHtml(commonProfile === null ? t("common.mixed") : bandingExportLabel(profile))}</span>`;
    const edgeLabelElement = query<HTMLElement>(`#bandingLabel-${edge}`);
    edgeLabelElement.textContent = `${name} · ${lengthLabel}`;
    const select = ui.bandingEdgeFields.querySelector<HTMLSelectElement>(`[data-banding-input='${edge}']`)!;
    const selected = commonProfile === null ? "" : profile ? "current" : "none";
    select.innerHTML = `${selected !== "none" ? `<option value="${selected}" disabled>${escapeHtml(label)}</option>` : ""}<option value="none">${escapeHtml(t("metrics.none"))}</option>${options}`;
    select.value = selected;
    select.title = label;
  });
  Object.entries(view.edges).forEach(([position, edge]) => {
    const button = ui.bandingDiagram.querySelector<HTMLButtonElement>(`[data-banding-edge='${edge}']`)!;
    button.style.gridColumn = position === "left" ? "1" : position === "right" ? "3" : "2";
    button.style.gridRow = position === "top" ? "1" : position === "bottom" ? "3" : "2";
    ui.bandingBoardFace.classList.toggle(`banded-${position}`, boards.some((board) => board.edgeBanding[edge]));
  });
  const a = commonValue(boards, (board) => String(board.dimensions.width));
  const b = commonValue(boards, (board) => String(board.dimensions.height));
  const [width, height] = view.horizontalAxis === "A" ? [a, b] : [b, a];
  const visibleFace = commonValue(boards, (board) => String(isFaceLaminated(board.faceLamination, view.visibleFace)));
  const visibleFaceLabel = visibleFace === null ? t("common.mixed") : t(visibleFace === "true" ? "faceLamination.laminated" : "faceLamination.unlaminated");
  ui.bandingBoardFace.innerHTML = `<span>${width === null ? "—" : bandingNumber(Number(width))} × ${height === null ? "—" : bandingNumber(Number(height))}</span><span>${view.horizontalAxis} →<br>${view.verticalAxis} ${view.verticalArrow}</span><span>${view.visibleFace.toUpperCase()} · ${escapeHtml(visibleFaceLabel)}</span>`;
  (["a", "b"] as const).forEach((axis) => {
    ui.grainInput.querySelector<HTMLOptionElement>(`option[value='${axis}']`)!.textContent = t("banding.grainAlongAxis", { axis: axis.toUpperCase(), arrow: view.horizontalAxis.toLowerCase() === axis ? "→" : view.verticalArrow });
  });
  ui.grainInput.value = commonValue(boards, (board) => board.grainDirection) ?? "";
  const finished = commonValue(boards, (board) => physicalSizeLabel(board.dimensions));
  const core = commonValue(boards, (board) => physicalSizeLabel(nominalCoreDimensions(board)));
  const needsReview = boards.some((board) => board.bandingNeedsReview);
  const invalidCore = boards.some((board) => bandingOrderIssue(board) === "invalidCore" || nominalCoreDimensions(board).width <= 0 || nominalCoreDimensions(board).height <= 0);
  ui.bandingDimensions.innerHTML = `<div><span>${escapeHtml(t(needsReview ? "banding.projectSize" : "banding.finished"))}</span><strong>${escapeHtml(finished ?? t("common.mixed"))}</strong></div><div${invalidCore ? ' class="banding-invalid"' : ""}><span>${escapeHtml(t("banding.core"))}</span><strong>${escapeHtml(core ?? t("common.mixed"))}</strong></div>${boards.length > 1 ? `<small>${escapeHtml(t("banding.multiNote"))}</small>` : ""}`;
  ui.bandingReview.hidden = !needsReview && !invalidCore;
  ui.bandingReviewText.innerHTML = `${invalidCore ? escapeHtml(t("banding.invalidCore")) : ""}${needsReview ? `<div>${escapeHtml(t(boards.some((board) => board.legacyLaminate) ? "banding.review" : "banding.reviewRequired"))}</div>${boards.filter((board) => board.legacyLaminate).map((board) => `<div><strong>${escapeHtml(board.name)}</strong>: ${escapeHtml(legacyBandingLabel(board))}</div>`).join("")}` : ""}`;
  ui.confirmBandingBtn.hidden = !needsReview;
  ui.confirmBandingBtn.disabled = invalidCore;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char] ?? char));
}

function materialName(materialId: string): string {
  const material = state.materials.find((item) => item.id === materialId);
  return material ? displayMaterialName(material) : t("inspector.unknownMaterial");
}

function materialColor(materialId: string): string {
  return state.materials.find((material) => material.id === materialId)?.color ?? state.materials[0].color;
}

function materialById(materialId: string): Material | null {
  return state.materials.find((material) => material.id === materialId) ?? null;
}

function materialIdFromName(name: string): string {
  const base = name.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "custom-material";
  let candidate = base;
  let suffix = 2;
  while (state.materials.some((material) => material.id === candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function normalizedColor(value: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#c99756";
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : fallback;
}

function normalizeOptionalPositiveNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function normalizeMeasurementDisplayOffset(value: unknown, index: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : defaultMeasurementDisplayOffset(index);
}

function orientationForLegacyAutoThickness(axis: unknown): PieceOrientation {
  if (axis === "width") return "vertical";
  if (axis === "height") return "horizontal";
  return "front";
}

function normalizePieceOrientation(value: unknown, kind: BoardKind, autoThickness?: LegacyAutoThicknessAxis): PieceOrientation {
  if (value === "vertical" || value === "horizontal" || value === "front") return value;
  if (autoThickness) return orientationForLegacyAutoThickness(autoThickness);
  return orientationForKind(kind);
}

function dimensionsFromSketch(orientation: PieceOrientation, sketchW: number, sketchH: number): PieceDimensions {
  if (orientation === "vertical") {
    return { width: state.depth, height: sketchH, thickness: sketchW };
  }
  if (orientation === "horizontal") {
    return { width: sketchW, height: state.depth, thickness: sketchH };
  }
  return { width: sketchW, height: sketchH, thickness: state.thickness };
}

function normalizePieceDimensions(board: SavedBoard, orientation: PieceOrientation): PieceDimensions {
  const saved = board.dimensions as Partial<PieceDimensions> | undefined;
  const fallbackThickness = normalizePositiveNumber(board.thicknessOverride, state.thickness);
  const fallbackDepth = normalizeOptionalPositiveNumber(board.depthOverride) ?? state.depth;
  const fallbackWidth = normalizePositiveNumber(board.w, 400);
  const fallbackHeight = normalizePositiveNumber(board.h, 250);

  if (orientation === "vertical") {
    return {
      width: normalizePositiveNumber(saved?.width, fallbackDepth),
      height: normalizePositiveNumber(saved?.height, fallbackHeight),
      thickness: normalizePositiveNumber(saved?.thickness, fallbackThickness)
    };
  }

  if (orientation === "horizontal") {
    return {
      width: normalizePositiveNumber(saved?.width, fallbackWidth),
      height: normalizePositiveNumber(saved?.height, fallbackDepth),
      thickness: normalizePositiveNumber(saved?.thickness, fallbackThickness)
    };
  }

  return {
    width: normalizePositiveNumber(saved?.width, fallbackWidth),
    height: normalizePositiveNumber(saved?.height, fallbackHeight),
    thickness: normalizePositiveNumber(saved?.thickness, fallbackThickness)
  };
}

function displayY(y: number): number {
  return -y;
}

function modelY(y: number): number {
  return -y;
}

function addBoard(partial: Partial<Board> & { kind: BoardKind; orientation: PieceOrientation }, recordHistory = true): void {
  if (recordHistory) remember();
  const board: Board = {
    id: state.nextId,
    name: normalizedPieceName(partial.name, state.nextId),
    x: partial.x ?? 120,
    y: partial.y ?? 120,
    dimensions: partial.dimensions ?? dimensionsFromSketch(partial.orientation, 400, 250),
    orientation: partial.orientation,
    kind: partial.kind,
    materialId: partial.materialId ?? defaultMaterialId,
    faceLamination: normalizeFaceLamination(partial.faceLamination),
    ...normalizeBoardBanding(partial),
    ignoreInOrder: partial.ignoreInOrder ?? false,
    group: 0
  };
  state.nextId += 1;
  state.boards.push(board);
  setSelection([board.id], board.id);
  anchorTouchedBoard(board.id);
  refresh();
}

function addTemplateBoard(partial: Partial<Board> & { kind: BoardKind; orientation: PieceOrientation }): void {
  addBoard(partial, false);
}

function addSketchBoard(x: number, y: number, w: number, h: number, kind: BoardKind, orientation: PieceOrientation): void {
  addTemplateBoard({ x, y, dimensions: dimensionsFromSketch(orientation, w, h), kind, orientation });
}

function beginTemplate(recordHistory: boolean, x: number, y: number): void {
  if (recordHistory) remember();
  state.boards = [];
  state.anchors = [];
  state.layoutAnchors = [];
  state.measurements = [];
  state.nextId = 1;
  state.nextAnchorId = 1;
  state.nextLayoutAnchorId = 1;
  state.nextMeasurementId = 1;
  state.selectedMeasurementId = null;
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.gridOriginX = x;
  state.gridOriginY = y;
}

function addOpenFrame(x: number, y: number, outerW: number, outerH: number): void {
  const t = state.thickness;
  const innerW = outerW - 2 * t;
  addSketchBoard(x, y, t, outerH, "upright", "vertical");
  addSketchBoard(x + outerW - t, y, t, outerH, "upright", "vertical");
  addSketchBoard(x + t, y, innerW, t, "shelf", "horizontal");
  addSketchBoard(x + t, y + outerH - t, innerW, t, "shelf", "horizontal");
}

function addBackPanel(x: number, y: number, outerW: number, outerH: number): void {
  addSketchBoard(x, y, outerW, outerH, "back", "front");
}

function addShelf(x: number, y: number, outerW: number): void {
  const t = state.thickness;
  addSketchBoard(x + t, y, outerW - 2 * t, t, "shelf", "horizontal");
}

function addDivider(x: number, y: number, h: number): void {
  const t = state.thickness;
  addSketchBoard(x, y, t, h, "upright", "vertical");
}

function createTemplate(templateId: TemplateId, recordHistory = true): void {
  const t = state.thickness;
  const x = 0;

  if (templateId === "complex") {
    createProjectFileTemplate(complexTemplateSource, templateLabel(templateId), recordHistory);
    return;
  }

  beginTemplate(recordHistory, x, 0);

  if (templateId === "cabinet") {
    const outerW = 820;
    const outerH = 560;
    const y = -outerH;
    addOpenFrame(x, y, outerW, outerH);
    addShelf(x, y + 275, outerW);
  }

  if (templateId === "bookcase") {
    const outerW = 760;
    const outerH = 1280;
    const y = -outerH;
    addOpenFrame(x, y, outerW, outerH);
    [320, 560, 800, 1040].forEach((shelfY) => addShelf(x, y + shelfY, outerW));
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "base-cabinet") {
    const outerW = 820;
    const outerH = 720;
    const y = -outerH;
    const dividerX = x + outerW / 2 - t / 2;
    const shelfY = y + 360;
    addOpenFrame(x, y, outerW, outerH);
    addSketchBoard(x + t, shelfY, dividerX - x - t, t, "shelf", "horizontal");
    addSketchBoard(dividerX + t, shelfY, x + outerW - t - (dividerX + t), t, "shelf", "horizontal");
    addDivider(dividerX, y + t, outerH - 2 * t);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "wall-cabinet") {
    const outerW = 720;
    const outerH = 640;
    const y = -outerH;
    addOpenFrame(x, y, outerW, outerH);
    addShelf(x, y + 315, outerW);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "simple-box") {
    const outerW = 520;
    const outerH = 360;
    const y = -outerH;
    addOpenFrame(x, y, outerW, outerH);
  }

  setSelection([1], 1);
  state.lastSnap = templateLabel(templateId);
  fitToView();
}

function templateLabel(templateId: TemplateId): string {
  const labels: Record<TemplateId, string> = {
    cabinet: t("templates.cabinet"),
    bookcase: t("templates.bookcase"),
    "base-cabinet": t("templates.baseCabinet"),
    "wall-cabinet": t("templates.wallCabinet"),
    "simple-box": t("templates.simpleBox"),
    complex: t("templates.complex")
  };
  return labels[templateId];
}

function createProjectFileTemplate(source: string, label: string, recordHistory: boolean): void {
  try {
    const project = JSON.parse(source) as SavedProject;
    if (!isSupportedProject(project)) throw new Error(t("status.unsupportedTemplateFile"));
    applyProject({ ...project, projectName: label }, recordHistory);
    state.lastSnap = label;
    fitToView();
  } catch {
    state.lastSnap = t("status.couldNotCreateTemplate");
    notify(t("status.couldNotCreateTemplate"));
    updateInspector();
  }
}

function createBlankProject(recordHistory = true): void {
  if (recordHistory) remember();
  state.projectName = "";
  state.boards = [];
  state.anchors = [];
  state.layoutAnchors = [];
  state.measurements = [];
  state.selectedId = null;
  state.selectedIds = [];
  state.selectedMeasurementId = null;
  state.nextId = 1;
  state.nextAnchorId = 1;
  state.nextLayoutAnchorId = 1;
  state.nextMeasurementId = 1;
  state.dragging = null;
  state.resizing = null;
  state.measurementDragging = null;
  state.panning = null;
  state.selectionBox = null;
  state.snapGuides = [];
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.gridOriginX = 0;
  state.gridOriginY = 0;
  setOriginBottomLeftView();
  state.lastSnap = recordHistory ? t("status.newProject") : t("common.ready");
  refresh();
}

function newProjectWithConfirmation(): void {
  const hasProjectContent = Boolean(state.projectName) || state.boards.length > 0 || state.measurements.length > 0;
  if (!hasProjectContent) {
    state.lastSnap = t("status.readyForNewProject");
    updateInspector();
    return;
  }
  if (!window.confirm(t("dialogs.newProjectConfirm"))) return;
  createBlankProject();
  notify(t("status.newProjectReady"));
}

function refresh(): void {
  computeGroups(state.boards);
  drawActiveView();
  renderTemplateChooser();
  renderAnchorOverlay();
  renderMaterials();
  updateInspector();
  renderMeasurements();
  renderWarnings();
  renderCutList();
  renderRightPanelMode();
  autosaveProject();
}

function renderRightPanelMode(): void {
  ui.rightPanelTools.hidden = woodOrderOpen;
  ui.woodOrderPanel.hidden = !woodOrderOpen;
  ui.woodOrderToggleBtn.classList.toggle("active", woodOrderOpen);
  ui.woodOrderToggleBtn.setAttribute("aria-pressed", String(woodOrderOpen));
  ui.woodOrderToggleBtn.title = woodOrderOpen ? t("workspace.hideWoodOrder") : t("workspace.showWoodOrder");
  ui.woodOrderToggleBtn.setAttribute("aria-label", woodOrderOpen ? t("workspace.hideWoodOrder") : t("workspace.showWoodOrder"));
}

function renderTemplateChooser(): void {
  ui.templateChooser.hidden = state.boards.length > 0 || state.measurements.length > 0;
}

function drawActiveView(): void {
  if (activeView === "3d") {
    visualization3d.draw();
    return;
  }
  renderer.draw();
}

function resizeActiveView(): void {
  if (activeView === "3d") {
    visualization3d.resize();
    return;
  }
  renderer.resize();
}

function setActiveView(view: "sketch" | "3d"): void {
  if (activeView === view) return;
  activeView = view;
  ui.canvasWrap.dataset.view = view;
  ui.view3dBtn.classList.toggle("active", view === "3d");
  ui.view3dBtn.setAttribute("aria-pressed", String(view === "3d"));
  state.lastSnap = view === "3d" ? t("status.view3d") : t("status.sketchView");
  window.requestAnimationFrame(() => {
    resizeActiveView();
    updateInspector();
  });
}

function cloneProject(project: SavedProject): SavedProject {
  return JSON.parse(JSON.stringify(project)) as SavedProject;
}

function remember(): void {
  undoStack.push(serializeProject());
  if (undoStack.length > historyLimit) undoStack.shift();
  redoStack.length = 0;
}

function undo(): void {
  const previous = undoStack.pop();
  if (!previous) {
    state.lastSnap = t("status.nothingToUndo");
    updateInspector();
    return;
  }
  redoStack.push(serializeProject());
  applyProject(previous, false);
  state.lastSnap = t("status.undone");
  updateInspector();
}

function redo(): void {
  const next = redoStack.pop();
  if (!next) {
    state.lastSnap = t("status.nothingToRedo");
    updateInspector();
    return;
  }
  undoStack.push(serializeProject());
  applyProject(next, false);
  state.lastSnap = t("status.redone");
  updateInspector();
}

function serializeProject(): SavedProject {
  return cloneProject({
    schemaVersion: 4,
    version: appVersion,
    appVersion,
    projectName: state.projectName,
    boards: state.boards,
    anchors: state.anchors,
    layoutAnchors: state.layoutAnchors,
    measurements: state.measurements,
    materials: state.materials,
    edgeBandingProfiles: state.edgeBandingProfiles,
    selectedId: state.selectedId,
    selectedIds: state.selectedIds,
    selectedMeasurementId: state.selectedMeasurementId,
    nextId: state.nextId,
    nextAnchorId: state.nextAnchorId,
    nextLayoutAnchorId: state.nextLayoutAnchorId,
    nextMeasurementId: state.nextMeasurementId,
    thickness: state.thickness,
    depth: state.depth,
    grid: state.grid,
    gridOriginX: state.gridOriginX,
    gridOriginY: state.gridOriginY,
    snap: state.snap,
    showDimensions: state.showDimensions,
    showFrontPanels: state.showFrontPanels,
    showConnectionMarks: state.showConnectionMarks,
    scale: state.scale,
    panX: state.panX,
    panY: state.panY
  });
}

function applyProject(project: SavedProject, recordHistory = true): void {
  if (recordHistory) remember();
  state.projectName = normalizeProjectName(project.projectName);
  state.materials = normalizedMaterials(project.materials);
  const profiles = (project.edgeBandingProfiles ?? []).map(normalizeBandingProfile).filter((profile): profile is EdgeBandingProfile => profile !== null);
  state.edgeBandingProfiles = profiles.filter((profile, index) => profiles.findIndex((item) => item.id === profile.id) === index);
  state.thickness = normalizePositiveNumber(project.thickness, state.thickness);
  state.depth = normalizePositiveNumber(project.depth, state.depth);
  state.boards = (project.boards ?? []).map(withDefaults);
  state.anchors = normalizedAnchors(project.anchors);
  state.layoutAnchors = normalizedLayoutAnchors(project.layoutAnchors);
  state.measurements = (project.measurements ?? []).map((measurement, index) => ({
    ...measurement,
    name: normalizedMeasureName(measurement.name, measurement.id),
    displayOffset: normalizeMeasurementDisplayOffset(measurement.displayOffset, index)
  }));
  const savedSelection = project.selectedIds?.length ? project.selectedIds : project.selectedId ? [project.selectedId] : [];
  state.selectedMeasurementId = null;
  setSelection(savedSelection, project.selectedId);
  if (!savedSelection.length) setMeasurementSelection(project.selectedMeasurementId ?? null);
  state.nextId = project.nextId ?? nextBoardId(state.boards);
  state.nextAnchorId = project.nextAnchorId ?? nextAnchorId(state.anchors);
  state.nextLayoutAnchorId = project.nextLayoutAnchorId ?? nextLayoutAnchorId(state.layoutAnchors);
  state.nextMeasurementId = project.nextMeasurementId ?? nextMeasureId(state.measurements);
  state.grid = project.grid ?? state.grid;
  state.gridOriginX = project.gridOriginX ?? (boundsFor(state.boards)?.left ?? state.gridOriginX);
  state.gridOriginY = project.gridOriginY ?? (boundsFor(state.boards)?.top ?? state.gridOriginY);
  state.snap = project.snap ?? state.snap;
  state.showDimensions = project.showDimensions ?? state.showDimensions;
  state.showFrontPanels = project.showFrontPanels ?? state.showFrontPanels;
  state.showConnectionMarks = project.showConnectionMarks ?? true;
  state.scale = project.scale ?? state.scale;
  state.panX = project.panX ?? state.panX;
  state.panY = project.panY ?? state.panY;
  state.dragging = null;
  state.resizing = null;
  state.measurementDragging = null;
  state.panning = null;
  state.selectionBox = null;
  state.snapGuides = [];
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  syncSettingsInputs();
  refresh();
}

function isSupportedProject(project: SavedProject): boolean {
  return [1, 2, 3, 4].includes(project.schemaVersion ?? (project.version === 1 ? 1 : 2)) && Array.isArray(project.boards);
}

function autosaveProject(): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(serializeProject()));
  } catch {
    // Autosave should never interrupt drawing.
  }
}

function loadAutosavedProject(): boolean {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return false;
    const project = JSON.parse(raw) as SavedProject;
    if (!isSupportedProject(project)) throw new Error("Unsupported project file");
    applyProject(project, false);
    state.lastSnap = t("status.restoredAutosave");
    updateInspector();
    return true;
  } catch {
    state.lastSnap = t("status.couldNotRestoreAutosave");
    updateInspector();
    return false;
  }
}

function loadInitialProject(): void {
  const hotProject = import.meta.hot?.data.project as SavedProject | undefined;
  if (hotProject && isSupportedProject(hotProject)) {
    applyProject(hotProject, false);
    state.lastSnap = t("status.restoredHotReload");
    updateInspector();
    return;
  }

  if (!loadAutosavedProject()) createBlankProject(false);
}

function exportProjectFile(): void {
  const json = JSON.stringify(serializeProject(), null, 2);
  downloadTextFile(json, "application/json", `${projectFilenameBase()}-${filenameTimestamp()}.mebel`);
  state.lastSnap = t("status.projectExported");
  notify(t("status.savedProject"));
  updateInspector();
}

function normalizeProjectName(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 80) : "";
}

function filenameTimestamp(date = new Date()): string {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z").replace(/:/g, "-");
}

function projectFilenameBase(): string {
  const safeName = state.projectName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return safeName || "mebel-maker";
}

function downloadTextFile(content: string, type: string, filename: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openProjectFilePicker(): void {
  ui.projectFileInput.value = "";
  ui.projectFileInput.click();
  notify(t("status.chooseProjectFile"));
}

function importProjectFile(file: File): void {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const project = JSON.parse(String(reader.result ?? "")) as SavedProject;
      if (!isSupportedProject(project)) throw new Error("Unsupported project file");
      applyProject(project);
      state.lastSnap = t("status.projectImported");
      notify(t("status.loadedProject"));
      updateInspector();
    } catch {
      state.lastSnap = t("status.couldNotImportProject");
      notify(t("status.couldNotLoadProject"));
      updateInspector();
    }
  });
  reader.addEventListener("error", () => {
    state.lastSnap = t("status.couldNotReadFile");
    notify(t("status.couldNotReadFile"));
    updateInspector();
  });
  reader.readAsText(file);
}

function notify(message: string): void {
  window.clearTimeout(notificationTimer);
  ui.notificationToast.textContent = message;
  ui.notificationToast.hidden = false;
  notificationTimer = window.setTimeout(() => {
    ui.notificationToast.hidden = true;
  }, 2400);
}

function syncSettingsInputs(): void {
  ui.projectNameInput.value = state.projectName;
  ui.thicknessInput.value = String(state.thickness);
  ui.layoutAnchorThicknessInput.value = String(state.thickness);
  ui.depthInput.value = String(state.depth);
  ui.gridInput.value = String(state.grid);
  ui.snapToggle.checked = state.snap;
  ui.dimToggle.checked = state.showDimensions;
  ui.frontLayerToggle.checked = state.showFrontPanels;
  ui.connectionMarksToggle.checked = state.showConnectionMarks;
}

function commonValue<T>(items: T[], read: (item: T) => string): string | null {
  if (!items.length) return null;
  const first = read(items[0]);
  return items.every((item) => read(item) === first) ? first : null;
}

function layoutAnchorsForBoard(boardId: number, axis?: LayoutAnchorAxis): BoardLayoutAnchor[] {
  return state.layoutAnchors
    .filter((anchor) => anchor.boardId === boardId && (!axis || anchor.axis === axis))
    .sort((a, b) => a.offset - b.offset);
}

function defaultLayoutAnchorAxis(board: Board): LayoutAnchorAxis {
  if (board.orientation === "vertical") return "y";
  return "x";
}

function updateLayoutAnchorAxisLabels(): void {
  const axis = selectedLayoutAnchorAxis();
  ui.layoutAnchorStartLabel.textContent = axis === "x" ? t("inspector.leftEdge") : t("inspector.topEdge");
  ui.layoutAnchorEndLabel.textContent = axis === "x" ? t("inspector.rightEdge") : t("inspector.bottomEdge");
}

function updateLayoutBalanceControls(): void {
  const disabled = ui.layoutAnchorBalanceInput.disabled || !ui.layoutAnchorBalanceInput.checked;
  ui.layoutAnchorStartInput.disabled = disabled;
  ui.layoutAnchorEndInput.disabled = disabled;
  ui.layoutAnchorThicknessInput.disabled = disabled;
}

function setInputValue(input: HTMLInputElement, value: string | null, placeholder = t("common.mixed")): void {
  input.value = value ?? "";
  input.placeholder = value === null ? placeholder : "";
}

function setCheckboxValue(input: HTMLInputElement, value: boolean | null): void {
  input.checked = value ?? false;
  input.indeterminate = value === null;
}

function commitOnChangeOrEnter(input: HTMLInputElement, onChange: (event: Event) => void): void {
  input.addEventListener("change", onChange, listenerOptions);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    input.blur();
  }, listenerOptions);
}

function setSelectionButtonsDisabled(disabled: boolean): void {
  ui.duplicateBtn.disabled = disabled;
  ui.rotateBtn.disabled = disabled;
  ui.measureWidthBtn.disabled = disabled;
  ui.measureHeightBtn.disabled = disabled;
}

function updateInspector(): void {
  const board = selectedBoard(state);
  const boards = selectedBoards(state);
  const measure = selectedMeasurement(state);
  const selectionBounds = boundsFor(boards);
  const hasSelection = boards.length > 0;
  const multi = boards.length > 1;
  ui.emptySelection.hidden = hasSelection;
  ui.inspector.hidden = !hasSelection;
  ui.selectionStatus.textContent = multi && selectionBounds
    ? `${t("status.boardsSelected", { count: boards.length })} · ${mm(selectionBounds.w)} × ${mm(selectionBounds.h)}`
    : board ? boardLabel(board) : measure ? `${t("workspace.measureName")} ${measure.name}` : t("workspace.noBoardSelected");
  ui.snapStatus.textContent = state.lastSnap;
  updateViewportOverlay();
  ui.measureModeBtn.classList.toggle("active", state.tool === "measure");
  ui.undoBtn.disabled = !undoStack.length;
  ui.redoBtn.disabled = !redoStack.length;
  setSelectionButtonsDisabled(!hasSelection);
  ui.deleteBtn.disabled = !hasSelection && !measure;
  ui.deleteBtn.title = measure ? t("workspace.deleteSelectedMeasurement") : t("workspace.deleteSelectedBoards");
  ui.deleteBtn.setAttribute("aria-label", measure ? t("workspace.deleteSelectedMeasurement") : t("workspace.deleteSelectedBoards"));
  canvas.classList.toggle("measure-mode", state.tool === "measure");
  if (state.tool === "measure") canvas.style.cursor = "";
  ui.wInput.disabled = false;
  ui.hInput.disabled = false;
  ui.nameInput.disabled = false;
  ui.layoutAnchorAxisInput.disabled = !board || multi;
  ui.layoutAnchorCountInput.disabled = !board || multi;
  ui.layoutAnchorBalanceInput.disabled = !board || multi;
  ui.layoutAnchorApplyBtn.disabled = !board || multi;
  ui.layoutAnchorClearBtn.disabled = !board || multi || layoutAnchorsForBoard(board.id).length === 0;
  if (!board || multi) ui.layoutAnchorSummary.textContent = t("inspector.noLayoutAnchors");
  ui.materialLabelSwatch.style.background = board && !multi ? materialColor(board.materialId) : "transparent";
  if (!hasSelection) {
    updateLayoutBalanceControls();
    return;
  }

  if (multi) {
    ui.nameInput.disabled = true;
    setInputValue(ui.nameInput, null, t("status.boardsSelected", { count: boards.length }));
    setInputValue(ui.xInput, selectionBounds ? String(Math.round(selectionBounds.left)) : null);
    setInputValue(ui.yInput, selectionBounds ? String(Math.round(displayY(selectionBounds.top))) : null);
    setInputValue(ui.wInput, null);
    setInputValue(ui.hInput, null);
    ui.wInput.disabled = true;
    ui.hInput.disabled = true;
  } else if (board) {
    const rect = rectFromBoard(board);
    const axis = layoutAnchorsForBoard(board.id).at(0)?.axis ?? defaultLayoutAnchorAxis(board);
    const anchors = layoutAnchorsForBoard(board.id, axis);
    ui.nameInput.value = board.name;
    ui.nameInput.placeholder = "";
    ui.xInput.value = String(Math.round(rect.x));
    ui.yInput.value = String(Math.round(displayY(rect.y)));
    ui.wInput.value = String(Math.round(rect.w));
    ui.hInput.value = String(Math.round(rect.h));
    ui.wInput.placeholder = board.orientation === "vertical" && board.dimensions.thickness === state.thickness ? t("common.global") : "";
    ui.hInput.placeholder = board.orientation === "horizontal" && board.dimensions.thickness === state.thickness ? t("common.global") : "";
    if (board.orientation === "vertical" && board.dimensions.thickness === state.thickness) ui.wInput.value = "";
    if (board.orientation === "horizontal" && board.dimensions.thickness === state.thickness) ui.hInput.value = "";
    ui.depthOverrideInput.value = effectiveDepth(board, state.depth) === state.depth ? "" : String(effectiveDepth(board, state.depth));
    ui.materialInput.value = board.materialId;
    ui.layoutAnchorAxisInput.value = axis;
    updateLayoutAnchorAxisLabels();
    if (anchors.length) ui.layoutAnchorCountInput.value = String(anchors.length);
    if (!ui.layoutAnchorThicknessInput.value) ui.layoutAnchorThicknessInput.value = String(state.thickness);
    ui.layoutAnchorSummary.textContent = anchors.length
      ? anchors.map((anchor) => mm(anchor.offset)).join(", ")
      : t("inspector.noLayoutAnchors");
    ui.wInput.disabled = false;
    ui.hInput.disabled = false;
  }

  const materialId = commonValue(boards, (item) => item.materialId);
  const depthOverride = commonValue(boards, (item) => effectiveDepth(item, state.depth) === state.depth ? "" : String(effectiveDepth(item, state.depth)));
  ui.materialInput.value = materialId ?? "";
  syncMaterialSelect();
  setInputValue(ui.depthOverrideInput, depthOverride, t("common.mixed"));
  ui.materialLabelSwatch.style.background = materialId ? materialColor(materialId) : "transparent";
  updateFaceLaminationInspector(boards);
  updateBandingInspector(boards);
  setCheckboxValue(ui.ignoreOrderInput, commonValue(boards, (item) => String(item.ignoreInOrder)) === null ? null : boards[0].ignoreInOrder);
  updateLayoutBalanceControls();
}

function updateViewportOverlay(): void {
  const scaleLength = niceScaleLength(118 / state.scale);
  const scalePx = Math.max(28, Math.min(90, scaleLength * state.scale));
  ui.overlayScaleBar.style.setProperty("--scale-width", `${scalePx}px`);
  ui.overlayScaleLabel.textContent = mm(scaleLength);
  ui.overlayZoomLabel.textContent = t("workspace.zoom", { percent: Math.round(state.scale * 100) });
}

function niceScaleLength(targetMm: number): number {
  const exponent = Math.floor(Math.log10(Math.max(1, targetMm)));
  const base = 10 ** exponent;
  const fraction = targetMm / base;
  if (fraction >= 5) return 5 * base;
  if (fraction >= 2) return 2 * base;
  return base;
}

function closeMaterialSelect(): void {
  ui.materialSelectList.hidden = true;
  ui.materialSelectButton.setAttribute("aria-expanded", "false");
}

function syncMaterialSelect(): void {
  const material = ui.materialInput.value ? materialById(ui.materialInput.value) : null;
  ui.materialSelectText.textContent = material ? `${displayMaterialName(material)} (${material.color.toUpperCase()})` : t("inspector.mixedMaterials");
  ui.materialSelectSwatch.style.background = material ? material.color : "linear-gradient(135deg, #d9b77e 0 50%, #7a4f34 50% 100%)";
  ui.materialSelectSwatch.classList.toggle("mixed", !material);
  ui.materialSelectList.querySelectorAll<HTMLElement>("[data-material-id]").forEach((option) => {
    const selected = option.dataset.materialId === ui.materialInput.value;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-selected", String(selected));
  });
}

function toggleMaterialSelect(): void {
  const open = ui.materialSelectList.hidden;
  ui.materialSelectList.hidden = !open;
  ui.materialSelectButton.setAttribute("aria-expanded", String(open));
  if (open) syncMaterialSelect();
}

function setWoodOrderOpen(open: boolean): void {
  woodOrderOpen = open;
  state.lastSnap = open ? t("status.woodOrder") : t("status.properties");
  renderRightPanelMode();
  updateInspector();
}

function selectBoardFromOrder(boardId: number): void {
  const board = state.boards.find((item) => item.id === boardId);
  if (!board) return;
  setSelection([board.id], board.id);
  state.tool = "select";
  state.lastSnap = t("status.selected", { name: board.name });
  refresh();
}

function areaNumber(area: number): string {
  return new Intl.NumberFormat(document.documentElement.lang || "en", { maximumFractionDigits: 6 }).format(area);
}

function areaCsv(area: number): string {
  return String(Math.round(area * 1_000_000) / 1_000_000);
}

function renderMaterials(): void {
  const area = orderAreaSummary(state.boards);
  ui.materialInput.innerHTML = `
    <option value="">${escapeHtml(t("inspector.mixedMaterials"))}</option>
  ` + state.materials.map((material) => `
    <option value="${escapeHtml(material.id)}">${escapeHtml(displayMaterialName(material))} (${escapeHtml(material.color.toUpperCase())})</option>
  `).join("");

  ui.materialSelectList.innerHTML = state.materials.map((material) => `
    <button
      class="material-select-option"
      type="button"
      role="option"
      data-material-id="${escapeHtml(material.id)}"
      title="${escapeHtml(displayMaterialName(material))} ${escapeHtml(material.color.toUpperCase())}"
      aria-selected="false"
    >
      <span class="material-select-swatch" style="background: ${material.color}"></span>
      <span class="material-select-option-copy">
        <strong>${escapeHtml(displayMaterialName(material))}</strong>
        <small>${escapeHtml(material.color.toUpperCase())}</small>
      </span>
    </button>
  `).join("");

  ui.materialList.innerHTML = state.materials.map((material) => `
    <div class="material-card">
      <span class="material-swatch" style="background: ${material.color}"></span>
      <strong>${escapeHtml(displayMaterialName(material))}</strong>
      <span class="material-area">${areaNumber(area.materials.get(material.id) ?? 0)} m²</span>
    </div>
  `).join("") + `<div class="material-area-total" title="${escapeHtml(t("order.areaNote"))}">${t("order.areaTotal")}: ${areaNumber(area.total)} m²</div>`;
  syncMaterialSelect();
}

function renderMeasurements(): void {
  const selected = selectedBoard(state);
  const selectedSet = selectedBoards(state);
  const boards = selectedSet.length > 1 ? selectedSet : selected ? groupBoards(state, selected.group) : state.boards;
  const bounds = boundsFor(boards);
  const inner = innerDimensions(boards, state.thickness);
  const cards: string[] = [];

  if (selectedSet.length > 1 && bounds) {
    cards.push(`
      <div class="metric-card">
        <strong>${t("status.boardsSelected", { count: selectedSet.length })}</strong>
        <span>${t("metrics.selection")}: ${mm(bounds.w)} × ${mm(bounds.h)}</span>
        <span>${t("metrics.position")}: X ${mm(bounds.left)}, Y ${mm(bounds.top)}</span>
      </div>
    `);
  } else if (selected) {
    const rect = rectFromBoard(selected);
    cards.push(`
      <div class="metric-card">
        <strong>${selected.name}</strong>
        <span>${t("metrics.board")}: ${mm(rect.w)} × ${mm(rect.h)} × ${mm(effectiveDepth(selected, state.depth))}</span>
        <span>${t("metrics.position")}: X ${mm(rect.x)}, Y ${mm(displayY(rect.y))}</span>
      </div>
    `);
  }

  if (bounds) {
    cards.push(`
      <div class="metric-card">
        <strong>${selectedSet.length > 1 ? t("pieces.selectedBoards") : selected ? t("pieces.connectedGroup", { group: selected.group }) : t("pieces.wholeSketch")}</strong>
        <span>${t("metrics.outer")}: ${mm(bounds.w)} × ${mm(bounds.h)}</span>
        <span>${t("metrics.inner")}: ${inner?.hasFrame ? `${mm(inner.innerW)} × ${mm(inner.innerH)}` : t("metrics.needsOpposingFrameBoards")}</span>
        <span>${t("metrics.thicknessModel")}: ${mm(state.thickness)}</span>
        <span>${t("metrics.defaultDepth")}: ${mm(state.depth)}</span>
      </div>
    `);
  }

  ui.measureList.innerHTML = cards.join("") || `<div class="empty-state">${escapeHtml(t("metrics.addBoards"))}</div>`;
}

function renderWarnings(): void {
  const overlaps = computeOverlaps(state.boards);
  const warnings = overlaps.map((overlap) => {
    const [a, b] = overlap.boardIds.map((id) => state.boards.find((board) => board.id === id)?.name ?? defaultPieceName(id));
    return `
      <div class="warning-card">
        <strong>${t("metrics.overlap")}</strong>
        <span>${a} and ${b}</span>
        <span>${mm(overlap.w)} × ${mm(overlap.h)}</span>
      </div>
    `;
  });
  state.boards.filter((board) => !board.ignoreInOrder).forEach((board) => {
    const issue = bandingOrderIssue(board);
    if (issue) warnings.push(`<div class="warning-card"><strong>${escapeHtml(board.name)} · ${escapeHtml(t("banding.title"))}</strong><span>${escapeHtml(t(issue === "review" ? "banding.reviewRequired" : "banding.invalidCore"))}</span></div>`);
  });
  ui.warningList.innerHTML = warnings.join("") || `<div class="empty-state">${escapeHtml(t("metrics.noOverlaps"))}</div>`;
}

function renderCutList(): void {
  ui.orderLegend.innerHTML = orderLegendHtml();
  ui.cutList.innerHTML = cutListHtml(state.boards.filter((board) => !board.ignoreInOrder), t("pieces.noBoardsInOrder")) + orderAreaSummaryHtml();
  ui.ignoredCutList.innerHTML = cutListHtml(state.boards.filter((board) => board.ignoreInOrder), t("pieces.noIgnoredBoards"));
}

function orderAreaSummaryHtml(): string {
  const area = orderAreaSummary(state.boards);
  return `<div class="metric-card order-area-summary">
    <strong>${escapeHtml(t("order.areaSummary"))}</strong>
    ${[...area.materials].map(([id, value]) => `<span>${escapeHtml(materialName(id))}: ${areaNumber(value)} m²</span>`).join("")}
    <strong>${escapeHtml(t("order.areaTotal"))}: ${areaNumber(area.total)} m²</strong>
    <span>${escapeHtml(t("order.areaNote"))}</span>
  </div>`;
}

function cutListHtml(boards: Board[], emptyMessage: string): string {
  return groupOrderBoards(boards).map((boards) => {
    const board = boards[0];
    const issue = bandingOrderIssue(board);
    return `
      <div class="cut-card">
        <strong><span class="count">${boards.length}×</span> ${physicalSizeLabel(board.dimensions)}</strong>
        <span>${t("metrics.material")}: ${escapeHtml(materialName(board.materialId))}</span>
        <span>${t("order.areaEach")}: ${areaNumber(boardAreaM2(board))} m² · ${t("order.areaRow")}: ${areaNumber(boardAreaM2(board) * boards.length)} m²</span>
        <span>${t("faceLamination.title")}: ${escapeHtml(faceLaminationLabel(board))}</span>
        <span>${t("banding.grain")}: ${escapeHtml(grainLabel(board))}</span>
        <div class="cut-banding">${edgeBandingEdges.map((edge) => `<span>${edge.toUpperCase()} · ${bandingNumber(bandingEdgeLength(board, edge))} mm: ${escapeHtml(bandingProfileLabel(board.edgeBanding[edge]))}</span>`).join("")}</div>
        ${issue ? `<div class="banding-review">${escapeHtml(t(issue === "review" ? "banding.reviewRequired" : "banding.invalidCore"))}${board.legacyLaminate ? `<div>${escapeHtml(legacyBandingLabel(board))}</div>` : ""}</div>` : ""}
        <div class="cut-card-pieces">${boards.map((board) => `
          <button class="cut-piece-button" type="button" data-board-id="${board.id}" title="${escapeHtml(t("order.selectPiece", { name: board.name }))}">
            ${escapeHtml(board.name)}
          </button>
        `).join("")}</div>
      </div>
    `;
  }).join("") || `<div class="empty-state">${emptyMessage}</div>`;
}

function orderLegendHtml(): string {
  return `<div class="order-edge-diagram" role="img" aria-label="${escapeHtml(t("banding.csvSketch"))}">${edgeBandingEdges.map((edge) => `<div class="${edge}">${edge.toUpperCase()}</div>`).join("")}<div class="order-diagram-dimensions">A × B<br>S1</div></div><p class="banding-order-note">${escapeHtml(t("banding.orderNote"))}</p>`;
}

function checkOrderReady(): boolean {
  const unresolved = state.boards.filter((board) => !board.ignoreInOrder && bandingOrderIssue(board));
  if (!unresolved.length) return true;
  setSelection([unresolved[0].id]);
  woodOrderOpen = false;
  state.lastSnap = t("banding.exportBlocked", { pieces: unresolved.map((board) => board.name).join(", ") });
  refresh();
  notify(state.lastSnap);
  return false;
}

function renderAnchorOverlay(): void {
  const board = selectedBoard(state);
  if (!board) {
    ui.anchorOverlay.innerHTML = "";
    return;
  }

  ui.anchorOverlay.innerHTML = state.anchors
    .filter((anchor) => anchor.boardId === board.id)
    .map((anchor) => {
      const position = anchorChipPosition(anchor);
      if (!position) return "";
      const point = worldToScreen(state, position.x, position.y);
      return `
        <button class="anchor-chip" data-remove-anchor="${anchor.id}" type="button" style="left: ${point.x}px; top: ${point.y - 8}px" title="${escapeHtml(t("anchors.removeAnchorTo", { target: anchorTargetLabel(anchor) }))}" aria-label="${escapeHtml(t("anchors.removeAnchorTo", { target: anchorTargetLabel(anchor) }))}">
          ${anchorChipIcon()}
          <span class="visually-hidden">${t("anchors.removeAnchor")}</span>
        </button>
      `;
    })
    .join("") + state.snapGuides
    .flatMap((guide) => guide.linkPoint ? [guide.linkPoint] : [])
    .map((position) => {
      const point = worldToScreen(state, position.x, position.y);
      return `
        <span class="anchor-chip anchor-chip-preview" style="left: ${point.x}px; top: ${point.y - 8}px" title="${escapeHtml(t("anchors.willLink"))}" aria-hidden="true">
          ${anchorChipIcon()}
        </span>
      `;
    })
    .join("");
}

function anchorChipIcon(): string {
  return `
    <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
      <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
      <path d="M9 15 L15 9"></path>
      <path d="M5 21 L19 3"></path>
    </svg>
  `;
}

function anchorTargetLabel(anchor: BoardAnchor): string {
  const target = state.boards.find((board) => board.id === anchor.targetBoardId);
  return `${target?.name ?? defaultPieceName(anchor.targetBoardId)} ${edgeLabel(anchor.targetEdge)}`;
}

function anchorChipPosition(anchor: BoardAnchor): Point | null {
  const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
  const target = state.boards.find((candidate) => candidate.id === anchor.targetBoardId);
  if (!board || !target) return null;
  const rect = rectFromBoard(board);
  const targetRect = rectFromBoard(target);
  const edgePosition = boardEdgeValue(board, anchor.edge);

  if (anchor.edge === "left" || anchor.edge === "right") {
    const top = Math.max(rect.y, targetRect.y);
    const bottom = Math.min(rect.y + rect.h, targetRect.y + targetRect.h);
    return { x: edgePosition, y: top <= bottom ? (top + bottom) / 2 : rect.y + rect.h / 2 };
  }

  const left = Math.max(rect.x, targetRect.x);
  const right = Math.min(rect.x + rect.w, targetRect.x + targetRect.w);
  return { x: left <= right ? (left + right) / 2 : rect.x + rect.w / 2, y: edgePosition };
}

function anchorTouchedBoard(boardId: number): void {
  const board = state.boards.find((candidate) => candidate.id === boardId);
  if (!board || board.kind === "back" || board.kind === "front") return;
  state.anchors = state.anchors.filter((anchor) => anchor.boardId !== boardId);
  state.boards.forEach((other) => {
    if (other.id === board.id || other.kind === "back" || other.kind === "front") return;
    touchingEdges(board, other).forEach(([edge, targetEdge]) => addBoardAnchor(board.id, edge, other.id, targetEdge));
  });
}

function addBoardAnchor(boardId: number, edge: BoardEdge, targetBoardId: number, targetEdge: BoardEdge): void {
  const board = state.boards.find((candidate) => candidate.id === boardId);
  if (!board || !canAnchorEdge(board, edge)) return;
  const duplicate = state.anchors.some((anchor) =>
    anchor.boardId === boardId &&
    anchor.edge === edge &&
    anchor.targetBoardId === targetBoardId &&
    anchor.targetEdge === targetEdge
  );
  if (duplicate) return;
  state.anchors.push({ id: state.nextAnchorId, boardId, edge, targetBoardId, targetEdge });
  state.nextAnchorId += 1;
}

function canAnchorEdge(board: Board, edge: BoardEdge): boolean {
  if (board.kind === "front") return false;
  if (board.orientation === "vertical") return edge === "top" || edge === "bottom";
  if (board.orientation === "horizontal") return edge === "left" || edge === "right";
  return true;
}

function touchingEdges(board: Board, target: Board): Array<[BoardEdge, BoardEdge]> {
  const tolerance = 0.5;
  const edges: Array<[BoardEdge, BoardEdge]> = [];
  const rect = rectFromBoard(board);
  const targetRect = rectFromBoard(target);
  if (Math.abs(rect.x - (targetRect.x + targetRect.w)) <= tolerance && rangesOverlap(rect.y, rect.y + rect.h, targetRect.y, targetRect.y + targetRect.h)) {
    edges.push(["left", "right"]);
  }
  if (Math.abs(rect.x + rect.w - targetRect.x) <= tolerance && rangesOverlap(rect.y, rect.y + rect.h, targetRect.y, targetRect.y + targetRect.h)) {
    edges.push(["right", "left"]);
  }
  if (Math.abs(rect.y - (targetRect.y + targetRect.h)) <= tolerance && rangesOverlap(rect.x, rect.x + rect.w, targetRect.x, targetRect.x + targetRect.w)) {
    edges.push(["top", "bottom"]);
  }
  if (Math.abs(rect.y + rect.h - targetRect.y) <= tolerance && rangesOverlap(rect.x, rect.x + rect.w, targetRect.x, targetRect.x + targetRect.w)) {
    edges.push(["bottom", "top"]);
  }
  return edges;
}

function rangesOverlap(a1: number, a2: number, b1: number, b2: number): boolean {
  return Math.max(a1, b1) <= Math.min(a2, b2) + 0.5;
}

function propagateAnchorsFrom(boardId: number, visited = new Set<number>()): void {
  if (visited.has(boardId)) return;
  visited.add(boardId);
  const childIds = [...new Set(state.anchors
    .filter((anchor) => anchor.targetBoardId === boardId)
    .map((anchor) => anchor.boardId))];

  childIds.forEach((childId) => {
    applyAnchorsToBoard(childId);
    propagateAnchorsFrom(childId, visited);
  });
}

function applyAnchorsToBoard(boardId: number): void {
  const board = state.boards.find((candidate) => candidate.id === boardId);
  if (!board) return;
  const rect = rectFromBoard(board);
  state.anchors
    .filter((anchor) => anchor.boardId === boardId)
    .forEach((anchor) => {
      const target = state.boards.find((candidate) => candidate.id === anchor.targetBoardId);
      if (!target) return;
      setRectEdge(rect, anchor.edge, boardEdgeValue(target, anchor.targetEdge));
    });
  applyBoardRect(board, rect);
}

function boardEdgeValue(board: Board, edge: BoardEdge): number {
  const rect = rectFromBoard(board);
  if (edge === "left") return rect.x;
  if (edge === "right") return rect.x + rect.w;
  if (edge === "top") return rect.y;
  return rect.y + rect.h;
}

function setRectEdge(rect: Rect, edge: BoardEdge, value: number): void {
  if (edge === "left") {
    const right = rect.x + rect.w;
    rect.x = value;
    rect.w = Math.max(1, right - value);
  }
  if (edge === "right") rect.w = Math.max(1, value - rect.x);
  if (edge === "top") {
    const bottom = rect.y + rect.h;
    rect.y = value;
    rect.h = Math.max(1, bottom - value);
  }
  if (edge === "bottom") rect.h = Math.max(1, value - rect.y);
}

function fitToView(): void {
  const bounds = boundsFor(state.boards);
  const rect = canvas.getBoundingClientRect();
  if (!bounds || rect.width < 1 || rect.height < 1) return;
  const padding = 70;
  const availableWidth = Math.max(1, rect.width - padding - originViewMargin);
  const availableHeight = Math.max(1, rect.height - padding - originViewMargin);
  state.scale = Math.min(availableWidth / bounds.w, availableHeight / bounds.h);
  state.scale = Math.max(minFitScale, Math.min(maxFitScale, state.scale));
  state.panX = originViewMargin - bounds.left * state.scale;
  state.panY = rect.height - originViewMargin - bounds.bottom * state.scale;
  refresh();
}

function setOriginBottomLeftView(): void {
  const rect = canvas.getBoundingClientRect();
  state.scale = 0.62;
  state.panX = originViewMargin;
  state.panY = rect.height > 1 ? rect.height - originViewMargin : 420;
}

function applyThicknessChange(newThickness: number): void {
  if (newThickness === state.thickness) return;
  remember();
  const oldThickness = state.thickness;
  const updateExisting = state.boards.some((board) => board.orientation !== "front")
    ? window.confirm(t("dialogs.updateThickness", { value: mm(newThickness) }))
    : false;
  state.thickness = newThickness;
  if (normalizePositiveNumber(ui.layoutAnchorThicknessInput.value, oldThickness) === oldThickness) {
    ui.layoutAnchorThicknessInput.value = String(newThickness);
  }
  state.boards.forEach((board) => {
    const oldBoardThickness = effectiveThicknessWithDefault(board, oldThickness);
    const nextBoardThickness = updateExisting ? newThickness : oldBoardThickness;
    const delta = nextBoardThickness - oldBoardThickness;
    if (board.orientation === "front") board.dimensions.thickness = newThickness;
    else board.dimensions.thickness = nextBoardThickness;
    if (board.orientation === "vertical") {
      if (board.x > 160) board.x -= delta;
    }
    if (board.orientation === "horizontal") {
      const rect = rectFromBoard(board);
      board.x += delta;
      board.dimensions.width = Math.max(nextBoardThickness, rect.w - delta * 2);
      if (board.y > 120) board.y -= delta;
    }
  });
  state.boards.forEach((board) => applyAnchorsToBoard(board.id));
  state.lastSnap = updateExisting
    ? t("status.allAutoThickness", { value: mm(state.thickness) })
    : t("status.defaultThickness", { value: mm(state.thickness) });
  refresh();
}

function applyDepthChange(newDepth: number): void {
  if (newDepth === state.depth) return;
  remember();
  const oldDepth = state.depth;
  const updateExisting = state.boards.length > 0
    ? window.confirm(t("dialogs.updateDepth", { value: mm(newDepth) }))
    : false;
  state.depth = newDepth;
  if (state.boards.length > 0) {
    state.boards.forEach((board) => {
      const nextDepth = updateExisting ? newDepth : effectiveDepthWithDefault(board, oldDepth);
      if (board.orientation === "vertical") board.dimensions.width = nextDepth;
      if (board.orientation === "horizontal") board.dimensions.height = nextDepth;
    });
  }
  state.lastSnap = updateExisting
    ? t("status.allPiecesDepth", { value: mm(state.depth) })
    : t("status.defaultDepth", { value: mm(state.depth) });
  refresh();
}

function effectiveDepthWithDefault(board: Board, defaultDepth: number): number {
  if (board.orientation === "vertical") return board.dimensions.width;
  if (board.orientation === "horizontal") return board.dimensions.height;
  return defaultDepth;
}

function effectiveThicknessWithDefault(board: Board, defaultThickness: number): number {
  return board.dimensions.thickness ?? defaultThickness;
}

function exportCutListCsv(): void {
  if (!checkOrderReady()) return;
  const csv = cutListCsv();
  downloadTextFile(
    csv,
    "text/csv;charset=utf-8",
    `${projectFilenameBase()}-pieces-${filenameTimestamp()}.csv`
  );
  state.lastSnap = t("status.pieceListCsvExported");
  notify(t("status.savedPieceListCsv"));
  updateInspector();
}

async function copyCutListCsv(): Promise<void> {
  if (!checkOrderReady()) return;
  try {
    await copyText(cutListCsv());
    state.lastSnap = t("status.pieceListCsvCopied");
    notify(t("status.copiedPieceListCsv"));
  } catch {
    state.lastSnap = t("status.couldNotCopyCsv");
    notify(t("status.couldNotCopyCsv"));
  }
  updateInspector();
}

function printCutListTable(): void {
  if (!checkOrderReady()) return;
  const rows = cutListRows();
  const title = `${state.projectName || t("app.name")} - ${t("panels.woodOrder")}`;
  const printUrl = URL.createObjectURL(new Blob([cutListPrintHtml(rows, title)], { type: "text/html" }));
  const printWindow = window.open(printUrl, "_blank");
  if (!printWindow) {
    URL.revokeObjectURL(printUrl);
    state.lastSnap = t("status.couldNotPrintOrder");
    notify(t("status.couldNotPrintOrder"));
    updateInspector();
    return;
  }

  window.setTimeout(() => URL.revokeObjectURL(printUrl), 60_000);
  state.lastSnap = t("status.pieceListTablePrinted");
  notify(t("status.pieceListTablePrinted"));
  updateInspector();
}

function printSketch(): void {
  if (sketchPrintRestore) return;

  const canvasRect = canvas.getBoundingClientRect();
  const canvasWrapRect = ui.canvasWrap.getBoundingClientRect();
  const printRatio = (canvasRect.width || canvasWrapRect.width || 1) / Math.max(1, canvasRect.height || canvasWrapRect.height);
  sketchPrintRestore = {
    showConnectionMarks: state.showConnectionMarks,
    showFrontPanels: state.showFrontPanels,
    view: activeView
  };
  window.clearTimeout(sketchPrintRestoreTimer);
  ui.canvasWrap.style.setProperty("--print-sketch-ratio", String(printRatio));
  document.body.classList.add("printing-sketch");
  state.showConnectionMarks = true;
  state.showFrontPanels = false;
  ui.connectionMarksToggle.checked = true;
  ui.frontLayerToggle.checked = false;
  if (activeView !== "sketch") setActiveView("sketch");
  state.lastSnap = t("status.sketchPrintReady");
  notify(t("status.sketchPrintReady"));
  updateInspector();

  window.addEventListener("afterprint", restoreAfterSketchPrint, { once: true });
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      renderer.resize();
      sketchPrintRestoreTimer = window.setTimeout(restoreAfterSketchPrint, 60_000);
      window.print();
    });
  });
}

function restoreAfterSketchPrint(): void {
  const restore = sketchPrintRestore;
  if (!restore) return;

  sketchPrintRestore = null;
  window.clearTimeout(sketchPrintRestoreTimer);
  document.body.classList.remove("printing-sketch");
  ui.canvasWrap.style.removeProperty("--print-sketch-ratio");
  state.showConnectionMarks = restore.showConnectionMarks;
  state.showFrontPanels = restore.showFrontPanels;
  syncSettingsInputs();
  if (activeView !== restore.view) setActiveView(restore.view);
  else resizeActiveView();
  state.lastSnap = t("status.sketchPrintRestored");
  refresh();
}

function cutListPrintHtml(rows: string[][], title: string): string {
  const header = rows[0];
  const bodyRows = rows.slice(1);
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(title)}</title>
        <style>
          body { color: #202522; font-family: Arial, sans-serif; margin: 24px; }
          h1 { font-size: 20px; margin: 0 0 16px; }
          p { font-size: 12px; }
          table { border-collapse: collapse; font-size: 10px; width: 100%; }
          th, td { border: 1px solid #9aa59d; padding: 6px 8px; text-align: left; vertical-align: top; }
          th { background: #eef4f1; font-weight: 700; }
          td:first-child, th:first-child,
          td:nth-child(2), th:nth-child(2),
          td:nth-child(3), th:nth-child(3),
          td:nth-child(4), th:nth-child(4) { text-align: right; white-space: nowrap; }
          .order-legend { align-items: center; display: flex; gap: 16px; margin-bottom: 16px; }
          .order-edge-diagram { align-items: center; background: #eee5d4; border: 1px solid #9aa59d; display: grid; flex: 0 0 auto; font-size: 11px; grid-template-columns: 24px 60px 24px; grid-template-rows: 20px 40px 20px; text-align: center; width: 108px; }
          .a1 { grid-column: 2; grid-row: 1; } .a2 { grid-column: 2; grid-row: 3; } .b1 { grid-column: 1; grid-row: 2; } .b2 { grid-column: 3; grid-row: 2; }
          .order-diagram-dimensions { grid-column: 2; grid-row: 2; }
          tr { break-inside: avoid; }
          @page { size: landscape; margin: 12mm; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <div class="order-legend">${orderLegendHtml()}</div>
        <table>
          <thead>
            <tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <p>${escapeHtml(t("order.areaNote"))}</p>
        <script>
          window.addEventListener("load", () => window.setTimeout(() => window.print(), 0));
        </script>
      </body>
    </html>
  `;
}

function cutListCsv(): string {
  const rows = cutListRows();
  const legend = [
    [`${t("banding.orderNote")} ${t("order.areaNote")}`],
    [t("banding.csvSketch")],
    ["       A1"],
    ["B1   A × B (S1)   B2"],
    ["       A2"],
    []
  ].map((row) => Array.from({ length: rows[0].length }, (_, index) => row[index] ?? ""));
  return [...legend, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

function cutListRows(): string[][] {
  const rows = [
    [
      t("order.csvQuantity"),
      t("order.csvThickness"),
      t("banding.csvA"),
      t("banding.csvB"),
      t("order.csvMaterial"),
      t("faceLamination.title"),
      t("banding.csvGrain"),
      ...edgeBandingEdges.map((edge) => edge.toUpperCase()),
      t("order.csvAreaEach"),
      t("order.csvAreaRow"),
      t("order.csvPieces")
    ]
  ];
  groupOrderBoards(state.boards.filter((board) => !board.ignoreInOrder)).forEach((boards) => {
    const board = boards[0];
    rows.push([
      String(boards.length),
      String(board.dimensions.thickness),
      String(board.dimensions.width),
      String(board.dimensions.height),
      materialName(board.materialId),
      faceLaminationLabel(board),
      grainLabel(board),
      ...edgeBandingEdges.map((edge) => bandingExportLabel(board.edgeBanding[edge])),
      areaCsv(boardAreaM2(board)),
      areaCsv(boardAreaM2(board) * boards.length),
      boards.map((board) => board.name).join("; ")
    ]);
  });

  const area = orderAreaSummary(state.boards);
  const summaryRow = (label: string, value: number, material = "") => {
    const row = Array<string>(rows[0].length).fill("");
    row[rows[0].indexOf(t("order.csvMaterial"))] = material;
    row[rows[0].indexOf(t("order.csvAreaRow"))] = areaCsv(value);
    row[rows[0].indexOf(t("order.csvPieces"))] = label;
    rows.push(row);
  };
  area.materials.forEach((value, id) => summaryRow(t("order.areaMaterialTotal"), value, materialName(id)));
  summaryRow(t("order.areaTotal"), area.total);
  return rows;
}

async function copyText(text: string): Promise<void> {
  if (window.navigator.clipboard?.writeText) {
    try {
      await window.navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that expose the API but deny it in this context.
    }
  }

  let eventCopied = false;
  const copyListener = (event: ClipboardEvent) => {
    event.clipboardData?.setData("text/plain", text);
    event.preventDefault();
    eventCopied = true;
  };
  document.addEventListener("copy", copyListener);
  const eventCopySucceeded = document.execCommand("copy");
  document.removeEventListener("copy", copyListener);
  if (eventCopySucceeded && eventCopied) return;

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.left = "-9999px";
  textArea.style.position = "fixed";
  document.body.append(textArea);
  textArea.focus();
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  if (!copied) throw new Error("Clipboard copy failed");
}

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, "\"\"")}"` : value;
}

function updateBoardFromInspector(event?: Event): void {
  const board = selectedBoard(state);
  const boards = selectedBoards(state);
  if (!board || !boards.length) return;
  const target = event?.target;
  if (target === ui.wInput && board.orientation === "vertical" && ui.wInput.value === "") {
    remember();
    board.dimensions.thickness = state.thickness;
    state.lastSnap = t("status.widthUsesGlobal", { value: mm(state.thickness) });
    propagateAnchorsFrom(board.id);
    refresh();
    return;
  }
  if (target === ui.hInput && board.orientation === "horizontal" && ui.hInput.value === "") {
    remember();
    board.dimensions.thickness = state.thickness;
    state.lastSnap = t("status.heightUsesGlobal", { value: mm(state.thickness) });
    propagateAnchorsFrom(board.id);
    refresh();
    return;
  }
  if (target === ui.depthOverrideInput && ui.depthOverrideInput.value === "") {
    remember();
    boards.forEach((item) => {
      if (item.orientation === "vertical") item.dimensions.width = state.depth;
      if (item.orientation === "horizontal") item.dimensions.height = state.depth;
    });
    state.lastSnap = t("status.depthUsesGlobal", { value: mm(state.depth) });
    refresh();
    return;
  }
  if (target instanceof HTMLInputElement && target.type === "number" && target.value === "") return;
  remember();
  if (boards.length > 1) {
    const selectionBounds = boundsFor(boards);
    if (selectionBounds && (target === ui.xInput || target === ui.yInput)) {
      const nextX = target === ui.xInput ? Number(ui.xInput.value) : selectionBounds.left;
      const nextY = target === ui.yInput ? modelY(Number(ui.yInput.value)) : selectionBounds.top;
      moveBoardsBy(boards, (Number.isFinite(nextX) ? nextX : selectionBounds.left) - selectionBounds.left, (Number.isFinite(nextY) ? nextY : selectionBounds.top) - selectionBounds.top);
      state.lastSnap = t("status.selectionMoved");
    }
    if (target === ui.depthOverrideInput) {
      boards.forEach((item) => {
        const nextDepth = normalizePositiveNumber(ui.depthOverrideInput.value, effectiveDepth(item, state.depth));
        if (item.orientation === "vertical") item.dimensions.width = nextDepth;
        if (item.orientation === "horizontal") item.dimensions.height = nextDepth;
      });
      state.lastSnap = t("status.depthSetOnBoards", { count: boards.length });
    }
  } else {
    board.name = ui.nameInput.value.trim() || board.name;
    const nextRect = {
      x: Number(ui.xInput.value) || 0,
      y: modelY(Number(ui.yInput.value) || 0),
      w: board.orientation === "vertical" && ui.wInput.value === "" ? state.thickness : Math.max(1, Number(ui.wInput.value) || 1),
      h: board.orientation === "horizontal" && ui.hInput.value === "" ? state.thickness : Math.max(1, Number(ui.hInput.value) || 1)
    };
    if (board.orientation === "vertical") {
      board.dimensions.thickness = ui.wInput.value === "" ? state.thickness : normalizePositiveNumber(ui.wInput.value, effectiveThickness(board, state.thickness));
    }
    if (board.orientation === "horizontal") {
      board.dimensions.thickness = ui.hInput.value === "" ? state.thickness : normalizePositiveNumber(ui.hInput.value, effectiveThickness(board, state.thickness));
    }
    const nextDepth = ui.depthOverrideInput.value === "" ? state.depth : normalizePositiveNumber(ui.depthOverrideInput.value, effectiveDepth(board, state.depth));
    if (board.orientation === "vertical") board.dimensions.width = nextDepth;
    if (board.orientation === "horizontal") board.dimensions.height = nextDepth;
    updateDimensionsFromSketchRect(board, nextRect);
    propagateAnchorsFrom(board.id);
  }
  refresh();
}

function updateMaterialFromInspector(): void {
  const boards = selectedBoards(state);
  if (!boards.length || !ui.materialInput.value || boards.every((board) => board.materialId === ui.materialInput.value)) return;
  remember();
  boards.forEach((board) => {
    board.materialId = ui.materialInput.value;
  });
  state.lastSnap = boards.length > 1 ? t("status.materialSetOnBoards", { count: boards.length }) : t("status.material", { name: materialName(boards[0].materialId) });
  refresh();
}

function addCustomMaterial(): void {
  const name = ui.materialNameInput.value.trim();
  if (!name) {
    state.lastSnap = t("status.nameMaterialFirst");
    updateInspector();
    return;
  }

  remember();
  const material: Material = {
    id: materialIdFromName(name),
    name,
    color: normalizedColor(ui.materialColorInput.value)
  };
  state.materials.push(material);
  ui.materialNameInput.value = "";
  ui.materialColorInput.value = "#c99756";
  state.lastSnap = t("status.materialAdded", { name: material.name });
  refresh();
}

function applyBandingChanges(changes: Array<{ board: Board; edge: EdgeBandingEdge; profile: EdgeBandingProfile | null }>): void {
  if (!changes.some(({ board, edge, profile }) => bandingProfileKey(board.edgeBanding[edge]) !== bandingProfileKey(profile))) return;
  remember();
  changes.forEach(({ board, edge, profile }) => setBoardEdgeBanding(board, edge, profile));
  state.lastSnap = t("banding.updated");
  refresh();
}

function addCustomBandingProfile(): void {
  const profile = normalizeBandingProfile({ id: `band-${crypto.randomUUID()}`, type: ui.bandingTypeInput.value, decor: ui.bandingDecorInput.value, thickness: ui.bandingThicknessInput.value === "" ? null : Number(ui.bandingThicknessInput.value) });
  if (!profile) {
    notify(t("banding.profileInvalid"));
    return;
  }
  const existing = state.edgeBandingProfiles.find((item) => bandingProfileKey(item) === bandingProfileKey(profile));
  if (!existing) {
    remember();
    state.edgeBandingProfiles.push(profile);
  }
  bandingBrush = (existing ?? profile).id;
  ui.bandingDecorInput.value = "";
  state.lastSnap = t("banding.profileAdded");
  refresh();
}

function confirmSelectedBanding(): void {
  const boards = selectedBoards(state).filter((board) => board.bandingNeedsReview);
  if (!boards.length || boards.some((board) => nominalCoreDimensions(board).width <= 0 || nominalCoreDimensions(board).height <= 0)) return;
  remember();
  boards.forEach((board) => {
    board.bandingNeedsReview = false;
    delete board.legacyLaminate;
  });
  state.lastSnap = t("banding.confirmed");
  refresh();
}

function updateOrderInclusionFromInspector(): void {
  const boards = selectedBoards(state);
  if (!boards.length) return;
  remember();
  boards.forEach((board) => {
    board.ignoreInOrder = ui.ignoreOrderInput.checked;
  });
  state.lastSnap = ui.ignoreOrderInput.checked ? t("status.removedFromOrder") : t("status.addedToOrder");
  refresh();
}

function selectedLayoutAnchorAxis(): LayoutAnchorAxis {
  return ui.layoutAnchorAxisInput.value === "y" ? "y" : "x";
}

function updateLayoutAnchorSummary(): void {
  const board = selectedBoard(state);
  if (!board) return;
  updateLayoutAnchorAxisLabels();
  const axis = selectedLayoutAnchorAxis();
  const anchors = layoutAnchorsForBoard(board.id, axis);
  ui.layoutAnchorCountInput.value = anchors.length ? String(anchors.length) : ui.layoutAnchorCountInput.value;
  ui.layoutAnchorSummary.textContent = anchors.length
    ? anchors.map((anchor) => mm(anchor.offset)).join(", ")
    : t("inspector.noLayoutAnchors");
}

function layoutAnchorOffsets(board: Board, axis: LayoutAnchorAxis, count: number): number[] | null {
  const rect = rectFromBoard(board);
  const span = axis === "x" ? rect.w : rect.h;
  if (!ui.layoutAnchorBalanceInput.checked) {
    return Array.from({ length: count }, (_, index) => Math.round((span * (index + 1)) / (count + 1)));
  }

  const pieceThickness = Math.max(1, normalizePositiveNumber(ui.layoutAnchorThicknessInput.value, state.thickness));
  const startInset = ui.layoutAnchorStartInput.value === "inside" ? pieceThickness : 0;
  const endInset = ui.layoutAnchorEndInput.value === "inside" ? pieceThickness : 0;
  const clearSpan = span - startInset - endInset;
  const openGap = (clearSpan - count * pieceThickness) / (count + 1);
  if (openGap < 0) return null;

  return Array.from({ length: count }, (_, index) =>
    Math.round(startInset + openGap * (index + 1) + pieceThickness * index + pieceThickness / 2)
  );
}

function distributeLayoutAnchors(): void {
  const board = selectedBoard(state);
  if (!board || selectedBoards(state).length > 1) return;
  const axis = selectedLayoutAnchorAxis();
  const count = Math.max(1, Math.min(20, normalizePositiveNumber(ui.layoutAnchorCountInput.value, 4)));
  const offsets = layoutAnchorOffsets(board, axis, count);
  if (!offsets) {
    state.lastSnap = t("status.notEnoughSpan");
    updateInspector();
    return;
  }
  remember();
  state.layoutAnchors = state.layoutAnchors.filter((anchor) => !(anchor.boardId === board.id && anchor.axis === axis));
  offsets.forEach((offset) => {
    state.layoutAnchors.push({
      id: state.nextLayoutAnchorId,
      boardId: board.id,
      axis,
      offset
    });
    state.nextLayoutAnchorId += 1;
  });
  state.lastSnap = ui.layoutAnchorBalanceInput.checked ? t("status.balancedAnchorsAdded", { count }) : t("status.layoutAnchorsAdded", { count });
  refresh();
}

function clearLayoutAnchors(): void {
  const board = selectedBoard(state);
  if (!board || !layoutAnchorsForBoard(board.id).length) return;
  remember();
  state.layoutAnchors = state.layoutAnchors.filter((anchor) => anchor.boardId !== board.id);
  state.lastSnap = t("status.layoutAnchorsCleared");
  refresh();
}

function createPresetAt(presetId: string, point?: Point): void {
  const preset = presets[presetId];
  if (!preset) return;
  const center = point ?? currentViewCenter();
  if (!state.boards.length) {
    state.gridOriginX = center.x;
    state.gridOriginY = center.y;
  }
  addBoard({
    x: snapValueToGrid(state, center.x - preset.w() / 2, "x"),
    y: snapValueToGrid(state, center.y - preset.h() / 2, "y"),
    dimensions: dimensionsFromSketch(preset.orientation, preset.w(), preset.h()),
    kind: preset.kind,
    orientation: preset.orientation
  });
}

function currentViewCenter(): Point {
  const rect = canvas.getBoundingClientRect();
  return screenToWorld(state, rect.width / 2, rect.height / 2);
}

function applyBoardRect(board: Board, rect: { x: number; y: number; w: number; h: number }): void {
  updateDimensionsFromSketchRect(board, rect);
}

function moveBoardsBy(boards: Board[], dx: number, dy: number): void {
  boards.forEach((board) => {
    board.x = Math.round(board.x + dx);
    board.y = Math.round(board.y + dy);
  });
  boards.forEach((board) => propagateAnchorsFrom(board.id));
}

function addMeasurement(a: MeasurementAnchor, b: MeasurementAnchor, axis: MeasurementAxis): void {
  remember();
  const id = state.nextMeasurementId;
  state.measurements.push({
    id,
    name: defaultMeasureName(id),
    a,
    b,
    axis,
    displayOffset: measurementDisplayOffset({ id, name: "", a, b, axis }, state.measurements.length)
  });
  state.nextMeasurementId += 1;
  setMeasurementSelection(id);
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.lastSnap = t("status.measurementAdded");
  refresh();
}

function addSelectedMeasurement(axis: MeasurementAxis): void {
  const board = selectedBoard(state);
  if (!board) return;
  const rect = rectFromBoard(board);
  if (axis === "horizontal") {
    addMeasurement(
      { kind: "board-edge", boardId: board.id, edge: "left", offset: rect.h / 2 },
      { kind: "board-edge", boardId: board.id, edge: "right", offset: rect.h / 2 },
      "horizontal"
    );
    return;
  }
  addMeasurement(
    { kind: "board-edge", boardId: board.id, edge: "top", offset: rect.w / 2 },
    { kind: "board-edge", boardId: board.id, edge: "bottom", offset: rect.w / 2 },
    "vertical"
  );
}

function handleMeasurementClick(point: Point): void {
  const anchor = nearestMeasurementAnchor(state, point);
  if (!state.pendingMeasurementAnchor) {
    state.pendingMeasurementAnchor = anchor;
    state.previewMeasurementAnchor = null;
    state.lastSnap = anchor.kind === "grid" ? t("status.gridAnchorSet") : t("status.edgeAnchorSet");
    refresh();
    return;
  }

  const first = resolveMeasurementAnchor(state, state.pendingMeasurementAnchor);
  const second = resolveMeasurementAnchor(state, anchor);
  if (!first || !second) return;
  addMeasurement(state.pendingMeasurementAnchor, anchor, measurementAxis(first, second));
}

function deleteSelectedBoards(): void {
  const ids = selectedIdSet();
  if (!ids.size) return;
  remember();
  state.boards = state.boards.filter((board) => !ids.has(board.id));
  state.anchors = state.anchors.filter((anchor) => !ids.has(anchor.boardId) && !ids.has(anchor.targetBoardId));
  state.layoutAnchors = state.layoutAnchors.filter((anchor) => !ids.has(anchor.boardId));
  state.measurements = state.measurements.filter((measurement) =>
    ![measurement.a, measurement.b].some((anchor) => anchor.kind === "board-edge" && ids.has(anchor.boardId))
  );
  if (state.selectedMeasurementId && !state.measurements.some((measurement) => measurement.id === state.selectedMeasurementId)) {
    state.selectedMeasurementId = null;
  }
  clearSelection();
  state.lastSnap = ids.size > 1 ? t("status.boardsDeleted", { count: ids.size }) : t("status.boardDeleted");
  refresh();
}

function deleteMeasurement(id: number): void {
  const exists = state.measurements.some((measurement) => measurement.id === id);
  if (!exists) return;
  remember();
  state.measurements = state.measurements.filter((measurement) => measurement.id !== id);
  if (state.selectedMeasurementId === id) state.selectedMeasurementId = null;
  if (renamingMeasurementId === id) closeMeasurementRename();
  state.lastSnap = t("status.measurementDeleted");
  refresh();
}

function closeMeasurementRename(): void {
  renamingMeasurementId = null;
  ui.measureRenameForm.hidden = true;
}

function positionMeasurementRenameForm(event: MouseEvent): void {
  const parent = ui.measureRenameForm.parentElement;
  if (!parent) return;
  const rect = parent.getBoundingClientRect();
  const formWidth = 240;
  const formHeight = 108;
  const left = Math.max(8, Math.min(event.clientX - rect.left - formWidth / 2, rect.width - formWidth - 8));
  const top = Math.max(8, Math.min(event.clientY - rect.top - formHeight - 10, rect.height - formHeight - 8));
  ui.measureRenameForm.style.left = `${left}px`;
  ui.measureRenameForm.style.top = `${top}px`;
}

function openMeasurementRename(id: number, event: MouseEvent): void {
  const measurement = state.measurements.find((item) => item.id === id);
  if (!measurement) return;
  renamingMeasurementId = measurement.id;
  setMeasurementSelection(measurement.id);
  positionMeasurementRenameForm(event);
  ui.measureRenameInput.value = measurement.name;
  ui.measureRenameForm.hidden = false;
  state.lastSnap = t("status.renameMeasurement");
  refresh();
  window.requestAnimationFrame(() => {
    ui.measureRenameInput.focus();
    ui.measureRenameInput.select();
  });
}

function submitMeasurementRename(): void {
  if (renamingMeasurementId === null) return;
  const measurement = state.measurements.find((item) => item.id === renamingMeasurementId);
  if (!measurement) {
    closeMeasurementRename();
    return;
  }
  const nextName = ui.measureRenameInput.value.trim();
  const normalizedName = nextName || defaultMeasureName(measurement.id);
  closeMeasurementRename();
  if (measurement.name === normalizedName) return;
  remember();
  measurement.name = normalizedName;
  setMeasurementSelection(measurement.id);
  state.lastSnap = nextName ? t("status.measurementNamed") : t("status.measurementReset");
  refresh();
}

function deleteActiveSelection(): void {
  const measure = selectedMeasurement(state);
  if (measure) {
    deleteMeasurement(measure.id);
    return;
  }
  deleteSelectedBoards();
}

function duplicateSelectedBoards(): void {
  const boards = selectedBoards(state);
  if (!boards.length) return;
  remember();
  const selectedOriginalIds = new Set(boards.map((board) => board.id));
  const idMap = new Map<number, number>();
  const copies = boards.map((board) => {
    const id = state.nextId;
    state.nextId += 1;
    idMap.set(board.id, id);
    return {
      ...board,
      id,
      name: defaultPieceName(id),
      x: board.x + 35,
      y: board.y + 35,
      dimensions: { ...board.dimensions },
      ...normalizeBoardBanding(board),
      group: 0
    };
  });
  state.boards.push(...copies);
  state.anchors
    .filter((anchor) => selectedOriginalIds.has(anchor.boardId) && selectedOriginalIds.has(anchor.targetBoardId))
    .forEach((anchor) => {
      const boardId = idMap.get(anchor.boardId);
      const targetBoardId = idMap.get(anchor.targetBoardId);
      if (!boardId || !targetBoardId) return;
      state.anchors.push({
        ...anchor,
        id: state.nextAnchorId,
        boardId,
        targetBoardId
      });
      state.nextAnchorId += 1;
    });
  state.layoutAnchors
    .filter((anchor) => selectedOriginalIds.has(anchor.boardId))
    .forEach((anchor) => {
      const boardId = idMap.get(anchor.boardId);
      if (!boardId) return;
      state.layoutAnchors.push({
        ...anchor,
        id: state.nextLayoutAnchorId,
        boardId
      });
      state.nextLayoutAnchorId += 1;
    });
  setSelection(copies.map((board) => board.id), copies[0]?.id ?? null);
  state.lastSnap = copies.length > 1 ? t("status.boardsDuplicated", { count: copies.length }) : t("status.boardDuplicated");
  refresh();
}

function rotateOrientation(orientation: PieceOrientation): PieceOrientation {
  if (orientation === "vertical") return "horizontal";
  if (orientation === "horizontal") return "vertical";
  return "front";
}

function rotateBoardKind(kind: BoardKind): BoardKind {
  if (kind === "upright") return "shelf";
  if (kind === "shelf") return "upright";
  return kind;
}

function rotateSelectedBoards(): void {
  const boards = selectedBoards(state);
  if (!boards.length) return;
  remember();
  const rotatedIds = new Set(boards.map((board) => board.id));
  boards.forEach((board) => {
    const rect = rectFromBoard(board);
    const centerX = rect.x + rect.w / 2;
    const centerY = rect.y + rect.h / 2;
    board.orientation = rotateOrientation(board.orientation);
    board.kind = rotateBoardKind(board.kind);
    const nextRect = rectFromBoard(board);
    board.x = Math.round(centerX - nextRect.w / 2);
    board.y = Math.round(centerY - nextRect.h / 2);
    state.layoutAnchors
      .filter((anchor) => anchor.boardId === board.id)
      .forEach((anchor) => {
        anchor.axis = anchor.axis === "x" ? "y" : "x";
      });
  });
  state.anchors = state.anchors.filter((anchor) => !rotatedIds.has(anchor.boardId) && !rotatedIds.has(anchor.targetBoardId));
  state.lastSnap = boards.length > 1 ? t("status.rotatedBoards", { count: boards.length }) : t("status.rotated90");
  refresh();
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target instanceof HTMLInputElement) {
    return ["email", "number", "password", "search", "tel", "text", "url"].includes(target.type);
  }
  return target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable;
}

function cursorForResizeHandle(handle: ResizeHandle): string {
  const cursors: Record<ResizeHandle, string> = {
    n: "ns-resize",
    s: "ns-resize",
    e: "ew-resize",
    w: "ew-resize",
    ne: "nesw-resize",
    sw: "nesw-resize",
    nw: "nwse-resize",
    se: "nwse-resize"
  };
  return cursors[handle];
}

function isAdditiveSelection(event: PointerEvent): boolean {
  return event.shiftKey || event.metaKey || event.ctrlKey;
}

function shouldPan(event: PointerEvent): boolean {
  return event.button === 1 || event.altKey;
}

function rectFromPoints(a: Point, b: Point): Rect {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) };
}

function rectsIntersect(a: Rect, b: Rect): boolean {
  return a.x <= b.x + b.w &&
    a.x + a.w >= b.x &&
    a.y <= b.y + b.h &&
    a.y + a.h >= b.y;
}

function boardsInRect(rect: Rect): Board[] {
  return state.boards.filter((board) => {
    if (board.kind === "front" && !state.showFrontPanels) return false;
    return rectsIntersect(rect, rectFromBoard(board));
  });
}

function updateCanvasCursor(point: Point): void {
  if (state.tool === "measure") {
    canvas.style.cursor = "";
    return;
  }

  if (state.measurementDragging) {
    canvas.style.cursor = "move";
    return;
  }

  if (hitTestMeasurement(state, point)) {
    canvas.style.cursor = "move";
    return;
  }

  const selected = selectedBoard(state);
  if (selected) {
    const handle = hitResizeHandle(state, selected, point);
    if (handle) {
      canvas.style.cursor = cursorForResizeHandle(handle);
      return;
    }
  }

  canvas.style.cursor = hitTest(state, point) ? "grab" : "crosshair";
}

function updateMeasurementDrag(point: Point): void {
  const drag = state.measurementDragging;
  if (!drag) return;
  const measurement = state.measurements.find((item) => item.id === drag.id);
  const index = state.measurements.findIndex((item) => item.id === drag.id);
  if (!measurement || index < 0) return;
  const layout = measurementDisplayLine(state, measurement, index);
  if (!layout) return;
  const dx = point.x - drag.startPoint.x;
  const dy = point.y - drag.startPoint.y;
  const movedPx = Math.hypot(dx * state.scale, dy * state.scale);
  if (!drag.changed && movedPx > 3) {
    remember();
    drag.changed = true;
  }
  if (!drag.changed) return;
  measurement.displayOffset = Math.round(layout.axis === "horizontal" ? drag.startOffset - dy : drag.startOffset + dx);
  state.lastSnap = t("status.measurementDisplayMoved");
  canvas.style.cursor = "move";
  refresh();
}

function updateMeasurementPreview(point: Point): void {
  if (state.tool !== "measure" || !state.pendingMeasurementAnchor) return;
  state.previewMeasurementAnchor = nearestMeasurementAnchor(state, point);
  refresh();
}

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  if (state.tool === "measure") {
    handleMeasurementClick(point);
    return;
  }

  if (shouldPan(event)) {
    state.panning = { startX: event.clientX, startY: event.clientY, panX: state.panX, panY: state.panY };
    canvas.style.cursor = "grabbing";
    canvas.setPointerCapture(event.pointerId);
    return;
  }

  const selected = selectedBoard(state);
  if (selected) {
    const handle = hitResizeHandle(state, selected, point);
    if (handle && selectedBoards(state).length <= 1) {
      remember();
      state.resizing = { id: selected.id, handle, startPoint: point, startRect: rectFromBoard(selected) };
      state.lastSnap = t("status.resizing");
      canvas.style.cursor = cursorForResizeHandle(handle);
      canvas.setPointerCapture(event.pointerId);
      refresh();
      return;
    }
  }

  const measurement = hitTestMeasurement(state, point);
  if (measurement) {
    const index = state.measurements.findIndex((item) => item.id === measurement.id);
    setMeasurementSelection(measurement.id);
    state.measurementDragging = {
      id: measurement.id,
      startPoint: point,
      startOffset: measurementDisplayOffset(measurement, index),
      changed: false
    };
    state.lastSnap = t("status.measurementSelected");
    canvas.style.cursor = "move";
    canvas.setPointerCapture(event.pointerId);
    refresh();
    return;
  }

  const board = hitTest(state, point);
  if (board) {
    if (isAdditiveSelection(event)) {
      toggleBoardSelection(board.id);
      state.lastSnap = selectedIdSet().size > 1 ? t("status.boardsSelected", { count: selectedIdSet().size }) : t("status.selectionUpdated");
      refresh();
      return;
    }

    const currentSelection = selectedIdSet();
    const dragIds = currentSelection.has(board.id)
      ? [board.id, ...[...currentSelection].filter((id) => id !== board.id)]
      : [board.id];
    setSelection(dragIds, board.id);
    remember();
    state.dragging = {
      ids: dragIds,
      startPoint: point,
      startRects: dragIds.flatMap((id) => {
        const item = state.boards.find((candidate) => candidate.id === id);
        return item ? [{ id, ...rectFromBoard(item) }] : [];
      })
    };
    canvas.style.cursor = "grabbing";
    canvas.setPointerCapture(event.pointerId);
  } else {
    state.selectionBox = { start: point, current: point, additive: isAdditiveSelection(event) };
    canvas.style.cursor = "crosshair";
    canvas.setPointerCapture(event.pointerId);
  }
  refresh();
}, listenerOptions);

canvas.addEventListener("dblclick", (event) => {
  if (state.tool === "measure") return;
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  const measurement = hitTestMeasurement(state, point);
  if (!measurement) return;
  event.preventDefault();
  openMeasurementRename(measurement.id, event);
}, listenerOptions);

canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);

  if (state.tool === "measure") {
    updateMeasurementPreview(point);
    updateCanvasCursor(point);
    return;
  }

  if (state.resizing) {
    const board = state.boards.find((candidate) => candidate.id === state.resizing?.id);
    if (!board) return;
    const snapped = resizeBoard(state, board, state.resizing.handle, state.resizing.startRect, state.resizing.startPoint, point);
    applyBoardRect(board, snapped.rect);
    propagateAnchorsFrom(board.id);
    state.snapGuides = snapped.guides;
    state.lastSnap = snapped.label;
    canvas.style.cursor = cursorForResizeHandle(state.resizing.handle);
    refresh();
    return;
  }

  if (state.panning) {
    state.panX = state.panning.panX + event.clientX - state.panning.startX;
    state.panY = state.panning.panY + event.clientY - state.panning.startY;
    state.snapGuides = [];
    state.lastSnap = t("status.panningView");
    canvas.style.cursor = "grabbing";
    refresh();
    return;
  }

  if (state.measurementDragging) {
    updateMeasurementDrag(point);
    return;
  }

  if (state.selectionBox) {
    state.selectionBox.current = point;
    state.snapGuides = [];
    state.lastSnap = t("status.selectingBoards");
    canvas.style.cursor = "crosshair";
    refresh();
    return;
  }

  if (!state.dragging) {
    updateCanvasCursor(point);
    return;
  }
  const board = state.boards.find((candidate) => candidate.id === state.dragging?.ids[0]);
  if (!board) return;
  const primaryStartRect = state.dragging.startRects.find((startRect) => startRect.id === board.id);
  if (!primaryStartRect) return;
  const dx = point.x - state.dragging.startPoint.x;
  const dy = point.y - state.dragging.startPoint.y;
  const ignoreIds = new Set(state.dragging.ids);
  const snapped = snapBoard(state, board, primaryStartRect.x + dx, primaryStartRect.y + dy, ignoreIds);
  const snappedDx = snapped.x - primaryStartRect.x;
  const snappedDy = snapped.y - primaryStartRect.y;
  state.dragging.startRects.forEach((startRect) => {
    const item = state.boards.find((candidate) => candidate.id === startRect.id);
    if (item) applyBoardRect(item, { ...startRect, x: startRect.x + snappedDx, y: startRect.y + snappedDy });
  });
  state.dragging.ids.forEach((id) => propagateAnchorsFrom(id));
  state.snapGuides = snapped.guides;
  state.lastSnap = snapped.label;
  canvas.style.cursor = "grabbing";
  refresh();
}, listenerOptions);

canvas.addEventListener("pointerup", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  const finishedBoardIds = state.dragging?.ids ?? (state.resizing ? [state.resizing.id] : []);
  const finishedMeasurementDrag = state.measurementDragging;
  const selectionBox = state.selectionBox;
  if (selectionBox) {
    const selectionRect = rectFromPoints(selectionBox.start, selectionBox.current);
    const movedPx = Math.hypot(
      (selectionBox.current.x - selectionBox.start.x) * state.scale,
      (selectionBox.current.y - selectionBox.start.y) * state.scale
    );
    if (movedPx > 4) {
      const rectSelection = boardsInRect(selectionRect).map((board) => board.id);
      const nextIds = selectionBox.additive ? [...selectedIdSet(), ...rectSelection] : rectSelection;
      setSelection(nextIds, rectSelection[0] ?? (selectionBox.additive ? state.selectedId : null));
      state.lastSnap = rectSelection.length ? t("status.boardsSelected", { count: selectedIdSet().size }) : t("status.noBoardsInSelection");
    } else if (!selectionBox.additive) {
      clearSelection();
      state.selectedMeasurementId = null;
      state.lastSnap = t("workspace.noBoardSelected");
    }
  }
  state.dragging = null;
  state.resizing = null;
  state.measurementDragging = null;
  state.panning = null;
  state.selectionBox = null;
  state.snapGuides = [];
  finishedBoardIds.forEach((id) => anchorTouchedBoard(id));
  if (finishedMeasurementDrag?.changed) state.lastSnap = t("status.measurementDisplayMoved");
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  updateCanvasCursor(point);
  refresh();
}, listenerOptions);

canvas.addEventListener("pointerleave", () => {
  if (!state.dragging && !state.resizing && !state.measurementDragging && !state.panning && !state.selectionBox) canvas.style.cursor = "";
}, listenerOptions);

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  const before = screenToWorld(state, mouse.x, mouse.y);
  state.scale = Math.max(minWheelScale, Math.min(maxWheelScale, state.scale * (event.deltaY > 0 ? 0.92 : 1.08)));
  const after = screenToWorld(state, mouse.x, mouse.y);
  state.panX += (after.x - before.x) * state.scale;
  state.panY += (after.y - before.y) * state.scale;
  refresh();
}, { passive: false, signal: controllerEvents.signal });

ui.anchorOverlay.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-remove-anchor]");
  if (!target) return;
  const id = Number(target.dataset.removeAnchor);
  remember();
  state.anchors = state.anchors.filter((anchor) => anchor.id !== id);
  state.lastSnap = t("status.anchorRemoved");
  refresh();
}, listenerOptions);

ui.templateList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-template]");
  const templateId = target?.dataset.template as TemplateId | undefined;
  if (!templateId) return;
  createTemplate(templateId);
}, listenerOptions);
ui.measureModeBtn.addEventListener("click", () => {
  state.tool = state.tool === "measure" ? "select" : "measure";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.lastSnap = state.tool === "measure" ? t("status.pickFirstAnchor") : t("status.selectMode");
  refresh();
}, listenerOptions);
ui.presetList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-preset]");
  if (!target) return;
  createPresetAt(target.dataset.preset ?? "");
}, listenerOptions);
ui.presetList.addEventListener("dragstart", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-preset]");
  if (!target || !event.dataTransfer) return;
  event.dataTransfer.setData("text/plain", target.dataset.preset ?? "");
  event.dataTransfer.effectAllowed = "copy";
}, listenerOptions);
canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
  canvas.classList.add("drop-ready");
}, listenerOptions);
canvas.addEventListener("dragleave", () => {
  canvas.classList.remove("drop-ready");
}, listenerOptions);
canvas.addEventListener("drop", (event) => {
  event.preventDefault();
  canvas.classList.remove("drop-ready");
  const presetId = event.dataTransfer?.getData("text/plain");
  if (!presetId) return;
  const rect = canvas.getBoundingClientRect();
  createPresetAt(presetId, screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top));
}, listenerOptions);
ui.duplicateBtn.addEventListener("click", duplicateSelectedBoards, listenerOptions);
ui.rotateBtn.addEventListener("click", rotateSelectedBoards, listenerOptions);
ui.undoBtn.addEventListener("click", undo, listenerOptions);
ui.redoBtn.addEventListener("click", redo, listenerOptions);
ui.measureWidthBtn.addEventListener("click", () => addSelectedMeasurement("horizontal"), listenerOptions);
ui.measureHeightBtn.addEventListener("click", () => addSelectedMeasurement("vertical"), listenerOptions);
ui.saveBtn.addEventListener("click", exportProjectFile, listenerOptions);
ui.loadBtn.addEventListener("click", openProjectFilePicker, listenerOptions);
ui.newProjectBtn.addEventListener("click", newProjectWithConfirmation, listenerOptions);
ui.projectFileInput.addEventListener("change", () => {
  const file = ui.projectFileInput.files?.[0];
  if (file) importProjectFile(file);
}, listenerOptions);
ui.deleteBtn.addEventListener("click", deleteActiveSelection, listenerOptions);
ui.fitBtn.addEventListener("click", fitToView, listenerOptions);
ui.view3dBtn.addEventListener("click", () => {
  setActiveView(activeView === "3d" ? "sketch" : "3d");
}, listenerOptions);
ui.woodOrderToggleBtn.addEventListener("click", () => setWoodOrderOpen(!woodOrderOpen), listenerOptions);
ui.woodOrderBackBtn.addEventListener("click", () => setWoodOrderOpen(false), listenerOptions);
ui.cutList.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-board-id]");
  if (!button) return;
  selectBoardFromOrder(Number(button.dataset.boardId));
}, listenerOptions);
ui.ignoredCutList.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-board-id]");
  if (!button) return;
  selectBoardFromOrder(Number(button.dataset.boardId));
}, listenerOptions);
ui.copyCsvBtn.addEventListener("click", () => void copyCutListCsv(), listenerOptions);
ui.exportBtn.addEventListener("click", exportCutListCsv, listenerOptions);
ui.printOrderBtn.addEventListener("click", printCutListTable, listenerOptions);
ui.printSketchBtn.addEventListener("click", printSketch, listenerOptions);
ui.projectNameInput.addEventListener("change", () => {
  const nextName = normalizeProjectName(ui.projectNameInput.value);
  ui.projectNameInput.value = nextName;
  if (nextName === state.projectName) return;
  remember();
  state.projectName = nextName;
  state.lastSnap = nextName ? t("status.projectNamed") : t("status.projectNameCleared");
  refresh();
}, listenerOptions);
commitOnChangeOrEnter(ui.thicknessInput, () => applyThicknessChange(Math.max(3, Number(ui.thicknessInput.value) || 18)));
ui.depthInput.addEventListener("change", () => applyDepthChange(normalizePositiveNumber(ui.depthInput.value, state.depth)), listenerOptions);
ui.gridInput.addEventListener("input", () => {
  remember();
  state.grid = Math.max(1, Number(ui.gridInput.value) || 25);
  refresh();
}, listenerOptions);
ui.snapToggle.addEventListener("change", () => {
  remember();
  state.snap = ui.snapToggle.checked;
  state.lastSnap = state.snap ? t("status.snapOn") : t("status.snapOff");
  refresh();
}, listenerOptions);
ui.dimToggle.addEventListener("change", () => {
  remember();
  state.showDimensions = ui.dimToggle.checked;
  refresh();
}, listenerOptions);
ui.frontLayerToggle.addEventListener("change", () => {
  remember();
  state.showFrontPanels = ui.frontLayerToggle.checked;
  state.lastSnap = state.showFrontPanels ? t("status.frontPanelsShown") : t("status.frontPanelsHidden");
  refresh();
}, listenerOptions);
ui.connectionMarksToggle.addEventListener("change", () => {
  remember();
  state.showConnectionMarks = ui.connectionMarksToggle.checked;
  state.lastSnap = state.showConnectionMarks ? t("status.connectionMarksShown") : t("status.connectionMarksHidden");
  refresh();
}, listenerOptions);
[ui.nameInput, ui.xInput, ui.yInput, ui.wInput, ui.hInput, ui.depthOverrideInput]
  .forEach((input) => commitOnChangeOrEnter(input, updateBoardFromInspector));
ui.materialInput.addEventListener("change", updateMaterialFromInspector, listenerOptions);
ui.materialSelectButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMaterialSelect();
}, listenerOptions);
ui.materialSelectList.addEventListener("click", (event) => {
  const option = (event.target as HTMLElement).closest<HTMLElement>("[data-material-id]");
  if (!option) return;
  ui.materialInput.value = option.dataset.materialId ?? "";
  closeMaterialSelect();
  updateMaterialFromInspector();
}, listenerOptions);
document.addEventListener("click", (event) => {
  if (ui.materialSelect.contains(event.target as Node)) return;
  closeMaterialSelect();
}, listenerOptions);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMaterialSelect();
}, listenerOptions);
ui.layoutAnchorAxisInput.addEventListener("change", updateLayoutAnchorSummary, listenerOptions);
ui.layoutAnchorBalanceInput.addEventListener("change", updateLayoutBalanceControls, listenerOptions);
ui.layoutAnchorApplyBtn.addEventListener("click", distributeLayoutAnchors, listenerOptions);
ui.layoutAnchorClearBtn.addEventListener("click", clearLayoutAnchors, listenerOptions);
ui.materialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCustomMaterial();
}, listenerOptions);
ui.bandingProfileInput.addEventListener("change", () => { bandingBrush = ui.bandingProfileInput.value; }, listenerOptions);
ui.bandingDiagram.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-banding-edge]");
  if (!button) return;
  const edge = button.dataset.bandingEdge as EdgeBandingEdge;
  const boards = selectedBoards(state);
  const remove = commonValue(boards, (board) => bandingProfileKey(board.edgeBanding[edge])) !== null && Boolean(boards[0]?.edgeBanding[edge]);
  applyBandingChanges(boards.map((board) => ({ board, edge, profile: remove ? null : profileForChoice(bandingBrush, board) })));
}, listenerOptions);
ui.bandingEdgeFields.addEventListener("change", (event) => {
  const select = event.target as HTMLSelectElement;
  if (!select.dataset.bandingInput || !select.value || select.value === "current") return;
  const edge = select.dataset.bandingInput as EdgeBandingEdge;
  applyBandingChanges(selectedBoards(state).map((board) => ({ board, edge, profile: profileForChoice(select.value, board) })));
}, listenerOptions);
ui.bandingPresets.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-banding-preset]");
  if (!button) return;
  const preset = button.dataset.bandingPreset;
  applyBandingChanges(selectedBoards(state).flatMap((board) => edgeBandingEdges.map((edge) => ({ board, edge, profile: preset === "all" || (preset === "front" && edge === frontBandingEdge(board)) ? profileForChoice(bandingBrush, board) : null }))));
}, listenerOptions);
ui.addBandingProfileBtn.addEventListener("click", addCustomBandingProfile, listenerOptions);
ui.confirmBandingBtn.addEventListener("click", confirmSelectedBanding, listenerOptions);
ui.faceLaminationInput.addEventListener("change", () => {
  const value = ui.faceLaminationInput.value;
  if (!["both", "s1", "s2", "none"].includes(value)) return;
  const lamination = normalizeFaceLamination(value);
  const boards = selectedBoards(state);
  if (!boards.length || boards.every((board) => board.faceLamination === lamination)) return;
  remember();
  boards.forEach((board) => { board.faceLamination = lamination; });
  state.lastSnap = t("faceLamination.updated");
  refresh();
}, listenerOptions);
ui.grainInput.addEventListener("change", () => {
  const direction = ui.grainInput.value;
  if (direction !== "none" && direction !== "a" && direction !== "b") return;
  const boards = selectedBoards(state);
  if (!boards.length || boards.every((board) => board.grainDirection === direction)) return;
  remember();
  boards.forEach((board) => { board.grainDirection = direction; });
  refresh();
}, listenerOptions);
ui.ignoreOrderInput.addEventListener("change", updateOrderInclusionFromInspector, listenerOptions);
ui.measureRenameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitMeasurementRename();
}, listenerOptions);
ui.measureRenameCancelBtn.addEventListener("click", closeMeasurementRename, listenerOptions);
ui.measureRenameInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMeasurementRename();
  if (event.key === "Enter") {
    event.preventDefault();
    submitMeasurementRename();
  }
}, listenerOptions);
document.addEventListener("keydown", (event) => {
  if (isEditableTarget(event.target)) return;
  const key = event.key.toLowerCase();
  const command = event.metaKey || event.ctrlKey;
  if (command && key === "z") {
    event.preventDefault();
    if (event.shiftKey) redo();
    else undo();
    return;
  }
  if (command && key === "y") {
    event.preventDefault();
    redo();
    return;
  }
  if (command && key === "d") {
    event.preventDefault();
    duplicateSelectedBoards();
    return;
  }
  if (!command && key === "r") {
    event.preventDefault();
    rotateSelectedBoards();
    return;
  }
  if (event.key === "Delete" || event.key === "Backspace") {
    event.preventDefault();
    deleteActiveSelection();
  }
}, listenerOptions);
window.addEventListener("resize", resizeActiveView, listenerOptions);

if (import.meta.env.DEV) {
  window.mebleBuilderDebug = {
    state,
    hitTestWorld: (point) => hitTest(state, point)?.name ?? null,
    snapPreview: (boardName, x, y) => {
      const board = state.boards.find((candidate) => candidate.name === boardName);
      return board ? snapBoard(state, board, x, y).guides.length : 0;
    },
    overlaps: () => computeOverlaps(state.boards).length,
    refresh
  };
}

syncSettingsInputs();
ui.canvasWrap.dataset.view = activeView;
ui.view3dBtn.setAttribute("aria-pressed", "false");
visualization3d.bindInteractions(listenerOptions);
loadInitialProject();
resizeActiveView();

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data.project = serializeProject();
    autosaveProject();
    controllerEvents.abort();
    visualization3d.dispose();
    canvas.classList.remove("drop-ready");
    if (window.mebleBuilderDebug?.state === state) delete window.mebleBuilderDebug;
  });
}
