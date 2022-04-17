import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "./AppState";
import { Lit2DCanvas } from "./Lit2DCanvas";
import { Point } from "./shapes/Point";
import { Shape } from "./shapes/Shape";

@customElement("app-canvas")
export class AppCanvas extends observeState(Lit2DCanvas) {
  active?: Shape;

  override firstUpdated(): void {
    super.firstUpdated();

    appState.addObserver(() => {
      if (appState.selectedShapeId !== undefined) {
        this.active = undefined;
      }
    }, ["selectedShapeId"]);
    appState.addObserver(() => {
      this.active = undefined;
    }, ["shapeMode"]);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    for (const shape of [...appState.shapes, this.active]) {
      ctx.save();
      shape?.draw(ctx);
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
    }

    const isDone = this.active.addPoint(point);

    if (isDone) {
      appState.shapes = [...appState.shapes, this.active];
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
