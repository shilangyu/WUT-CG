import { Raster } from "../Raster";
import { Color } from "./Color";
import { Point } from "./Point";

export abstract class Shape {
  color: Color = [0, 0, 0];
  thickness = 1;

  constructor(public id: string) {}

  /// returns true if done drawing
  abstract addPoint(p: Point): boolean;

  abstract draw(raster: Raster, antiAlias: boolean): void;

  abstract ctxDraw(ctx: CanvasRenderingContext2D): void;

  abstract move(anchor: Point, offset: Point): void;
}
