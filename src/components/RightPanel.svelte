<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<aside class="sidebar right-panel" aria-label={$_("panels.measurementsAndProperties")}>
  <div id="rightPanelTools">
    <section class="tool-section">
      <h2>{$_("panels.selection")}</h2>
      <div id="emptySelection" class="empty-state">{$_("inspector.emptySelection")}</div>
      <form id="inspector" class="inspector" hidden>
        <label class="field">
          <span>{$_("inspector.name")}</span>
          <input id="nameInput" type="text">
        </label>
        <div class="field">
          <span class="field-label-with-swatch">
            {$_("inspector.material")}
            <span id="materialLabelSwatch" class="material-label-swatch"></span>
          </span>
          <div id="materialSelect" class="material-select">
            <button id="materialSelectButton" class="material-select-button" type="button" aria-haspopup="listbox" aria-expanded="false">
              <span id="materialSelectSwatch" class="material-select-swatch"></span>
              <span id="materialSelectText" class="material-select-text">{$_("inspector.mixedMaterials")}</span>
            </button>
            <div id="materialSelectList" class="material-select-list" role="listbox" hidden></div>
            <select id="materialInput" class="native-material-input" aria-hidden="true" tabindex="-1"></select>
          </div>
        </div>
        <div class="two-col">
          <label class="field">
            <span>{$_("inspector.x")}</span>
            <input id="xInput" type="number" step="1">
          </label>
          <label class="field">
            <span>{$_("inspector.y")}</span>
            <input id="yInput" type="number" step="1">
          </label>
          <label class="field">
            <span>{$_("inspector.width")}</span>
            <input id="wInput" type="number" min="1" step="1">
          </label>
          <label class="field">
            <span>{$_("inspector.height")}</span>
            <input id="hInput" type="number" min="1" step="1">
          </label>
          <label class="field">
            <span>{$_("inspector.depth")}</span>
            <input id="depthOverrideInput" type="number" min="1" step="1" placeholder={$_("common.global")}>
          </label>
        </div>
        <fieldset class="edge-fieldset">
          <legend>{$_("inspector.laminateEdges")}</legend>
          <label class="check-chip">
            <input id="laminateLeftInput" type="checkbox">
            <span>{$_("inspector.left")}</span>
          </label>
          <label class="check-chip">
            <input id="laminateRightInput" type="checkbox">
            <span>{$_("inspector.right")}</span>
          </label>
          <label class="check-chip">
            <input id="laminateTopInput" type="checkbox">
            <span>{$_("inspector.top")}</span>
          </label>
          <label class="check-chip">
            <input id="laminateBottomInput" type="checkbox">
            <span>{$_("inspector.bottom")}</span>
          </label>
          <label class="check-chip">
            <input id="laminateFrontInput" type="checkbox">
            <span>{$_("inspector.front")}</span>
          </label>
          <label class="check-chip">
            <input id="laminateBackInput" type="checkbox">
            <span>{$_("inspector.back")}</span>
          </label>
        </fieldset>
        <label class="check-chip full-row">
          <input id="ignoreOrderInput" type="checkbox">
          <span>{$_("inspector.ignoreInWoodOrder")}</span>
        </label>
        <fieldset class="layout-anchor-fieldset">
          <legend>{$_("inspector.layoutAnchors")}</legend>
          <div class="layout-anchor-controls">
            <label class="field compact-field">
              <span>{$_("inspector.axis")}</span>
              <select id="layoutAnchorAxisInput">
                <option value="x">{$_("inspector.width")}</option>
                <option value="y">{$_("inspector.height")}</option>
              </select>
            </label>
            <label class="field compact-field">
              <span>{$_("inspector.count")}</span>
              <input id="layoutAnchorCountInput" type="number" min="1" max="20" step="1" value="4">
            </label>
          </div>
          <label class="check-chip">
            <input id="layoutAnchorBalanceInput" type="checkbox">
            <span>{$_("inspector.balanceOpenGaps")}</span>
          </label>
          <div class="layout-anchor-balance-grid">
            <label class="field compact-field">
              <span id="layoutAnchorStartLabel">{$_("inspector.leftEdge")}</span>
              <select id="layoutAnchorStartInput">
                <option value="outside">{$_("common.outside")}</option>
                <option value="inside">{$_("common.inside")}</option>
              </select>
            </label>
            <label class="field compact-field">
              <span id="layoutAnchorEndLabel">{$_("inspector.rightEdge")}</span>
              <select id="layoutAnchorEndInput">
                <option value="outside">{$_("common.outside")}</option>
                <option value="inside">{$_("common.inside")}</option>
              </select>
            </label>
            <label class="field compact-field full-row">
              <span>{$_("inspector.pieceThickness")}</span>
              <input id="layoutAnchorThicknessInput" type="number" min="1" step="1" value="18">
            </label>
          </div>
          <div class="layout-anchor-actions">
            <button id="layoutAnchorApplyBtn" class="inline-action" type="button">{$_("common.distribute")}</button>
            <button id="layoutAnchorClearBtn" class="inline-action" type="button">{$_("common.clear")}</button>
          </div>
          <div id="layoutAnchorSummary" class="anchor-summary"></div>
        </fieldset>
      </form>
    </section>

    <section class="tool-section">
      <h2>{$_("panels.dimensions")}</h2>
      <div class="measure-list" id="measureList"></div>
    </section>

    <section class="tool-section">
      <h2>{$_("panels.warnings")}</h2>
      <div class="measure-list" id="warningList"></div>
    </section>
  </div>

  <div id="woodOrderPanel" hidden>
    <section class="tool-section order-panel-header">
      <div>
        <h2>{$_("panels.woodOrder")}</h2>
      </div>
      <button id="woodOrderBackBtn" class="icon-button" type="button" title={$_("common.back")} aria-label={$_("common.back")}>‹</button>
    </section>
    <section class="tool-section order-actions">
      <button id="copyCsvBtn" class="tool-button" type="button" title={$_("order.copyCsvTitle")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4 H19 V16 H9 Z"></path>
          <path d="M5 8 H15 V20 H5 Z"></path>
        </svg>
        {$_("common.copyCsv")}
      </button>
      <button id="exportBtn" class="tool-button" type="button" title={$_("order.saveCsvTitle")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 V15"></path>
          <path d="M8 11 L12 15 L16 11"></path>
          <path d="M5 19 H19"></path>
        </svg>
        {$_("common.saveCsv")}
      </button>
    </section>
    <section class="tool-section">
      <h2>{$_("panels.included")}</h2>
      <div class="cut-list" id="cutList"></div>
    </section>
    <section class="tool-section">
      <h2>{$_("panels.ignoredFromOrder")}</h2>
      <div class="cut-list" id="ignoredCutList"></div>
    </section>
  </div>
</aside>
