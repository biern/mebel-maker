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
  snapBoard,
  snapValueToGrid
} from "./geometry";
import type { AutoThicknessAxis, Board, BoardKind, LaminateEdges, Material, MeasurementAnchor, MeasurementAxis, Point, ResizeHandle, SketchState } from "./types";

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
  gridInput: query<HTMLInputElement>("#gridInput"),
  snapToggle: query<HTMLInputElement>("#snapToggle"),
  dimToggle: query<HTMLInputElement>("#dimToggle"),
  duplicateBtn: query<HTMLButtonElement>("#duplicateBtn"),
  rotateBtn: query<HTMLButtonElement>("#rotateBtn"),
  undoBtn: query<HTMLButtonElement>("#undoBtn"),
  redoBtn: query<HTMLButtonElement>("#redoBtn"),
  measureWidthBtn: query<HTMLButtonElement>("#measureWidthBtn"),
  measureHeightBtn: query<HTMLButtonElement>("#measureHeightBtn"),
  saveBtn: query<HTMLButtonElement>("#saveBtn"),
  loadBtn: query<HTMLButtonElement>("#loadBtn"),
  deleteBtn: query<HTMLButtonElement>("#deleteBtn"),
  fitBtn: query<HTMLButtonElement>("#fitBtn"),
  exportBtn: query<HTMLButtonElement>("#exportBtn"),
  selectionStatus: query<HTMLElement>("#selectionStatus"),
  snapStatus: query<HTMLElement>("#snapStatus"),
  emptySelection: query<HTMLElement>("#emptySelection"),
  inspector: query<HTMLFormElement>("#inspector"),
  nameInput: query<HTMLInputElement>("#nameInput"),
  xInput: query<HTMLInputElement>("#xInput"),
  yInput: query<HTMLInputElement>("#yInput"),
  wInput: query<HTMLInputElement>("#wInput"),
  hInput: query<HTMLInputElement>("#hInput"),
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
  overlayScaleBar: query<HTMLElement>("#overlayScaleBar"),
  overlayScaleLabel: query<HTMLElement>("#overlayScaleLabel"),
  overlayZoomLabel: query<HTMLElement>("#overlayZoomLabel")
};

const state: SketchState = {
  boards: [],
  measurements: [],
  materials: defaultMaterials(),
  selectedId: null,
  nextId: 1,
  nextMeasurementId: 1,
  thickness: 18,
  grid: 25,
  gridOriginX: 160,
  gridOriginY: 120,
  snap: true,
  showDimensions: true,
  scale: 0.62,
  panX: 160,
  panY: 110,
  dragging: null,
  resizing: null,
  panning: null,
  snapGuides: [],
  tool: "select",
  pendingMeasurementAnchor: null,
  lastSnap: "Ready"
};

const renderer = new SketchRenderer(canvas, state);
const storageKey = "mebel-maker-project";
const historyLimit = 80;
const undoStack: SavedProject[] = [];
const redoStack: SavedProject[] = [];

