import { LitState } from "lit-element-state";
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

  deleteSelectedShape() {
    this.shapes = this.shapes.filter((e) => e.id !== this.selectedShapeId);
    this.selectedShapeId = undefined;
  }

  createCurrentShape(): Shape {
    switch (this.shapeMode) {
      case "polygon":
        return new Polygon();
      case "line":
        throw new Error("unimplemented");
      case "circle":
        throw new Error("unimplemented");
    }
  }
}

export const appState = new AppState();

if (import.meta.env.DEV) {
  (window as any).appState = appState;
}
