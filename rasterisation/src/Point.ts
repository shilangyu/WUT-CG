export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  static readonly origin = new Point(0, 0);

  distance(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
