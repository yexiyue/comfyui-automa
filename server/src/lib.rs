#![allow(non_snake_case)]
#![allow(unused_imports)]
use crate::database::DBS;
use axum::{
    body::Body,
    http::Request,
    response::{IntoResponse, Response},
    routing::get,
    Extension, Router, Server,
};
use error::ServerError;
use once_cell::sync::Lazy;
use start::SERVER_DIR;
use std::{env, net::SocketAddr, path::PathBuf};
use tower::service_fn;
use tower_http::{catch_panic::CatchPanicLayer, cors::CorsLayer, services::ServeDir};
use tracing::info;

pub mod apis;
pub mod database;
pub mod dates;
pub mod defaults;
pub mod error;
pub mod images;
pub mod proxy;
pub mod start;
pub mod templates;
pub mod upload;
pub mod comfyui_workflow;

type ServeResult<T> = Result<T, ServerError>;

static ADDR: Lazy<SocketAddr> = Lazy::new(|| "127.0.0.1:4060".parse().unwrap());
pub async fn start() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", get(hello_world))
        .merge(start::start_router())
        .merge(upload::upload_router())
        .merge(defaults::default_router())
        .merge(templates::templates_router())
        .merge(dates::dates_router())
        .merge(comfyui_workflow::comfyui_workflow_router())
        .merge(images::image_router())
        .merge(apis::api_routers())
        .merge(proxy::proxy_router())
        .merge(proxy::ws_router())
        .layer(Extension(DBS.clone()))
        .layer(CorsLayer::permissive())
        .layer(CatchPanicLayer::new())
        .fallback_service(static_serve());
    let server = Server::bind(&ADDR).serve(app.into_make_service());
    //open::that(format!("http://{}", server.local_addr())).unwrap();
    info!("Server listening on http://{:?}", server.local_addr());
    server.await.unwrap();
}

pub async fn hello_world() -> impl IntoResponse {
    axum::response::Redirect::to("/web/")
}

pub fn static_serve() -> Router {
    Router::new()
        .nest_service("/images", ServeDir::new(PathBuf::from(SERVER_DIR.as_str())))
        .nest_service(
            "/",
             ServeDir::new(PathBuf::from(SERVER_DIR.as_str()).join("public"))
            // .fallback(service_fn(
            //     |req: Request<Body>| async move {
            //         let uri = req.uri().to_string();
            //         let res = Response::builder();
            //         let res = res.status(301);
            //         let res = res.header("location", uri);
            //         let res = res.body(Body::empty()).unwrap();
            //         Ok(res)
            //     },
            // )),
        )
}
