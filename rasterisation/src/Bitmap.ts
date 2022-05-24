import { Color } from "./shapes/Color";

export class Bitmap {
  width: number;
  height: number;
  data: Color[][];

  constructor(source: ImageData) {
    this.width = source.width;
    this.height = source.height;
    this.data = new Array(this.height)
      .fill(null)
      .map(() => new Array(this.width));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = (y * this.width + x) * 4;

        this.data[y][x] = [
          source.data[index],
          source.data[index + 1],
          source.data[index + 2],
        ];
      }
    }
  }
}
