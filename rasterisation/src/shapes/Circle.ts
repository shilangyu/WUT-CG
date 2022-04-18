import { Raster } from "../Raster";
import { toRgbHex } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Circle extends Shape {
  private center?: Point = undefined;
  private radius?: number = undefined;

  private static num = 1;

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
  draw(raster: Raster, _antiAlias: boolean): void {
    // TODO: simplify
    // TODO: optimize
    if (this.center === undefined || this.radius === undefined) {
      return;
    }

    const r = Math.round(this.radius);

    let dE = 3;
    let dSE = 5 - 2 * r;
    let d = 1 - r;
    let pos = new Point(0, r);

    do {
      raster.set(this.center.add(pos), this.color);
      raster.set(this.center.add(pos.neg()), this.color);
      raster.set(this.center.add(pos.negX()), this.color);
      raster.set(this.center.add(pos.negY()), this.color);
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

    dE = 3;
    dSE = 5 - 2 * r;
    d = 1 - r;
    pos = new Point(r, 0);

    do {
      raster.set(this.center.add(pos), this.color);
      raster.set(this.center.add(pos.neg()), this.color);
      raster.set(this.center.add(pos.negX()), this.color);
      raster.set(this.center.add(pos.negY()), this.color);
      if (d < 0) {
        d += dE;
        dE += 2;
        dSE += 2;
      } else {
        d += dSE;
        dE += 2;
        dSE += 4;
        pos = pos.add(new Point(-1, 0));
      }

      pos = pos.add(new Point(0, 1));
    } while (pos.x >= pos.y);
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
}
