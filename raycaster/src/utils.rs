use macroquad::prelude::*;

macro_rules! assert_approx {
    ($x:expr, $y:expr, $d:expr) => {
        if f32::abs($x - $y) > $d {
            panic!();
        }
    };
}

pub(crate) use assert_approx;

/// Rotate a vector in R^3 around a given axis by given angle in radians
pub fn rotate_around(v: Vec3, axis: Vec3, angle: f32) -> Vec3 {
    let ux = axis.cross(v);

    axis * axis.dot(v) + f32::cos(angle) * ux.cross(axis) + f32::sin(angle) * ux
}

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
