import { Raster } from "../Raster";
import { toRgbHex } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Line extends Shape {
  static readonly closeThreshold = 10;
  private static num = 1;

  constructor(private p1?: Point, private p2?: Point) {
    super(`Line#${Line.num++}`);
  }

  addPoint(p: Point) {
    if (this.p1 !== undefined && this.p2 !== undefined) {
      throw new Error("Cannot add a point after the line was created");
    }

    if (!this.p1) {
      this.p1 = p;
    } else if (!this.p2) {
      this.p2 = p;
    }

    return this.p2 !== undefined;
  }

  // Symmetric Midpoint Line Algorithm extended to all octants
  draw(raster: Raster, _antiAlias: boolean): void {
    // TODO: simplify
    // TODO: optimize
    if (this.p1 === undefined || this.p2 === undefined) {
      return;
    }

    // division by zero is turned into Infinity; which here is correct
    const slope = Math.abs((this.p2.y - this.p1.y) / (this.p2.x - this.p1.x));

    // slope > 1 means we are in the 2nd, 3rd, 6th, or 7th octant: flip the axes
    if (slope > 1) {
      const [p1, p2] =
        this.p1.y < this.p2.y ? [this.p1, this.p2] : [this.p2, this.p1];
      const delta = p2.sub(p1);

      const dE = 2 * delta.x;
      const dNE = 2 * (delta.x - delta.y);
      const dSE = 2 * (delta.x + delta.y);
      let f = p1;
      let b = p2;

      // 3rd or 6th octant:
      if (p1.x < p2.x) {
        const fNE = new Point(1, 0);
        const bNE = fNE.neg();

        let d = 2 * delta.x - delta.y;

        do {
          raster.set(f, this.color);
          raster.set(b, this.color);

          f = f.add(new Point(0, 1));
          b = b.add(new Point(0, -1));
          if (d < 0) {
            d += dE;
          } else {
            d += dNE;
            f = f.add(fNE);
            b = b.add(bNE);
          }
        } while (f.y <= b.y);
      } else {
        const fSE = new Point(-1, 0);
        const bSE = fSE.neg();

        let d = 2 * delta.x + delta.y;

        do {
          raster.set(f, this.color);
          raster.set(b, this.color);

          f = f.add(new Point(0, 1));
          b = b.add(new Point(0, -1));
          if (d < 0) {
            d += dSE;
            f = f.add(fSE);
            b = b.add(bSE);
          } else {
            d += dE;
          }
        } while (f.y <= b.y);
      }
    } else {
      const [p1, p2] =
        this.p1.x < this.p2.x ? [this.p1, this.p2] : [this.p2, this.p1];
      const delta = p2.sub(p1);
      const dE = 2 * delta.y;
      const dNE = 2 * (delta.y - delta.x);
      const dSE = 2 * (delta.y + delta.x);
      let f = p1;
      let b = p2;

      // 1st or 5th octant:
      if (p1.y < p2.y) {
        const fNE = new Point(0, 1);
        const bNE = fNE.neg();

        let d = 2 * delta.y - delta.x;

        do {
          raster.set(f, this.color);
          raster.set(b, this.color);

          f = f.add(new Point(1, 0));
          b = b.add(new Point(-1, 0));
          if (d < 0) {
            d += dE;
          } else {
            d += dNE;
            f = f.add(fNE);
            b = b.add(bNE);
          }
        } while (f.x <= b.x);
      } else {
        const fSE = new Point(0, -1);
        const bSE = fSE.neg();

        let d = 2 * delta.y + delta.x;

        do {
          raster.set(f, this.color);
          raster.set(b, this.color);

          f = f.add(new Point(1, 0));
          b = b.add(new Point(-1, 0));
          if (d < 0) {
            d += dSE;
            f = f.add(fSE);
            b = b.add(bSE);
          } else {
            d += dE;
          }
        } while (f.x <= b.x);
      }
    }
  }

  ctxDraw(ctx: CanvasRenderingContext2D) {
    if (this.p1 === undefined || this.p2 === undefined) {
      return;
    }

    ctx.strokeStyle = toRgbHex(this.color);
    ctx.lineWidth = this.thickness;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }

  move(anchor: Point, offset: Point): void {
    if (this.p1 === undefined || this.p2 === undefined) {
      return;
    }

    const p1Dist = anchor.distanceSq(this.p1);
    const p2Dist = anchor.distanceSq(this.p2);
    const edgeDist = anchor.distanceSq(Point.average(this.p1, this.p2));

    const min = Math.min(p1Dist, p2Dist, edgeDist);

    if (min === p1Dist || min === edgeDist) {
      this.p1 = this.p1.add(offset);
    }
    if (min === p2Dist || min === edgeDist) {
      this.p2 = this.p2.add(offset);
    }
  }
}
