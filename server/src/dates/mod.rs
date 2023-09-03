use axum::{
    routing::{get, put},
    Router,
};

pub mod controller;

pub fn dates_router() -> Router {
    Router::new().nest(
        "/dates/:date",
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
