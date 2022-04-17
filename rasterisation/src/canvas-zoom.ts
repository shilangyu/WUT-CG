import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Lit2DCanvas } from "./Lit2DCanvas";
import { Point } from "./shapes/Point";

@customElement("canvas-zoom")
export class CanvasZoom extends Lit2DCanvas {
  static override styles = css`
    :host > canvas {
      border: 1px solid black;
    }
  `;

  @property({ type: Number })
  pixelWindow = 20;

  currPos = Point.zero;
  target!: HTMLCanvasElement;

  override async firstUpdated() {
    super.firstUpdated();

    // slot is not yet initialized, not sure what is a better way of handling this
    queueMicrotask(() => {
      this.target = this.querySelector("canvas") as HTMLCanvasElement;

      this.canvas.getContext("2d")!.imageSmoothingEnabled = false;

      this.target.addEventListener("mousemove", ({ offsetX, offsetY }) => {
        this.currPos = new Point(offsetX, offsetY);
      });
      this.target.addEventListener("touchmove", ({ touches }) => {
        if (touches.length > 0) {
          this.currPos = this.touchOffset(touches[0]);
        }
      });
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

  override render() {
    return html`
      <slot></slot>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-zoom": CanvasZoom;
  }
}
