using Microsoft.Win32;
using System.Collections.Generic;
using System.IO;
using System.Windows;
using System.Windows.Media.Imaging;

namespace ImageFiltering {
    public partial class MainWindow : Window {
        SimdPixels? originalPixels;
        SimdPixels? pixels;

        Stack<SimdPixels> undo = new();
        Stack<SimdPixels> redo = new();

        SimdPixels? Pixels {
            get => pixels;
            set {
                if (pixels is not null) {
                    redo.Clear();
                    undo.Push(pixels);
                }
                pixels = value;
                TransformedImage.Source = value?.ToBitmap();
            }
        }

        public MainWindow() {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e) {
            var openFileDialog = new OpenFileDialog {
                Filter = "Image (*.png, *jpg)|*.png;*.jpg"
            };

            if (openFileDialog.ShowDialog() == true) {
                var img = new BitmapImage(new(openFileDialog.FileName));
                Pixels = new(img);
                originalPixels = (SimdPixels)Pixels.Clone();
                OriginalImage.Source = img;
            }
        }

        private void Button_Click_11(object sender, RoutedEventArgs e) {
            if (pixels is null) return;

            var saveFileDialog = new SaveFileDialog {
                Filter = "Image (*.png)|*.png"
            };

            if (saveFileDialog.ShowDialog() == true) {
                using var fs = new FileStream(saveFileDialog.FileName, FileMode.Create);
                var encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(pixels.ToBitmap()));
                encoder.Save(fs);
            }
        }

        private void Button_Click_19(object sender, RoutedEventArgs e) {
            if (undo.Count == 0 || pixels is null) return;

            var ps = undo.Pop();
            redo.Push(pixels);
            pixels = ps;
            TransformedImage.Source = ps.ToBitmap();
        }

        private void Button_Click_20(object sender, RoutedEventArgs e) {
            if (redo.Count == 0 || pixels is null) return;

            var ps = redo.Pop();
            undo.Push(pixels);
            pixels = ps;
            TransformedImage.Source = ps.ToBitmap();
        }
    }
}
