import { Raster } from "../Raster";
import { toRgbHex } from "./Color";
import { Line } from "./Line";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

export class Polygon extends Shape {
  protected points: Point[] = [];
  private isClosed = false;

  static readonly closeThreshold = 10;
  private static num = 1;

  static override runtimeType = "Polygon";

  constructor(tag?: string) {
    super(tag ?? `Polygon#${Polygon.num++}`);
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

  draw(raster: Raster, antiAlias: boolean, clipper?: Shape): void {
    // TODO: optimize
    let lines = this.points.map((e, i) => {
      const line = new Line(e, this.points[(i + 1) % this.points.length]);
      line.color = this.color;
      line.thickness = this.thickness;

      return line;
    });

    if (!this.isClosed) {
      lines = lines.slice(0, -1);
    }

    for (const line of lines) {
      if (clipper && this !== clipper) {
        // assume we are always clipping with rectangle
        let liang = liangBarsky(line.p1!, line.p2!, clipper as Rectangle);
        if (liang) {
          let out1 = new Line(line.p1!, liang[0]);
          out1.color = [255, 0, 0];
          out1.thickness = this.thickness;

          let in_ = new Line(liang[0], liang[1]);
          in_.color = [0, 255, 0];
          in_.thickness = this.thickness;

          let out2 = new Line(liang[1], line.p2!);
          out2.color = [255, 0, 0];
          out2.thickness = this.thickness;

          out1.draw(raster, antiAlias);
          out2.draw(raster, antiAlias);
          in_.draw(raster, antiAlias);
        } else {
          line.draw(raster, antiAlias);
        }
      } else {
        line.draw(raster, antiAlias);
      }
    }

    if (this.fillColor || this.fillImage) {
      this.fill(raster);
    }
  }

  ctxDraw(ctx: CanvasRenderingContext2D): void {
    if (this.points.length === 0) {
      return;
    }

    ctx.strokeStyle = toRgbHex(this.color);
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

  createEdgeTable(): Map<number, AETItem[]> {
    const edgeTable = new Map<number, AETItem[]>();

    for (let i = 0; i < this.points.length; i++) {
      const x1 = this.points[i].x;
      const y1 = this.points[i].y;
      const x2 =
        i === this.points.length - 1 ? this.points[0].x : this.points[i + 1].x;
      const y2 =
        i === this.points.length - 1 ? this.points[0].y : this.points[i + 1].y;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dy == 0) {
        continue;
      }

      const data: AETItem = {
        yMax: Math.max(y1, y2),
        slopeInv: dx / dy,
        xOfYMin: y1 < y2 ? x1 : x2,
      };

      const yMin = Math.min(y1, y2);
      if (edgeTable.has(yMin)) {
        edgeTable.get(yMin)!.push(data);
      } else {
        edgeTable.set(yMin, [data]);
      }
    }

    return new Map([...edgeTable.entries()].sort((a, b) => a[0] - b[0]));
  }

  fill(raster: Raster) {
    const et = this.createEdgeTable();
    if (et.size === 0) return;

    let y = et.keys().next().value as number;
    let aet = <AETItem[]>[];

    while (aet.length != 0 || et.size != 0) {
      if (et.has(y)) {
        aet.push(...et.get(y)!);
        et.delete(y);
      }

      aet = aet.sort((a, b) => a.xOfYMin - b.xOfYMin);

      for (let i = 0; i < aet.length; i += 2) {
        const x1 = Math.round(aet[i].xOfYMin);
        const x2 = Math.round(aet[i + 1].xOfYMin);

        if (y >= 0) this.fillBetween(raster, x1, x2, y);
      }

      y += 1;

      aet = aet.filter((e) => e.yMax > y);

      for (const e of aet) {
        e.xOfYMin += e.slopeInv;
      }
    }
  }

  fillBetween(raster: Raster, x1: number, x2: number, y: number) {
    if (this.fillImage) {
      for (let x = x1; x < x2; x++) {
        raster.set(
          new Point(x, y),
          this.fillImage.data[y % this.fillImage.height][
            x % this.fillImage.width
          ]
        );
      }
    } else if (this.fillColor) {
      for (let x = x1; x < x2; x++) {
        raster.set(new Point(x, y), this.fillColor);
      }
    }
  }

  serialize(): object & { runtimeType: string } {
    return { ...this, runtimeType: Polygon.runtimeType };
  }

  deserialize(json: Record<string, any>): void {
    Object.assign(this, json);
    this.points = json.points.map((e: any) => {
      const p = Object.create(Point.prototype);
      Object.assign(p, e);
      return p;
    });
  }
}

function clip(
  denom: number,
  numer: number,
  tE: number,
  tL: number
): [boolean, number, number] {
  if (denom === 0) {
    if (numer < 0) return [false, tE, tL];
    return [true, tE, tL];
  }

  const t = numer / denom;
  if (denom > 0) {
    if (t < tL) tL = t;
  } else {
    if (t > tE) tE = t;
  }

  return [true, tE, tL];
}

function liangBarsky(
  p1: Point,
  p2: Point,
  rect: Rectangle
): [Point, Point] | undefined {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  let tE = 0;
  let tL = 1;

  let good = false;

  [good, tE, tL] = clip(-dx, p1.x - rect.left, tE, tL);
  if (good) {
    [good, tE, tL] = clip(dx, rect.right - p1.x, tE, tL);
    if (good) {
      [good, tE, tL] = clip(-dy, p1.y - rect.bottom, tE, tL);
      if (good) {
        [good, tE, tL] = clip(dy, rect.top - p1.y, tE, tL);
        if (good) {
          if (tE <= tL) {
            let i1 = new Point(
              p1.x + Math.floor(tE * dx),
              p1.y + Math.floor(tE * dy)
            );
            let i2 = new Point(
              p1.x + Math.floor(tL * dx),
              p1.y + Math.floor(tL * dy)
            );

            return [i1, i2];
          }
        }
      }
    }
  }

  return undefined;
}

type AETItem = {
  yMax: number;
  xOfYMin: number;
  slopeInv: number;
};
