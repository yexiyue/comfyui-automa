use axum::{
    routing::{get, put},
    Router,
};

pub mod controller;

pub fn meta_router() -> Router {
    Router::new().nest(
        "/meta",
        Router::new()
            .route("/", get(controller::find_all).post(controller::create))
            .route(
                "/:id",
                put(controller::update)
                    .get(controller::find_by_id)
                    .delete(controller::delete),
            ),
    )
}
