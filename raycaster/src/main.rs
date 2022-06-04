use std::f32::consts::PI;

use macroquad::{prelude::*, ui::canvas};
use point_cloud::PointCloud;

mod camera;
mod light;
mod material;
mod point_cloud;
mod ray;
mod sphere;
mod transformations;
mod utils;

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
    let mut diamond = PointCloud::diamond(1., 1., 1., 10.);
    let mut cube = PointCloud::cube(1., 2.);

    let camera = camera::Camera::new(
        vec3(0., 0., 0.),
        vec3(0., 0., 1.),
        vec3(0., 1., 0.),
        PI / 2.,
    );

    println!(
        "{:?}",
        camera.transform_matrix() * camera.dst_transform_matrix()
    );
    println!("{:?}", camera.transform_matrix());
    println!("{:?}", camera.dst_transform_matrix().inverse());

    loop {
        clear_background(BLACK);

        cube.draw();
        diamond.draw();

        draw_text(&get_fps().to_string(), 0., 20., 32., WHITE);

        next_frame().await
    }
}
