import { Raster } from "../Raster";
import { lerp, toRgbHex } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Line extends Shape {
  static readonly closeThreshold = 10;
  private static num = 1;

  static override runtimeType = "Line";

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
  draw(raster: Raster, antiAlias: boolean): void {
    if (antiAlias) {
      this.antiAliasDraw(raster);
      return;
    }

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

  private antiAliasDraw(raster: Raster) {
    if (this.p1 === undefined || this.p2 === undefined) {
      return;
    }

    const slope = Math.abs((this.p2.y - this.p1.y) / (this.p2.x - this.p1.x));

    // slope > 1 means we are in the 2nd, 3rd, 6th, or 7th octant: flip the axes
    if (slope > 1) {
      const [p1, p2] =
        this.p1.y < this.p2.y ? [this.p1, this.p2] : [this.p2, this.p1];

      const slope = (p2.x - p1.x) / (p2.y - p1.y);

      let x = p1.x;

      for (let y = p1.y; y <= p2.y; y++) {
        const xFloor = Math.floor(x);
        const xFrac = x - xFloor;
        const bg = raster.get(new Point(xFloor, y));

        raster.set(new Point(xFloor, y), lerp(this.color, bg, 1 - xFrac));
        raster.set(new Point(xFloor + 1, y), lerp(this.color, bg, xFrac));

        x += slope;
      }
    } else {
      const [p1, p2] =
        this.p1.x < this.p2.x ? [this.p1, this.p2] : [this.p2, this.p1];

      const slope = (p2.y - p1.y) / (p2.x - p1.x);

      let y = p1.y;

      for (let x = p1.x; x <= p2.x; x++) {
        const yFloor = Math.floor(y);
        const yFrac = y - yFloor;
        const bg = raster.get(new Point(x, yFloor));

        raster.set(new Point(x, yFloor), lerp(this.color, bg, 1 - yFrac));
        raster.set(new Point(x, yFloor + 1), lerp(this.color, bg, yFrac));

        y += slope;
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

  serialize(): object & { runtimeType: string } {
    return { ...this, runtimeType: Line.runtimeType };
  }

  deserialize(json: Record<string, any>): void {
    Object.assign(this, json);

    this.p1 = Object.create(Point.prototype);
    Object.assign(this.p1, json.p1);
    this.p2 = Object.create(Point.prototype);
    Object.assign(this.p2, json.p2);
  }
}
