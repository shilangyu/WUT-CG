use macroquad::prelude::*;

/// Drops the `w` coord
#[inline(always)]
pub fn into_vec3(vec4: &Vec4) -> Vec3 {
    vec3(vec4.x, vec4.y, vec4.y)
}
