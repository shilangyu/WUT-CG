using System;
using System.Windows;
using System.Windows.Controls;

namespace ImageFiltering {
    public partial class MainWindow : Window {
        private void Button_Click_23(object sender, RoutedEventArgs e) {
            var matrix = (DitherSize.SelectedValue as ComboBoxItem)!.Content switch {
                "2" => Dithers.Ordered2x2(),
                "3" => Dithers.Ordered3x3(),
                "4" => Dithers.Ordered4x4(),
                "6" => Dithers.Ordered6x6(),
                _ => throw new NotImplementedException(),
            };

            Pixels = Pixels?.OrderedDithering(matrix, ((int)RedLevels.Value, (int)GreenLevels.Value, (int)BlueLevels.Value));
        }
    }
}
