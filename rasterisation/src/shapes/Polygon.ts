import { Point } from "../Point";
import { toCssColor } from "./Color";
import { Shape } from "./Shape";

export class Polygon extends Shape {
  private points: Point[] = [];
  private isClosed = false;

  static readonly closeThreshold = 10;

  constructor() {
    super("Polygon");
  }

  addPoint(p: Point) {
    if (this.isClosed) {
      throw new Error("Cannot add a point after the polygon was closed");
    }

    if (this.points.length === 0) {
      this.points.push(p);
    } else {
      // check if we are close to the first point
      if (this.points[0].distance(p) < Polygon.closeThreshold) {
        this.isClosed = true;
      } else {
        this.points.push(p);
      }
    }

    return this.isClosed;
  }

  // TODO: replace with manual rasterisation
  draw(ctx: CanvasRenderingContext2D): void {
    if (this.points.length === 0) {
      return;
    }

    ctx.strokeStyle = toCssColor(this.color);
    ctx.lineWidth = this.thickness;
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      const { x, y } = this.points[i];
      ctx.lineTo(x, y);
    }

    if (this.isClosed) {
      ctx.closePath();
    }

    ctx.stroke();
  }
}
