import { Raster } from "../Raster";
import { Color, lerp, toRgbHex } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Circle extends Shape {
  private center?: Point = undefined;
  private radius?: number = undefined;

  private static num = 1;

  static override runtimeType = "Circle";

  constructor() {
    super(`Circle#${Circle.num++}`);
  }

  addPoint(p: Point) {
    if (this.radius !== undefined) {
      throw new Error("Cannot add a point after the circle was finished");
    }

    if (this.center === undefined) {
      this.center = p;
    } else if (this.radius === undefined) {
      this.radius = this.center.distance(p);
    }

    return this.radius !== undefined;
  }

  // Midpoint Circle Algorithm using only additions extended to all octants
  draw(raster: Raster, antiAlias: boolean): void {
    if (antiAlias) {
      this.antiAliasDraw(raster);
      return;
    }
    if (this.center === undefined || this.radius === undefined) {
      return;
    }

    const r = Math.round(this.radius);

    let dE = 3;
    let dSE = 5 - 2 * r;
    let d = 1 - r;
    let pos = new Point(0, r);

    do {
      Circle.mirrorDraw(raster, this.center, pos, this.color);

      if (d < 0) {
        d += dE;
        dE += 2;
        dSE += 2;
      } else {
        d += dSE;
        dE += 2;
        dSE += 4;
        pos = pos.add(new Point(0, -1));
      }

      pos = pos.add(new Point(1, 0));
    } while (pos.y >= pos.x);
  }

  private antiAliasDraw(raster: Raster) {
    if (this.center === undefined || this.radius === undefined) {
      return;
    }

    let x = Math.round(this.radius);
    let y = 0;

    Circle.mirrorDraw(raster, this.center, new Point(x, y), this.color);

    while (x >= y) {
      y += 1;
      const xReal = Math.sqrt(this.radius * this.radius - y * y);
      x = Math.ceil(xReal);

      const bg = raster.get(new Point(x, y));
      const T = x - xReal;

      Circle.mirrorDraw(
        raster,
        this.center,
        new Point(x, y),
        lerp(this.color, bg, 1 - T)
      );
      Circle.mirrorDraw(
        raster,
        this.center,
        new Point(x - 1, y),
        lerp(this.color, bg, T)
      );
    }
  }

  private static mirrorDraw(
    raster: Raster,
    center: Point,
    point: Point,
    color: Color
  ) {
    raster.set(center.add(point), color);
    raster.set(center.add(point.neg()), color);
    raster.set(center.add(point.negX()), color);
    raster.set(center.add(point.negY()), color);
    raster.set(center.add(new Point(point.y, point.x)), color);
    raster.set(center.add(new Point(-point.y, point.x)), color);
    raster.set(center.add(new Point(point.y, -point.x)), color);
    raster.set(center.add(new Point(-point.y, -point.x)), color);
  }

  ctxDraw(ctx: CanvasRenderingContext2D): void {
    if (this.center === undefined || this.radius === undefined) {
      return;
    }

    ctx.strokeStyle = toRgbHex(this.color);
    ctx.lineWidth = this.thickness;

    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  move(anchor: Point, offset: Point): void {
    if (this.center === undefined || this.radius === undefined) {
      return;
    }

    const fromCenter = this.center.distance(anchor);
    if (fromCenter < this.radius / 2) {
      this.center = this.center.add(offset);
    } else {
      // orthogonal vector to the rim
      const ortho = anchor.sub(this.center);
      // cosine of the angle between the orthogonal vector and the offset
      const cos = ortho.dot(offset) / (ortho.magnitude() * offset.magnitude());

      // first quadrant: offset is pointing outwards
      if (cos >= 0) {
        this.radius += offset.magnitude();
      } else {
        this.radius -= offset.magnitude();
      }
    }
  }

  serialize(): Record<string, any> & { runtimeType: string } {
    return { ...this, runtimeType: Circle.runtimeType };
  }

  deserialize(json: Record<string, any>): void {
    Object.assign(this, json);
    this.center = Object.create(Point.prototype);
    Object.assign(this.center, json.center);
  }
}
