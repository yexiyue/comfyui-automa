// 一键启动comfyui 如果没下载进行下载

use std::{env, path::Path};

use axum::{response::IntoResponse, routing::get, Router};
use once_cell::sync::Lazy;
use tracing::info;

use crate::ServeResult;

pub fn start_router() -> Router {
    Router::new().route("/start", get(start_comfyui))
}

pub async fn start_comfyui() -> ServeResult<impl IntoResponse> {
    info!("comfyui starting...");
    Ok(())
}

pub static SERVER_DIR:Lazy<String>=Lazy::new(||{
    env::current_exe().unwrap().parent().unwrap().to_string_lossy().to_string()
});
