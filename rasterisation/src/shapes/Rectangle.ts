import { Point } from "./Point";
import { Polygon } from "./Polygon";

export class Rectangle extends Polygon {
  private static myNum = 1;

  override canBeClippedWith = true;

  static override runtimeType = "Rectangle";

  constructor(p1?: Point, p2?: Point) {
    super(`Rectangle#${Rectangle.myNum++}`);
    if (p1) {
      this.addPoint(p1);
    }
    if (p2) {
      this.addPoint(p2);
    }
  }

  get left() {
    return Math.min(...this.points.map((e) => e.x));
  }

  get right() {
    return Math.max(...this.points.map((e) => e.x));
  }

  get top() {
    return Math.max(...this.points.map((e) => e.y));
  }

  get bottom() {
    return Math.min(...this.points.map((e) => e.y));
  }

  override addPoint(p: Point) {
    let lastPoint!: Point;

    if (this.points.length === 0) {
      lastPoint = p;
    } else if (this.points.length === 1) {
      const p1 = this.points[0];
      const p3 = p;
      const p2 = new Point(p3.x, p1.y);
      const p4 = new Point(p1.x, p3.y);

      this.points.push(p2, p3, p4);
      lastPoint = p1;
    }

    return super.addPoint(lastPoint);
  }

  override move(anchor: Point, offset: Point): void {
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

        const before = (i + 3) % 4;
        const after = (i + 1) % 4;

        if (i % 2) {
          this.points[after] = new Point(
            this.points[i].x,
            this.points[after].y
          );
          this.points[before] = new Point(
            this.points[before].x,
            this.points[i].y
          );
        } else {
          this.points[before] = new Point(
            this.points[i].x,
            this.points[before].y
          );
          this.points[after] = new Point(
            this.points[after].x,
            this.points[i].y
          );
        }
        return;
      }
    }

    for (let i = 0; i < distances.edges.length; i++) {
      if (min === distances.edges[i]) {
        const next = (i + 1) % this.points.length;
        const horiz = this.points[i].y === this.points[next].y;

        let clampedOffset: Point;

        if (horiz) {
          clampedOffset = new Point(0, offset.y);
        } else {
          clampedOffset = new Point(offset.x, 0);
        }

        this.points[i] = this.points[i].add(clampedOffset);
        this.points[next] = this.points[next].add(clampedOffset);
        return;
      }
    }
  }

  override serialize(): object & { runtimeType: string } {
    return { ...this, runtimeType: Rectangle.runtimeType };
  }

  override deserialize(json: Record<string, any>): void {
    Object.assign(this, json);
    this.points = json.points.map((e: any) => {
      const p = Object.create(Point.prototype);
      Object.assign(p, e);
      return p;
    });
  }
}
