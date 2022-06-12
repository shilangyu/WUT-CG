use std::f32::consts::PI;

use macroquad::prelude::*;

use crate::{
    ray::Ray,
    transformations::{self, rotate_x},
    utils::rotate_around,
};

pub struct Camera {
    pos: Vec3,
    target: Vec3,
    /// Unit vector
    up: Vec3,
    /// field of view (in radians)
    fov: f32,
}

impl Camera {
    pub fn new(pos: Vec3, target: Vec3, up: Vec3, fov: f32) -> Self {
        Self {
            pos,
            target,
            up: up.normalize(),
            fov,
        }
    }

    pub fn view_matrix(&self) -> Mat4 {
        let z = (self.pos - self.target).normalize();
        let x = self.up.cross(z).normalize();
        let y = z.cross(x).normalize();

        mat4(
            vec4(x.x, x.y, x.z, -x.dot(self.pos)),
            vec4(y.x, y.y, y.z, -y.dot(self.pos)),
            vec4(z.x, z.y, z.z, -z.dot(self.pos)),
            vec4(0., 0., 0., 1.),
        )
        .transpose()
    }

    pub fn inv_view_matrix(&self) -> Mat4 {
        let z = (self.pos - self.target).normalize();
        let x = self.up.cross(z).normalize();
        let y = z.cross(x).normalize();

        mat4(
            vec4(x.x, y.x, z.x, self.pos.x),
            vec4(x.y, y.y, z.y, self.pos.y),
            vec4(x.z, y.z, z.z, self.pos.z),
            vec4(0., 0., 0., 1.),
        )
        .transpose()
    }

    /// Moves the camera and target view by a given delta
    pub fn r#move(&mut self, delta: Vec3) {
        self.pos += delta;
        self.target += delta;
    }

    /// Rotates the camera by radians specified in angle (around `up × direction` axis)
    pub fn rotate_frontways(&mut self, angle: f32) {
        // in theory, axis should already be a unit vector, but numerical errors quickly propagate here
        let axis = self.up.cross(self.direction()).normalize();

        self.up = rotate_around(self.up, axis, angle);

        let rot_dir = rotate_around(self.direction(), axis, angle);

        // move from pos in the direction of unit vector rot_dir by the distance of pos and target
        self.target = self.pos + rot_dir * self.pos.distance(self.target);
    }

    /// Rotates the camera by radians specified in angle (around `up` axis)
    pub fn rotate_sideways(&mut self, angle: f32) {
        // rotate direction around `up` vector
        let rot_dir = rotate_around(self.direction(), self.up, angle);

        // move from pos in the direction of unit vector rot_dir by the distance of pos and target
        self.target = self.pos + rot_dir * self.pos.distance(self.target);
    }


    pub fn pos(&self) -> Vec3 {
        self.pos
    }

    /// Unit vector indicating the direction of view of the camera
    pub fn direction(&self) -> Vec3 {
        (self.target - self.pos).normalize()
    }

    pub fn up(&self) -> Vec3 {
        self.up
    }
}
