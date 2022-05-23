import loadImage from "blueimp-load-image";
import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement } from "lit/decorators.js";
import { appState } from "../AppState";
import { Raster } from "../Raster";
import { fromRgbHex, toRgbHex } from "../shapes/Color";

@customElement("manage-shape")
export class ManageShape extends observeState(LitElement) {
  override render() {
    const canBeClippedWith = appState.selectedShape?.canBeClippedWith ?? false;
    const thickness = appState.selectedShape?.thickness ?? 1;
    const color = toRgbHex(appState.selectedShape?.color ?? [0, 0, 0]);
    const fillColor = toRgbHex(appState.selectedShape?.fillColor ?? [0, 0, 0]);
    const isClippingWith = false;

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
        <div>
          <input
            type="color"
            id="shape-fill-color"
            name="shape-fill-color"
            @input=${this.onFillColorChange}
            .value=${fillColor}
          />
          <label for="shape-fill-color">Shape fill color</label>
        </div>
        <button @click=${this.onDelete}>Delete shape</button>
        <input
          type="range"
          id="thickness"
          name="thickness"
          min="1"
          max="7"
          step="2"
          @input=${this.onThicknessChange}
          .value=${thickness}
        />
        <div>
          <label for="fill-image">Image background:</label>
          <input
            type="file"
            id="fill-image"
            name="fill-image"
            @change=${this.onFillImageChange}
          />
        </div>
        <label for="thickness">Thickness = ${thickness}</label>

        ${canBeClippedWith &&
        html`<div>
          <input
            type="checkbox"
            id="clip-with"
            name="clip-with"
            .checked=${isClippingWith}
            @change=${this.onClipWithChange}
          />
          <label for="clip-with">Clip with</label>
        </div>`}
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

  private onClipWithChange(e: Event) {
    const target = e.target as HTMLInputElement;

    appState.clipWithSelectedShape(target.checked);
  }

  private onFillColorChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = fromRgbHex(target.value);

    appState.changeSelectedShapeFillColor(value);
  }

  private async onFillImageChange(e: Event) {
    const target = e.target as HTMLInputElement;

    let data = await loadImage(target.files![0], {});

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.width = data.image.width;
    canvas.height = data.image.height;
    context.drawImage(data.image, 0, 0);

    const imageData = context.getImageData(
      0,
      0,
      data.image.width,
      data.image.height
    );

    const bmp = new Raster(imageData);

    appState.changeSelectedShapeFillImage(bmp);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "manage-shape": ManageShape;
  }
}
