import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";

@customElement("manage-shape")
export class ManageShape extends observeState(LitElement) {
  override render() {
    const thickness = appState.selectedShape?.thickness ?? 1;

    return html`
      <div>
        <button @click=${this.onDelete}>Delete shape</button>
        <input
          type="range"
          id="thickness"
          name="thickness"
          min="1"
          max="10"
          @input=${this.onThicknessChange}
          value=${thickness}
        />
        <label for="thickness">Thickness = ${thickness}</label>
      </div>
    `;
  }

  private onThicknessChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = +target.value;

    appState.changeSelectedShapeThickness(value);
  }

  private onDelete() {
    appState.deleteSelectedShape();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "manage-shape": ManageShape;
  }
}
