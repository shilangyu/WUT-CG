use macroquad::prelude::*;

pub enum Light {
    /// Omnidirectional light at a given point
    Point { pos: Vec3, color: Color },
}

impl Light {
    pub fn pos(&self) -> Vec3 {
        match self {
            Light::Point { pos, .. } => *pos,
        }
    }

    pub fn color(&self) -> Color {
        match self {
            Light::Point { color, .. } => *color,
        }
    }
}