interface SavedProject {
  version: 1;
  boards: Board[];
  measurements: SketchState["measurements"];
  materials?: Material[];
  selectedId: number | null;
  nextId: number;
  nextMeasurementId: number;
  thickness: number;
  grid: number;
  gridOriginX: number;
  gridOriginY: number;
  snap: boolean;
  showDimensions: boolean;
  scale: number;
  panX: number;
  panY: number;
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
  back: { name: "Back", kind: "back", autoThickness: "none", w: () => 820, h: () => 560 }
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

function defaultLaminate(): LaminateEdges {
  return { left: false, right: false, front: false, back: false };
}

function withDefaults(board: Board): Board {
  const materialId = board.materialId && state.materials.some((material) => material.id === board.materialId)
    ? board.materialId
    : defaultMaterialId;
  return {
    ...board,
    materialId,
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

function addBoard(partial: Partial<Board> & { kind: BoardKind; autoThickness: AutoThicknessAxis }, recordHistory = true): void {
  if (recordHistory) remember();
  const board: Board = {
    id: state.nextId,
    name: partial.name ?? `Board ${state.nextId}`,
    x: partial.x ?? 120,
    y: partial.y ?? 120,
    w: partial.w ?? 400,
    h: partial.h ?? 250,
    kind: partial.kind,
    autoThickness: partial.autoThickness,
    materialId: partial.materialId ?? defaultMaterialId,
    laminate: partial.laminate ?? defaultLaminate(),
    ignoreInOrder: partial.ignoreInOrder ?? false,
    group: 0
  };
  state.nextId += 1;
  state.boards.push(board);
  state.selectedId = board.id;
  refresh();
}

function addTemplateBoard(partial: Partial<Board> & { kind: BoardKind; autoThickness: AutoThicknessAxis }): void {
  addBoard(partial, false);
}

function beginTemplate(recordHistory: boolean, x: number, y: number): void {
  if (recordHistory) remember();
  state.boards = [];
  state.measurements = [];
  state.nextId = 1;
  state.nextMeasurementId = 1;
  state.gridOriginX = x;
  state.gridOriginY = y;
}

function addOpenFrame(x: number, y: number, outerW: number, outerH: number): void {
  const t = state.thickness;
  const innerW = outerW - 2 * t;
  addTemplateBoard({ name: "Left side", x, y, w: t, h: outerH, kind: "upright", autoThickness: "width" });
  addTemplateBoard({ name: "Right side", x: x + outerW - t, y, w: t, h: outerH, kind: "upright", autoThickness: "width" });
  addTemplateBoard({ name: "Top", x: x + t, y, w: innerW, h: t, kind: "shelf", autoThickness: "height" });
  addTemplateBoard({ name: "Bottom", x: x + t, y: y + outerH - t, w: innerW, h: t, kind: "shelf", autoThickness: "height" });
}

function addBackPanel(x: number, y: number, outerW: number, outerH: number): void {
  addTemplateBoard({ name: "Back", x, y, w: outerW, h: outerH, kind: "back", autoThickness: "none" });
}

function addShelf(name: string, x: number, y: number, outerW: number): void {
  const t = state.thickness;
  addTemplateBoard({ name, x: x + t, y, w: outerW - 2 * t, h: t, kind: "shelf", autoThickness: "height" });
}

function addDivider(name: string, x: number, y: number, h: number): void {
  const t = state.thickness;
  addTemplateBoard({ name, x, y, w: t, h, kind: "upright", autoThickness: "width" });
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
    addShelf("Middle shelf", x, y + 275, outerW);
  }

  if (templateId === "bookcase") {
    const outerW = 760;
    const outerH = 1280;
    addOpenFrame(x, y, outerW, outerH);
    [320, 560, 800, 1040].forEach((shelfY, index) => addShelf(`Shelf ${index + 1}`, x, y + shelfY, outerW));
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "base-cabinet") {
    const outerW = 820;
    const outerH = 720;
    const dividerX = x + outerW / 2 - t / 2;
    const shelfY = y + 360;
    addOpenFrame(x, y, outerW, outerH);
    addTemplateBoard({ name: "Left adjustable shelf", x: x + t, y: shelfY, w: dividerX - x - t, h: t, kind: "shelf", autoThickness: "height" });
    addTemplateBoard({ name: "Right adjustable shelf", x: dividerX + t, y: shelfY, w: x + outerW - t - (dividerX + t), h: t, kind: "shelf", autoThickness: "height" });
    addDivider("Center divider", dividerX, y + t, outerH - 2 * t);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "wall-cabinet") {
    const outerW = 720;
    const outerH = 640;
    addOpenFrame(x, y, outerW, outerH);
    addShelf("Middle shelf", x, y + 315, outerW);
    addBackPanel(x, y, outerW, outerH);
  }

  if (templateId === "simple-box") {
    const outerW = 520;
    const outerH = 360;
    addOpenFrame(x, y, outerW, outerH);
  }

  state.selectedId = 1;
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
  renderMaterials();
  updateInspector();
  renderMeasurements();
  renderCustomMeasurements();
  renderWarnings();
  renderCutList();
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
    version: 1,
    boards: state.boards,
    measurements: state.measurements,
    materials: state.materials,
    selectedId: state.selectedId,
    nextId: state.nextId,
    nextMeasurementId: state.nextMeasurementId,
    thickness: state.thickness,
    grid: state.grid,
    gridOriginX: state.gridOriginX,
    gridOriginY: state.gridOriginY,
    snap: state.snap,
    showDimensions: state.showDimensions,
    scale: state.scale,
    panX: state.panX,
    panY: state.panY
  });
}

