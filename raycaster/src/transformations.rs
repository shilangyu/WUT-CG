use macroquad::prelude::*;

pub fn rotate_x(angle: f32) -> Mat4 {
    let s = angle.sin();
    let c = angle.cos();

    mat4(
        vec4(1., 0., 0., 0.),
        vec4(0., c, -s, 0.),
        vec4(0., s, c, 0.),
        vec4(0., 0., 0., 1.),
    )
    .transpose()
}

pub fn rotate_y(angle: f32) -> Mat4 {
    let s = angle.sin();
    let c = angle.cos();

    mat4(
        vec4(c, 0., s, 0.),
        vec4(0., 1., 0., 0.),
        vec4(-s, 0., c, 0.),
        vec4(0., 0., 0., 1.),
    )
    .transpose()
}

pub fn rotate_z(angle: f32) -> Mat4 {
    let s = angle.sin();
    let c = angle.cos();

    mat4(
        vec4(c, -s, 0., 0.),
        vec4(s, c, 0., 0.),
        vec4(0., 0., 1., 0.),
        vec4(0., 0., 0., 1.),
    )
    .transpose()
}

pub const fn scale(s: f32) -> Mat4 {
    const_mat4!(
        [s, 0., 0., 0.],
        [0., s, 0., 0.],
        [0., 0., s, 0.],
        [0., 0., 0., 1.]
    )
}

pub fn translate(offset: Vec3) -> Mat4 {
    mat4(
        vec4(1., 0., 0., offset.x),
        vec4(0., 1., 0., offset.y),
        vec4(0., 0., 1., offset.z),
        vec4(0., 0., 0., 1.),
    )
    .transpose()
}

pub fn perspective_proj(w: f32, h: f32) -> Mat4 {
    mat4(
        vec4(h / w, 0., 0., 0.),
        vec4(0., 1., 0., 0.),
        vec4(0., 0., 0., 1.),
        vec4(0., 0., -1., 0.),
    )
    .transpose()
}
