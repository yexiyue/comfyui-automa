// 代理comfyui服务

use std::convert::Infallible;

use axum::{
    body::Body,
    extract::{Multipart, DefaultBodyLimit},
    headers::ContentType,
    http::{HeaderMap, Request, Uri},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router, TypedHeader,
};
use once_cell::sync::Lazy;
use reqwest::{Method, StatusCode};
use serde_json::{json, Value};
use tower::service_fn;
use tracing::info;

use crate::{error::ServerError, ServeResult};

pub fn proxy_router() -> Router {
    Router::new().nest(
        "/comfyui",
        Router::new()
            .route("/upload/*path", post(proxy_upload))
            .route("/*path", get(proxy_get)),
    ).layer(DefaultBodyLimit::max(1024 * 1024 * 100))
}

static COMFYUI_URL: Lazy<String> = Lazy::new(|| String::from("http://localhost:8188"));

pub async fn proxy_get(uri: Uri) -> ServeResult<impl IntoResponse> {
    info!("proxy: {}{uri}", COMFYUI_URL.as_str());
    let url = format!("{}{uri}", COMFYUI_URL.as_str());
    let client = reqwest::Client::new();
    let reqwest_res = client
        .get(&url)
        .send()
        .await
        .or_else(|e| Err(ServerError(e.status().unwrap(), e.to_string())))?;

    let res = Response::builder()
        .status(reqwest_res.status())
        .body(Body::from(reqwest_res.bytes().await.unwrap()))
        .unwrap();

    Ok(res)
}

pub async fn proxy_upload(
    uri: Uri,
    mut multipart: Multipart,
) -> ServeResult<impl IntoResponse> {
    let client = reqwest::Client::new();

    info!("proxy: {}{uri}", COMFYUI_URL.as_str());
    let url = format!("{}{uri}", COMFYUI_URL.as_str());
    let file = multipart
        .next_field()
        .await
        .or_else(|e| Err(ServerError(StatusCode::BAD_REQUEST, e.to_string())))?
        .unwrap();
    let file_name = file.file_name().unwrap().to_string();
    info!(
        "comfyui: file_name: {},{}",
        file_name,
        file.content_type().unwrap()
    );
    let reqwest_res = client
        .post(&url)
        .multipart(
            reqwest::multipart::Form::new().part(
                "image",
                reqwest::multipart::Part::bytes(file.bytes().await.unwrap().to_vec())
                    .file_name(file_name),
            ),
        )
        .send()
        .await
        .unwrap();

    let res = Response::builder()
        .status(reqwest_res.status())
        .body(Body::from(reqwest_res.bytes().await.unwrap()))
        .unwrap();

    Ok(res)
}
