import { LitState } from "lit-element-state";
import { Bitmap } from "./Bitmap";
import { Capsule } from "./shapes/Capsule";
import { Circle } from "./shapes/Circle";
import { Color } from "./shapes/Color";
import { Line } from "./shapes/Line";
import { Point } from "./shapes/Point";
import { Polygon } from "./shapes/Polygon";
import { Rectangle } from "./shapes/Rectangle";
import { Shape } from "./shapes/Shape";

export type ShapeMode = "polygon" | "circle" | "line" | "capsule" | "rectangle";
export type DrawingMethod = "context" | "manual";

export class AppState extends LitState<typeof AppState.stateVars> {
  static stateVars = {
    shapeMode: "polygon" as ShapeMode,
    drawingMethod: "manual" as DrawingMethod,
    antiAlias: false,
    shapes: [] as Shape[],
    selectedShapeId: undefined as string | undefined,
    clipWithShapeId: undefined as string | undefined,
    fillPoints: [],
    isAddingFillPoints: false,
  };

  shapeMode!: ShapeMode;
  drawingMethod!: DrawingMethod;
  antiAlias!: boolean;
  shapes!: Shape[];
  selectedShapeId?: string;
  clipWithShapeId?: string;
  fillPoints!: Point[];
  isAddingFillPoints!: boolean;

  get selectedShape() {
    return this.shapes.find((e) => e.id === this.selectedShapeId);
  }

  get clipWithShape() {
    return this.shapes.find((e) => e.id === this.clipWithShapeId);
  }

  changeSelectedShapeThickness(thickness: number) {
    if (this.selectedShape) {
      this.selectedShape.thickness = thickness;
      this.shapes = [...this.shapes];
    }
  }

  changeSelectedShapeColor(color: Color) {
    if (this.selectedShape) {
      this.selectedShape.color = color;
      this.shapes = [...this.shapes];
    }
  }

  changeSelectedShapeFillColor(color: Color) {
    if (this.selectedShape) {
      this.selectedShape.fillColor = color;
      this.shapes = [...this.shapes];
    }
  }

  changeSelectedShapeFillImage(bmp: Bitmap) {
    if (this.selectedShape) {
      this.selectedShape.fillImage = bmp;
      this.shapes = [...this.shapes];
    }
  }

  deleteSelectedShape() {
    this.shapes = this.shapes.filter((e) => e.id !== this.selectedShapeId);
    if (this.selectedShapeId === this.clipWithShapeId) {
      this.clipWithShapeId = undefined;
    }
    this.selectedShapeId = undefined;
  }

  deleteAllShapes() {
    this.selectedShapeId = undefined;
    this.clipWithShapeId = undefined;
    this.shapes = [];
  }

  clipWithSelectedShape(clipWith: boolean) {
    if (this.selectedShape) {
      if (clipWith) {
        this.clipWithShapeId = this.selectedShape.id;
      } else {
        this.clipWithShapeId = undefined;
      }
    }
  }

  addFillPoint(p: Point) {
    this.fillPoints = [...this.fillPoints, p];
  }

  createCurrentShape(): Shape {
    switch (this.shapeMode) {
      case "polygon":
        return new Polygon();
      case "line":
        return new Line();
      case "circle":
        return new Circle();
      case "capsule":
        return new Capsule();
      case "rectangle":
        return new Rectangle();
    }
  }

  static stressTest() {
    const state = new AppState();
    const [nL, nP, nC] = [3000, 3000, 3000];

    for (let i = 0; i < nL; i++) {
      const l = new Line(
        new Point(randInt(), randInt()),
        new Point(randInt(), randInt())
      );

      state.shapes.push(l);
    }
    for (let i = 0; i < nP; i++) {
      const p = new Polygon();
      const f = new Point(randInt(), randInt());
      p.addPoint(f) ||
        p.addPoint(new Point(randInt(), randInt())) ||
        p.addPoint(new Point(randInt(), randInt())) ||
        p.addPoint(new Point(randInt(), randInt())) ||
        p.addPoint(f);

      state.shapes.push(p);
    }
    for (let i = 0; i < nC; i++) {
      const c = new Circle();
      c.addPoint(new Point(randInt(), randInt()));
      c.addPoint(new Point(randInt(), randInt()));

      state.shapes.push(c);
    }

    return state;
  }
}

export const appState = new AppState();

if (import.meta.env.DEV) {
  (window as any).appState = appState;
}

function randInt({ min, max } = { min: 0, max: 1000 }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
