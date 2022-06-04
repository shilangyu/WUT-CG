use macroquad::prelude::*;

use crate::utils::*;

pub struct Sphere {
    pos: Vec4,
    radius: f32,
}

impl Sphere {
    pub fn new(pos: Vec3, radius: f32) -> Self {
        Self {
            pos: vec4(pos.x, pos.y, pos.z, 1.),
            radius,
        }
    }

    pub fn get_pos(&self) -> Vec3 {
        into_vec3(&self.pos)
    }

    pub fn get_radius(&self) -> f32 {
        self.radius
    }
}
