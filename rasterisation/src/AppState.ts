import { LitState } from "lit-element-state";
import { Polygon } from "./shapes/Polygon";
import { Shape } from "./shapes/Shape";

export type ShapeMode = "polygon" | "circle" | "line";

export class AppState extends LitState {
  static stateVars = {
    shapeMode: "polygon",
    antiAlias: false,
    shapes: [],
  };

  shapeMode!: ShapeMode;
  antiAlias!: boolean;
  shapes!: Shape[];

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

// lit-element's component communication is absolutely horrendous.
// I will be using a singleton, even though I hate it.
export const appState = new AppState();
