use std::{
    env,
    path::{Path, PathBuf},
};

use crate::{error::ServerError, start::SERVER_DIR, ServeResult, ADDR};
use axum::{
    extract::{DefaultBodyLimit, Multipart, Path as AxumPath},
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Json, Router,
};
use serde_json::json;
use std::fs;

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
        let mut path = PathBuf::from(&SERVER_DIR.to_string()).join("public");
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
        let url = format!("http://{}/{}", &ADDR.to_string(), filename);
        urls.push(url);
    }

    Ok(Json(json!({
        "url":urls,
    })))
}

pub fn upload_router() -> Router {
    Router::new()
        .route("/upload", post(upload))
        .route("/upload/:name", post(upload_image))
        .layer(DefaultBodyLimit::max(1024 * 1024 * 100))
}

async fn upload_image(
    AxumPath(name): AxumPath<String>,
    mut multipart: Multipart,
) -> ServeResult<impl IntoResponse> {
    let mut urls = vec![];
    let path = PathBuf::from(SERVER_DIR.as_str()).join(name);

    let dir_path = path.to_str().unwrap();
    let _ = fs::read_dir(dir_path).is_err_and(|_| {
        fs::create_dir_all(dir_path).unwrap();
        return true;
    });

    while let Some(file) = multipart
        .next_field()
        .await
        .map_err(|_| ServerError(StatusCode::BAD_REQUEST, "bad request".to_string()))?
    {
        let filename = file.file_name().unwrap();
        let file_path = Path::new(dir_path).join(filename);
        let bytes = file.bytes().await.unwrap();

        fs::write(&file_path, bytes).map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "write file error".to_string(),
            )
        })?;
        let url = format!(
            "http://{}/{}",
            &ADDR.to_string(),
            file_path.to_str().unwrap()
        );
        urls.push(url)
    }

    Ok(Json(json!({
        "url":urls,
    })))
}
