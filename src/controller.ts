import { SketchRenderer } from "./renderer";
import {
  boardLabel,
  boundsFor,
  computeGroups,
  computeOverlaps,
  groupBoards,
  hitTest,
  hitResizeHandle,
  innerDimensions,
  measurementAxis,
  mm,
  nearestMeasurementAnchor,
  rectFromBoard,
  resizeBoard,
  resolveMeasurementAnchor,
  screenToWorld,
  selectedBoard,
  selectedBoards,
  snapBoard,
  snapValueToGrid,
  worldToScreen
} from "./geometry";
import type { AutoThicknessAxis, Board, BoardAnchor, BoardEdge, BoardKind, LaminateEdges, Material, MeasurementAnchor, MeasurementAxis, Point, Rect, ResizeHandle, SketchState } from "./types";

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
const ui = {
  templateList: query<HTMLElement>("#templateList"),
  measureModeBtn: query<HTMLButtonElement>("#measureModeBtn"),
  presetList: query<HTMLElement>("#presetList"),
  thicknessInput: query<HTMLInputElement>("#thicknessInput"),
  depthInput: query<HTMLInputElement>("#depthInput"),
  gridInput: query<HTMLInputElement>("#gridInput"),
  snapToggle: query<HTMLInputElement>("#snapToggle"),
  dimToggle: query<HTMLInputElement>("#dimToggle"),
  frontLayerToggle: query<HTMLInputElement>("#frontLayerToggle"),
  duplicateBtn: query<HTMLButtonElement>("#duplicateBtn"),
  rotateBtn: query<HTMLButtonElement>("#rotateBtn"),
  undoBtn: query<HTMLButtonElement>("#undoBtn"),
  redoBtn: query<HTMLButtonElement>("#redoBtn"),
  measureWidthBtn: query<HTMLButtonElement>("#measureWidthBtn"),
  measureHeightBtn: query<HTMLButtonElement>("#measureHeightBtn"),
  saveBtn: query<HTMLButtonElement>("#saveBtn"),
  loadBtn: query<HTMLButtonElement>("#loadBtn"),
  projectFileInput: query<HTMLInputElement>("#projectFileInput"),
  deleteBtn: query<HTMLButtonElement>("#deleteBtn"),
  fitBtn: query<HTMLButtonElement>("#fitBtn"),
  copyCsvBtn: query<HTMLButtonElement>("#copyCsvBtn"),
  exportBtn: query<HTMLButtonElement>("#exportBtn"),
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
  materialInput: query<HTMLSelectElement>("#materialInput"),
  materialLabelSwatch: query<HTMLElement>("#materialLabelSwatch"),
  materialForm: query<HTMLFormElement>("#materialForm"),
  materialNameInput: query<HTMLInputElement>("#materialNameInput"),
  materialColorInput: query<HTMLInputElement>("#materialColorInput"),
  addMaterialBtn: query<HTMLButtonElement>("#addMaterialBtn"),
  laminateLeftInput: query<HTMLInputElement>("#laminateLeftInput"),
  laminateRightInput: query<HTMLInputElement>("#laminateRightInput"),
  laminateFrontInput: query<HTMLInputElement>("#laminateFrontInput"),
  laminateBackInput: query<HTMLInputElement>("#laminateBackInput"),
  ignoreOrderInput: query<HTMLInputElement>("#ignoreOrderInput"),
  measureList: query<HTMLElement>("#measureList"),
  customMeasureList: query<HTMLElement>("#customMeasureList"),
  warningList: query<HTMLElement>("#warningList"),
  cutList: query<HTMLElement>("#cutList"),
  materialList: query<HTMLElement>("#materialList"),
  anchorOverlay: query<HTMLElement>("#anchorOverlay"),
  overlayScaleBar: query<HTMLElement>("#overlayScaleBar"),
  overlayScaleLabel: query<HTMLElement>("#overlayScaleLabel"),
  overlayZoomLabel: query<HTMLElement>("#overlayZoomLabel")
};

