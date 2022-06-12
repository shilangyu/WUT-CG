pub mod ellipsoid;
pub mod sphere;

use crate::{
    material::PhongMaterial,
    ray::{Ray, RayIntersection},
};

pub trait Object {
    #[must_use]
    fn material(&self) -> &PhongMaterial;

    /// Returns [None] if does not intersect
    #[must_use]
    fn intersect(&self, ray: &Ray) -> Option<RayIntersection>;
}
