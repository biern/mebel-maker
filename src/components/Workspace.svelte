<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<section class="workspace" aria-label={$_("workspace.sketchWorkspace")}>
  <div class="topbar">
    <div class="status-cluster">
      <div class="status-pill" id="selectionStatus">{$_("workspace.noBoardSelected")}</div>
      <div class="status-pill" id="snapStatus">{$_("common.ready")}</div>
    </div>
    <div class="top-actions" aria-label={$_("workspace.drawingActions")}>
      <button id="loadBtn" class="icon-button" title={$_("workspace.loadProject")} aria-label={$_("workspace.loadProject")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6 H9 L11 8 H21 V18 A2 2 0 0 1 19 20 H5 A2 2 0 0 1 3 18 Z"></path>
          <path d="M12 12 V17"></path>
          <path d="M9 14 L12 17 L15 14"></path>
        </svg>
      </button>
      <button id="saveBtn" class="icon-button" title={$_("workspace.saveProject")} aria-label={$_("workspace.saveProject")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3 H17 L21 7 V21 H5 Z"></path>
          <path d="M8 3 V9 H16 V3"></path>
          <path d="M8 21 V14 H18 V21"></path>
        </svg>
      </button>
      <button id="newProjectBtn" class="icon-button" title={$_("workspace.newProject")} aria-label={$_("workspace.newProject")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4 H15 L19 8 V20 H5 Z"></path>
          <path d="M15 4 V9 H19"></path>
          <path d="M12 12 V18"></path>
          <path d="M9 15 H15"></path>
        </svg>
      </button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="undoBtn" class="icon-button" title={$_("workspace.undoLastChange")} aria-label={$_("workspace.undo")}>↶</button>
      <button id="redoBtn" class="icon-button" title={$_("workspace.redoLastChange")} aria-label={$_("workspace.redo")}>↷</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="duplicateBtn" class="icon-button" title={$_("workspace.duplicateSelectedBoardsShortcut")} aria-label={$_("workspace.duplicateSelectedBoards")}>⧉</button>
      <button id="rotateBtn" class="icon-button" title={$_("workspace.rotateSelectedBoardsShortcut")} aria-label={$_("workspace.rotateSelectedBoards")}>⟳</button>
      <button id="deleteBtn" class="icon-button danger" title={$_("workspace.deleteSelectedBoards")} aria-label={$_("workspace.deleteSelectedBoards")}>⌫</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="measureModeBtn" class="icon-button" title={$_("workspace.addAnchoredMeasurement")} aria-label={$_("workspace.addAnchoredMeasurement")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="18" r="2"></circle>
          <circle cx="18" cy="6" r="2"></circle>
          <path d="M8 16 L16 8"></path>
          <path d="M5 13 L11 19"></path>
          <path d="M13 5 L19 11"></path>
        </svg>
      </button>
      <button id="measureWidthBtn" class="icon-button" title={$_("workspace.measureSelectedWidth")} aria-label={$_("workspace.measureSelectedWidth")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7 V17"></path>
          <path d="M19 7 V17"></path>
          <path d="M7 12 H17"></path>
          <path d="M9 9 L6 12 L9 15"></path>
          <path d="M15 9 L18 12 L15 15"></path>
        </svg>
      </button>
      <button id="measureHeightBtn" class="icon-button" title={$_("workspace.measureSelectedHeight")} aria-label={$_("workspace.measureSelectedHeight")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 5 H17"></path>
          <path d="M7 19 H17"></path>
          <path d="M12 7 V17"></path>
          <path d="M9 9 L12 6 L15 9"></path>
          <path d="M9 15 L12 18 L15 15"></path>
        </svg>
      </button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="fitBtn" class="icon-button" title={$_("workspace.fitDrawing")} aria-label={$_("workspace.fitDrawing")}>⌖</button>
      <button id="printSketchBtn" class="icon-button" title={$_("workspace.printSketch")} aria-label={$_("workspace.printSketch")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 8 V4 H17 V8"></path>
          <path d="M7 17 H5 V9 H19 V17 H17"></path>
          <path d="M7 13 H17 V20 H7 Z"></path>
          <path d="M16 11 H17"></path>
        </svg>
      </button>
      <button id="view3dBtn" class="icon-button" title={$_("workspace.toggle3d")} aria-label={$_("workspace.toggle3d")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z"></path>
          <path d="M12 12 L20 7.5"></path>
          <path d="M12 12 V21"></path>
          <path d="M12 12 L4 7.5"></path>
          <path d="M12 3 V12"></path>
        </svg>
      </button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="woodOrderToggleBtn" class="icon-button" title={$_("workspace.showWoodOrder")} aria-label={$_("workspace.showWoodOrder")} aria-pressed="false">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5 H19"></path>
          <path d="M5 12 H19"></path>
          <path d="M5 19 H19"></path>
          <path d="M4 5 H4.01"></path>
          <path d="M4 12 H4.01"></path>
          <path d="M4 19 H4.01"></path>
        </svg>
      </button>
      <input id="projectFileInput" class="hidden-file-input" type="file" accept=".mebel,application/json,.json">
    </div>
  </div>
  <div id="notificationToast" class="notification-toast" role="status" aria-live="polite" hidden></div>
  <div class="canvas-wrap" id="canvasWrap">
    <canvas id="sketchCanvas"></canvas>
    <canvas id="view3dCanvas" aria-label={$_("workspace.toggle3d")}></canvas>
    <div id="templateChooser" class="template-chooser" aria-label={$_("workspace.projectTemplates")} hidden>
      <h2>{$_("workspace.startWithTemplate")}</h2>
      <div class="template-grid" id="templateList">
        <button class="tool-button" data-template="cabinet" title={$_("templates.createCabinet")}>
          <span class="icon">▣</span>
          {$_("templates.cabinet")}
        </button>
        <button class="tool-button" data-template="bookcase" title={$_("templates.createBookcase")}>
          <span class="icon">▤</span>
          {$_("templates.bookcase")}
        </button>
        <button class="tool-button" data-template="base-cabinet" title={$_("templates.createBaseCabinet")}>
          <span class="icon">▥</span>
          {$_("templates.baseCabinet")}
        </button>
        <button class="tool-button" data-template="wall-cabinet" title={$_("templates.createWallCabinet")}>
          <span class="icon">▧</span>
          {$_("templates.wallCabinet")}
        </button>
        <button class="tool-button" data-template="simple-box" title={$_("templates.createSimpleBox")}>
          <span class="icon">□</span>
          {$_("templates.simpleBox")}
        </button>
        <button class="tool-button" data-template="complex" title={$_("templates.createComplex")}>
          <span class="icon">▦</span>
          {$_("templates.complex")}
        </button>
      </div>
    </div>
    <form id="measureRenameForm" class="measure-rename-popover" hidden>
      <label class="field compact-field">
        <span>{$_("workspace.measureName")}</span>
        <input id="measureRenameInput" type="text" autocomplete="off">
      </label>
      <div class="measure-rename-actions">
        <button id="measureRenameCancelBtn" class="inline-action" type="button">{$_("common.cancel")}</button>
        <button class="inline-action primary-action" type="submit">{$_("common.rename")}</button>
      </div>
    </form>
    <div class="anchor-overlay" id="anchorOverlay" aria-label={$_("workspace.boardAnchors")}></div>
    <div class="viewport-overlay" id="viewportOverlay" aria-hidden="true">
      <div class="scale-glyph">
        <span class="scale-line" id="overlayScaleBar"></span>
        <span class="scale-label" id="overlayScaleLabel">100 mm</span>
        <span class="zoom-label" id="overlayZoomLabel">{$_("workspace.zoom", { values: { percent: 100 } })}</span>
      </div>
    </div>
  </div>
</section>
