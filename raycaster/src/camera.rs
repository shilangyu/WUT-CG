use macroquad::prelude::*;

use crate::{ray::Ray, utils::rotate_around};

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

    #[must_use]
    pub fn ray(&self, pixel: Vec2, window_size: Vec2) -> Ray {
        // ray calculated from the camera system coordinate (pos = vec3(0, 0, 0))
        let c = window_size / 2.;

        // distance from the view window
        let d = window_size.x / (2. * f32::tan(self.fov / 2.));

        // translate to view window
        let q = vec4(pixel.x - c.x, -pixel.y + c.y, -d, 0.);

        // vector from camera to view point so: (q - pos).normalize(), but pos is (0, 0, 0)
        let v_prime = q.normalize();

        let m_inv = self.inv_view_matrix();

        // translate data to scene system coordinate, self.pos is equivalent with m_inv * (0, 0, 0, 1)
        Ray::new(self.pos, m_inv * v_prime)
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
