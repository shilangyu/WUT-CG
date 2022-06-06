use macroquad::prelude::*;

macro_rules! assert_approx {
    ($x:expr, $y:expr, $d:expr) => {
        if f32::abs($x - $y) > $d {
            panic!();
        }
    };
}

pub(crate) use assert_approx;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_under_delta() {
        assert_approx!(1., 1.001, 0.01);
    }

    #[test]
    #[should_panic]
    fn fails_if_over_delta_pos() {
        assert_approx!(1., 1.01, 0.001);
    }

    #[test]
    #[should_panic]
    fn fails_if_over_delta_neg() {
        assert_approx!(1., 0.99, 0.001);
    }
}
