import { LitState } from "lit-element-state";
import { Circle } from "./shapes/Circle";
import { Color } from "./shapes/Color";
import { Line } from "./shapes/Line";
import { Polygon } from "./shapes/Polygon";
import { Shape } from "./shapes/Shape";

export type ShapeMode = "polygon" | "circle" | "line";

export class AppState extends LitState<typeof AppState.stateVars> {
  static stateVars = {
    shapeMode: "polygon" as ShapeMode,
    antiAlias: false,
    shapes: [] as Shape[],
    selectedShapeId: undefined as string | undefined,
  };

  shapeMode!: ShapeMode;
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
    }
  }
}

export const appState = new AppState();

if (import.meta.env.DEV) {
  (window as any).appState = appState;
}
