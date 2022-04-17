export type Color = readonly [r: number, g: number, b: number];

export function toRgbHex([r, g, b]: Color): string {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

export function fromRgbHex(hex: string): Color {
  return [
    Number.parseInt(hex.substring(1, 3), 16),
    Number.parseInt(hex.substring(3, 5), 16),
    Number.parseInt(hex.substring(5, 7), 16),
  ];
}