const state: SketchState = {
  boards: [],
  anchors: [],
  measurements: [],
  materials: defaultMaterials(),
  selectedId: null,
  selectedIds: [],
  nextId: 1,
  nextAnchorId: 1,
  nextMeasurementId: 1,
  thickness: 18,
  depth: 560,
  grid: 25,
  gridOriginX: 160,
  gridOriginY: 120,
  snap: true,
  showDimensions: true,
  showFrontPanels: true,
  scale: 0.62,
  panX: 160,
  panY: 110,
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

const renderer = new SketchRenderer(canvas, state);
const storageKey = "mebel-maker-project";
const appVersion = import.meta.env.VITE_APP_VERSION;
const historyLimit = 80;
const minFitScale = 0.125;
const minWheelScale = 0.09;
const maxFitScale = 1.3;
const maxWheelScale = 2;
const undoStack: SavedProject[] = [];
const redoStack: SavedProject[] = [];
let notificationTimer: number | undefined;

interface SavedProject {
  schemaVersion?: 1;
  version: 1 | string;
  appVersion?: string;
  boards: Board[];
  anchors?: BoardAnchor[];
  measurements: SketchState["measurements"];
  materials?: Material[];
  selectedId: number | null;
  selectedIds?: number[];
  nextId: number;
  nextAnchorId?: number;
  nextMeasurementId: number;
  thickness: number;
  grid: number;
  gridOriginX: number;
  gridOriginY: number;
  snap: boolean;
  showDimensions: boolean;
  showFrontPanels?: boolean;
  scale: number;
  panX: number;
  panY: number;
  depth?: number;
}

interface PiecePreset {
  name: string;
  kind: BoardKind;
  autoThickness: AutoThicknessAxis;
  w: () => number;
  h: () => number;
}

type TemplateId = "cabinet" | "bookcase" | "base-cabinet" | "wall-cabinet" | "simple-box";

const presets: Record<string, PiecePreset> = {
  side: { name: "Side", kind: "upright", autoThickness: "width", w: () => state.thickness, h: () => 560 },
  shelf: { name: "Shelf", kind: "shelf", autoThickness: "height", w: () => 820 - state.thickness * 2, h: () => state.thickness },
  divider: { name: "Divider", kind: "upright", autoThickness: "width", w: () => state.thickness, h: () => 560 - state.thickness * 2 },
  back: { name: "Back", kind: "back", autoThickness: "none", w: () => 820, h: () => 560 },
  front: { name: "Front", kind: "front", autoThickness: "none", w: () => 820, h: () => 560 }
};

const defaultMaterialId = "birch-plywood";

function query<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

function defaultMaterials(): Material[] {
  return [
    { id: "birch-plywood", name: "Birch plywood", color: "#d9b77e" },
    { id: "oak", name: "Oak", color: "#c99756" },
    { id: "walnut", name: "Walnut", color: "#7a4f34" },
    { id: "pine", name: "Pine", color: "#e1c889" },
    { id: "white-melamine", name: "White melamine", color: "#f5f3ec" },
    { id: "black", name: "Black", color: "#252525" },
    { id: "white", name: "White", color: "#ffffff" },
    { id: "gray", name: "Gray", color: "#9aa0a6" },
    { id: "red", name: "Red", color: "#b8483b" },
    { id: "blue", name: "Blue", color: "#3f75a3" },
    { id: "green", name: "Green", color: "#538052" }
  ];
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

function defaultLaminate(): LaminateEdges {
  return { left: false, right: false, front: false, back: false };
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
}

function clearSelection(): void {
  setSelection([]);
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

function withDefaults(board: Board): Board {
  const materialId = board.materialId && state.materials.some((material) => material.id === board.materialId)
    ? board.materialId
    : defaultMaterialId;
  return {
    ...board,
    name: normalizedPieceName(board.name, board.id),
    materialId,
    depthOverride: normalizeOptionalPositiveNumber(board.depthOverride),
    laminate: board.laminate ?? defaultLaminate(),
    ignoreInOrder: board.ignoreInOrder ?? false
  };
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

function laminateKey(laminate: LaminateEdges): string {
  return ["left", "right", "front", "back"]
    .filter((edge) => laminate[edge as keyof LaminateEdges])
    .join(",") || "none";
}

function laminateLabel(laminate: LaminateEdges): string {
  const edges = ["left", "right", "front", "back"]
    .filter((edge) => laminate[edge as keyof LaminateEdges]);
  return edges.length ? edges.join(", ") : "none";
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
  return state.materials.find((material) => material.id === materialId)?.name ?? "Unknown material";
}

function materialColor(materialId: string): string {
  return state.materials.find((material) => material.id === materialId)?.color ?? state.materials[0].color;
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

function effectiveDepth(board: Board): number {
  return board.depthOverride ?? state.depth;
}

function displayY(y: number): number {
  return -y;
}

function modelY(y: number): number {
  return -y;
}

function addBoard(partial: Partial<Board> & { kind: BoardKind; autoThickness: AutoThicknessAxis }, recordHistory = true): void {
  if (recordHistory) remember();
  const board: Board = {
    id: state.nextId,
    name: normalizedPieceName(partial.name, state.nextId),
    x: partial.x ?? 120,
    y: partial.y ?? 120,
    w: partial.w ?? 400,
    h: partial.h ?? 250,
    kind: partial.kind,
    autoThickness: partial.autoThickness,
    materialId: partial.materialId ?? defaultMaterialId,
    depthOverride: normalizeOptionalPositiveNumber(partial.depthOverride),
    laminate: partial.laminate ?? defaultLaminate(),
    ignoreInOrder: partial.ignoreInOrder ?? false,
    group: 0
  };
  state.nextId += 1;
  state.boards.push(board);
  setSelection([board.id], board.id);
  anchorTouchedBoard(board.id);
  refresh();
}

function addTemplateBoard(partial: Partial<Board> & { kind: BoardKind; autoThickness: AutoThicknessAxis }): void {
  addBoard(partial, false);
}

function beginTemplate(recordHistory: boolean, x: number, y: number): void {
  if (recordHistory) remember();
  state.boards = [];
  state.anchors = [];
  state.measurements = [];
  state.nextId = 1;
  state.nextAnchorId = 1;
  state.nextMeasurementId = 1;
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.gridOriginX = x;
  state.gridOriginY = y;
}

function addOpenFrame(x: number, y: number, outerW: number, outerH: number): void {
  const t = state.thickness;
  const innerW = outerW - 2 * t;
  addTemplateBoard({ x, y, w: t, h: outerH, kind: "upright", autoThickness: "width" });
  addTemplateBoard({ x: x + outerW - t, y, w: t, h: outerH, kind: "upright", autoThickness: "width" });
  addTemplateBoard({ x: x + t, y, w: innerW, h: t, kind: "shelf", autoThickness: "height" });
  addTemplateBoard({ x: x + t, y: y + outerH - t, w: innerW, h: t, kind: "shelf", autoThickness: "height" });
}

function addBackPanel(x: number, y: number, outerW: number, outerH: number): void {
  addTemplateBoard({ x, y, w: outerW, h: outerH, kind: "back", autoThickness: "none" });
}

function addShelf(x: number, y: number, outerW: number): void {
  const t = state.thickness;
  addTemplateBoard({ x: x + t, y, w: outerW - 2 * t, h: t, kind: "shelf", autoThickness: "height" });
}

function addDivider(x: number, y: number, h: number): void {
  const t = state.thickness;
  addTemplateBoard({ x, y, w: t, h, kind: "upright", autoThickness: "width" });
}

function createTemplate(templateId: TemplateId, recordHistory = true): void {
  const t = state.thickness;
  const x = 160;
  const y = 120;

  beginTemplate(recordHistory, x, y);

  if (templateId === "cabinet") {
    const outerW = 820;
    const outerH = 560;
    addOpenFrame(x, y, outerW, outerH);
    addShelf(x, y + 275, outerW);
  }

  if (templateId === "bookcase") {
    const outerW = 760;
    const outerH = 1280;
    addOpenFrame(x, y, outerW, outerH);
    [320, 560, 800, 1040].forEach((shelfY) => addShelf(x, y + shelfY, outerW));
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "base-cabinet") {
    const outerW = 820;
    const outerH = 720;
    const dividerX = x + outerW / 2 - t / 2;
    const shelfY = y + 360;
    addOpenFrame(x, y, outerW, outerH);
    addTemplateBoard({ x: x + t, y: shelfY, w: dividerX - x - t, h: t, kind: "shelf", autoThickness: "height" });
    addTemplateBoard({ x: dividerX + t, y: shelfY, w: x + outerW - t - (dividerX + t), h: t, kind: "shelf", autoThickness: "height" });
    addDivider(dividerX, y + t, outerH - 2 * t);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "wall-cabinet") {
    const outerW = 720;
    const outerH = 640;
    addOpenFrame(x, y, outerW, outerH);
    addShelf(x, y + 315, outerW);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "simple-box") {
    const outerW = 520;
    const outerH = 360;
    addOpenFrame(x, y, outerW, outerH);
  }

  setSelection([1], 1);
  state.lastSnap = templateLabel(templateId);
  fitToView();
}

function templateLabel(templateId: TemplateId): string {
  const labels: Record<TemplateId, string> = {
    cabinet: "Cabinet",
    bookcase: "Bookcase",
    "base-cabinet": "Base cabinet",
    "wall-cabinet": "Wall cabinet",
    "simple-box": "Simple box"
  };
  return labels[templateId];
}

function createStarter(recordHistory = true): void {
  createTemplate("cabinet", recordHistory);
}

function refresh(): void {
  computeGroups(state.boards);
  renderer.draw();
  renderAnchorOverlay();
  renderMaterials();
  updateInspector();
  renderMeasurements();
  renderCustomMeasurements();
  renderWarnings();
  renderCutList();
  autosaveProject();
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
    state.lastSnap = "Nothing to undo";
    updateInspector();
    return;
  }
  redoStack.push(serializeProject());
  applyProject(previous, false);
  state.lastSnap = "Undone";
  updateInspector();
}

function redo(): void {
  const next = redoStack.pop();
  if (!next) {
    state.lastSnap = "Nothing to redo";
    updateInspector();
    return;
  }
  undoStack.push(serializeProject());
  applyProject(next, false);
  state.lastSnap = "Redone";
  updateInspector();
}

function serializeProject(): SavedProject {
  return cloneProject({
    schemaVersion: 1,
    version: appVersion,
    appVersion,
    boards: state.boards,
    anchors: state.anchors,
    measurements: state.measurements,
    materials: state.materials,
    selectedId: state.selectedId,
    selectedIds: state.selectedIds,
    nextId: state.nextId,
    nextAnchorId: state.nextAnchorId,
    nextMeasurementId: state.nextMeasurementId,
    thickness: state.thickness,
    depth: state.depth,
    grid: state.grid,
    gridOriginX: state.gridOriginX,
    gridOriginY: state.gridOriginY,
    snap: state.snap,
    showDimensions: state.showDimensions,
    showFrontPanels: state.showFrontPanels,
    scale: state.scale,
    panX: state.panX,
    panY: state.panY
  });
}

function applyProject(project: SavedProject, recordHistory = true): void {
  if (recordHistory) remember();
  state.materials = normalizedMaterials(project.materials);
  state.boards = (project.boards ?? []).map(withDefaults);
  state.anchors = normalizedAnchors(project.anchors);
  state.measurements = (project.measurements ?? []).map((measurement) => ({
    ...measurement,
    name: normalizedMeasureName(measurement.name, measurement.id)
  }));
  const savedSelection = project.selectedIds?.length ? project.selectedIds : project.selectedId ? [project.selectedId] : [];
  setSelection(savedSelection, project.selectedId);
  state.nextId = project.nextId ?? nextBoardId(state.boards);
  state.nextAnchorId = project.nextAnchorId ?? nextAnchorId(state.anchors);
  state.nextMeasurementId = project.nextMeasurementId ?? nextMeasureId(state.measurements);
  state.thickness = normalizePositiveNumber(project.thickness, state.thickness);
  state.depth = normalizePositiveNumber(project.depth, state.depth);
  state.grid = project.grid ?? state.grid;
  state.gridOriginX = project.gridOriginX ?? (boundsFor(state.boards)?.left ?? state.gridOriginX);
  state.gridOriginY = project.gridOriginY ?? (boundsFor(state.boards)?.top ?? state.gridOriginY);
  state.snap = project.snap ?? state.snap;
  state.showDimensions = project.showDimensions ?? state.showDimensions;
  state.showFrontPanels = project.showFrontPanels ?? state.showFrontPanels;
  state.scale = project.scale ?? state.scale;
  state.panX = project.panX ?? state.panX;
  state.panY = project.panY ?? state.panY;
  state.dragging = null;
  state.resizing = null;
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
  return (project.schemaVersion ?? (project.version === 1 ? 1 : undefined)) === 1 && Array.isArray(project.boards);
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
    state.lastSnap = "Restored autosave";
    updateInspector();
    return true;
  } catch {
    state.lastSnap = "Could not restore autosave";
    updateInspector();
    return false;
  }
}

function exportProjectFile(): void {
  const json = JSON.stringify(serializeProject(), null, 2);
  downloadTextFile(json, "application/json", `mebel-maker-${new Date().toISOString().slice(0, 10)}.mebel`);
  state.lastSnap = "Project exported";
  notify("Saved .mebel project");
  updateInspector();
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
  notify("Choose a .mebel project file");
}

function importProjectFile(file: File): void {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const project = JSON.parse(String(reader.result ?? "")) as SavedProject;
      if (!isSupportedProject(project)) throw new Error("Unsupported project file");
      applyProject(project);
      state.lastSnap = "Project imported";
      notify("Loaded project");
      updateInspector();
    } catch {
      state.lastSnap = "Could not import project";
      notify("Could not load project");
      updateInspector();
    }
  });
  reader.addEventListener("error", () => {
    state.lastSnap = "Could not read file";
    notify("Could not read file");
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
  ui.thicknessInput.value = String(state.thickness);
  ui.depthInput.value = String(state.depth);
  ui.gridInput.value = String(state.grid);
  ui.snapToggle.checked = state.snap;
  ui.dimToggle.checked = state.showDimensions;
  ui.frontLayerToggle.checked = state.showFrontPanels;
}

function commonValue<T>(items: T[], read: (item: T) => string): string | null {
  if (!items.length) return null;
  const first = read(items[0]);
  return items.every((item) => read(item) === first) ? first : null;
}

function setInputValue(input: HTMLInputElement, value: string | null, placeholder = "Mixed"): void {
  input.value = value ?? "";
  input.placeholder = value === null ? placeholder : "";
}

function setCheckboxValue(input: HTMLInputElement, value: boolean | null): void {
  input.checked = value ?? false;
  input.indeterminate = value === null;
}

function setSelectionButtonsDisabled(disabled: boolean): void {
  ui.duplicateBtn.disabled = disabled;
  ui.rotateBtn.disabled = disabled;
  ui.deleteBtn.disabled = disabled;
  ui.measureWidthBtn.disabled = disabled;
  ui.measureHeightBtn.disabled = disabled;
}

function updateInspector(): void {
  const board = selectedBoard(state);
  const boards = selectedBoards(state);
  const selectionBounds = boundsFor(boards);
  const hasSelection = boards.length > 0;
  const multi = boards.length > 1;
  ui.emptySelection.hidden = hasSelection;
  ui.inspector.hidden = !hasSelection;
  ui.selectionStatus.textContent = multi && selectionBounds
    ? `${boards.length} boards selected · ${mm(selectionBounds.w)} × ${mm(selectionBounds.h)}`
    : board ? boardLabel(board) : "No board selected";
  ui.snapStatus.textContent = state.lastSnap;
  updateViewportOverlay();
  ui.measureModeBtn.classList.toggle("active", state.tool === "measure");
  ui.undoBtn.disabled = !undoStack.length;
  ui.redoBtn.disabled = !redoStack.length;
  setSelectionButtonsDisabled(!hasSelection);
  canvas.classList.toggle("measure-mode", state.tool === "measure");
  if (state.tool === "measure") canvas.style.cursor = "";
  ui.wInput.disabled = false;
  ui.hInput.disabled = false;
  ui.nameInput.disabled = false;
  ui.materialLabelSwatch.style.background = board && !multi ? materialColor(board.materialId) : "transparent";
  if (!hasSelection) return;

  if (multi) {
    ui.nameInput.disabled = true;
    setInputValue(ui.nameInput, null, `${boards.length} boards`);
    setInputValue(ui.xInput, selectionBounds ? String(Math.round(selectionBounds.left)) : null);
    setInputValue(ui.yInput, selectionBounds ? String(Math.round(displayY(selectionBounds.top))) : null);
    setInputValue(ui.wInput, null);
    setInputValue(ui.hInput, null);
    ui.wInput.disabled = true;
    ui.hInput.disabled = true;
  } else if (board) {
    ui.nameInput.value = board.name;
    ui.nameInput.placeholder = "";
    ui.xInput.value = String(Math.round(board.x));
    ui.yInput.value = String(Math.round(displayY(board.y)));
    ui.wInput.value = String(Math.round(board.w));
    ui.hInput.value = String(Math.round(board.h));
    ui.depthOverrideInput.value = board.depthOverride === null ? "" : String(board.depthOverride);
    ui.materialInput.value = board.materialId;
    ui.wInput.disabled = board.autoThickness === "width";
    ui.hInput.disabled = board.autoThickness === "height";
  }

  const materialId = commonValue(boards, (item) => item.materialId);
  const depthOverride = commonValue(boards, (item) => item.depthOverride === null ? "" : String(item.depthOverride));
  ui.materialInput.value = materialId ?? "";
  setInputValue(ui.depthOverrideInput, depthOverride, "Mixed");
  ui.materialLabelSwatch.style.background = materialId ? materialColor(materialId) : "transparent";
  setCheckboxValue(ui.laminateLeftInput, commonValue(boards, (item) => String(item.laminate.left)) === null ? null : boards[0].laminate.left);
  setCheckboxValue(ui.laminateRightInput, commonValue(boards, (item) => String(item.laminate.right)) === null ? null : boards[0].laminate.right);
  setCheckboxValue(ui.laminateFrontInput, commonValue(boards, (item) => String(item.laminate.front)) === null ? null : boards[0].laminate.front);
  setCheckboxValue(ui.laminateBackInput, commonValue(boards, (item) => String(item.laminate.back)) === null ? null : boards[0].laminate.back);
  setCheckboxValue(ui.ignoreOrderInput, commonValue(boards, (item) => String(item.ignoreInOrder)) === null ? null : boards[0].ignoreInOrder);
}

function updateViewportOverlay(): void {
  const scaleLength = niceScaleLength(118 / state.scale);
  const scalePx = Math.max(28, Math.min(90, scaleLength * state.scale));
  ui.overlayScaleBar.style.setProperty("--scale-width", `${scalePx}px`);
  ui.overlayScaleLabel.textContent = mm(scaleLength);
  ui.overlayZoomLabel.textContent = `Zoom ${Math.round(state.scale * 100)}%`;
}

function niceScaleLength(targetMm: number): number {
  const exponent = Math.floor(Math.log10(Math.max(1, targetMm)));
  const base = 10 ** exponent;
  const fraction = targetMm / base;
  if (fraction >= 5) return 5 * base;
  if (fraction >= 2) return 2 * base;
  return base;
}

function renderMaterials(): void {
  ui.materialInput.innerHTML = `
    <option value="">Mixed materials</option>
  ` + state.materials.map((material) => `
    <option value="${escapeHtml(material.id)}">${escapeHtml(material.name)}</option>
  `).join("");

  ui.materialList.innerHTML = state.materials.map((material) => `
    <div class="material-card">
      <span class="material-swatch" style="background: ${material.color}"></span>
      <strong>${escapeHtml(material.name)}</strong>
    </div>
  `).join("");
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
        <strong>${selectedSet.length} selected boards</strong>
        <span>Selection: ${mm(bounds.w)} × ${mm(bounds.h)}</span>
        <span>Position: X ${mm(bounds.left)}, Y ${mm(bounds.top)}</span>
      </div>
    `);
  } else if (selected) {
    cards.push(`
      <div class="metric-card">
        <strong>${selected.name}</strong>
        <span>Board: ${mm(selected.w)} × ${mm(selected.h)} × ${mm(effectiveDepth(selected))}</span>
        <span>Position: X ${mm(selected.x)}, Y ${mm(displayY(selected.y))}</span>
      </div>
    `);
  }

  if (bounds) {
    cards.push(`
      <div class="metric-card">
        <strong>${selectedSet.length > 1 ? "Selected boards" : selected ? `Connected group ${selected.group}` : "Whole sketch"}</strong>
        <span>Outer: ${mm(bounds.w)} × ${mm(bounds.h)}</span>
        <span>Inner: ${inner?.hasFrame ? `${mm(inner.innerW)} × ${mm(inner.innerH)}` : "needs opposing frame boards"}</span>
        <span>Thickness model: ${mm(state.thickness)}</span>
        <span>Default depth: ${mm(state.depth)}</span>
      </div>
    `);
  }

  ui.measureList.innerHTML = cards.join("") || `<div class="empty-state">Add boards to see measurements.</div>`;
}

function renderCustomMeasurements(): void {
  if (!state.measurements.length) {
    ui.customMeasureList.innerHTML = `<div class="empty-state">No anchored measures.</div>`;
    return;
  }

  ui.customMeasureList.innerHTML = state.measurements.map((measurement) => {
    const a = resolveMeasurementAnchor(state, measurement.a);
    const b = resolveMeasurementAnchor(state, measurement.b);
    const value = a && b ? measurementValue(measurement.axis, a, b) : "missing anchor";
    return `
      <div class="metric-card">
        <label class="measure-name-field">
          <span>Name</span>
          <input data-measure-name="${measurement.id}" type="text" value="${escapeHtml(measurement.name)}" placeholder="${defaultMeasureName(measurement.id)}">
        </label>
        <span>${value}</span>
        <span>${anchorLabel(measurement.a)} → ${anchorLabel(measurement.b)}</span>
        <button class="inline-action" data-delete-measure="${measurement.id}" type="button">Delete measure</button>
      </div>
    `;
  }).join("");
}

function renderWarnings(): void {
  const overlaps = computeOverlaps(state.boards);
  if (!overlaps.length) {
    ui.warningList.innerHTML = `<div class="empty-state">No overlaps.</div>`;
    return;
  }

  ui.warningList.innerHTML = overlaps.map((overlap) => {
    const [a, b] = overlap.boardIds.map((id) => state.boards.find((board) => board.id === id)?.name ?? defaultPieceName(id));
    return `
      <div class="warning-card">
        <strong>Overlap</strong>
        <span>${a} and ${b}</span>
        <span>${mm(overlap.w)} × ${mm(overlap.h)}</span>
      </div>
    `;
  }).join("");
}

function renderCutList(): void {
  const grouped = new Map<string, Board[]>();
  state.boards.filter((board) => !board.ignoreInOrder).forEach((board) => {
    const key = `${Math.round(board.w)}×${Math.round(board.h)}×${effectiveDepth(board)}×${state.thickness}×${board.materialId}×${laminateKey(board.laminate)}`;
    grouped.set(key, [...(grouped.get(key) ?? []), board]);
  });

  ui.cutList.innerHTML = [...grouped.entries()].map(([key, boards]) => {
    const [w, h, d, t, materialId] = key.split("×");
    const laminate = laminateLabel(boards[0].laminate);
    return `
      <div class="cut-card">
        <strong><span class="count">${boards.length}×</span> ${w} × ${h} × ${d} mm</strong>
        <span>Material thickness: ${t} mm</span>
        <span>Material: ${escapeHtml(materialName(materialId))}</span>
        <span>Laminate: ${laminate}</span>
        <span>${boards.map((board) => escapeHtml(board.name)).join(", ")}</span>
      </div>
    `;
  }).join("") || `<div class="empty-state">No boards in the sketch yet.</div>`;
}

function measurementValue(axis: MeasurementAxis, a: Point, b: Point): string {
  return axis === "horizontal" ? mm(Math.abs(b.x - a.x)) : mm(Math.abs(b.y - a.y));
}

function anchorLabel(anchor: MeasurementAnchor): string {
  if (anchor.kind === "grid") return `Grid ${mm(anchor.x)}, ${mm(displayY(anchor.y))}`;
  const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
  return `${board?.name ?? defaultPieceName(anchor.boardId)} ${anchor.edge}`;
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
        <button class="anchor-chip" data-remove-anchor="${anchor.id}" type="button" style="left: ${point.x}px; top: ${point.y - 8}px" title="Remove anchor to ${escapeHtml(anchorTargetLabel(anchor))}" aria-label="Remove anchor to ${escapeHtml(anchorTargetLabel(anchor))}">
          <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
            <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
            <path d="M9 15 L15 9"></path>
            <path d="M5 21 L19 3"></path>
          </svg>
          <span class="visually-hidden">Remove anchor</span>
        </button>
      `;
    })
    .join("");
}

