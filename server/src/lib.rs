use axum::{
    body::Body,
    http::Request,
    response::{IntoResponse, Response},
    routing::get,
    Extension, Router, Server,
};
use error::ServerError;
use once_cell::sync::Lazy;
use std::net::SocketAddr;
use tower::service_fn;
use tower_http::{catch_panic::CatchPanicLayer, cors::CorsLayer, services::ServeDir};
use tracing::info;

use crate::database::DBS;

pub mod database;
pub mod dates;
pub mod defaults;
pub mod error;
pub mod meta;
pub mod templates;
pub mod upload;
type ServeResult<T> = Result<T, ServerError>;

static ADDR: Lazy<SocketAddr> = Lazy::new(|| "127.0.0.1:4060".parse().unwrap());
pub async fn start() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", get(hello_world))
        .merge(upload::upload_router())
        .merge(defaults::default_router())
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
    axum::response::Redirect::to("/web/index.html")
}

pub fn static_serve() -> Router {
    Router::new().nest_service(
        "/",
        ServeDir::new("public").fallback(service_fn(move |req: Request<Body>| async move {
            let uri = req.uri().to_string();
            info!("{uri}");
            let res = Response::builder();
            let res = res.status(304);
            let res = res.header("location", uri);
            let res = res.body(Body::empty()).unwrap();
            Ok(res)
        })),
    )
}
