export type Color = readonly [r: number, g: number, b: number];

export function toCssColor([r, g, b]: Color): string {
  return `rgb(${r}, ${g}, ${b})`;
}
