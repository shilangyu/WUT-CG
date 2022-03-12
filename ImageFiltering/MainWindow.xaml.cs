using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Linq;

namespace ImageFiltering
{
    public partial class MainWindow : Window
    {
        SimdPixels? originalPixels;
        SimdPixels? pixels;
        SimdPixels? Pixels
        {
            get => pixels;
            set
            {
                pixels = value;
                TransformedImage.Source = value?.ToBitmap();
            }
        }

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "Image (*.png, *jpg)|*.png;*.jpg"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                var img = new BitmapImage(new(openFileDialog.FileName));
                Pixels = new(img);
                originalPixels = (SimdPixels)Pixels.Clone();
                OriginalImage.Source = img;
            }
        }

        private void Button_Click_11(object sender, RoutedEventArgs e)
        {
            if (pixels is null) return;

            var saveFileDialog = new SaveFileDialog
            {
                Filter = "Image (*.png)|*.png"
            };

            if (saveFileDialog.ShowDialog() == true)
            {
                using var fs = new FileStream(saveFileDialog.FileName, FileMode.Create);
                var encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(pixels.ToBitmap()));
                encoder.Save(fs);
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyFilter(Filters.Invert);
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyFilter(Filters.BrightnessCorrection(0.5f));
        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyFilter(Filters.Contrast(1.5f));
        }

        private void Button_Click_4(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyFilter(Filters.GammaCorrection(1.5f));
        }

        private void Button_Click_5(object sender, RoutedEventArgs e)
        {
            Pixels = originalPixels;
        }

        private void Button_Click_6(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.Blur(3));
        }

        private void Button_Click_7(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.GaussianBlur());
        }

        private void Button_Click_8(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.Sharpen(3));
        }

        private void Button_Click_9(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.EdgeDetection());
        }

        private void Button_Click_10(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.Emboss(3));
        }


        // polyline

        private void Button_Click_12(object sender, RoutedEventArgs e)
        {
            polyline.Points = new PointCollection() { new(0, 256), new(256, 0) };
        }


        int? movingIndex;
        Point? movingPoint { get => movingIndex is int i ? polyline.Points[i] : null; }

        private void Line_MouseDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if (e.Source is Line l)
            {
                var index = polyline.Points.IndexOf((Point)l.DataContext);
                if (index != -1)
                {
                    movingIndex = index;
                }
            }
        }

        private void PolylineCanvas_MouseMove(object sender, System.Windows.Input.MouseEventArgs e)
        {
            if (movingPoint is Point prev && movingIndex is int index)
            {
                var pos = e.GetPosition(PolylineCanvas);
                var delta = pos - prev;

                var newPoint = prev + delta;

                if (index == 0)
                {
                    newPoint.X = 0;
                }
                else if (index == polyline.Points.Count - 1)
                {
                    newPoint.X = 256;
                }

                polyline.Points[index] = newPoint;
                polyline.Points = new(polyline.Points);
            }
        }

        private void NormalizePoints()
        {
            movingIndex = null;
            var points = new List<Point>(polyline.Points).Select(e => new Point(Math.Clamp(e.X, 0, 256), Math.Clamp(e.Y, 0, 256))).ToList();
            points.Sort((a, b) => a.X.CompareTo(b.X));

            var takenXs = new HashSet<double>();
            for (var i = points.Count - 1; i >= 0; i--)
            {
                if (takenXs.Contains(points[i].X))
                {
                    points.RemoveAt(i);
                }
                else
                {
                    takenXs.Add(points[i].X);
                }
            }

            polyline.Points = new(points);
        }

        private void PolylineCanvas_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
        {
            NormalizePoints();
        }

        private void PolylineCanvas_MouseUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            NormalizePoints();
        }

        private void Button_Click_13(object sender, RoutedEventArgs e)
        {
            polyline.Points.Add(new(128, 128));
            NormalizePoints();
        }

        private void Button_Click_17(object sender, RoutedEventArgs e)
        {
            if (polyline.Points.Count > 2)
            {
                polyline.Points.RemoveAt(1);
                NormalizePoints();
            }
        }

        private void Line_MouseUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            NormalizePoints();
        }

        private void Button_Click_14(object sender, RoutedEventArgs e)
        {
            polyline.Points = new PointCollection() { new(0, 0), new(256, 256) };
        }

        private void Button_Click_15(object sender, RoutedEventArgs e)
        {
            polyline.Points = new PointCollection() { new(0, 216), new(216, 0), new(256, 0) };
        }

        private void Button_Click_16(object sender, RoutedEventArgs e)
        {
            polyline.Points = new PointCollection() { new(0, 256), new(40, 256), new(216, 0), new(256, 0) };
        }

        private void Button_Click_18(object sender, RoutedEventArgs e)
        {
            var points = new List<Point>(polyline.Points);
            var item = new Button()
            {
                Content = string.Join(" ", points)
            };
            var filter = Filters.FromPolyline(points);
            item.Click += (sender, e) =>
            {
                Pixels = Pixels?.ApplyFilter(filter);
            };

            SavedFilters.Items.Add(item);
        }
    }
}