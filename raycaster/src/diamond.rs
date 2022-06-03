use crate::transformations::*;
use macroquad::prelude::*;

pub struct Diamond {
    points: [Vec4; 6],
    lines: [(usize, usize); 12],
    rot: Vec3,
    d_rot: Vec3,
    d: f32,
}

impl Diamond {
    pub fn new(a: f32, b: f32, c: f32, d: f32) -> Self {
        Self {
            points: [
                vec4(0., b, 0., 1.),
                vec4(-a, 0., c, 1.),
                vec4(a, 0., c, 1.),
                vec4(a, 0., -c, 1.),
                vec4(-a, 0., -c, 1.),
                vec4(0., -b, 0., 1.),
            ],
            lines: [
                (0, 1),
                (0, 2),
                (0, 3),
                (0, 4),
                (5, 1),
                (5, 2),
                (5, 3),
                (5, 4),
                (1, 2),
                (2, 3),
                (3, 4),
                (4, 1),
            ],
            rot: Vec3::ZERO,
            d_rot: vec3(
                ::rand::random::<f32>() / 50.,
                ::rand::random::<f32>() / 50.,
                ::rand::random::<f32>() / 50.,
            ),
            d,
        }
    }

    pub fn draw(&mut self) {
        let Image { width, height, .. } = get_screen_data();
        let w = width as f32;
        let h = height as f32;

        let m = perspective_proj(w, h)
            * translate(vec3(0., 0., self.d))
            * rotate_x(self.rot.x)
            * rotate_y(self.rot.y)
            * rotate_z(self.rot.z);

        let transformed = self
            .points
            .iter()
            .map(|p| m * *p)
            .map(|p| vec4(p.x / p.w, p.y / p.w, p.z / p.w, 1.))
            .map(|p| vec4(0.5 * w * (1. + p.x), 0.5 * h * (1. - p.y), 0., 0.))
            .collect::<Vec<_>>();

        for p in &transformed {
            draw_circle(p.x, p.y, 5., WHITE);
        }

        for &(i1, i2) in &self.lines {
            draw_line(
                transformed[i1].x,
                transformed[i1].y,
                transformed[i2].x,
                transformed[i2].y,
                2.,
                WHITE,
            );
        }

        self.rot += self.d_rot;
    }
}
