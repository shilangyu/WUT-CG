import { html } from "lit";
import { observeState } from "lit-element-state";
import { customElement, state } from "lit/decorators.js";
import { appState } from "./AppState";
import { Lit2DCanvas } from "./Lit2DCanvas";
import { Raster } from "./Raster";
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

    switch (appState.drawingMethod) {
      case "context":
        for (const shape of [...appState.shapes, this.active]) {
          ctx.save();
          shape?.ctxDraw(ctx);
          ctx.restore();
        }
        break;

      case "manual":
        const raster = new Raster(
          ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        );

        for (const shape of [...appState.shapes, this.active]) {
          ctx.save();
          shape?.draw(raster, appState.antiAlias, appState.clipWithShape);
          ctx.restore();
        }

        raster.paintOnto(ctx);
        break;
    }
  }

  override onTap(points: Point[]) {
    super.onTap(points);

    if (appState.selectedShapeId || points.length === 0) {
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

  override onMove(anchor: Point, offset: Point): void {
    appState.selectedShape?.move(anchor, offset);
  }

  override createRenderRoot() {
    return this;
  }

  private fpss: number[] = new Array(60).fill(0);
  private fpsIndex = 0;
  @state() fps = 0;

  override loop(timestep: number): void {
    if (this.fpsIndex === this.fpss.length) {
      this.fps = this.fpss.reduce((a, b) => a + b) / this.fpss.length;
      this.fpsIndex = 0;
    }

    this.fpss[this.fpsIndex++] = 1000 / timestep;
  }

  override render() {
    return html`
      ${super.render()}
      <span>fps: ${this.fps.toFixed(1)}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-canvas": AppCanvas;
  }
}
