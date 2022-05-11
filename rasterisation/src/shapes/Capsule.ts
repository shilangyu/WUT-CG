import { Raster } from "../Raster";
import { Color } from "./Color";
import { Line } from "./Line";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Capsule extends Shape {
  private c1?: Point = undefined;
  private c2?: Point = undefined;
  private radius?: number = undefined;

  private static num = 1;

  static override runtimeType = "Capsule";

  constructor() {
    super(`Capsule#${Capsule.num++}`);
  }

  addPoint(p: Point) {
    if (this.radius !== undefined) {
      throw new Error("Cannot add a point after the capsule was finished");
    }

    if (this.c1 === undefined) {
      this.c1 = p;
    } else if (this.c2 === undefined) {
      this.c2 = p;
    } else if (this.radius === undefined) {
      this.radius = this.c2.distance(p);
    }

    return this.radius !== undefined;
  }

  draw(raster: Raster, antiAlias: boolean): void {
    if (antiAlias) {
      this.antiAliasDraw(raster);
      return;
    }

    if (
      this.c1 === undefined ||
      this.c2 === undefined ||
      this.radius === undefined
    ) {
      return;
    }

    const r = Math.round(this.radius);

    const v = new Point(this.c2.x - this.c1.x, this.c2.y - this.c1.y);
    const w = new Point(v.y, -v.x);
    const q = w.div(w.magnitude()).mul(this.radius).round();

    const p1 = this.c1.add(q);
    const p2 = this.c1.sub(q);
    const p3 = this.c2.add(q);
    const p4 = this.c2.sub(q);

    const l1 = new Line(p1, p3);
    l1.color = this.color;
    l1.thickness = this.thickness;
    const l2 = new Line(p2, p4);
    l2.color = this.color;
    l2.thickness = this.thickness;

    l1.draw(raster, antiAlias);
    l2.draw(raster, antiAlias);

    this.drawSemi(raster, p1, p2, -1, r);
    this.drawSemi(raster, p3, p4, 1, r);
  }

  private antiAliasDraw(raster: Raster) {
    throw new Error("unimplemented");
  }

  private drawSemi(
    raster: Raster,
    p1: Point,
    p2: Point,
    signCond: number,
    r: number
  ) {
    let dE = 3;
    let dSE = 5 - 2 * r;
    let d = 1 - r;
    let pos = new Point(0, r);
    let center = Point.average(p1, p2);

    do {
      this.mirrorDraw(raster, center, p1, p2, signCond, pos, this.color);

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

  private mirrorDraw(
    raster: Raster,
    center: Point,
    p1: Point,
    p2: Point,
    signCond: number,
    point: Point,
    color: Color
  ) {
    function cond(p: Point, func: () => void) {
      let s = Math.sign(
        (p1.x - p2.x) * (p.y - p2.y) - (p1.y - p2.y) * (p.x - p2.x)
      );
      if (s === signCond) {
        func();
      }
    }
    let points = [
      center.add(point),
      center.add(point.neg()),
      center.add(point.negX()),
      center.add(point.negY()),
      center.add(new Point(point.y, point.x)),
      center.add(new Point(-point.y, point.x)),
      center.add(new Point(point.y, -point.x)),
      center.add(new Point(-point.y, -point.x)),
    ];

    for (const p of points) {
      cond(p, () => raster.setThick(p, color, this.thickness));
    }
  }

  ctxDraw(ctx: CanvasRenderingContext2D): void {
    throw new Error("unimplemented");
  }

  move(anchor: Point, offset: Point): void {
    throw new Error("unimplemented");
  }

  serialize(): Record<string, any> & { runtimeType: string } {
    return { ...this, runtimeType: Capsule.runtimeType };
  }

  deserialize(json: Record<string, any>): void {
    Object.assign(this, json);
    this.c1 = Object.create(Point.prototype);
    this.c2 = Object.create(Point.prototype);
    Object.assign(this.c1, json.c1);
    Object.assign(this.c2, json.c2);
  }
}
