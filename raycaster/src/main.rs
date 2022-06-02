use macroquad::prelude::*;

mod transformations;

fn conf() -> Conf {
    Conf {
        window_title: String::from("Raycaster"),
        window_width: 1260,
        window_height: 768,
        fullscreen: false,
        ..Default::default()
    }
}

#[macroquad::main(conf)]
async fn main() {
    use transformations::*;

    let d = 4.;
    let (a, b, c) = (1., 1., 1.);

    let points = vec![
        vec4(0., b, 0., 1.),
        vec4(-a, 0., c, 1.),
        vec4(a, 0., c, 1.),
        vec4(a, 0., -c, 1.),
        vec4(-a, 0., -c, 1.),
        vec4(0., -b, 0., 1.),
    ];
    let lines = vec![
        (0, 1),
        (0, 2),
        (0, 3),
        (0, 4),
        (5, 1),
        (5, 2),
        (5, 3),
        (5, 4),
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 1),
    ];

    let mut rot = Vec3::ZERO;
    let d_rot = vec3(
        ::rand::random::<f32>() / 50.,
        ::rand::random::<f32>() / 50.,
        ::rand::random::<f32>() / 50.,
    );

    loop {
        clear_background(BLACK);
        let Image { width, height, .. } = get_screen_data();
        let w = width as f32;
        let h = height as f32;

        let m = perspective_proj(w, h)
            * translate(vec3(0., 0., d))
            * rotate_x(rot.x)
            * rotate_y(rot.y)
            * rotate_z(rot.z);

        let transformed = points
            .clone()
            .into_iter()
            .map(|p| m * p)
            .map(|p| vec4(p.x / p.w, p.y / p.w, p.z / p.w, 1.))
            .map(|p| vec4(0.5 * w * (1. + p.x), 0.5 * h * (1. - p.y), 0., 0.))
            .collect::<Vec<_>>();

        for p in transformed.clone() {
            draw_circle(p.x, p.y, 5., WHITE);
        }

        for (i1, i2) in lines.clone() {
            draw_line(
                transformed[i1].x,
                transformed[i1].y,
                transformed[i2].x,
                transformed[i2].y,
                2.,
                WHITE,
            );
        }

        rot += d_rot;

        draw_text(&get_fps().to_string(), 0., 20., 32., WHITE);

        next_frame().await
    }
}