function anchorTargetLabel(anchor: BoardAnchor): string {
  const target = state.boards.find((board) => board.id === anchor.targetBoardId);
  return `${target?.name ?? defaultPieceName(anchor.targetBoardId)} ${anchor.targetEdge}`;
}

function anchorChipPosition(anchor: BoardAnchor): Point | null {
  const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
  const target = state.boards.find((candidate) => candidate.id === anchor.targetBoardId);
  if (!board || !target) return null;
  const edgePosition = boardEdgeValue(board, anchor.edge);

  if (anchor.edge === "left" || anchor.edge === "right") {
    const top = Math.max(board.y, target.y);
    const bottom = Math.min(board.y + board.h, target.y + target.h);
    return { x: edgePosition, y: top <= bottom ? (top + bottom) / 2 : board.y + board.h / 2 };
  }

  const left = Math.max(board.x, target.x);
  const right = Math.min(board.x + board.w, target.x + target.w);
  return { x: left <= right ? (left + right) / 2 : board.x + board.w / 2, y: edgePosition };
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
  if (board.autoThickness === "width") return edge === "top" || edge === "bottom";
  if (board.autoThickness === "height") return edge === "left" || edge === "right";
  return true;
}

function touchingEdges(board: Board, target: Board): Array<[BoardEdge, BoardEdge]> {
  const tolerance = 0.5;
  const edges: Array<[BoardEdge, BoardEdge]> = [];
  if (Math.abs(board.x - (target.x + target.w)) <= tolerance && rangesOverlap(board.y, board.y + board.h, target.y, target.y + target.h)) {
    edges.push(["left", "right"]);
  }
  if (Math.abs(board.x + board.w - target.x) <= tolerance && rangesOverlap(board.y, board.y + board.h, target.y, target.y + target.h)) {
    edges.push(["right", "left"]);
  }
  if (Math.abs(board.y - (target.y + target.h)) <= tolerance && rangesOverlap(board.x, board.x + board.w, target.x, target.x + target.w)) {
    edges.push(["top", "bottom"]);
  }
  if (Math.abs(board.y + board.h - target.y) <= tolerance && rangesOverlap(board.x, board.x + board.w, target.x, target.x + target.w)) {
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
  if (edge === "left") return board.x;
  if (edge === "right") return board.x + board.w;
  if (edge === "top") return board.y;
  return board.y + board.h;
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
  state.scale = Math.min((rect.width - padding * 2) / bounds.w, (rect.height - padding * 2) / bounds.h);
  state.scale = Math.max(minFitScale, Math.min(maxFitScale, state.scale));
  state.panX = (rect.width - bounds.w * state.scale) / 2 - bounds.left * state.scale;
  state.panY = (rect.height - bounds.h * state.scale) / 2 - bounds.top * state.scale;
  refresh();
}

function applyThicknessChange(newThickness: number): void {
  if (newThickness === state.thickness) return;
  remember();
  const oldThickness = state.thickness;
  const delta = newThickness - oldThickness;
  state.thickness = newThickness;
  state.boards.forEach((board) => {
    if (board.autoThickness === "width") {
      if (board.x > 160) board.x += oldThickness - newThickness;
      board.w = newThickness;
    }
    if (board.autoThickness === "height") {
      board.x += delta;
      board.w = Math.max(newThickness, board.w - delta * 2);
      if (board.y > 120) board.y += oldThickness - newThickness;
      board.h = newThickness;
    }
  });
  state.boards.forEach((board) => applyAnchorsToBoard(board.id));
  refresh();
}

function applyDepthChange(newDepth: number): void {
  if (newDepth === state.depth) return;
  remember();
  const oldDepth = state.depth;
  const updateExisting = state.boards.length > 0
    ? window.confirm(`Update all existing pieces to ${mm(newDepth)} depth? Choose Cancel to keep their current depths.`)
    : false;
  state.depth = newDepth;
  if (state.boards.length > 0) {
    state.boards.forEach((board) => {
      board.depthOverride = updateExisting ? null : effectiveDepthWithDefault(board, oldDepth);
    });
  }
  state.lastSnap = updateExisting
    ? `All pieces depth ${mm(state.depth)}`
    : `Default depth ${mm(state.depth)}`;
  refresh();
}

function effectiveDepthWithDefault(board: Board, defaultDepth: number): number {
  return board.depthOverride ?? defaultDepth;
}

function exportCutListCsv(): void {
  const csv = cutListCsv();
  downloadTextFile(
    csv,
    "text/csv;charset=utf-8",
    `mebel-maker-pieces-${new Date().toISOString().slice(0, 10)}.csv`
  );
  state.lastSnap = "Piece list CSV exported";
  notify("Saved piece list CSV");
  updateInspector();
}

async function copyCutListCsv(): Promise<void> {
  try {
    await copyText(cutListCsv());
    state.lastSnap = "Piece list CSV copied";
    notify("Copied piece list CSV");
  } catch {
    state.lastSnap = "Could not copy CSV";
    notify("Could not copy CSV");
  }
  updateInspector();
}

function cutListCsv(): string {
  const rows = [
    ["quantity", "width_mm", "height_mm", "depth_mm", "thickness_mm", "material", "laminate_edges", "pieces"]
  ];
  const grouped = new Map<string, Board[]>();
  state.boards.filter((board) => !board.ignoreInOrder).forEach((board) => {
    const key = `${Math.round(board.w)}×${Math.round(board.h)}×${effectiveDepth(board)}×${state.thickness}×${board.materialId}×${laminateKey(board.laminate)}`;
    grouped.set(key, [...(grouped.get(key) ?? []), board]);
  });

  grouped.forEach((boards, key) => {
    const [w, h, d, t, materialId] = key.split("×");
    rows.push([
      String(boards.length),
      w,
      h,
      d,
      t,
      materialName(materialId),
      laminateLabel(boards[0].laminate),
      boards.map((board) => board.name).join("; ")
    ]);
  });

  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
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
  if (target === ui.depthOverrideInput && ui.depthOverrideInput.value === "") {
    remember();
    boards.forEach((item) => {
      item.depthOverride = null;
    });
    state.lastSnap = `Depth uses global ${mm(state.depth)}`;
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
      state.lastSnap = "Selection moved";
    }
    if (target === ui.depthOverrideInput) {
      boards.forEach((item) => {
        item.depthOverride = normalizePositiveNumber(ui.depthOverrideInput.value, effectiveDepth(item));
      });
      state.lastSnap = `Depth set on ${boards.length} boards`;
    }
  } else {
    board.name = ui.nameInput.value.trim() || board.name;
    board.x = Number(ui.xInput.value) || 0;
    board.y = modelY(Number(ui.yInput.value) || 0);
    board.w = Math.max(1, Number(ui.wInput.value) || 1);
    board.h = Math.max(1, Number(ui.hInput.value) || 1);
    board.depthOverride = ui.depthOverrideInput.value === "" ? null : normalizePositiveNumber(ui.depthOverrideInput.value, effectiveDepth(board));
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
  state.lastSnap = boards.length > 1 ? `Material set on ${boards.length} boards` : `Material: ${materialName(boards[0].materialId)}`;
  refresh();
}

function addCustomMaterial(): void {
  const name = ui.materialNameInput.value.trim();
  if (!name) {
    state.lastSnap = "Name the material first";
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
  state.lastSnap = `Material added: ${material.name}`;
  refresh();
}

function updateLaminateFromInspector(): void {
  const boards = selectedBoards(state);
  if (!boards.length) return;
  remember();
  boards.forEach((board) => {
    board.laminate = {
      left: ui.laminateLeftInput.checked,
      right: ui.laminateRightInput.checked,
      front: ui.laminateFrontInput.checked,
      back: ui.laminateBackInput.checked
    };
  });
  state.lastSnap = boards.length > 1 ? `Laminate set on ${boards.length} boards` : "Laminate updated";
  refresh();
}

function updateOrderInclusionFromInspector(): void {
  const boards = selectedBoards(state);
  if (!boards.length) return;
  remember();
  boards.forEach((board) => {
    board.ignoreInOrder = ui.ignoreOrderInput.checked;
  });
  state.lastSnap = ui.ignoreOrderInput.checked ? "Removed from wood order" : "Added to wood order";
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
    w: preset.w(),
    h: preset.h(),
    kind: preset.kind,
    autoThickness: preset.autoThickness
  });
}

