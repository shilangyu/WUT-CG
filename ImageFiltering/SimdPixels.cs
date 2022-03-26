using System;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace ImageFiltering {
    public class SimdPixels : ICloneable {
        // RGBA normalized to the [0; 1] range
        private Vector4[] pixels;
        private readonly int stride;
        private readonly int width;
        private readonly int height;

        public SimdPixels(BitmapImage img) {
            var sw = new Stopwatch();
            sw.Start();

            width = img.PixelWidth;
            height = img.PixelHeight;
            stride = width * 4;
            pixels = new Vector4[height * width];

            var bytes = new byte[height * stride];
            img.CopyPixels(bytes, stride, 0);

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var index = y * stride + 4 * x;
                    pixels[y * width + x] = new Vector4(bytes[index], bytes[index + 1], bytes[index + 2], bytes[index + 3]) / 255;
                }
            }
            sw.Stop();
            Debug.WriteLine($"From bitmap: {sw.Elapsed}");
        }

        public Vector4 this[int x, int y] {
            get => pixels[y * width + x];
            set {
                pixels[y * width + x] = value;
            }
        }

        public BitmapSource ToBitmap() {
            var sw = new Stopwatch();
            sw.Start();

            var bytes = new byte[height * stride];

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var index = y * stride + 4 * x;
                    var pixel = pixels[y * width + x];
                    bytes[index] = (byte)(pixel.X * 255);
                    bytes[index + 1] = (byte)(pixel.Y * 255);
                    bytes[index + 2] = (byte)(pixel.Z * 255);
                    bytes[index + 3] = (byte)(pixel.W * 255);
                }
            }

            sw.Stop();
            Debug.WriteLine($"To bitmap: {sw.Elapsed}");

            return BitmapSource.Create(width, height, 96, 96, PixelFormats.Bgra32, null, bytes, stride);
        }

        public SimdPixels ApplyFilter(Func<Vector4, Vector4> filter) {
            var sw = new Stopwatch();
            sw.Start();

            unchecked {
                var clone = (SimdPixels)Clone();

                Parallel.For(0, height, (y, state) => {
                    for (var x = 0; x < width; x++) {
                        clone[x, y] = filter(this[x, y]);
                    }
                });

                sw.Stop();
                Debug.WriteLine($"Filter: {sw.Elapsed}");

                return clone;
            }
        }

        public SimdPixels ApplyConvolution(Vector4[,] kernel) {
            var sw = new Stopwatch();
            sw.Start();

            unchecked {
                var clone = (SimdPixels)Clone();
                // assuming kernel is symmetric and of an odd size
                var s = kernel.GetLength(0);
                var middle = (s - 1) / 2;
                var sum = Vector4.Zero;
                foreach (var r in kernel) { sum += r; }
                if (sum.X == 0 || sum.Y == 0 || sum.Z == 0 || sum.W == 0) { sum = Vector4.One; }

                Parallel.For(0, height, (y, state) => {
                    for (var x = 0; x < width; x++) {
                        var acc = Vector4.Zero;
                        var (xO, yO) = (x - middle, y - middle);

                        for (var i = 0; i < s; i++) {
                            for (var j = 0; j < s; j++) {
                                acc += this[Math.Clamp(xO + i, 0, width - 1), Math.Clamp(yO + j, 0, height - 1)] * kernel[i, j];
                            }
                        }
                        clone[x, y] = Vector4.Clamp(acc / sum, Vector4.Zero, Vector4.One);
                    }
                });

                sw.Stop();
                Debug.WriteLine($"Convolution: {sw.Elapsed}");

                return clone;
            }
        }

        public SimdPixels UniformQuantization((int r, int g, int b) subdivisions) {
            var sw = new Stopwatch();
            sw.Start();

            var subdivRepro = new Vector4(1f / subdivisions.r, 1f / subdivisions.g, 1f / subdivisions.b, 1);
            var subdivOffset = new Vector4(1f / (subdivisions.r * 2), 1f / (subdivisions.g * 2), 1f / (subdivisions.b * 2), 0);

            unchecked {
                var clone = (SimdPixels)Clone();

                Parallel.For(0, height, (y, state) => {
                    for (var x = 0; x < width; x++) {
                        var pixel = this[x, y];
                        clone[x, y] = subdivRepro * new Vector4(
                                  (float)Math.Floor(pixel.X * subdivisions.r),
                                  (float)Math.Floor(pixel.Y * subdivisions.g),
                                  (float)Math.Floor(pixel.Z * subdivisions.b),
                                  pixel.W) + subdivOffset;
                    }
                });

                sw.Stop();
                Debug.WriteLine($"UniformQuantization: {sw.Elapsed}");

                return clone;
            }
        }

        public object Clone() {
            var clone = (SimdPixels)this.MemberwiseClone();
            clone.pixels = pixels.ToArray();
            return clone;
        }
    }
}
