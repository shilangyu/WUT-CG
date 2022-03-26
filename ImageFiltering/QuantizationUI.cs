using System.Windows;

namespace ImageFiltering {
    public partial class MainWindow : Window {
        private void Button_Click_21(object sender, RoutedEventArgs e) {
            Pixels = Pixels?.UniformQuantization(((int)RedSubdivisionsSlider.Value, (int)GreenSubdivisionsSlider.Value, (int)BlueSubdivisionsSlider.Value));
        }
    }
}
