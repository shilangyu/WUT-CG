import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import "./app-canvas.ts";
import "./app-root.ts";
import { appState } from "./AppState";
import "./canvas-zoom.ts";
import "./components/antialias-checkbox.ts";
import "./components/drawing-mode.ts";
import "./components/manage-shape.ts";
import "./components/pick-shape.ts";
import "./components/save-load-shapes.ts";
import "./components/shape-radio.ts";

@customElement("app-root")
export class AppRoot extends observeState(LitElement) {
  override render() {
    return html`
      <canvas-zoom width="200" height="200">
        <app-canvas width="700" height="600" />
        <shape-radio></shape-radio>
        <save-load-shapes></save-load-shapes>
        <pick-shape></pick-shape>
        <antialias-checkbox></antialias-checkbox>
        <drawing-mode></drawing-mode>
        <button @click=${() => appState.deleteAllShapes()}>
          Remove all shapes
        </button>
        ${appState.selectedShapeId
          ? html` <manage-shape></manage-shape> `
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
