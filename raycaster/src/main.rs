#![allow(dead_code)]

use std::f32::consts::PI;

use macroquad::prelude::*;

use light::Light;

use crate::{
    material::PhongMaterial,
    objects::{ellipsoid::Ellipsoid, plane::Plane, sphere::Sphere, torus::Torus, *},
};

mod camera;
mod light;
mod material;
mod objects;
mod point_cloud;
mod ray;
mod transformations;
mod utils;

const MOVE_SPEED: f32 = 3.0;
const TIME_STEP: f32 = 2.0;

fn conf() -> Conf {
    Conf {
        window_title: String::from("Raycaster"),
        window_width: 500,
        window_height: 500,
        high_dpi: true,
        fullscreen: false,
        ..Default::default()
    }
}

#[macroquad::main(conf)]
async fn main() {
    let scene: Vec<Box<dyn Object>> = vec![
        Box::new(Ellipsoid::new(
            vec3(0., 0., -50.),
            vec3(10., 20., 15.),
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(10., -20., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(-10., -20., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(0., -10., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(0., 0., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(0., 10., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
        Box::new(Sphere::new(
            vec3(0., 20., -50.),
            10.,
            PhongMaterial::new(
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                vec3(0.5, 0.5, 0.5),
                2.,
            ),
        )),
    ];

    let mut camera = camera::Camera::new(Vec3::Z * 3., -Vec3::Z, Vec3::Y, PI / 3.);

    let mut t = 0f32;

    loop {
        let w = screen_width();
        let h = screen_height();

        let mut raster = Image {
            width: w as _,
            height: h as _,
            bytes: vec![0; w as usize * h as usize * 4],
        };

        let time_step = get_frame_time();
        let lights = vec![
            Light::Point {
                pos: vec3(t.cos() * 200., 0., t.sin() * 200.),
                color: WHITE,
            },
            Light::Point {
                pos: vec3(0., t.sin() * 200., t.cos() * 200.),
                color: WHITE,
            },
        ];

        if is_key_down(KeyCode::W) {
            camera.r#move(camera.direction() * MOVE_SPEED);
        }
        if is_key_down(KeyCode::S) {
            camera.r#move(-camera.direction() * MOVE_SPEED);
        }
        if is_key_down(KeyCode::A) {
            camera.r#move(-camera.direction().cross(camera.up()) * MOVE_SPEED);
        }
        if is_key_down(KeyCode::D) {
            camera.r#move(camera.direction().cross(camera.up()) * MOVE_SPEED);
        }
        if is_key_down(KeyCode::Left) {
            camera.rotate_sideways(0.03 * MOVE_SPEED);
        }
        if is_key_down(KeyCode::Right) {
            camera.rotate_sideways(-0.03 * MOVE_SPEED);
        }
        if is_key_down(KeyCode::Up) {
            camera.rotate_frontways(-0.03 * MOVE_SPEED);
        }
        if is_key_down(KeyCode::Down) {
            camera.rotate_frontways(0.03 * MOVE_SPEED);
        }

        clear_background(BLACK);

        for x in 0..w as u32 {
            for y in 0..h as u32 {
                let ray = camera.ray(vec2(x as f32, y as f32), vec2(w, h));

                let i = scene
                    .iter()
                    .flat_map(|s| s.intersect(&ray).map(|i| (i, s)))
                    .min_by(|(a, _), (b, _)| a.t.partial_cmp(&b.t).expect("t was NaN"));

                if let Some((intersect, obj)) = i {
                    let c = obj
                        .material()
                        .reflect(&intersect, camera.pos(), &lights, 0.1);

                    raster.set_pixel(x, y, c);
                }
            }
        }

        draw_texture(Texture2D::from_image(&raster), 0., 0., WHITE);

        draw_text(&get_fps().to_string(), w - 24., h - 4., 24., WHITE);
        draw_text(
            &format!("Camera pos: {:?}", camera.pos()),
            0.,
            16.,
            24.,
            WHITE,
        );
        draw_text(
            &format!("Camera dir: {:?}", camera.direction()),
            0.,
            32.,
            24.,
            WHITE,
        );
        draw_text(
            &format!("Camera ort: {:?}", camera.up()),
            0.,
            48.,
            24.,
            WHITE,
        );

        t += TIME_STEP * time_step;

        next_frame().await
    }
}
