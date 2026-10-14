<script lang="ts">
  import { _ } from "svelte-i18n";
  import { edgeBandingEdges } from "../edgeBanding";
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
        <label class="field face-lamination-field">
          <span>{$_("faceLamination.title")}</span>
          <select id="faceLaminationInput">
            <option value="both">{$_("faceLamination.both")}</option>
            <option value="s1">{$_("faceLamination.onlyS1")}</option>
            <option value="s2">{$_("faceLamination.onlyS2")}</option>
            <option value="none">{$_("faceLamination.none")}</option>
            <option value="" disabled>{$_("common.mixed")}</option>
          </select>
          <small id="faceLaminationHint" class="banding-caption">{$_("faceLamination.referenceHint")}</small>
        </label>
        <fieldset class="banding-fieldset">
          <legend>{$_("banding.title")}</legend>
          <label class="field compact-field">
            <span>{$_("banding.brush")}</span>
            <select id="bandingProfileInput"></select>
          </label>
          <div id="bandingPresets" class="banding-presets">
            <button type="button" class="inline-action" data-banding-preset="front" title={$_("banding.frontTitle")}>{$_("banding.onlyFront")}</button>
            <button type="button" class="inline-action" data-banding-preset="all" title={$_("banding.allTitle")}>{$_("banding.all")}</button>
            <button type="button" class="inline-action" data-banding-preset="none" title={$_("banding.noneTitle")}>{$_("metrics.none")}</button>
          </div>
          <div id="bandingViewLabel" class="banding-caption">{$_("banding.flatView")}</div>
          <div id="bandingDiagram" class="banding-diagram" role="group" aria-label={$_("banding.fourEdges")}>
            {#each edgeBandingEdges as edge}
              <button type="button" class="banding-edge banding-edge-{edge}" data-banding-edge={edge} aria-pressed="false">{edge.toUpperCase()}</button>
            {/each}
            <div id="bandingBoardFace" class="banding-board-face"></div>
          </div>
          <div id="bandingEdgeFields" class="banding-edge-fields">
            {#each edgeBandingEdges as edge}
              <label class="banding-edge-field">
                <span id="bandingLabel-{edge}">{edge.toUpperCase()}</span>
                <select data-banding-input={edge}></select>
              </label>
            {/each}
          </div>
          <details class="banding-custom">
            <summary>{$_("banding.addProfile")}</summary>
            <label class="field compact-field"><span>{$_("banding.type")}</span><select id="bandingTypeInput"><option>ABS</option><option>PVC</option><option value="veneer">{$_("banding.veneer")}</option></select></label>
            <label class="field compact-field"><span>{$_("banding.decor")}</span><input id="bandingDecorInput" type="text" maxlength="100"></label>
            <label class="field compact-field"><span>{$_("banding.thickness")}</span><input id="bandingThicknessInput" type="number" min="0.1" max="10" step="0.1" value="2"></label>
            <button id="addBandingProfileBtn" type="button" class="inline-action">{$_("common.add")}</button>
          </details>
          <label class="field compact-field">
            <span>{$_("banding.grain")}</span>
            <select id="grainInput"><option value="none">{$_("banding.grainNone")}</option><option value="a">{$_("banding.grainA")}</option><option value="b">{$_("banding.grainB")}</option><option value="" disabled>{$_("common.mixed")}</option></select>
          </label>
          <div id="bandingDimensions" class="banding-dimensions" aria-live="polite"></div>
          <div class="banding-caption">{$_("banding.coreNote")}</div>
          <div id="bandingReview" class="banding-review" hidden>
            <div id="bandingReviewText"></div>
            <button id="confirmBandingBtn" type="button" class="inline-action" title={$_("banding.confirmTitle")}>{$_("banding.confirm")}</button>
          </div>
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
      <button id="printOrderBtn" class="tool-button" type="button" title={$_("order.printTableTitle")}>
        <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 8 V4 H17 V8"></path>
          <path d="M7 17 H5 V9 H19 V17 H17"></path>
          <path d="M7 13 H17 V20 H7 Z"></path>
          <path d="M16 11 H17"></path>
        </svg>
        {$_("common.print")}
      </button>
    </section>
    <div id="orderLegend" class="order-legend"></div>
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
