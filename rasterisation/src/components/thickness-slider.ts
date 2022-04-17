import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";

@customElement("thickness-slider")
export class ThicknessSlider extends observeState(LitElement) {
  override render() {
    const value = appState.selectedShape?.thickness ?? 1;

    return html`
      <div>
        <input
          type="range"
          id="thickness"
          name="thickness"
          min="1"
          max="10"
          @input=${this.onChange}
          value=${value}
        />
        <label for="thickness">Thickness = ${value}</label>
      </div>
    `;
  }

  private onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = +target.value;

    appState.changeSelectedShapeThickness(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "thickness-slider": ThicknessSlider;
  }
}
