use crate::transformations::*;
use macroquad::prelude::*;

pub struct PointCloud {
    points: Vec<Vec4>,
    lines: Vec<(usize, usize)>,
    rot: Vec3,
    d_rot: Vec3,
    d: f32,
}

impl PointCloud {
    pub fn new(points: Vec<Vec3>, lines: Vec<(usize, usize)>, d: f32) -> Self {
        Self {
            points: points
                .into_iter()
                .map(|p| vec4(p.x, p.y, p.z, 1.))
                .collect(),
            lines,
            rot: Vec3::ZERO,
            d_rot: vec3(
                ::quad_rand::gen_range(0., 1. / 50.),
                ::quad_rand::gen_range(0., 1. / 50.),
                ::quad_rand::gen_range(0., 1. / 50.),
            ),
            d,
        }
    }

    pub fn diamond(a: f32, b: f32, c: f32, d: f32) -> Self {
        Self::new(
            vec![
                vec3(0., b, 0.),
                vec3(-a, 0., c),
                vec3(a, 0., c),
                vec3(a, 0., -c),
                vec3(-a, 0., -c),
                vec3(0., -b, 0.),
            ],
            vec![
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
            d,
        )
    }

    pub fn cube(a: f32, d: f32) -> Self {
        let a = a / 2.;
        Self::new(
            vec![
                vec3(-a, -a, -a),
                vec3(-a, -a, a),
                vec3(a, -a, -a),
                vec3(a, -a, a),
                vec3(-a, a, -a),
                vec3(-a, a, a),
                vec3(a, a, -a),
                vec3(a, a, a),
            ],
            vec![
                (0, 1),
                (0, 2),
                (1, 3),
                (2, 3),
                (4, 5),
                (4, 6),
                (5, 7),
                (6, 7),
                (0, 4),
                (1, 5),
                (2, 6),
                (3, 7),
            ],
            d,
        )
    }

    pub fn draw(&mut self) {
        let w = screen_width();
        let h = screen_height();

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