function currentViewCenter(): Point {
  const rect = canvas.getBoundingClientRect();
  return screenToWorld(state, rect.width / 2, rect.height / 2);
}

function applyBoardRect(board: Board, rect: { x: number; y: number; w: number; h: number }): void {
  board.x = Math.round(rect.x);
  board.y = Math.round(rect.y);
  board.w = Math.round(rect.w);
  board.h = Math.round(rect.h);
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
  state.measurements.push({
    id: state.nextMeasurementId,
    name: defaultMeasureName(state.nextMeasurementId),
    a,
    b,
    axis
  });
  state.nextMeasurementId += 1;
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.lastSnap = "Measurement added";
  refresh();
}

function addSelectedMeasurement(axis: MeasurementAxis): void {
  const board = selectedBoard(state);
  if (!board) return;
  if (axis === "horizontal") {
    addMeasurement(
      { kind: "board-edge", boardId: board.id, edge: "left", offset: board.h + 22 },
      { kind: "board-edge", boardId: board.id, edge: "right", offset: board.h + 22 },
      "horizontal"
    );
    return;
  }
  addMeasurement(
    { kind: "board-edge", boardId: board.id, edge: "top", offset: board.w + 22 },
    { kind: "board-edge", boardId: board.id, edge: "bottom", offset: board.w + 22 },
    "vertical"
  );
}

