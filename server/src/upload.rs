use std::path::{Path, PathBuf};

use crate::{error::ServerError, ServeResult, ADDR};
use axum::{
    extract::{DefaultBodyLimit, Multipart},
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Json, Router,
};
use serde_json::json;
use tracing::info;

pub fn hash(input: impl AsRef<[u8]>) -> String {
    let digest = md5::compute(input);
    format!("{digest:?}")
}
pub fn get_extension(filename: &str) -> String {
    let path = Path::new(filename);
    path.extension().unwrap().to_str().unwrap().to_string()
}
async fn upload(mut multipart: Multipart) -> ServeResult<impl IntoResponse> {
    let mut urls = vec![];
    while let Some(file) = multipart
        .next_field()
        .await
        .map_err(|_| ServerError(StatusCode::BAD_REQUEST, "bad request".to_string()))?
    {
        let mut path = PathBuf::from("public");
        let filename = file.file_name().unwrap();
        let ext = get_extension(filename);
        let bytes = file.bytes().await.unwrap();
        let filename = hash(&bytes);
        let filename = format!("{filename}.{ext}");
        path.push(&filename);
        tokio::fs::write(&path, bytes).await.map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "write file error".to_string(),
            )
        })?;
        let url = format!("http://{}/{}", &ADDR.to_string(),filename);
        urls.push(url);
    }

    Ok(Json(json!({
        "url":urls,
    })))
}

pub fn upload_router() -> Router {
    Router::new()
        .route("/upload", post(upload))
        .layer(DefaultBodyLimit::max(1024 * 1024 * 100))
}
