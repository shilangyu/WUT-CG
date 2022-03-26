using System.Windows;

namespace ImageFiltering
{
    public partial class MainWindow : Window
    {
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
    }
}
