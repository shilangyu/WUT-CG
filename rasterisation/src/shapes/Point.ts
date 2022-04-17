export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  static readonly origin = new Point(0, 0);

  distance(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  distanceSq(other: Point): number {
    return (this.x - other.x) ** 2 + (this.y - other.y) ** 2;
  }

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  sub(other: Point) {
    return new Point(this.x - other.x, this.y - other.y);
  }

  div(scalar: number) {
    return new Point(this.x / scalar, this.y / scalar);
  }

  static average(...points: Point[]) {
    return points
      .reduce((acc, curr) => new Point(acc.x + curr.x, acc.y + curr.y))
      .div(points.length);
  }
}
