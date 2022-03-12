using System.Numerics;

namespace ImageFiltering
{
    static class Kernels
    {
        public static Vector4[,] Blur(int size)
        {
            var kernel = new Vector4[size, size];

            for (var i = 0; i < size; i++)
            {
                for (var j = 0; j < size; j++)
                {
                    kernel[i, j] = Vector4.One;
                }
            }

            return kernel;
        }

        public static Vector4[,] GaussianBlur(int size)
        {
            // TODO
            throw new System.NotImplementedException();
        }

        public static Vector4[,] Sharpen(int size)
        {
            var kernel = new Vector4[size, size];

            for (var i = 0; i < size; i++)
            {
                for (var j = 0; j < size; j++)
                {
                    kernel[i, j] = -Vector4.One;
                }
            }

            var middle = (size - 1) / 2;
            kernel[middle, middle] = new(size * size);

            return kernel;
        }

        public static Vector4[,] EdgeDetection(int size)
        {
            // TODO
            throw new System.NotImplementedException();
        }

        public static Vector4[,] Emboss(int size)
        {
            var kernel = new Vector4[size, size];
            var middle = (size - 1) / 2;

            for (var i = 0; i < size; i++)
            {
                for (var j = 0; j < size; j++)
                {
                    if (i < middle && j == middle || i == middle && j < middle || j == i && j < middle)
                    {
                        kernel[i, j] = -Vector4.One;
                    }
                    else if (i >= middle && j == middle || i == middle && j >= middle || i == j && j >= middle)
                    {
                        kernel[i, j] = Vector4.One;
                    }
                    else
                    {
                        kernel[i, j] = Vector4.Zero;
                    }
                }
            }

            return kernel;
        }
    }
}