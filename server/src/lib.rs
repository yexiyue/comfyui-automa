use axum::{
    response::IntoResponse,
    routing::{get, get_service},
    Router, Server,
};
use error::ServerError;
use once_cell::sync::Lazy;
use std::net::SocketAddr;
use tracing::info;


pub mod database;
pub mod error;
pub mod upload;

type ServeResult<T> = Result<T, ServerError>;

static ADDR: Lazy<SocketAddr> = Lazy::new(|| "127.0.0.1:4060".parse().unwrap());
pub async fn start() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", get(hello_world))
        .merge(upload::upload_router())
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
