import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { appState, ShapeMode } from "../AppState";

@customElement("shape-radio")
export class ShapeRadio extends LitElement {
  override render() {
    return html`
      <div>
        <div>
          <input
            type="radio"
            id="polygon"
            name="drone"
            value="polygon"
            ?checked=${appState.shapeMode === "polygon"}
            @change=${this.onChange}
          />
          <label for="polygon">polygon</label>
        </div>

        <div>
          <input
            type="radio"
            id="line"
            name="drone"
            value="line"
            ?checked=${appState.shapeMode === "line"}
            @change=${this.onChange}
          />
          <label for="line">line</label>
        </div>

        <div>
          <input
            type="radio"
            id="circle"
            name="drone"
            value="circle"
            ?checked=${appState.shapeMode === "circle"}
            @change=${this.onChange}
          />
          <label for="circle">circle</label>
        </div>
      </div>
    `;
  }

  private onChange(e: Event) {
    appState.shapeMode = (e.target as HTMLInputElement).value as ShapeMode;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shape-radio": ShapeRadio;
  }
}
