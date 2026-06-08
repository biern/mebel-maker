<aside class="sidebar right-panel" aria-label="Measurements and properties">
  <div id="rightPanelTools">
    <section class="tool-section panel-action-section">
      <button id="woodOrderToggleBtn" class="tool-button panel-action-button" type="button" title="Show wood order list">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5 H19"></path>
          <path d="M5 12 H19"></path>
          <path d="M5 19 H19"></path>
          <path d="M4 5 H4.01"></path>
          <path d="M4 12 H4.01"></path>
          <path d="M4 19 H4.01"></path>
        </svg>
        Wood order
      </button>
    </section>

    <section class="tool-section">
      <h2>Selection</h2>
      <div id="emptySelection" class="empty-state">Select boards to edit dimensions and properties.</div>
      <form id="inspector" class="inspector" hidden>
        <label class="field">
          <span>Name</span>
          <input id="nameInput" type="text">
        </label>
        <div class="field">
          <span class="field-label-with-swatch">
            Material
            <span id="materialLabelSwatch" class="material-label-swatch"></span>
          </span>
          <div id="materialSelect" class="material-select">
            <button id="materialSelectButton" class="material-select-button" type="button" aria-haspopup="listbox" aria-expanded="false">
              <span id="materialSelectSwatch" class="material-select-swatch"></span>
              <span id="materialSelectText" class="material-select-text">Mixed materials</span>
            </button>
            <div id="materialSelectList" class="material-select-list" role="listbox" hidden></div>
            <select id="materialInput" class="native-material-input" aria-hidden="true" tabindex="-1"></select>
          </div>
        </div>
        <div class="two-col">
          <label class="field">
            <span>X (mm)</span>
            <input id="xInput" type="number" step="1">
          </label>
          <label class="field">
            <span>Y (mm)</span>
            <input id="yInput" type="number" step="1">
          </label>
          <label class="field">
            <span>Width (mm)</span>
            <input id="wInput" type="number" min="1" step="1">
          </label>
          <label class="field">
            <span>Height (mm)</span>
            <input id="hInput" type="number" min="1" step="1">
          </label>
          <label class="field">
            <span>Depth (mm)</span>
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
        <fieldset class="layout-anchor-fieldset">
          <legend>Layout anchors</legend>
          <div class="layout-anchor-controls">
            <label class="field compact-field">
              <span>Axis</span>
              <select id="layoutAnchorAxisInput">
                <option value="x">Width</option>
                <option value="y">Height</option>
              </select>
            </label>
            <label class="field compact-field">
              <span>Count</span>
              <input id="layoutAnchorCountInput" type="number" min="1" max="20" step="1" value="4">
            </label>
          </div>
          <label class="check-chip">
            <input id="layoutAnchorBalanceInput" type="checkbox">
            <span>Balance open gaps</span>
          </label>
          <div class="layout-anchor-balance-grid">
            <label class="field compact-field">
              <span id="layoutAnchorStartLabel">Left edge</span>
              <select id="layoutAnchorStartInput">
                <option value="outside">Outside</option>
                <option value="inside">Inside</option>
              </select>
            </label>
            <label class="field compact-field">
              <span id="layoutAnchorEndLabel">Right edge</span>
              <select id="layoutAnchorEndInput">
                <option value="outside">Outside</option>
                <option value="inside">Inside</option>
              </select>
            </label>
            <label class="field compact-field full-row">
              <span>Piece thickness (mm)</span>
              <input id="layoutAnchorThicknessInput" type="number" min="1" step="1" value="18">
            </label>
          </div>
          <div class="layout-anchor-actions">
            <button id="layoutAnchorApplyBtn" class="inline-action" type="button">Distribute</button>
            <button id="layoutAnchorClearBtn" class="inline-action" type="button">Clear</button>
          </div>
          <div id="layoutAnchorSummary" class="anchor-summary"></div>
        </fieldset>
      </form>
    </section>

    <section class="tool-section">
      <h2>Dimensions</h2>
      <div class="measure-list" id="measureList"></div>
    </section>

    <section class="tool-section">
      <h2>Warnings</h2>
      <div class="measure-list" id="warningList"></div>
    </section>
  </div>

  <div id="woodOrderPanel" hidden>
    <section class="tool-section order-panel-header">
      <div>
        <h2>Wood Order</h2>
      </div>
      <button id="woodOrderBackBtn" class="icon-button" type="button" title="Back to properties" aria-label="Back to properties">‹</button>
    </section>
    <section class="tool-section order-actions">
      <button id="copyCsvBtn" class="tool-button" type="button" title="Copy piece list as CSV">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4 H19 V16 H9 Z"></path>
          <path d="M5 8 H15 V20 H5 Z"></path>
        </svg>
        Copy CSV
      </button>
      <button id="exportBtn" class="tool-button" type="button" title="Save piece list as CSV">
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 V15"></path>
          <path d="M8 11 L12 15 L16 11"></path>
          <path d="M5 19 H19"></path>
        </svg>
        Save CSV
      </button>
    </section>
    <section class="tool-section">
      <h2>Included</h2>
      <div class="cut-list" id="cutList"></div>
    </section>
    <section class="tool-section">
      <h2>Ignored From Order</h2>
      <div class="cut-list" id="ignoredCutList"></div>
    </section>
  </div>
</aside>
