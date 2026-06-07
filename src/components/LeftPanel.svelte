<aside class="sidebar left-panel" aria-label="Drawing tools">
  <div class="brand">
    <div class="mark">MB</div>
    <div>
      <h1>Mebel Maker</h1>
      <p>2D furniture sketching</p>
    </div>
  </div>

  <label class="project-name-field">
    <span>Project name</span>
    <input id="projectNameInput" type="text" maxlength="80" placeholder="Untitled project" autocomplete="off">
  </label>

  <details class="tool-section collapsible-section" open>
    <summary>Templates</summary>
    <div class="button-grid compact" id="templateList">
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
  </details>

  <section class="tool-section">
    <h2>Pieces</h2>
    <div class="preset-list" id="presetList">
      <button class="preset-card" draggable="true" data-preset="side" title="Side panel">
        <span class="piece-preview vertical"></span>
        <span>Side</span>
        <strong>18 × 560</strong>
      </button>
      <button class="preset-card" draggable="true" data-preset="shelf" title="Shelf board">
        <span class="piece-preview horizontal"></span>
        <span>Shelf</span>
        <strong>784 × 18</strong>
      </button>
      <button class="preset-card" draggable="true" data-preset="divider" title="Vertical divider">
        <span class="piece-preview vertical slim"></span>
        <span>Divider</span>
        <strong>18 × 524</strong>
      </button>
      <button class="preset-card" draggable="true" data-preset="back" title="Back panel">
        <span class="piece-preview panel"></span>
        <span>Back</span>
        <strong>820 × 560</strong>
      </button>
      <button class="preset-card" draggable="true" data-preset="front" title="Front panel">
        <span class="piece-preview panel front"></span>
        <span>Front</span>
        <strong>820 × 560</strong>
      </button>
    </div>
  </section>

  <section class="tool-section">
    <h2>Settings</h2>
    <label class="field">
      <span>Wood thickness</span>
      <div class="input-row">
        <input id="thicknessInput" type="number" min="3" max="80" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="field">
      <span>Default depth</span>
      <div class="input-row">
        <input id="depthInput" type="number" min="1" max="2000" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="field">
      <span>Snap step</span>
      <div class="input-row">
        <input id="gridInput" type="number" min="1" max="100" step="1">
        <span>mm</span>
      </div>
    </label>
    <label class="toggle-row">
      <input id="snapToggle" type="checkbox" checked>
      <span>Snap to grid, edges, and alignment</span>
    </label>
    <label class="toggle-row">
      <input id="dimToggle" type="checkbox" checked>
      <span>Show dimension hints</span>
    </label>
  </section>

  <section class="tool-section">
    <h2>Layers</h2>
    <label class="toggle-row">
      <input id="frontLayerToggle" type="checkbox" checked>
      <span>Show front panels</span>
    </label>
  </section>

  <details class="tool-section collapsible-section" open>
    <summary>Materials</summary>
    <form class="material-form" id="materialForm">
      <label class="field">
        <span>Name</span>
        <input id="materialNameInput" type="text" autocomplete="off" placeholder="Custom material">
      </label>
      <div class="material-input-row">
        <label class="field">
          <span>Color</span>
          <input id="materialColorInput" type="color" value="#c99756">
        </label>
        <button id="addMaterialBtn" class="tool-button" type="submit" title="Add custom material">＋ Add</button>
      </div>
    </form>
    <div class="material-list" id="materialList"></div>
  </details>
</aside>
