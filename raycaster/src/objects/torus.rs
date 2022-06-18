use macroquad::prelude::*;

use crate::{
    material::PhongMaterial,
    ray::{Ray, RayIntersection},
};

use super::Object;

pub struct Torus {
    pos: Vec4,
    major_radius: f32,
    minor_radius: f32,
    material: PhongMaterial,
}

impl Torus {
    pub fn new(pos: Vec3, major_radius: f32, minor_radius: f32, material: PhongMaterial) -> Self {
        Self {
            pos: vec4(pos.x, pos.y, pos.z, 1.),
            major_radius,
            minor_radius,
            material,
        }
    }
}

impl Object for Torus {
    fn material(&self) -> &PhongMaterial {
        &self.material
    }

    fn intersect(&self, ray: &Ray) -> Option<RayIntersection> {
        let R = self.major_radius;
        let r = self.minor_radius;

        let RR = R * R;
        let rr = r * r;

        let vv = ray.v.dot(ray.v);
        let pv = ray.v.dot(ray.p);
        let pp = ray.p.dot(ray.p);
        let prR = pp - (rr + RR);

        let a = vv * vv;
        let b = 4. * vv * pv;
        let c = 2. * vv * prR + 4. * pv * pv + 4. * RR * ray.v.y * ray.v.y;
        let d = 4. * prR * pv + 8. * RR * ray.p.y * ray.v.y;
        let e = prR * prR - 4. * RR * (rr - ray.p.y);

        // let roots = find_roots_quartic(a as f64, b as f64, c as f64, d as f64, e as f64);

        // let t = roots.as_ref().iter().filter(|&&r| r > 0.).next();

        // t.map(|t| RayIntersection {
        //     t: *t as f32,
        //     p: ray.p + *t as f32 * ray.v,
        //     n: Vec3::Z,
        // })
        // TODO: solve 4th degree polynomial numerically
        None
    }
}
