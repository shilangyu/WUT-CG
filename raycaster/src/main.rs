use macroquad::prelude::*;

mod diamond;
mod sphere;
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
    let mut diamond = diamond::Diamond::new(1., 1., 1., 10.);

    loop {
        clear_background(BLACK);

        diamond.draw();

        draw_text(&get_fps().to_string(), 0., 20., 32., WHITE);

        next_frame().await
    }
}
