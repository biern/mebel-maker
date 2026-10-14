import type { Board } from "./types";

// Use physical finished dimensions, independent of sketch orientation or face finish.
export function boardAreaM2(board: Board): number {
  return board.dimensions.width * board.dimensions.height / 1_000_000;
}

export function orderAreaSummary(boards: Board[]): { materials: Map<string, number>; total: number } {
  const materialAreas = new Map<string, number>();
  let totalMm2 = 0;
  for (const board of boards) {
    if (board.ignoreInOrder) continue;
    const mm2 = board.dimensions.width * board.dimensions.height;
    materialAreas.set(board.materialId, (materialAreas.get(board.materialId) ?? 0) + mm2);
    totalMm2 += mm2;
  }
  return {
    materials: new Map([...materialAreas].map(([id, mm2]) => [id, mm2 / 1_000_000])),
    total: totalMm2 / 1_000_000
  };
}
