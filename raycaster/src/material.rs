use macroquad::prelude::*;

use crate::{light::Light, ray::RayIntersection};

pub struct PhongMaterial {
    ambient: Vec3,
    diffuse: Vec3,
    specular: Vec3,
    specular_focus_coeff: f32,
}

impl PhongMaterial {
    pub fn new(ambient: Vec3, diffuse: Vec3, specular: Vec3, specular_focus_coeff: f32) -> Self {
        Self {
            ambient,
            diffuse,
            specular,
            specular_focus_coeff,
        }
    }

    #[must_use]
    pub fn reflect(
        &self,
        intersect: &RayIntersection,
        camera_pos: Vec3,
        lights: &[Light],
        ambient_coeff: f32,
    ) -> Color {
        let v = (camera_pos - intersect.p).normalize();

        let i = ambient_coeff * self.ambient
            + lights.iter().fold(Vec3::ZERO, |acc, light| {
                let l = (light.pos() - intersect.p).normalize();
                let l_dot = intersect.n.dot(l);

                if l_dot < 0. {
                    return acc;
                }

                let r = 2. * l_dot * intersect.n - l;

                let light_color = light.color();
                let light_color = vec3(light_color.r, light_color.g, light_color.b);

                acc + self.diffuse * light_color * l_dot
                    + self.specular
                        * light_color
                        * f32::max(v.dot(r), 0.).powf(self.specular_focus_coeff)
            });

        Color::new(i.x, i.y, i.z, 1.)
    }
}
