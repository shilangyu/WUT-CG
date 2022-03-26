namespace ImageFiltering {
    public static class Dithers {
        private static float[,] Normalize(int[,] matrix) {
            var res = new float[matrix.GetLength(0), matrix.GetLength(1)];
            for (int i = 0; i < res.GetLength(0); i++) {
                for (int j = 0; j < res.GetLength(1); j++) {
                    res[i, j] = matrix[i, j] / (res.GetLength(0) * res.GetLength(0) + 1f);
                }
            }

            return res;
        }

        public static float[,] Ordered2x2() {
            return Normalize(new[,] { { 1, 3 }, { 4, 2 } });
        }

        public static float[,] Ordered3x3() {
            return Normalize(new[,] { { 3, 7, 4 }, { 6, 1, 9 }, { 2, 8, 5 } });
        }

        public static float[,] Ordered4x4() {
            return Normalize(new[,] { { 1, 9, 3, 11 }, { 13, 5, 15, 7 }, { 4, 12, 2, 10 }, { 16, 8, 14, 6 } });
        }

        public static float[,] Ordered6x6() {
            return Normalize(new[,] {
                { 9, 25, 13, 11, 27, 15 },
                { 21, 1, 33, 23, 3, 35 },
                { 5, 29, 17, 7, 31, 19 },
                { 12, 28, 16, 10, 26, 14 },
                { 24, 4, 36, 22, 2, 34 },
                { 8, 32, 20, 6, 30, 18 },
            });
        }
    }
}
