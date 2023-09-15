// 代理comfyui服务

use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, Uri},
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};
use once_cell::sync::Lazy;
use reqwest::{Method, StatusCode};
use serde_json::{json, Value};
use tower::service_fn;
use tracing::info;

use crate::{error::ServerError, ServeResult};

pub fn proxy_router() -> Router {
    Router::new().nest("/comfyui", Router::new().route("/*path", get(proxy_get)))
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