function applyProject(project: SavedProject, recordHistory = true): void {
  if (recordHistory) remember();
  state.materials = normalizedMaterials(project.materials);
  state.boards = (project.boards ?? []).map(withDefaults);
  state.measurements = project.measurements ?? [];
  state.selectedId = state.boards.some((board) => board.id === project.selectedId) ? project.selectedId : null;
  state.nextId = project.nextId ?? nextBoardId(state.boards);
  state.nextMeasurementId = project.nextMeasurementId ?? nextMeasureId(state.measurements);
  state.thickness = project.thickness ?? state.thickness;
  state.grid = project.grid ?? state.grid;
  state.gridOriginX = project.gridOriginX ?? (boundsFor(state.boards)?.left ?? state.gridOriginX);
  state.gridOriginY = project.gridOriginY ?? (boundsFor(state.boards)?.top ?? state.gridOriginY);
  state.snap = project.snap ?? state.snap;
  state.showDimensions = project.showDimensions ?? state.showDimensions;
  state.scale = project.scale ?? state.scale;
  state.panX = project.panX ?? state.panX;
  state.panY = project.panY ?? state.panY;
  state.dragging = null;
  state.resizing = null;
  state.panning = null;
  state.snapGuides = [];
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
  syncSettingsInputs();
  refresh();
}

function saveProject(): void {
  localStorage.setItem(storageKey, JSON.stringify(serializeProject()));
  state.lastSnap = "Project saved";
  updateInspector();
}

function loadProject(): void {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    state.lastSnap = "No saved project";
    updateInspector();
    return;
  }

  try {
    const project = JSON.parse(raw) as SavedProject;
    if (project.version !== 1 || !Array.isArray(project.boards)) throw new Error("Unsupported project file");
    applyProject(project);
    state.lastSnap = "Project loaded";
    updateInspector();
  } catch {
    state.lastSnap = "Could not load project";
    updateInspector();
  }
}

function syncSettingsInputs(): void {
  ui.thicknessInput.value = String(state.thickness);
  ui.gridInput.value = String(state.grid);
  ui.snapToggle.checked = state.snap;
  ui.dimToggle.checked = state.showDimensions;
}

