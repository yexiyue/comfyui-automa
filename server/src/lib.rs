use axum::{
    response::IntoResponse,
    routing::{get, get_service},
    Extension, Router, Server,
};
use error::ServerError;
use once_cell::sync::Lazy;
use std::net::SocketAddr;
use tower_http::{catch_panic::CatchPanicLayer, cors::CorsLayer};
use tracing::info;

use crate::database::DBS;

pub mod database;
pub mod dates;
pub mod error;
pub mod upload;
pub mod templates;
pub mod meta;

type ServeResult<T> = Result<T, ServerError>;

static ADDR: Lazy<SocketAddr> = Lazy::new(|| "127.0.0.1:4060".parse().unwrap());
pub async fn start() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", get(hello_world))
        .merge(upload::upload_router())
        .merge(meta::meta_router())
        .merge(templates::templates_router())
        .merge(dates::dates_router())
        .layer(Extension(DBS.clone()))
        .layer(CorsLayer::permissive())
        .layer(CatchPanicLayer::new())
        .fallback_service(static_serve());
    let server = Server::bind(&ADDR).serve(app.into_make_service());
    info!("Server listening on http://{:?}", server.local_addr());
    server.await.unwrap();
}

pub async fn hello_world() -> impl IntoResponse {
    "hello world"
}

pub fn static_serve() -> Router {
    Router::new().nest_service(
        "/",
        get_service(tower_http::services::ServeDir::new("public")),
    )
}
