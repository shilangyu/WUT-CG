import { Raster } from "../Raster";
import { Color } from "./Color";
import { Point } from "./Point";

export abstract class Shape {
  color: Color = [0, 0, 0];
  fillColor?: Color;
  fillImage?: Raster;
  thickness = 1;
  canBeClippedWith = false;

  static runtimeType = "Shape";

  constructor(public id: string) {}

  /// returns true if done drawing
  abstract addPoint(p: Point): boolean;

  abstract draw(raster: Raster, antiAlias: boolean, clipper?: Shape): void;

  abstract ctxDraw(ctx: CanvasRenderingContext2D): void;

  abstract move(anchor: Point, offset: Point): void;

  abstract serialize(): Record<string, any> & { runtimeType: string };

  abstract deserialize(json: Record<string, any>): void;
}
