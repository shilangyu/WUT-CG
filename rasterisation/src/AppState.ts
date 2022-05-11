import { LitState } from "lit-element-state";
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
    shapeMode: "line" as ShapeMode,
    drawingMethod: "context" as DrawingMethod,
    antiAlias: false,
    shapes: [] as Shape[],
    selectedShapeId: undefined as string | undefined,
  };

  shapeMode!: ShapeMode;
  drawingMethod!: DrawingMethod;
  antiAlias!: boolean;
  shapes!: Shape[];
  selectedShapeId?: string;

  get selectedShape() {
    return this.shapes.find((e) => e.id === this.selectedShapeId);
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

  deleteSelectedShape() {
    this.shapes = this.shapes.filter((e) => e.id !== this.selectedShapeId);
    this.selectedShapeId = undefined;
  }

  deleteAllShapes() {
    this.selectedShapeId = undefined;
    this.shapes = [];
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
