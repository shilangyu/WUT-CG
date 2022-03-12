using Microsoft.Win32;
using System;
using System.IO;
using System.Windows;
using System.Windows.Media.Imaging;

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
            Pixels = Pixels?.ApplyConvolution(Kernels.GaussianBlur(3));
        }

        private void Button_Click_8(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.Sharpen(3));
        }

        private void Button_Click_9(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.EdgeDetection(3));
        }

        private void Button_Click_10(object sender, RoutedEventArgs e)
        {
            Pixels = Pixels?.ApplyConvolution(Kernels.Emboss(3));
        }
    }
}