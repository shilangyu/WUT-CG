import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import "./app-canvas.ts";
import "./app-root.ts";
import { appState } from "./AppState";
import "./canvas-zoom.ts";
import "./components/pick-shape.ts";
import "./components/save-shapes.ts";
import "./components/shape-radio.ts";
import "./components/thickness-slider.ts";

@customElement("app-root")
export class AppRoot extends observeState(LitElement) {
  override render() {
    return html`
      <canvas-zoom width="200" height="200">
        <app-canvas width="700" height="600" />
        <shape-radio></shape-radio>
        <save-shapes></save-shapes>
        <pick-shape></pick-shape>
        ${appState.selectedShapeId
          ? html` <thickness-slider></thickness-slider> `
          : null}
      </canvas-zoom>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
