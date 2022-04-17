import { Color } from "./shapes/Color";
import { Point } from "./shapes/Point";

export class Raster {
  constructor(private source: ImageData) {}

  private rootIndex(x: number, y: number): number {
    return (y * this.source.width + x) * 4;
  }

  set(pos: Point, color: Color) {
    const i = this.rootIndex(pos.x, pos.y);

    [this.source.data[i], this.source.data[i + 1], this.source.data[i + 2]] =
      color;
  }

  paintOnto(ctx: CanvasRenderingContext2D) {
    ctx.putImageData(this.source, 0, 0);
  }
}
