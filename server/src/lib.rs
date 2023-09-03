use axum::{Router, Server, response::IntoResponse, routing::get};
use once_cell::sync::Lazy;
use std::net::SocketAddr;
use tracing::info;

pub mod database;
pub mod error;
static ADDR: Lazy<SocketAddr> = Lazy::new(|| "127.0.0.1:4060".parse().unwrap());
pub async fn start() {
    tracing_subscriber::fmt::init();
    let app = Router::new().route("/", get(hello_world));
    let server = Server::bind(&ADDR).serve(app.into_make_service());
    info!("Server listening on http://{:?}", server.local_addr());
    server.await.unwrap();
}

pub async fn hello_world() -> impl IntoResponse {
    "hello world"
}