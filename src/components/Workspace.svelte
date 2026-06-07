<section class="workspace" aria-label="Sketch workspace">
  <div class="topbar">
    <div class="status-cluster">
      <div class="status-pill" id="selectionStatus">No board selected</div>
      <div class="status-pill" id="snapStatus">Ready</div>
    </div>
    <div class="top-actions" aria-label="Drawing actions">
      <button id="loadBtn" class="icon-button" title="Load project from .mebel file" aria-label="Load project from .mebel file">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6 H9 L11 8 H21 V18 A2 2 0 0 1 19 20 H5 A2 2 0 0 1 3 18 Z"></path>
          <path d="M12 12 V17"></path>
          <path d="M9 14 L12 17 L15 14"></path>
        </svg>
      </button>
      <button id="saveBtn" class="icon-button" title="Save project as .mebel file" aria-label="Save project as .mebel file">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3 H17 L21 7 V21 H5 Z"></path>
          <path d="M8 3 V9 H16 V3"></path>
          <path d="M8 21 V14 H18 V21"></path>
        </svg>
      </button>
      <button id="newProjectBtn" class="icon-button" title="New project" aria-label="New project">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4 H15 L19 8 V20 H5 Z"></path>
          <path d="M15 4 V9 H19"></path>
          <path d="M12 12 V18"></path>
          <path d="M9 15 H15"></path>
        </svg>
      </button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="undoBtn" class="icon-button" title="Undo last change" aria-label="Undo">↶</button>
      <button id="redoBtn" class="icon-button" title="Redo last change" aria-label="Redo">↷</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="duplicateBtn" class="icon-button" title="Duplicate selected boards (Cmd/Ctrl+D)" aria-label="Duplicate selected boards">⧉</button>
      <button id="rotateBtn" class="icon-button" title="Rotate selected boards 90 degrees (R)" aria-label="Rotate selected boards">⟳</button>
      <button id="deleteBtn" class="icon-button danger" title="Delete selected boards" aria-label="Delete selected boards">⌫</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="measureModeBtn" class="icon-button" title="Add anchored measurement" aria-label="Add anchored measurement">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="18" r="2"></circle>
          <circle cx="18" cy="6" r="2"></circle>
          <path d="M8 16 L16 8"></path>
          <path d="M5 13 L11 19"></path>
          <path d="M13 5 L19 11"></path>
        </svg>
      </button>
      <button id="measureWidthBtn" class="icon-button" title="Measure selected width" aria-label="Measure selected width">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7 V17"></path>
          <path d="M19 7 V17"></path>
          <path d="M7 12 H17"></path>
          <path d="M9 9 L6 12 L9 15"></path>
          <path d="M15 9 L18 12 L15 15"></path>
        </svg>
      </button>
      <button id="measureHeightBtn" class="icon-button" title="Measure selected height" aria-label="Measure selected height">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 5 H17"></path>
          <path d="M7 19 H17"></path>
          <path d="M12 7 V17"></path>
          <path d="M9 9 L12 6 L15 9"></path>
          <path d="M9 15 L12 18 L15 15"></path>
        </svg>
      </button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="fitBtn" class="icon-button" title="Fit drawing to view" aria-label="Fit drawing to view">⌖</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="copyCsvBtn" class="icon-button" title="Copy piece list as CSV" aria-label="Copy piece list as CSV">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4 H19 V16 H9 Z"></path>
          <path d="M5 8 H15 V20 H5 Z"></path>
        </svg>
      </button>
      <button id="exportBtn" class="icon-button csv-button" title="Save piece list as CSV" aria-label="Save piece list as CSV">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 V15"></path>
          <path d="M8 11 L12 15 L16 11"></path>
          <path d="M5 19 H19"></path>
        </svg>
        <span>CSV</span>
      </button>
      <input id="projectFileInput" class="hidden-file-input" type="file" accept=".mebel,application/json,.json">
    </div>
  </div>
  <div id="notificationToast" class="notification-toast" role="status" aria-live="polite" hidden></div>
  <div class="canvas-wrap">
    <canvas id="sketchCanvas"></canvas>
    <div id="templateChooser" class="template-chooser" aria-label="Project templates" hidden>
      <h2>Start with a template</h2>
      <div class="template-grid" id="templateList">
        <button class="tool-button" data-template="cabinet" title="Create a connected cabinet starter">
          <span class="icon">▣</span>
          Cabinet
        </button>
        <button class="tool-button" data-template="bookcase" title="Create a tall bookcase template">
          <span class="icon">▤</span>
          Bookcase
        </button>
        <button class="tool-button" data-template="base-cabinet" title="Create a base cabinet template">
          <span class="icon">▥</span>
          Base cabinet
        </button>
        <button class="tool-button" data-template="wall-cabinet" title="Create a wall cabinet template">
          <span class="icon">▧</span>
          Wall cabinet
        </button>
        <button class="tool-button" data-template="simple-box" title="Create a simple open box template">
          <span class="icon">□</span>
          Simple box
        </button>
      </div>
    </div>
    <form id="measureRenameForm" class="measure-rename-popover" hidden>
      <label class="field compact-field">
        <span>Measure name</span>
        <input id="measureRenameInput" type="text" autocomplete="off">
      </label>
      <div class="measure-rename-actions">
        <button id="measureRenameCancelBtn" class="inline-action" type="button">Cancel</button>
        <button class="inline-action primary-action" type="submit">Rename</button>
      </div>
    </form>
    <div class="anchor-overlay" id="anchorOverlay" aria-label="Board anchors"></div>
    <div class="viewport-overlay" id="viewportOverlay" aria-hidden="true">
      <div class="scale-glyph">
        <span class="scale-line" id="overlayScaleBar"></span>
        <span class="scale-label" id="overlayScaleLabel">100 mm</span>
        <span class="zoom-label" id="overlayZoomLabel">Zoom 100%</span>
      </div>
    </div>
  </div>
</section>
