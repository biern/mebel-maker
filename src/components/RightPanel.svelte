<aside class="sidebar right-panel" aria-label="Measurements and properties">
  <section class="tool-section">
    <h2>Selection</h2>
    <div id="emptySelection" class="empty-state">Select boards to edit dimensions and properties.</div>
    <form id="inspector" class="inspector" hidden>
      <label class="field">
        <span>Name</span>
        <input id="nameInput" type="text">
      </label>
      <label class="field">
        <span class="field-label-with-swatch">
          Material
          <span id="materialLabelSwatch" class="material-label-swatch"></span>
        </span>
        <select id="materialInput"></select>
      </label>
      <div class="two-col">
        <label class="field">
          <span>X</span>
          <input id="xInput" type="number" step="1">
        </label>
        <label class="field">
          <span>Y</span>
          <input id="yInput" type="number" step="1">
        </label>
        <label class="field">
          <span>Width</span>
          <input id="wInput" type="number" min="1" step="1">
        </label>
        <label class="field">
          <span>Height</span>
          <input id="hInput" type="number" min="1" step="1">
        </label>
        <label class="field">
          <span>Depth</span>
          <input id="depthOverrideInput" type="number" min="1" step="1" placeholder="Global">
        </label>
      </div>
      <fieldset class="edge-fieldset">
        <legend>Laminate edges</legend>
        <label class="check-chip">
          <input id="laminateLeftInput" type="checkbox">
          <span>Left</span>
        </label>
        <label class="check-chip">
          <input id="laminateRightInput" type="checkbox">
          <span>Right</span>
        </label>
        <label class="check-chip">
          <input id="laminateFrontInput" type="checkbox">
          <span>Front</span>
        </label>
        <label class="check-chip">
          <input id="laminateBackInput" type="checkbox">
          <span>Back</span>
        </label>
      </fieldset>
      <label class="check-chip full-row">
        <input id="ignoreOrderInput" type="checkbox">
        <span>Ignore in wood order</span>
      </label>
    </form>
  </section>

  <section class="tool-section">
    <h2>Dimensions</h2>
    <div class="measure-list" id="measureList"></div>
  </section>

  <section class="tool-section">
    <h2>Anchored Measures</h2>
    <div class="measure-list" id="customMeasureList"></div>
  </section>

  <section class="tool-section">
    <h2>Warnings</h2>
    <div class="measure-list" id="warningList"></div>
  </section>

  <section class="tool-section">
    <h2>Wood Order</h2>
    <div class="cut-list" id="cutList"></div>
  </section>
</aside>
