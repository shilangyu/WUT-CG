import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";

@customElement("antialias-checkbox")
export class AntialiasCheckbox extends observeState(LitElement) {
  override render() {
    return html`
      <div>
        <input
          type="checkbox"
          id="antialias"
          name="antialias"
          @change=${this.onChange}
          ?checked=${appState.antiAlias}
        />
        <label for="antialias">Anti-alias</label>
      </div>
    `;
  }

  private onChange(e: Event) {
    appState.antiAlias = (e.target as HTMLInputElement).checked;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "antialias-checkbox": AntialiasCheckbox;
  }
}
