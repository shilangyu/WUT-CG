import { html, LitElement } from "lit";
import { observeState } from "lit-element-state";
import { customElement, query, state } from "lit/decorators.js";
import { appState } from "../AppState";
import { Capsule } from "../shapes/Capsule";
import { Circle } from "../shapes/Circle";
import { Line } from "../shapes/Line";
import { Polygon } from "../shapes/Polygon";
import { Rectangle } from "../shapes/Rectangle";
import { Shape } from "../shapes/Shape";

@customElement("save-load-shapes")
export class SaveLoadShapes extends observeState(LitElement) {
  @query("input[type=file]")
  private loadFileElement!: HTMLInputElement;

  @state()
  private loadFile?: File;

  override render() {
    const file = new Blob(
      [JSON.stringify(appState.shapes.map((e) => e.serialize()))],
      {
        type: "application/json",
      }
    );

    const href = URL.createObjectURL(file);
    const fileName = "shapes.json";

    return html`
      <a href=${href} download=${fileName}>
        <button ?disabled=${appState.shapes.length === 0}>Save shapes</button>
      </a>
      <input type="file" @change=${this.onFileChange} accept=".json" />
      <button
        ?disabled=${this.loadFile === undefined}
        @click=${this.loadShapes}
      >
        Load shapes
      </button>
    `;
  }

  private onFileChange() {
    this.loadFile = this.loadFileElement.files?.[0];
  }

  private loadShapes() {
    const fr = new FileReader();

    fr.onload = function (e) {
      const data = e.target!.result as string;

      const shapes = JSON.parse(data).map((e: any): Shape => {
        // This is not very extensible and its hardcoded. I am aware. This can be done better.
        // Deserialization in js is fun with some prototype hackery.
        // BUT this was supposed to be a "small" homework task, somehow it ended up being a few-days-of-work project.
        // So I am NOT spending any more time on this shit.
        let shape: Shape;
        switch (e.runtimeType) {
          case Circle.runtimeType:
            shape = new Circle();
            break;
          case Line.runtimeType:
            shape = new Line();
            break;
          case Polygon.runtimeType:
            shape = new Polygon();
            break;
          case Capsule.runtimeType:
            shape = new Capsule();
            break;
          case Rectangle.runtimeType:
            shape = new Rectangle();
            break;
          default:
            throw new Error("unrecognized shape");
        }

        shape.deserialize(e);

        return shape;
      });

      appState.shapes = shapes;
    };

    fr.readAsText(this.loadFile!);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "save-load-shapes": SaveLoadShapes;
  }
}
