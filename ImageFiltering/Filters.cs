using System;
using System.Collections.Generic;
using System.Windows;
using System.Numerics;
using System.Linq;

namespace ImageFiltering {
    public static class Filters {
        private static Vector4 inverter = new(1, 1, 1, 2);
        public static Vector4 Invert(Vector4 color) {
            return inverter - color;
        }

        public static Func<Vector4, Vector4> BrightnessCorrection(float offset) {
            var offsetter = new Vector4(offset, offset, offset, 0);
            return color => Vector4.Clamp(color + offsetter, Vector4.Zero, Vector4.One);
        }

        public static Func<Vector4, Vector4> Contrast(float slope) {
            var half = new Vector4(0.5f, 0.5f, 0.5f, 0);
            return color => Vector4.Clamp((color - half) * slope + half, Vector4.Zero, Vector4.One);
        }

        public static Func<Vector4, Vector4> GammaCorrection(double gamma) {
            return color => Vector4.Clamp(
                new(
                    (float)Math.Pow(color.X, gamma),
                    (float)Math.Pow(color.Y, gamma),
                    (float)Math.Pow(color.Z, gamma),
                    color.W),
                Vector4.Zero,
                Vector4.One);
        }

        public static Func<Vector4, Vector4> GrayScale() {
            var coeff = new Vector4(0.299f, 0.587f, 0.114f, 1);
            return color => {
                var l = Vector4.Dot(color, coeff) - color.W;
                return new Vector4(l, l, l, color.W);
            };
        }

        public static Func<Vector4, Vector4> FromPolyline(List<Point> rawPoints) {
            var points = rawPoints.Select(p => new Point(p.X / 256f, 1 - p.Y / 256f)).ToList();

            Func<float, float> map = (float input) => {
                for (int i = 0; i < points.Count; i++) {
                    if (input >= points[i].X && input <= points[i + 1].X) {
                        var (x1, y1, x2, y2) = (points[i].X, points[i].Y, points[i + 1].X, points[i + 1].Y);
                        var m = (y2 - y1) / (x2 - x1);
                        var b = (x2 * y1 - x1 * y2) / (x2 - x1);

                        return (float)(m * input + b);
                    }
                }

                throw new Exception("unreachable");
            };

            return color => {

                return Vector4.Clamp(
                                new(map(color.X), map(color.Y), map(color.Z), color.W),
                                Vector4.Zero,
                                Vector4.One);
            };
        }
    }
}
