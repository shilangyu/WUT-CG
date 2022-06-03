use macroquad::prelude::*;

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
        vec3(self.pos.x, self.pos.y, self.pos.z)
    }

    pub fn get_radius(&self) -> f32 {
        self.radius
    }
}
