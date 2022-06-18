use macroquad::prelude::*;

use crate::{
    material::PhongMaterial,
    ray::{Ray, RayIntersection},
};

use super::Object;

pub struct Sphere {
    pos: Vec4,
    radius: f32,
    material: PhongMaterial,
}

impl Sphere {
    pub fn new(pos: Vec3, radius: f32, material: PhongMaterial) -> Self {
        Self {
            pos: pos.extend(1.),
            radius,
            material,
        }
    }
}

impl Object for Sphere {
    fn material(&self) -> &PhongMaterial {
        &self.material
    }

    fn intersect(&self, ray: &Ray) -> Option<RayIntersection> {
        let ps = self.pos.xyz();

        // solution to quadriatic equation of time of intersection between the ray and the surface of a sphere
        let b = 2. * ray.v.dot(ray.p - ps);
        let c = (ray.p - ps).length_squared() - (self.radius * self.radius);

        let off = f32::sqrt(b * b - 4. * c);

        // imaginary solution, not intersecting
        if off.is_nan() {
            return None;
        }
        // ray tangent to the surface, not intersecting
        if off == 0. {
            return None;
        }

        let t1 = (-b - off) / 2.;
        let t2 = (-b + off) / 2.;

        // sphere is behind us or we are in the sphere
        if t1 < 0. || t2 < 0. {
            return None;
        }

        // get first ray intersection
        let t_first = f32::min(t1, t2);

        let intersection_point = ray.p + t_first * ray.v;

        let unit_normal = (intersection_point - ps).normalize();

        Some(RayIntersection {
            t: t_first,
            p: intersection_point,
            n: unit_normal,
        })
    }
}
