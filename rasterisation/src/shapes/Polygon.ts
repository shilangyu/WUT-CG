import { toCssColor } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Polygon extends Shape {
  private points: Point[] = [];
  private isClosed = false;

  static readonly closeThreshold = 10;
  private static num = 1;

  constructor() {
    super(`Polygon#${Polygon.num++}`);
  }

  addPoint(p: Point) {
    if (this.isClosed) {
      throw new Error("Cannot add a point after the polygon was closed");
    }

    if (this.points.length === 0) {
      this.points.push(p);
    } else {
      // check if we are close to the first point
      if (
        this.points.length >= 3 &&
        this.points[0].distance(p) < Polygon.closeThreshold
      ) {
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

  move(anchor: Point, offset: Point): void {
    const points = {
      center: Point.average(...this.points),
      vertices: this.points,
      edges: this.points.map((e, i) =>
        Point.average(e, this.points[(i + 1) % this.points.length])
      ),
    };

    const distances = {
      center: points.center.distanceSq(anchor),
      vertices: points.vertices.map((e) => e.distanceSq(anchor)),
      edges: points.edges.map((e) => e.distanceSq(anchor)),
    };

    const min = Math.min(
      distances.center,
      ...distances.vertices,
      ...distances.edges
    );

    if (min === distances.center) {
      this.points = this.points.map((e) => e.add(offset));
      return;
    }

    for (let i = 0; i < distances.vertices.length; i++) {
      if (min === distances.vertices[i]) {
        this.points[i] = this.points[i].add(offset);
        return;
      }
    }

    for (let i = 0; i < distances.edges.length; i++) {
      if (min === distances.edges[i]) {
        this.points[i] = this.points[i].add(offset);
        this.points[(i + 1) % this.points.length] =
          this.points[(i + 1) % this.points.length].add(offset);
        return;
      }
    }
  }
}
