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

export function lerp(c1: Color, c2: Color, frac: number): Color {
  return [
    c1[0] * frac + c2[0] * (1 - frac),
    c1[1] * frac + c2[1] * (1 - frac),
    c1[2] * frac + c2[2] * (1 - frac),
  ];
}
