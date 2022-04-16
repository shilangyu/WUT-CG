import { css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Lit2DCanvas } from "./Lit2DCanvas";
import { Point } from "./Point";

@customElement("canvas-zoom")
export class CanvasZoom extends Lit2DCanvas {
  static override styles = css`
    :host > canvas {
      border: 1px solid black;
    }
  `;

  @property({ type: String })
  targetId!: string;

  @property({ type: Number })
  pixelWindow = 20;

  currPos = Point.origin;
  target!: HTMLCanvasElement;

  override firstUpdated() {
    super.firstUpdated();
    this.target = document.getElementById(this.targetId) as HTMLCanvasElement;

    this.canvas.getContext("2d")!.imageSmoothingEnabled = false;

    this.target.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      this.currPos = new Point(offsetX, offsetY);
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.drawImage(
      this.target,
      Math.min(
        Math.max(0, this.currPos.x - this.pixelWindow / 2),
        this.target.width - this.pixelWindow
      ),
      Math.min(
        Math.max(0, this.currPos.y - this.pixelWindow / 2),
        this.target.height - this.pixelWindow
      ),
      this.pixelWindow,
      this.pixelWindow,
      0,
      0,
      this.width,
      this.height
    );
  }

  loop(_timestep: number) {}
  onTap(_points: Point[]) {}
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-zoom": CanvasZoom;
  }
}
