# Mebel Maker

**Sketch furniture, check dimensions, and turn boards into an order list.**

## 🚀 Open the App

👉 **[Launch Mebel Maker on GitHub Pages](https://biern.github.io/mebel-maker/)**

Mebel Maker is a browser-based furniture sketching tool for practical cabinet, shelving, and panel layouts. It is built for quick 2D planning, accurate dimensions, and order-ready board lists rather than marketing mockups.

## ✨ Feature Highlights

- 🧱 Add boards and panels: sides, shelves, dividers, backs, and fronts.
- 🧰 Start from templates: cabinet, bookcase, base cabinet, wall cabinet, simple box, and complex cabinet.
- 📏 Measure real dimensions with inner, outer, group, selected-board, and custom anchored measurements.
- 🧲 Snap boards to grid steps, edges, centers, alignments, and layout anchors.
- 🔗 Keep connected structural boards anchored while resizing related pieces.
- 🎨 Assign materials with names and color swatches, including custom materials.
- 📐 Set global wood thickness, default depth, per-board depth overrides, and laminate edges.
- 📦 Generate a wood order list with material, dimensions, quantity, depth, thickness, and laminate details.
- ⚠️ See overlap warnings when structural pieces conflict.
- 🧊 Toggle a 3D view to inspect board depth and overall structure.
- 💾 Autosave in the browser, export `.mebel` project files, and import them later.
- 📋 Copy the order list as CSV or save it as a CSV file.

## 🛠️ Drawing Tools

Mebel Maker keeps the main workspace direct and compact:

- Drag presets from the left panel or click them to add pieces.
- Move, resize, rotate, duplicate, delete, undo, and redo boards.
- Select one board, multiple boards, or connected groups.
- Edit exact X/Y position, width, height, and depth from the inspector.
- Fit the drawing to the viewport and zoom or pan around larger projects.
- Hide front panels when you need a clearer look at the structure behind them.

## 📏 Measurements

Dimensions stay visible while you work:

- Automatic hints show selected board size, connected group bounds, and full project bounds.
- Inner dimensions appear for framed cabinet-like layouts.
- Custom measurements can be anchored to board edges or grid points.
- Measurements can be named, selected, dragged outward for readability, renamed, or deleted.
- Width and height measurement buttons can create quick selected-board measurements.

## 🧲 Snapping and Anchors

Snapping is built around furniture layout work:

- Grid snapping uses a configurable millimeter step.
- Edge and center snapping help align boards precisely.
- Layout anchors can divide a board along width or height.
- Balanced layout anchors can account for piece thickness and inside/outside edge placement.
- Structural anchors preserve connected board relationships during resizing.
- Back and front panels are treated as overlays so they do not create false structural conflicts.

## 🎨 Materials, Depth, and Laminate

Boards carry ordering details, not just drawing geometry:

- Choose from built-in materials like birch plywood, oak, walnut, pine, melamine, black, white, gray, red, blue, and green.
- Add custom materials with a name and color.
- Use global thickness and depth defaults for fast setup.
- Override depth per board when one piece needs different ordering depth.
- Mark laminate edges individually: left, right, front, and back.
- Exclude specific boards from the wood order when needed.

## 📦 Wood Order Output

The order list is designed to be useful after sketching:

- Groups matching pieces by name, material, dimensions, depth, thickness, and laminate edges.
- Shows quantity for repeated pieces.
- Includes visual material swatches in the sidebar.
- Copies directly to the clipboard as CSV.
- Exports a timestamped CSV file for ordering or spreadsheet work.

## 💾 Projects and Compatibility

- Projects autosave locally in the browser.
- Use `.mebel` files to save and load full projects.
- Project files include boards, anchors, measurements, materials, settings, view state, and project name.
- Older saved projects are normalized with sensible defaults when fields are missing.

## ⌨️ Keyboard Shortcuts

- `Cmd/Ctrl + Z`: Undo
- `Cmd/Ctrl + Shift + Z` or `Cmd/Ctrl + Y`: Redo
- `Cmd/Ctrl + D`: Duplicate selected boards
- `R`: Rotate selected boards
- `Delete` or `Backspace`: Delete selected boards or selected measurement
- `Escape`: Cancel the current measurement, rename, drag, resize, or selection action

## 🧑‍💻 Development

Install dependencies:

```sh
npm install
```

Run the local app:

```sh
npm run dev
```

Run the preferred checks:

```sh
npm run build
npm run test:geometry
```

Preview a production build:

```sh
npm run preview
```

## 🧭 Product Direction

Mebel Maker should stay dense, direct, and work-focused. New features should protect existing drawings, preserve dimensions deliberately, and make material, depth, laminate, anchoring, measurement, and ordering consequences easy to understand.
