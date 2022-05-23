import { Color } from "./shapes/Color";
import { Point } from "./shapes/Point";

export class Raster {
  constructor(private source: ImageData) {}

  get width() {
    return this.source.width;
  }

  get height() {
    return this.source.height;
  }

  static brushes: Record<number, Point[]> = {
    [1]: [new Point(0, 0)],
    [3]: [
      new Point(0, 0),
      new Point(0, -1),
      new Point(0, 1),
      new Point(1, 0),
      new Point(-1, 0),
    ],
    [5]: [
      new Point(0, 0),
      new Point(0, -1),
      new Point(0, -2),
      new Point(0, 1),
      new Point(0, 2),
      new Point(1, 0),
      new Point(2, 0),
      new Point(-1, 0),
      new Point(-2, 0),
      new Point(-1, -1),
      new Point(1, 1),
      new Point(-1, 1),
      new Point(1, -1),
    ],
    [7]: [
      new Point(0, 0),
      new Point(0, -1),
      new Point(0, -2),
      new Point(0, -3),
      new Point(0, 1),
      new Point(0, 2),
      new Point(0, 3),
      new Point(1, 0),
      new Point(2, 0),
      new Point(3, 0),
      new Point(-1, 0),
      new Point(-2, 0),
      new Point(-3, 0),

      new Point(-1, -1),
      new Point(-2, -1),
      new Point(-1, -2),
      new Point(-2, -2),

      new Point(1, 1),
      new Point(2, 1),
      new Point(1, 2),
      new Point(2, 2),

      new Point(-1, 1),
      new Point(-2, 1),
      new Point(-1, 2),
      new Point(-2, 2),

      new Point(1, -1),
      new Point(2, -1),
      new Point(1, -2),
      new Point(2, -2),
    ],
  };

  private rootIndex(x: number, y: number): number {
    return (y * this.source.width + x) * 4;
  }

  get(pos: Point): Color {
    const i = this.rootIndex(pos.x, pos.y);

    return [
      this.source.data[i],
      this.source.data[i + 1],
      this.source.data[i + 2],
    ];
  }

  set(pos: Point, color: Color) {
    // TODO: optimize this check
    if (pos.x < 0 || pos.x >= this.source.width) {
      return;
    }
    const i = this.rootIndex(pos.x, pos.y);

    [this.source.data[i], this.source.data[i + 1], this.source.data[i + 2]] =
      color;
  }

  setThick(pos: Point, color: Color, thickness: number) {
    for (const d of Raster.brushes[thickness]!) {
      this.set(pos.add(d), color);
    }
  }

  paintOnto(ctx: CanvasRenderingContext2D) {
    ctx.putImageData(this.source, 0, 0);
  }
}
