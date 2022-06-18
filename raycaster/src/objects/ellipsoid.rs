use macroquad::prelude::*;

use crate::{
    material::PhongMaterial,
    ray::{Ray, RayIntersection},
};

use super::Object;

pub struct Ellipsoid {
    pos: Vec4,
    axis_length: Vec3,
    material: PhongMaterial,
}

impl Ellipsoid {
    pub fn new(pos: Vec3, axis_length: Vec3, material: PhongMaterial) -> Self {
        Self {
            pos: pos.extend(1.),
            axis_length,
            material,
        }
    }
}

impl Object for Ellipsoid {
    fn material(&self) -> &PhongMaterial {
        &self.material
    }

    #[allow(non_snake_case)]
    fn intersect(&self, ray: &Ray) -> Option<RayIntersection> {
        let pe = self.pos.xyz();

        let A = mat3(
            vec3(1. / (self.axis_length.x * self.axis_length.x), 0., 0.),
            vec3(0., 1. / (self.axis_length.y * self.axis_length.y), 0.),
            vec3(0., 0., 1. / (self.axis_length.z * self.axis_length.z)),
        );

        let d = ray.p - pe;

        let vA = A * ray.v;
        let dA = A * d;

        // solution to quadriatic equation of time of intersection between the ray and the surface of an Ellipsoid
        let a = vA.dot(ray.v);
        let b = dA.dot(ray.v) + vA.dot(d);
        let c = dA.dot(d) - 1.;

        let off = f32::sqrt(b * b - 4. * a * c);

        // imaginary solution, not intersecting
        if off.is_nan() {
            return None;
        }
        // ray tangent to the surface, not intersecting
        if off == 0. {
            return None;
        }

        let t1 = (-b - off) / (2. * a);
        let t2 = (-b + off) / (2. * a);

        // Ellipsoid is behind us or we are in the Ellipsoid
        if t1 < 0. || t2 < 0. {
            return None;
        }

        // get first ray intersection
        let t_first = f32::min(t1, t2);

        let intersection_point = ray.p + t_first * ray.v;

        let unit_normal = (A * (intersection_point - pe)).normalize();

        Some(RayIntersection {
            t: t_first,
            p: intersection_point,
            n: unit_normal,
        })
    }
}
