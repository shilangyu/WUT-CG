import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";

@customElement("save-shapes")
export class SaveShapes extends observeState(LitElement) {
  override render() {
    const file = new Blob([JSON.stringify(appState.shapes)], {
      type: "application/json",
    });

    const href = URL.createObjectURL(file);
    const fileName = "shapes.json";

    return html`
      <a href=${href} download=${fileName}>
        <button ?disabled=${appState.shapes.length === 0}>Save shapes</button>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "save-shapes": SaveShapes;
  }
}
