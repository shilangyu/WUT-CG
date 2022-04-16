import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./app-canvas.ts";
import "./app-root.ts";
import "./canvas-zoom.ts";
import "./components/shape-radio.ts";

@customElement("app-root")
export class AppRoot extends LitElement {
  override render() {
    return html`
      <canvas-zoom width="200" height="200">
        <app-canvas width="700" height="600"></app-canvas>
        <shape-radio></shape-radio>
      </canvas-zoom>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
