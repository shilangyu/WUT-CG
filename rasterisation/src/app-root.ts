import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import "./app-canvas.ts";
import "./app-root.ts";
import "./canvas-zoom.ts";
import "./components/save-shapes.ts";
import "./components/shape-radio.ts";

@customElement("app-root")
export class AppRoot extends observeState(LitElement) {
  override render() {
    return html`
      <canvas-zoom width="200" height="200">
        <app-canvas width="700" height="600" />
        <shape-radio></shape-radio>
        <save-shapes></save-shapes>
      </canvas-zoom>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
