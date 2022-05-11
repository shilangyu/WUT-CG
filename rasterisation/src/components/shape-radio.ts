import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState, ShapeMode } from "../AppState";

@customElement("shape-radio")
export class ShapeRadio extends observeState(LitElement) {
  override render() {
    return html`
      <div>
        <div>
          <input
            type="radio"
            id="polygon"
            name="shapes"
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
            name="shapes"
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
            name="shapes"
            value="circle"
            ?checked=${appState.shapeMode === "circle"}
            @change=${this.onChange}
          />
          <label for="circle">circle</label>
        </div>

        <div>
          <input
            type="radio"
            id="capsule"
            name="shapes"
            value="capsule"
            ?checked=${appState.shapeMode === "capsule"}
            @change=${this.onChange}
          />
          <label for="capsule">capsule</label>
        </div>

        <div>
          <input
            type="radio"
            id="rectangle"
            name="shapes"
            value="rectangle"
            ?checked=${appState.shapeMode === "rectangle"}
            @change=${this.onChange}
          />
          <label for="rectangle">rectangle</label>
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
