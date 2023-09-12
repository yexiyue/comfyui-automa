#![allow(non_snake_case)]
#![allow(unused_imports)]
use axum::{
    body::Body,
    http::Request,
    response::{IntoResponse, Response},
    routing::get,
    Extension, Router, Server,
};
use error::ServerError;
use once_cell::sync::Lazy;
use std::{env, net::SocketAddr, path::PathBuf};
use tower::service_fn;
use tower_http::{catch_panic::CatchPanicLayer, cors::CorsLayer, services::ServeDir};
use tracing::info;

use crate::database::DBS;

pub mod apis;
pub mod database;
pub mod dates;
pub mod defaults;
pub mod error;
pub mod images;
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
        .merge(templates::templates_router())
        .merge(dates::dates_router())
        .merge(images::image_router())
        .merge(apis::api_routers())
        .layer(Extension(DBS.clone()))
        .layer(CorsLayer::permissive())
        .layer(CatchPanicLayer::new())
        .fallback_service(static_serve());
    let server = Server::bind(&ADDR).serve(app.into_make_service());
    open::that(format!("http://{}", server.local_addr())).unwrap();
    info!("Server listening on http://{:?}", server.local_addr());
    server.await.unwrap();
}

pub async fn hello_world() -> impl IntoResponse {
    axum::response::Redirect::to("/web/")
}

pub fn static_serve() -> Router {
    Router::new()
        .nest_service(
            "/images",
            ServeDir::new(
                env::current_exe()
                    .unwrap()
                    .parent()
                    .unwrap(),
            ),
        )
        .nest_service(
            "/",
            ServeDir::new(
                PathBuf::from(
                    env::current_exe()
                        .unwrap()
                        .parent()
                        .unwrap(),
                )
                .join("public"),
            )
            .fallback(service_fn(|req: Request<Body>| async move {
                let uri = req.uri().to_string();
                let res = Response::builder();
                let res = res.status(301);
                let res = res.header("location", uri);
                let res = res.body(Body::empty()).unwrap();
                Ok(res)
            })),
        )
}
