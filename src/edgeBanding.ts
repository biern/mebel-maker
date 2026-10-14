import type { Board, EdgeBandingEdge, EdgeBandingEdges, EdgeBandingProfile, GrainDirection, LaminateEdges, PieceOrientation } from "./types";

export const edgeBandingEdges: EdgeBandingEdge[] = ["a1", "a2", "b1", "b2"];
export const legacyLaminateEdges: Array<keyof LaminateEdges> = ["left", "right", "top", "bottom", "front", "back"];

export function emptyEdgeBanding(): EdgeBandingEdges {
  return { a1: null, a2: null, b1: null, b2: null };
}

export function normalizeBandingProfile(value: unknown): EdgeBandingProfile | null {
  if (!value || typeof value !== "object") return null;
  const profile = value as Partial<EdgeBandingProfile>;
  if (!["ABS", "PVC", "veneer"].includes(profile.type ?? "") ||
      typeof profile.decor !== "string" || !profile.decor.trim() ||
      (profile.thickness !== null && (typeof profile.thickness !== "number" || !Number.isFinite(profile.thickness) ||
      profile.thickness <= 0 || profile.thickness > 10))) return null;
  return {
    id: typeof profile.id === "string" && profile.id ? profile.id : `${profile.type}-${profile.decor}-${profile.thickness}`,
    type: profile.type!,
    decor: profile.decor.trim(),
    thickness: profile.thickness
  };
}

export function normalizeBoardBanding(source: {
  edgeBanding?: unknown;
  bandingNeedsReview?: boolean;
  laminate?: Partial<LaminateEdges>;
  legacyLaminate?: Partial<LaminateEdges>;
  grainDirection?: GrainDirection;
}): Pick<Board, "edgeBanding" | "bandingNeedsReview" | "legacyLaminate" | "grainDirection"> {
  const edgeBanding = emptyEdgeBanding();
  let bandingNeedsReview = source.bandingNeedsReview === true;
  if (source.edgeBanding !== undefined) {
    if (!source.edgeBanding || typeof source.edgeBanding !== "object") bandingNeedsReview = true;
    else {
      const saved = source.edgeBanding as Partial<EdgeBandingEdges>;
      edgeBandingEdges.forEach((edge) => {
        edgeBanding[edge] = normalizeBandingProfile(saved[edge]);
        if (saved[edge] != null && !edgeBanding[edge]) bandingNeedsReview = true;
      });
    }
  }
  const legacy = source.legacyLaminate ?? source.laminate;
  const legacyLaminate = legacy && legacyLaminateEdges.some((edge) => legacy[edge] === true)
    ? Object.fromEntries(legacyLaminateEdges.map((edge) => [edge, legacy[edge] === true])) as unknown as LaminateEdges
    : undefined;
  // Six old drawing directions cannot identify four physical edges or their profiles.
  // Preserve them verbatim and require an explicit review instead of guessing.
  if (legacyLaminate) bandingNeedsReview = true;
  return {
    edgeBanding,
    bandingNeedsReview,
    ...(legacyLaminate ? { legacyLaminate } : {}),
    grainDirection: source.grainDirection === "a" || source.grainDirection === "b" ? source.grainDirection : "none"
  };
}

export function bandingProfileKey(profile: EdgeBandingProfile | null): string {
  return profile ? JSON.stringify([profile.type, profile.decor, profile.thickness]) : "none";
}

export function setBoardEdgeBanding(board: Board, edge: EdgeBandingEdge, profile: EdgeBandingProfile | null): void {
  board.edgeBanding[edge] = profile ? { ...profile } : null;
}

export function bandingEdgeLength(board: Board, edge: EdgeBandingEdge): number {
  return edge.startsWith("a") ? board.dimensions.width : board.dimensions.height;
}

export function frontBandingEdge(board: Board): EdgeBandingEdge | null {
  if (board.orientation === "horizontal") return "a1";
  if (board.orientation === "vertical") return "b1";
  return null;
}

export function bandingEdgeDirection(board: Board, edge: EdgeBandingEdge): "left" | "right" | "top" | "bottom" | "front" | "back" {
  if (board.orientation === "horizontal") return { a1: "front", a2: "back", b1: "left", b2: "right" }[edge] as "front" | "back" | "left" | "right";
  if (board.orientation === "vertical") return { a1: "top", a2: "bottom", b1: "front", b2: "back" }[edge] as "top" | "bottom" | "front" | "back";
  return { a1: "top", a2: "bottom", b1: "left", b2: "right" }[edge] as "top" | "bottom" | "left" | "right";
}

export function bandingView(orientation: PieceOrientation | null): {
  edges: Record<"top" | "bottom" | "left" | "right", EdgeBandingEdge>;
  horizontalAxis: "A" | "B";
  verticalAxis: "A" | "B";
  verticalArrow: "↑" | "↓";
  visibleFace: "s1" | "s2";
} {
  // Only rotate the inspector's view. Physical edge IDs and order data stay fixed.
  if (orientation === "horizontal") return {
    edges: { top: "a2", bottom: "a1", left: "b1", right: "b2" },
    horizontalAxis: "A", verticalAxis: "B", verticalArrow: "↑", visibleFace: "s2"
  };
  if (orientation === "vertical") return {
    edges: { top: "b2", bottom: "b1", left: "a1", right: "a2" },
    horizontalAxis: "B", verticalAxis: "A", verticalArrow: "↑", visibleFace: "s1"
  };
  return {
    edges: { top: "a1", bottom: "a2", left: "b1", right: "b2" },
    horizontalAxis: "A", verticalAxis: "B", verticalArrow: "↓", visibleFace: "s1"
  };
}

export function nominalCoreDimensions(board: Board): Board["dimensions"] {
  const thickness = (edge: EdgeBandingEdge) => board.edgeBanding[edge]?.thickness ?? 0;
  const precise = (value: number) => Math.round(value * 1000) / 1000;
  return {
    width: precise(board.dimensions.width - thickness("b1") - thickness("b2")),
    height: precise(board.dimensions.height - thickness("a1") - thickness("a2")),
    thickness: board.dimensions.thickness
  };
}

export function bandingOrderIssue(board: Board): "review" | "invalidCore" | null {
  if (board.bandingNeedsReview) return "review";
  const core = nominalCoreDimensions(board);
  return core.width <= 0 || core.height <= 0 ? "invalidCore" : null;
}

export function boardOrderKey(board: Board): string {
  return JSON.stringify([
    board.dimensions.width, board.dimensions.height, board.dimensions.thickness, board.materialId, board.faceLamination,
    board.grainDirection, edgeBandingEdges.map((edge) => bandingProfileKey(board.edgeBanding[edge])),
    board.bandingNeedsReview, board.legacyLaminate ?? null
  ]);
}

export function groupOrderBoards(boards: Board[]): Board[][] {
  const groups = new Map<string, Board[]>();
  boards.forEach((board) => {
    const key = boardOrderKey(board);
    const group = groups.get(key);
    if (group) group.push(board);
    else groups.set(key, [board]);
  });
  return [...groups.values()];
}
