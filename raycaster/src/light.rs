use macroquad::prelude::*;

/// Omnidirectional light at a given point
pub struct PointLight {
    pos: Vec3,
    color: Color,
}

impl PointLight {
    pub fn new(pos: Vec3, color: Color) -> Self {
        Self { pos, color }
    }

    pub fn pos(&self) -> Vec3 {
        self.pos
    }

    pub fn color(&self) -> Color {
        self.color
    }
}
