use macroquad::prelude::*;

use crate::{
    material::PhongMaterial,
    ray::{Ray, RayIntersection},
};

use super::Object;

/// Has both orientations at once. Will intersect with rays from both sides.
pub struct Plane {
    /// Any point on the plane
    point: Vec3,
    /// Any of the two unit normals of the plane (then the other normal would be the negation)
    normal: Vec3,
    material: PhongMaterial,
}

impl Plane {
    pub fn new(point: Vec3, normal: Vec3, material: PhongMaterial) -> Self {
        Self {
            point,
            normal: normal.normalize(),
            material,
        }
    }
}

impl Object for Plane {
    fn material(&self) -> &PhongMaterial {
        &self.material
    }

    fn intersect(&self, ray: &Ray) -> Option<RayIntersection> {
        // n \dot (x - p) = 0
        // n \dot (rp + t*rv - p) = 0
        // n \dot rp + n \dot t*rv - n \dot p = 0
        // n \dot t*rv = n \dot p - n \dot rp
        // t * (n \dot rv) = n \dot p - n \dot rp
        // t = (n \dot p - n \dot rp) / (n \dot rv)
        // t = (n \dot (p - rp)) / (n \dot rv)

        let denom = self.normal.dot(ray.v);

        // ray is parallel to the plane
        if denom == 0. {
            return None;
        }

        let t = self.normal.dot(self.point - ray.p) / denom;

        // plane is behind
        if t < 0. {
            return None;
        }

        let intersection_point = ray.p + t * ray.v;
        // TODO: something is wrong, renders in a weird way

        Some(RayIntersection {
            t,
            p: (denom).signum() * intersection_point,
            n: self.normal,
        })
    }
}
