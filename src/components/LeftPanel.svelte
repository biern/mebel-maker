<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<aside class="sidebar left-panel" aria-label={$_("panels.drawingTools")}>
  <div class="brand">
    <div class="mark">MB</div>
    <div>
      <h1>{$_("app.name")}</h1>
      <p>{$_("app.tagline")}</p>
    </div>
  </div>

  <label class="project-name-field">
    <span>{$_("panels.projectName")}</span>
    <input id="projectNameInput" type="text" maxlength="80" placeholder={$_("panels.projectNamePlaceholder")} autocomplete="off">
  </label>

  <section class="tool-section">
    <h2>{$_("panels.pieces")}</h2>
    <div class="preset-list" id="presetList">
      <button class="preset-card" draggable="true" data-preset="side" title={$_("pieces.sidePanel")}>
        <span class="piece-preview vertical"></span>
        <span>{$_("pieces.side")}</span>
      </button>
      <button class="preset-card" draggable="true" data-preset="shelf" title={$_("pieces.shelfBoard")}>
        <span class="piece-preview horizontal"></span>
        <span>{$_("pieces.shelf")}</span>
      </button>
      <button class="preset-card" draggable="true" data-preset="divider" title={$_("pieces.verticalDivider")}>
        <span class="piece-preview vertical slim"></span>
        <span>{$_("pieces.divider")}</span>
      </button>
      <button class="preset-card" draggable="true" data-preset="back" title={$_("pieces.backPanel")}>
        <span class="piece-preview panel"></span>
        <span>{$_("pieces.back")}</span>
      </button>
      <button class="preset-card" draggable="true" data-preset="front" title={$_("pieces.frontPanel")}>
        <span class="piece-preview panel front"></span>
        <span>{$_("pieces.front")}</span>
      </button>
    </div>
  </section>

  <section class="tool-section">
    <h2>{$_("panels.settings")}</h2>
    <label class="field">
      <span>{$_("settings.woodThickness")}</span>
      <div class="input-row">
        <input id="thicknessInput" type="number" min="3" max="80" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="field">
      <span>{$_("settings.defaultDepth")}</span>
      <div class="input-row">
        <input id="depthInput" type="number" min="1" max="2000" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="field">
      <span>{$_("settings.snapStep")}</span>
      <div class="input-row">
        <input id="gridInput" type="number" min="1" max="100" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="toggle-row">
      <input id="snapToggle" type="checkbox" checked>
      <span>{$_("settings.snapToGrid")}</span>
    </label>
    <label class="toggle-row">
      <input id="dimToggle" type="checkbox" checked>
      <span>{$_("settings.showDimensionHints")}</span>
    </label>
  </section>

  <section class="tool-section">
    <h2>{$_("panels.layers")}</h2>
    <label class="toggle-row">
      <input id="frontLayerToggle" type="checkbox">
      <span>{$_("settings.showFrontPanels")}</span>
    </label>
  </section>

  <details class="tool-section collapsible-section" open>
    <summary>{$_("panels.materials")}</summary>
    <form class="material-form" id="materialForm">
      <label class="field">
        <span>{$_("inspector.name")}</span>
        <input id="materialNameInput" type="text" autocomplete="off" placeholder={$_("panels.materialNamePlaceholder")}>
      </label>
      <div class="material-input-row">
        <label class="field">
          <span>{$_("inspector.color")}</span>
          <input id="materialColorInput" type="color" value="#c99756">
        </label>
        <button id="addMaterialBtn" class="tool-button" type="submit" title={$_("panels.materialNamePlaceholder")}>＋ {$_("common.add")}</button>
      </div>
    </form>
    <div class="material-list" id="materialList"></div>
  </details>
</aside>
