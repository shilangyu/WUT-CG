import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import { Point } from "./shapes/Point";

// based on: https://gist.github.com/rodydavis/d6014c94db07acac22523a41a7674f58

export abstract class Lit2DCanvas extends LitElement {
  @query("#base") canvas!: HTMLCanvasElement;
  @property({ type: Number }) width = 400;
  @property({ type: Number }) height = 400;

  override render() {
    return html`
      <canvas id="base" width=${this.width} height=${this.height}></canvas>
    `;
  }

  override firstUpdated() {
    requestAnimationFrame((timestamp) => this._loop(timestamp));

    this.canvas.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();

        const { left, top } = this.canvas.getBoundingClientRect();
        const touches = e.touches;
        const points: Point[] = [];
        for (let i = 0; i < touches.length; i++) {
          const touch = touches[i];
          points.push(new Point(touch.clientX - left, touch.clientY - top));
        }
        this.onTap(points);
      },
      false
    );

    this.canvas.addEventListener(
      "mousedown",
      (e) => {
        e.preventDefault();

        const { left, top } = this.canvas.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        this.onTap([new Point(x, y)]);
      },
      false
    );

    // TODO: add touch support
    let prev: Point | undefined = undefined;
    this.canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
      prev = new Point(offsetX, offsetY);
    });
    this.canvas.addEventListener("mouseup", () => {
      prev = undefined;
    });
    this.canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      if (prev === undefined) {
        return;
      }

      const curr = new Point(offsetX, offsetY);
      if (!curr.eq(prev)) {
        this.onMove(prev, curr.sub(prev));
        prev = curr;
      }
    });
  }

  _lastRender = 0;
  private _loop(timestamp: number) {
    const timestep = timestamp - this._lastRender;
    this.loop(timestep);
    this._lastRender = timestamp;

    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.clearRect(0, 0, this.width, this.height);
      this.draw(ctx);
      ctx.restore();
    }

    requestAnimationFrame((timestamp) => this._loop(timestamp));
  }

  loop(_timestep: number): void {}

  abstract draw(context: CanvasRenderingContext2D): void;

  onTap(_points: Point[]): void {}
  onMove(_anchor: Point, _offset: Point): void {}
}