function handleMeasurementClick(point: Point): void {
  const anchor = nearestMeasurementAnchor(state, point);
  if (!state.pendingMeasurementAnchor) {
    state.pendingMeasurementAnchor = anchor;
    state.previewMeasurementAnchor = null;
    state.lastSnap = anchor.kind === "grid" ? "Grid anchor set, pick second anchor" : "Edge anchor set, pick second anchor";
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
  state.measurements = state.measurements.filter((measurement) =>
    ![measurement.a, measurement.b].some((anchor) => anchor.kind === "board-edge" && ids.has(anchor.boardId))
  );
  clearSelection();
  state.lastSnap = ids.size > 1 ? `${ids.size} boards deleted` : "Board deleted";
  refresh();
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
  setSelection(copies.map((board) => board.id), copies[0]?.id ?? null);
  state.lastSnap = copies.length > 1 ? `${copies.length} boards duplicated` : "Board duplicated";
  refresh();
}

function rotateAutoThickness(axis: AutoThicknessAxis): AutoThicknessAxis {
  if (axis === "width") return "height";
  if (axis === "height") return "width";
  return "none";
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
    const centerX = board.x + board.w / 2;
    const centerY = board.y + board.h / 2;
    const nextW = board.h;
    const nextH = board.w;
    board.x = Math.round(centerX - nextW / 2);
    board.y = Math.round(centerY - nextH / 2);
    board.w = Math.round(nextW);
    board.h = Math.round(nextH);
    board.autoThickness = rotateAutoThickness(board.autoThickness);
    board.kind = rotateBoardKind(board.kind);
  });
  state.anchors = state.anchors.filter((anchor) => !rotatedIds.has(anchor.boardId) && !rotatedIds.has(anchor.targetBoardId));
  state.lastSnap = boards.length > 1 ? `${boards.length} boards rotated` : "Rotated 90 deg";
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
      state.lastSnap = "Resizing";
      canvas.style.cursor = cursorForResizeHandle(handle);
      canvas.setPointerCapture(event.pointerId);
      refresh();
      return;
    }
  }

  const board = hitTest(state, point);
  if (board) {
    if (isAdditiveSelection(event)) {
      toggleBoardSelection(board.id);
      state.lastSnap = selectedIdSet().size > 1 ? `${selectedIdSet().size} boards selected` : "Selection updated";
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
});

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
    state.lastSnap = "Panning view";
    canvas.style.cursor = "grabbing";
    refresh();
    return;
  }

  if (state.selectionBox) {
    state.selectionBox.current = point;
    state.snapGuides = [];
    state.lastSnap = "Selecting boards";
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
});

