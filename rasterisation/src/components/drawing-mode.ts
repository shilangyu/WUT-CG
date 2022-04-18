import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { appState, DrawingMethod } from "../AppState";

@customElement("drawing-mode")
export class DrawingMode extends observeState(LitElement) {
  override render() {
    return html`
      <label for="drawing-mode">Select drawing mode:</label>

      <select name="shapes" id="drawing-mode" @change=${this.onChange}>
        <option
          value="manual"
          .selected=${live(appState.drawingMethod === "manual")}
        >
          Manual
        </option>
        <option
          value="context"
          .selected=${live(appState.drawingMethod === "context")}
        >
          Context
        </option>
      </select>
    `;
  }

  private onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value = target.selectedOptions[0].value;
    appState.drawingMethod = value as DrawingMethod;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drawing-mode": DrawingMode;
  }
}
