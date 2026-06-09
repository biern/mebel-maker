import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { boundsFor, displayOrderedBoards, effectiveDepth, rectFromBoard } from "./geometry";
import type { Board, Material, SketchState } from "./types";

interface DepthRange {
  back: number;
  front: number;
}

interface BoardBox {
  board: Board;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  opacity: number;
}

const selectedStroke = "#1f6659";
const normalStroke = "#4d5a52";

export class Visualization3DRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50000);
  private readonly controls: OrbitControls;
  private readonly root = new THREE.Group();
  private sceneSpan = 1000;
  private cameraReady = false;
  private animationFrame: number | null = null;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly state: SketchState) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setClearColor(0xfbfcf8, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enableRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    };
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    this.controls.addEventListener("change", () => this.renderFrame());
    this.scene.add(this.root);
    this.addLighting();
    this.startRenderLoop();
  }

  bindInteractions(options: AddEventListenerOptions): void {
    void options;
  }

  dispose(): void {
    if (this.animationFrame !== null) window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.controls.dispose();
    this.clearRoot();
    this.renderer.dispose();
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
    this.updateCameraFrustum(rect.width, rect.height);
    this.draw();
  }

  draw(): void {
    this.clearRoot();
    const bounds = boundsFor(this.state.boards);
    if (!bounds) {
      this.renderFrame();
      return;
    }

    const maxDepth = Math.max(this.state.depth, ...this.state.boards.map((board) => effectiveDepth(board, this.state.depth)));
    const overlayThickness = this.overlayThickness(maxDepth);
    const sceneDepth = maxDepth + overlayThickness;
    const centerX = bounds.left + bounds.w / 2;
    const centerY = bounds.top + bounds.h / 2;
    this.sceneSpan = Math.max(bounds.w, bounds.h, sceneDepth, 1) * 1.65;
    this.updateCameraFrustum(this.canvas.clientWidth, this.canvas.clientHeight);
    this.addGround(bounds.w, sceneDepth, bounds.h);

    displayOrderedBoards(this.state.boards)
      .map((board) => this.boxForBoard(board, centerX, centerY, sceneDepth, overlayThickness))
      .forEach((box) => this.addBoardBox(box));

    if (!this.cameraReady) this.resetCamera();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.renderFrame();
  }

  private addLighting(): void {
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.75));

    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(800, 1100, 900);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.75);
    fill.position.set(-700, 500, -500);
    this.scene.add(fill);
  }

  private updateCameraFrustum(width: number, height: number): void {
    const aspect = Math.max(0.1, width / Math.max(1, height));
    const span = this.sceneSpan;
    if (aspect >= 1) {
      this.camera.left = -span * aspect / 2;
      this.camera.right = span * aspect / 2;
      this.camera.top = span / 2;
      this.camera.bottom = -span / 2;
    } else {
      this.camera.left = -span / 2;
      this.camera.right = span / 2;
      this.camera.top = span / aspect / 2;
      this.camera.bottom = -span / aspect / 2;
    }
    this.camera.updateProjectionMatrix();
  }

  private resetCamera(): void {
    this.camera.position.set(this.sceneSpan * 0.55, 0, this.sceneSpan * 1.45);
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.cameraReady = true;
  }

  private addGround(width: number, depth: number, height: number): void {
    const size = Math.max(width, depth, 300) * 1.25;
    const grid = new THREE.GridHelper(size, 12, 0x9fb3a8, 0xd6ded8);
    grid.position.y = -Math.max(60, height / 2 + 36);
    grid.position.z = 0;
    this.root.add(grid);
  }

  private boxForBoard(board: Board, centerX: number, centerY: number, sceneDepth: number, overlayThickness: number): BoardBox {
    const rect = rectFromBoard(board);
    const range = this.zRangeForBoard(board, effectiveDepth(board, this.state.depth), overlayThickness);
    const d = Math.max(1, range.front - range.back);
    const opacity = board.kind === "front" && !this.state.showFrontPanels ? 0.18 : 1;
    return {
      board,
      x: rect.x + rect.w / 2 - centerX,
      y: centerY - (rect.y + rect.h / 2),
      z: (range.back + range.front) / 2 - sceneDepth / 2,
      w: Math.max(1, rect.w),
      h: Math.max(1, rect.h),
      d,
      opacity
    };
  }

  private zRangeForBoard(board: Board, depth: number, overlayThickness: number): DepthRange {
    if (board.kind === "front") {
      const behindDepth = this.deepestOverlappingStructuralDepth(board) ?? depth;
      return { back: behindDepth, front: behindDepth + overlayThickness };
    }
    if (board.kind === "back") return { back: 0, front: overlayThickness };
    return { back: 0, front: depth };
  }

  private addBoardBox(box: BoardBox): void {
    const material = this.materialFor(box.board);
    const selected = this.state.selectedIds.includes(box.board.id) || this.state.selectedId === box.board.id;
    const geometry = new THREE.BoxGeometry(box.w, box.h, box.d);
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      opacity: box.opacity,
      roughness: 0.78,
      metalness: 0,
      transparent: box.opacity < 1,
      depthWrite: box.opacity >= 1
    });
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.set(box.x, box.y, box.z);
    this.root.add(mesh);

    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: selected ? selectedStroke : normalStroke,
      transparent: true,
      opacity: selected ? 1 : 0.44
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edges.position.copy(mesh.position);
    this.root.add(edges);
  }

  private overlayThickness(maxDepth: number): number {
    return Math.max(4, Math.min(this.state.thickness, maxDepth * 0.08));
  }

  private deepestOverlappingStructuralDepth(front: Board): number | null {
    const overlaps = this.state.boards
      .filter((board) => board.id !== front.id && board.kind !== "front" && board.kind !== "back")
      .filter((board) => this.boardsOverlapInElevation(front, board));
    if (!overlaps.length) return null;
    return Math.max(...overlaps.map((board) => effectiveDepth(board, this.state.depth)));
  }

  private boardsOverlapInElevation(a: Board, b: Board): boolean {
    const ar = rectFromBoard(a);
    const br = rectFromBoard(b);
    return ar.x < br.x + br.w &&
      ar.x + ar.w > br.x &&
      ar.y < br.y + br.h &&
      ar.y + ar.h > br.y;
  }

  private materialFor(board: Board): Material {
    return this.state.materials.find((material) => material.id === board.materialId) ?? this.state.materials[0];
  }

  private clearRoot(): void {
    [...this.root.children].forEach((child) => {
      this.root.remove(child);
      this.disposeObject(child);
    });
  }

  private disposeObject(object: THREE.Object3D): void {
    object.traverse((child) => {
      const mesh = child as THREE.Mesh | THREE.LineSegments;
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
  }

  private renderFrame(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private startRenderLoop(): void {
    const tick = () => {
      this.animationFrame = window.requestAnimationFrame(tick);
      this.controls.update();
      this.renderFrame();
    };
    tick();
  }
}
