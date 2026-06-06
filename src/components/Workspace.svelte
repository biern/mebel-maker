<section class="workspace" aria-label="Sketch workspace">
  <div class="topbar">
    <div class="status-cluster">
      <div class="status-pill" id="selectionStatus">No board selected</div>
      <div class="status-pill" id="snapStatus">Ready</div>
    </div>
    <div class="top-actions" aria-label="Drawing actions">
      <button id="undoBtn" class="icon-button" title="Undo last change" aria-label="Undo">↶</button>
      <button id="redoBtn" class="icon-button" title="Redo last change" aria-label="Redo">↷</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="duplicateBtn" class="icon-button" title="Duplicate selected board (Cmd/Ctrl+D)" aria-label="Duplicate selected board">⧉</button>
      <button id="rotateBtn" class="icon-button" title="Rotate selected board 90 degrees (R)" aria-label="Rotate selected board">⟳</button>
      <button id="deleteBtn" class="icon-button danger" title="Delete selected board" aria-label="Delete selected board">⌫</button>
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
      <button id="saveBtn" class="icon-button" title="Export drawing as JSON" aria-label="Export drawing as JSON">⇩</button>
      <button id="loadBtn" class="icon-button" title="Load drawing from JSON file" aria-label="Load drawing from JSON file">⇧</button>
      <button id="exportBtn" class="icon-button" title="Export piece list as CSV" aria-label="Export piece list as CSV">CSV</button>
      <input id="projectFileInput" class="hidden-file-input" type="file" accept="application/json,.json">
    </div>
  </div>
  <div class="canvas-wrap">
    <canvas id="sketchCanvas"></canvas>
    <div class="anchor-overlay" id="anchorOverlay" aria-label="Board anchors"></div>
    <div class="viewport-overlay" id="viewportOverlay" aria-hidden="true">
      <div class="axis-glyph">
        <span class="axis-line axis-x"></span>
        <span class="axis-line axis-y"></span>
        <span class="axis-label axis-label-x">X</span>
        <span class="axis-label axis-label-y">Y</span>
      </div>
      <div class="scale-glyph">
        <span class="scale-line" id="overlayScaleBar"></span>
        <span class="scale-label" id="overlayScaleLabel">100 mm</span>
        <span class="zoom-label" id="overlayZoomLabel">Zoom 100%</span>
      </div>
    </div>
  </div>
</section>
