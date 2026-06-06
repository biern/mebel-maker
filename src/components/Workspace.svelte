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
      <button id="measureModeBtn" class="icon-button" title="Add anchored measurement" aria-label="Add anchored measurement">⟷</button>
      <button id="measureWidthBtn" class="icon-button" title="Measure selected width" aria-label="Measure selected width">↔</button>
      <button id="measureHeightBtn" class="icon-button" title="Measure selected height" aria-label="Measure selected height">↕</button>
      <span class="toolbar-separator" aria-hidden="true"></span>
      <button id="fitBtn" class="icon-button" title="Fit drawing to view" aria-label="Fit drawing to view">⌖</button>
      <button id="saveBtn" class="icon-button" title="Export drawing as JSON" aria-label="Export drawing as JSON">⇩</button>
      <button id="loadBtn" class="icon-button" title="Load drawing from JSON file" aria-label="Load drawing from JSON file">⇧</button>
      <button id="exportBtn" class="icon-button" title="Copy order summary" aria-label="Copy order summary">⇲</button>
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