function updateInspector(): void {
  const board = selectedBoard(state);
  ui.emptySelection.hidden = Boolean(board);
  ui.inspector.hidden = !board;
  ui.selectionStatus.textContent = board ? boardLabel(board) : "No board selected";
  ui.snapStatus.textContent = state.lastSnap;
  updateViewportOverlay();
  ui.measureModeBtn.classList.toggle("active", state.tool === "measure");
  ui.undoBtn.disabled = !undoStack.length;
  ui.redoBtn.disabled = !redoStack.length;
  canvas.classList.toggle("measure-mode", state.tool === "measure");
  if (state.tool === "measure") canvas.style.cursor = "";
  ui.wInput.disabled = false;
  ui.hInput.disabled = false;
  ui.materialLabelSwatch.style.background = board ? materialColor(board.materialId) : "transparent";
  if (!board) return;
  ui.nameInput.value = board.name;
  ui.xInput.value = String(Math.round(board.x));
  ui.yInput.value = String(Math.round(board.y));
  ui.wInput.value = String(Math.round(board.w));
  ui.hInput.value = String(Math.round(board.h));
  ui.materialInput.value = board.materialId;
  ui.laminateLeftInput.checked = board.laminate.left;
  ui.laminateRightInput.checked = board.laminate.right;
  ui.laminateFrontInput.checked = board.laminate.front;
  ui.laminateBackInput.checked = board.laminate.back;
  ui.ignoreOrderInput.checked = board.ignoreInOrder;
  ui.wInput.disabled = board.autoThickness === "width";
  ui.hInput.disabled = board.autoThickness === "height";
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
  ui.materialInput.innerHTML = state.materials.map((material) => `
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
  const boards = selected ? groupBoards(state, selected.group) : state.boards;
  const bounds = boundsFor(boards);
  const inner = innerDimensions(boards, state.thickness);
  const cards: string[] = [];

  if (selected) {
    cards.push(`
      <div class="metric-card">
        <strong>${selected.name}</strong>
        <span>Board: ${mm(selected.w)} × ${mm(selected.h)}</span>
        <span>Position: X ${mm(selected.x)}, Y ${mm(selected.y)}</span>
      </div>
    `);
  }

  if (bounds) {
    cards.push(`
      <div class="metric-card">
        <strong>${selected ? `Connected group ${selected.group}` : "Whole sketch"}</strong>
        <span>Outer: ${mm(bounds.w)} × ${mm(bounds.h)}</span>
        <span>Inner: ${inner?.hasFrame ? `${mm(inner.innerW)} × ${mm(inner.innerH)}` : "needs opposing frame boards"}</span>
        <span>Thickness model: ${mm(state.thickness)}</span>
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
        <strong>${measurement.name}</strong>
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
    const [a, b] = overlap.boardIds.map((id) => state.boards.find((board) => board.id === id)?.name ?? `Board ${id}`);
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
    const key = `${Math.round(board.w)}×${Math.round(board.h)}×${state.thickness}×${board.materialId}×${laminateKey(board.laminate)}`;
    grouped.set(key, [...(grouped.get(key) ?? []), board]);
  });

  ui.cutList.innerHTML = [...grouped.entries()].map(([key, boards]) => {
    const [w, h, t, materialId] = key.split("×");
    const laminate = laminateLabel(boards[0].laminate);
    return `
      <div class="cut-card">
        <strong><span class="count">${boards.length}×</span> ${w} × ${h} mm</strong>
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
  if (anchor.kind === "grid") return `Grid ${mm(anchor.x)}, ${mm(anchor.y)}`;
  const board = state.boards.find((candidate) => candidate.id === anchor.boardId);
  return `${board?.name ?? `Board ${anchor.boardId}`} ${anchor.edge}`;
}

function fitToView(): void {
  const bounds = boundsFor(state.boards);
  const rect = canvas.getBoundingClientRect();
  if (!bounds || rect.width < 1 || rect.height < 1) return;
  const padding = 70;
  state.scale = Math.min((rect.width - padding * 2) / bounds.w, (rect.height - padding * 2) / bounds.h);
  state.scale = Math.max(0.25, Math.min(1.3, state.scale));
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
  refresh();
}

function copyCutList(): void {
  const rows = [`Wood order, thickness ${state.thickness} mm`];
  const grouped = new Map<string, number>();
  state.boards.filter((board) => !board.ignoreInOrder).forEach((board) => {
    const key = `${Math.round(board.w)} x ${Math.round(board.h)} mm, material: ${materialName(board.materialId)}, laminate: ${laminateLabel(board.laminate)}`;
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  });
  grouped.forEach((count, key) => rows.push(`${count}x ${key}`));
  void navigator.clipboard?.writeText(rows.join("\n")).then(() => {
    state.lastSnap = "Cut list copied";
    updateInspector();
  }).catch(() => {
    state.lastSnap = "Clipboard unavailable";
    updateInspector();
  });
}

function updateBoardFromInspector(event?: Event): void {
  const board = selectedBoard(state);
  if (!board) return;
  const target = event?.target;
  if (target instanceof HTMLInputElement && target.type === "number" && target.value === "") return;
  remember();
  board.name = ui.nameInput.value.trim() || board.name;
  board.x = Number(ui.xInput.value) || 0;
  board.y = Number(ui.yInput.value) || 0;
  board.w = Math.max(1, Number(ui.wInput.value) || 1);
  board.h = Math.max(1, Number(ui.hInput.value) || 1);
  refresh();
}

function updateMaterialFromInspector(): void {
  const board = selectedBoard(state);
  if (!board || board.materialId === ui.materialInput.value) return;
  remember();
  board.materialId = ui.materialInput.value;
  state.lastSnap = `Material: ${materialName(board.materialId)}`;
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
  const board = selectedBoard(state);
  if (!board) return;
  remember();
  board.laminate = {
    left: ui.laminateLeftInput.checked,
    right: ui.laminateRightInput.checked,
    front: ui.laminateFrontInput.checked,
    back: ui.laminateBackInput.checked
  };
  refresh();
}

function updateOrderInclusionFromInspector(): void {
  const board = selectedBoard(state);
  if (!board) return;
  remember();
  board.ignoreInOrder = ui.ignoreOrderInput.checked;
  state.lastSnap = board.ignoreInOrder ? "Removed from wood order" : "Added to wood order";
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
    name: preset.name,
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

function addMeasurement(a: MeasurementAnchor, b: MeasurementAnchor, axis: MeasurementAxis, name = "Measure"): void {
  remember();
  state.measurements.push({
    id: state.nextMeasurementId,
    name: `${name} ${state.nextMeasurementId}`,
    a,
    b,
    axis
  });
  state.nextMeasurementId += 1;
  state.tool = "select";
  state.pendingMeasurementAnchor = null;
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
      "horizontal",
      `${board.name} width`
    );
    return;
  }
  addMeasurement(
    { kind: "board-edge", boardId: board.id, edge: "top", offset: board.w + 22 },
    { kind: "board-edge", boardId: board.id, edge: "bottom", offset: board.w + 22 },
    "vertical",
    `${board.name} height`
  );
}

function handleMeasurementClick(point: Point): void {
  const anchor = nearestMeasurementAnchor(state, point);
  if (!state.pendingMeasurementAnchor) {
    state.pendingMeasurementAnchor = anchor;
    state.lastSnap = anchor.kind === "grid" ? "Grid anchor set" : "Edge anchor set";
    refresh();
    return;
  }

  const first = resolveMeasurementAnchor(state, state.pendingMeasurementAnchor);
  const second = resolveMeasurementAnchor(state, anchor);
  if (!first || !second) return;
  addMeasurement(state.pendingMeasurementAnchor, anchor, measurementAxis(first, second));
}

function deleteSelectedBoard(): void {
  if (!state.selectedId) return;
  remember();
  const deletedId = state.selectedId;
  state.boards = state.boards.filter((board) => board.id !== deletedId);
  state.measurements = state.measurements.filter((measurement) =>
    ![measurement.a, measurement.b].some((anchor) => anchor.kind === "board-edge" && anchor.boardId === deletedId)
  );
  state.selectedId = null;
  state.lastSnap = "Board deleted";
  refresh();
}

function duplicateSelectedBoard(): void {
  const board = selectedBoard(state);
  if (!board) return;
  addBoard({ ...board, name: `${board.name} copy`, x: board.x + 35, y: board.y + 35 });
  state.lastSnap = "Board duplicated";
  updateInspector();
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

function rotateSelectedBoard(): void {
  const board = selectedBoard(state);
  if (!board) return;
  remember();
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
  state.lastSnap = "Rotated 90 deg";
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

  canvas.style.cursor = hitTest(state.boards, point) ? "grab" : "";
}

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  if (state.tool === "measure") {
    handleMeasurementClick(point);
    return;
  }

  const selected = selectedBoard(state);
  if (selected) {
    const handle = hitResizeHandle(state, selected, point);
    if (handle) {
      remember();
      state.resizing = { id: selected.id, handle, startPoint: point, startRect: rectFromBoard(selected) };
      state.lastSnap = "Resizing";
      canvas.style.cursor = cursorForResizeHandle(handle);
      canvas.setPointerCapture(event.pointerId);
      refresh();
      return;
    }
  }

  const board = hitTest(state.boards, point);
  state.selectedId = board?.id ?? null;
  if (board) {
    remember();
    state.dragging = { id: board.id, offsetX: point.x - board.x, offsetY: point.y - board.y };
    canvas.style.cursor = "grabbing";
    canvas.setPointerCapture(event.pointerId);
  } else {
    state.panning = { startX: event.clientX, startY: event.clientY, panX: state.panX, panY: state.panY };
    canvas.style.cursor = "grabbing";
    canvas.setPointerCapture(event.pointerId);
  }
  refresh();
});

canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);

  if (state.resizing) {
    const board = state.boards.find((candidate) => candidate.id === state.resizing?.id);
    if (!board) return;
    const snapped = resizeBoard(state, board, state.resizing.handle, state.resizing.startRect, state.resizing.startPoint, point);
    applyBoardRect(board, snapped.rect);
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

  if (!state.dragging) {
    updateCanvasCursor(point);
    return;
  }
  const board = selectedBoard(state);
  if (!board) return;
  const snapped = snapBoard(state, board, point.x - state.dragging.offsetX, point.y - state.dragging.offsetY);
  board.x = snapped.x;
  board.y = snapped.y;
  state.snapGuides = snapped.guides;
  state.lastSnap = snapped.label;
  canvas.style.cursor = "grabbing";
  refresh();
});

canvas.addEventListener("pointerup", (event) => {
  const rect = canvas.getBoundingClientRect();
  const point = screenToWorld(state, event.clientX - rect.left, event.clientY - rect.top);
  state.dragging = null;
  state.resizing = null;
  state.panning = null;
  state.snapGuides = [];
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  updateCanvasCursor(point);
  refresh();
});

canvas.addEventListener("pointerleave", () => {
  if (!state.dragging && !state.resizing && !state.panning) canvas.style.cursor = "";
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  const before = screenToWorld(state, mouse.x, mouse.y);
  state.scale = Math.max(0.18, Math.min(2, state.scale * (event.deltaY > 0 ? 0.92 : 1.08)));
  const after = screenToWorld(state, mouse.x, mouse.y);
  state.panX += (after.x - before.x) * state.scale;
  state.panY += (after.y - before.y) * state.scale;
  refresh();
}, { passive: false });

ui.templateList.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-template]");
  const templateId = target?.dataset.template as TemplateId | undefined;
  if (!templateId) return;
  createTemplate(templateId);
});
ui.measureModeBtn.addEventListener("click", () => {
  state.tool = state.tool === "measure" ? "select" : "measure";
  state.pendingMeasurementAnchor = null;
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
ui.duplicateBtn.addEventListener("click", duplicateSelectedBoard);
ui.rotateBtn.addEventListener("click", rotateSelectedBoard);
ui.undoBtn.addEventListener("click", undo);
ui.redoBtn.addEventListener("click", redo);
ui.measureWidthBtn.addEventListener("click", () => addSelectedMeasurement("horizontal"));
ui.measureHeightBtn.addEventListener("click", () => addSelectedMeasurement("vertical"));
ui.saveBtn.addEventListener("click", saveProject);
ui.loadBtn.addEventListener("click", loadProject);
ui.deleteBtn.addEventListener("click", deleteSelectedBoard);
ui.fitBtn.addEventListener("click", fitToView);
ui.exportBtn.addEventListener("click", copyCutList);
ui.thicknessInput.addEventListener("input", () => applyThicknessChange(Math.max(3, Number(ui.thicknessInput.value) || 18)));
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
[ui.nameInput, ui.xInput, ui.yInput, ui.wInput, ui.hInput].forEach((input) => input.addEventListener("input", updateBoardFromInspector));
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
    duplicateSelectedBoard();
    return;
  }
  if (!command && key === "r") {
    event.preventDefault();
    rotateSelectedBoard();
    return;
  }
  if (event.key === "Delete" || event.key === "Backspace") {
    event.preventDefault();
    deleteSelectedBoard();
  }
});
window.addEventListener("resize", () => renderer.resize());

if (import.meta.env.DEV) {
  window.mebleBuilderDebug = {
    state,
    hitTestWorld: (point) => hitTest(state.boards, point)?.name ?? null,
    snapPreview: (boardName, x, y) => {
      const board = state.boards.find((candidate) => candidate.name === boardName);
      return board ? snapBoard(state, board, x, y).guides.length : 0;
    },
    overlaps: () => computeOverlaps(state.boards).length,
    refresh
  };
}

syncSettingsInputs();
createStarter(false);
renderer.resize();
