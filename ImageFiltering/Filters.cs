using System;
using System.Numerics;

namespace ImageFiltering
{
    static class Filters
    {
        static Vector4 inverter = new(1, 1, 1, 2);
        public static Vector4 Invert(Vector4 color)
        {
            return inverter - color;
        }

        public static Func<Vector4, Vector4> BrightnessCorrection(float offset)
        {
            var offsetter = new Vector4(offset, offset, offset, 0);
            return color => Vector4.Clamp(color + offsetter, Vector4.Zero, Vector4.One);
        }

        public static Func<Vector4, Vector4> Contrast(float slope)
        {
            var half = new Vector4(0.5f, 0.5f, 0.5f, 0);
            return color => Vector4.Clamp((color - half) * slope + half, Vector4.Zero, Vector4.One);
        }

        public static Func<Vector4, Vector4> GammaCorrection(double gamma)
        {
            return color => Vector4.Clamp(
                new(
                    (float)Math.Pow(color.X, gamma),
                    (float)Math.Pow(color.Y, gamma),
                    (float)Math.Pow(color.Z, gamma),
                    color.W),
                Vector4.Zero,
                Vector4.One);
        }
    }
}