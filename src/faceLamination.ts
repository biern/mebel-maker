import type { FaceLamination, LaminateEdges, PieceOrientation } from "./types";

export const unlaminatedFaceColor = "#d6c4a1";

export function normalizeFaceLamination(value: unknown): FaceLamination {
  return value === "s1" || value === "s2" || value === "none" ? value : "both";
}

export function isFaceLaminated(lamination: FaceLamination, side: "s1" | "s2"): boolean {
  return lamination === "both" || lamination === side;
}

export function faceDirections(orientation: PieceOrientation): [keyof LaminateEdges, keyof LaminateEdges] {
  if (orientation === "horizontal") return ["bottom", "top"];
  if (orientation === "vertical") return ["right", "left"];
  return ["front", "back"];
}

export function flatFaceMeshIndices(orientation: PieceOrientation): [number, number] {
  // BoxGeometry: +X, -X, +Y, -Y, +Z, -Z. Keep S1/S2 with the physical board.
  if (orientation === "horizontal") return [3, 2];
  if (orientation === "vertical") return [0, 1];
  return [4, 5];
}
