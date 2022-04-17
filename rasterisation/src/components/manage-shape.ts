import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";
import { fromRgbHex, toRgbHex } from "../shapes/Color";

@customElement("manage-shape")
export class ManageShape extends observeState(LitElement) {
  override render() {
    const thickness = appState.selectedShape?.thickness ?? 1;
    const color = toRgbHex(appState.selectedShape?.color ?? [0, 0, 0]);

    return html`
      <div>
        <div>
          <input
            type="color"
            id="shape-color"
            name="shape-color"
            @input=${this.onColorChange}
            .value=${color}
          />
          <label for="shape-color">Shape color</label>
        </div>
        <button @click=${this.onDelete}>Delete shape</button>
        <input
          type="range"
          id="thickness"
          name="thickness"
          min="1"
          max="10"
          @input=${this.onThicknessChange}
          .value=${thickness}
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

  private onColorChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = fromRgbHex(target.value);

    appState.changeSelectedShapeColor(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "manage-shape": ManageShape;
  }
}
