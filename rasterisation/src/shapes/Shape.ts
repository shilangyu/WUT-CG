import { Point } from "../Point";
import { Color } from "./Color";

export abstract class Shape {
  color: Color = [0, 0, 0];
  thickness = 1;

  constructor(public tag: string) {}

  /// returns true if done drawing
  abstract addPoint(p: Point): boolean;

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