canvas.addEventListener("pointerup", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  const finishedBoardIds = state.dragging?.ids ?? (state.resizing ? [state.resizing.id] : []);
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
      state.lastSnap = rectSelection.length ? `${selectedIdSet().size} boards selected` : "No boards in selection";
    } else if (!selectionBox.additive) {
      clearSelection();
      state.lastSnap = "No board selected";
    }
  }
  state.dragging = null;
  state.resizing = null;
  state.panning = null;
  state.selectionBox = null;
  state.snapGuides = [];
  finishedBoardIds.forEach((id) => anchorTouchedBoard(id));
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  updateCanvasCursor(point);
  refresh();
});

canvas.addEventListener("pointerleave", () => {
  if (!state.dragging && !state.resizing && !state.panning && !state.selectionBox) canvas.style.cursor = "";
});

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
}, { passive: false });

ui.anchorOverlay.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-remove-anchor]");
  if (!target) return;
  const id = Number(target.dataset.removeAnchor);
  remember();
  state.anchors = state.anchors.filter((anchor) => anchor.id !== id);
  state.lastSnap = "Anchor removed";
  refresh();
});

ui.templateList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-template]");
  const templateId = target?.dataset.template as TemplateId | undefined;
  if (!templateId) return;
  createTemplate(templateId);
});
ui.measureModeBtn.addEventListener("click", () => {
  state.tool = state.tool === "measure" ? "select" : "measure";
  state.pendingMeasurementAnchor = null;
  state.previewMeasurementAnchor = null;
  state.lastSnap = state.tool === "measure" ? "Pick first anchor" : "Select mode";
  refresh();
});
ui.presetList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-preset]");
  if (!target) return;
  createPresetAt(target.dataset.preset ?? "");
});
ui.presetList.addEventListener("dragstart", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-preset]");
  if (!target || !event.dataTransfer) return;
  event.dataTransfer.setData("text/plain", target.dataset.preset ?? "");
  event.dataTransfer.effectAllowed = "copy";
});
canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
  canvas.classList.add("drop-ready");
});
canvas.addEventListener("dragleave", () => {
  canvas.classList.remove("drop-ready");
});
canvas.addEventListener("drop", (event) => {
  event.preventDefault();
  canvas.classList.remove("drop-ready");
  const presetId = event.dataTransfer?.getData("text/plain");
  if (!presetId) return;
  const rect = canvas.getBoundingClientRect();
  createPresetAt(presetId, screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top));
});
ui.duplicateBtn.addEventListener("click", duplicateSelectedBoards);
ui.rotateBtn.addEventListener("click", rotateSelectedBoards);
ui.undoBtn.addEventListener("click", undo);
ui.redoBtn.addEventListener("click", redo);
ui.measureWidthBtn.addEventListener("click", () => addSelectedMeasurement("horizontal"));
ui.measureHeightBtn.addEventListener("click", () => addSelectedMeasurement("vertical"));
ui.saveBtn.addEventListener("click", exportProjectFile);
ui.loadBtn.addEventListener("click", openProjectFilePicker);
ui.projectFileInput.addEventListener("change", () => {
  const file = ui.projectFileInput.files?.[0];
  if (file) importProjectFile(file);
});
ui.deleteBtn.addEventListener("click", deleteSelectedBoards);
ui.fitBtn.addEventListener("click", fitToView);
ui.copyCsvBtn.addEventListener("click", () => void copyCutListCsv());
ui.exportBtn.addEventListener("click", exportCutListCsv);
ui.thicknessInput.addEventListener("input", () => applyThicknessChange(Math.max(3, Number(ui.thicknessInput.value) || 18)));
ui.depthInput.addEventListener("change", () => applyDepthChange(normalizePositiveNumber(ui.depthInput.value, state.depth)));
ui.gridInput.addEventListener("input", () => {
  remember();
  state.grid = Math.max(1, Number(ui.gridInput.value) || 25);
  refresh();
});
ui.snapToggle.addEventListener("change", () => {
  remember();
  state.snap = ui.snapToggle.checked;
  state.lastSnap = state.snap ? "Snap on" : "Snap off";
  refresh();
});
ui.dimToggle.addEventListener("change", () => {
  remember();
  state.showDimensions = ui.dimToggle.checked;
  refresh();
});
ui.frontLayerToggle.addEventListener("change", () => {
  remember();
  state.showFrontPanels = ui.frontLayerToggle.checked;
  state.lastSnap = state.showFrontPanels ? "Front panels shown" : "Front panels ghosted";
  refresh();
});
[ui.nameInput, ui.xInput, ui.yInput, ui.wInput, ui.hInput, ui.depthOverrideInput].forEach((input) => input.addEventListener("input", updateBoardFromInspector));
ui.materialInput.addEventListener("change", updateMaterialFromInspector);
ui.materialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCustomMaterial();
});
[ui.laminateLeftInput, ui.laminateRightInput, ui.laminateFrontInput, ui.laminateBackInput]
  .forEach((input) => input.addEventListener("change", updateLaminateFromInspector));
ui.ignoreOrderInput.addEventListener("change", updateOrderInclusionFromInspector);
ui.customMeasureList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-delete-measure]");
  if (!target) return;
  const id = Number(target.dataset.deleteMeasure);
  remember();
  state.measurements = state.measurements.filter((measurement) => measurement.id !== id);
  state.lastSnap = "Measurement deleted";
  refresh();
});
ui.customMeasureList.addEventListener("change", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLInputElement>("[data-measure-name]");
  if (!target) return;
  const id = Number(target.dataset.measureName);
  const measurement = state.measurements.find((item) => item.id === id);
  if (!measurement) return;
  const name = target.value.trim();
  const nextName = name || defaultMeasureName(measurement.id);
  if (measurement.name === nextName) return;
  remember();
  measurement.name = nextName;
  state.lastSnap = name ? "Measurement named" : "Measurement reset";
  refresh();
});
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
    deleteSelectedBoards();
  }
});
window.addEventListener("resize", () => renderer.resize());

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
if (!loadAutosavedProject()) createStarter(false);
renderer.resize();
