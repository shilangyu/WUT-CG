import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { appState } from "../AppState";

@customElement("pick-shape")
export class PickShape extends observeState(LitElement) {
  override render() {
    return html`
      <label for="shape-select">Select shape:</label>

      <select name="shapes" id="shape-select" @change=${this.onChange}>
        <option
          value=""
          .selected=${live(appState.selectedShapeId === undefined)}
        >
          --Drawing--
        </option>
        ${appState.shapes.map(
          (e) =>
            html`
              <option
                value=${e.id}
                .selected=${live(e.id === appState.selectedShapeId)}
              >
                ${e.id}
              </option>
            `
        )}
      </select>
    `;
  }

  private onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value = target.selectedOptions[0].value;
    appState.selectedShapeId = value === "" ? undefined : value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pick-shape": PickShape;
  }
}
