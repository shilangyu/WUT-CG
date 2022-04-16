import { customElement } from "lit/decorators.js";
import { appState } from "./AppState";
import { Lit2DCanvas } from "./Lit2DCanvas";
import { Point } from "./Point";
import { Shape } from "./shapes/Shape";

@customElement("app-canvas")
export class AppCanvas extends Lit2DCanvas {
  shapes: Shape[] = [];
  active?: Shape;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    for (const shape of this.shapes) {
      ctx.save();
      shape.draw(ctx);
      ctx.restore();
    }
  }

  override onTap(points: Point[]) {
    super.onTap(points);

    if (points.length === 0) {
      return;
    }

    const point = points[0];

    if (!this.active) {
      this.active = appState.createCurrentShape();
      this.shapes.push(this.active);
    }

    const isDone = this.active.addPoint(point);

    if (isDone) {
      this.active = undefined;
    }
  }

  override createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-canvas": AppCanvas;
  }
}
