# Mebel Maker

Mebel Maker is a browser-based tool for sketching 2D furniture layouts and turning those sketches into practical ordering information for wood pieces.

The project is meant to feel fast and direct: users should be able to add boards, snap them into cabinet-like structures, inspect dimensions, and understand what needs to be cut or ordered without leaving the drawing surface.

## Goals

- Make technical furniture sketches easy to create and adjust.
- Keep dimensions clear while editing, including inner and outer measurements.
- Model material thickness and board depth in a way that affects measurements and ordering.
- Support common cabinet-building workflows such as sides, shelves, dividers, backs, fronts, and templates.
- Help users plan wood orders with materials, laminate edges, dimensions, quantities, and CSV export.
- Stay lightweight, maintainable, and approachable for iterative product work.

## Main Functions

- Add individual furniture pieces such as side panels, shelves, dividers, back panels, and front panels.
- Start from reusable templates for common furniture forms.
- Move, resize, rotate, duplicate, delete, undo, and redo pieces.
- Snap pieces to the grid, edges, centers, and aligned positions.
- Automatically anchor connected structural pieces so connected edges can follow later resizing.
- Add anchored measurements and name them when useful.
- View dimension hints for selected pieces, connected groups, inner spaces, and outer bounds.
- Configure wood thickness, default depth, snap size, visibility layers, and dimension hints.
- Override depth per piece while keeping a global default for ordinary pieces.
- Assign materials with names and colors, including custom materials.
- Mark laminate edges for each piece.
- Exclude pieces from the order list when needed.
- Save work automatically in the browser.
- Export and import project JSON.
- Export the piece order list as CSV.

## Product Direction

The app should prioritize clarity over decoration. It is a working design and ordering tool, so controls should be compact, predictable, and easy to scan. Visual changes should help users understand dimensions, material, layers, and ordering consequences.

The core experience should remain usable with a mouse or trackpad, with forgiving hit targets for resize handles, anchors, and toolbar actions. New features should preserve existing drawings and avoid surprising changes to dimensions unless the user confirms them.

## Development

The project uses a modern TypeScript web stack with a local development server.

Common checks:

```sh
npm run build
npm run test:geometry
```

Run the development server:

```sh
npm run dev
```
