import { toRgbHex } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Line extends Shape {
  private p1?: Point = undefined;
  private p2?: Point = undefined;

  static readonly closeThreshold = 10;
  private static num = 1;

  constructor() {
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

  // TODO: replace with manual rasterisation
  draw(ctx: CanvasRenderingContext2D, _antiAlias: boolean): void {
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
