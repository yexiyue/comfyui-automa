use axum::{
    routing::{get, post, put},
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
            )
            .route("/import", post(controller::create_from_list))
            .route("/force_import", post(controller::create_force))
            ,
    )
}
