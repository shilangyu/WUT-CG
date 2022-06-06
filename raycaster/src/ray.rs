use macroquad::prelude::*;

use crate::utils::*;

#[derive(Debug)]
pub struct Ray {
    pub p: Vec3,
    pub v: Vec3,
}

#[derive(Debug)]
pub struct RayIntersection {
    /// time of intersection, always positive, ray has constant speed and no acceleration
    pub t: f32,
    /// point of intersection
    pub p: Vec3,
    /// unit normal of the oriented surface at `p`
    pub n: Vec3,
}

impl Ray {
    pub fn new(p: Vec4, v: Vec4) -> Self {
        assert_approx!(v.length_squared(), 1., 0.0001);

        Self {
            p: p.xyz(),
            v: v.xyz(),
        }
    }
}
