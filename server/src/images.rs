use std::{env, fs, path::PathBuf};

use axum::{extract::Path, response::IntoResponse, routing::get, Json, Router};
use serde_json::json;

use crate::{ServeResult, ADDR};

pub async fn get_images_list(Path(path): Path<String>) -> ServeResult<impl IntoResponse> {
    let dir = PathBuf::from(
        env::current_exe()
            .unwrap()
            .parent()
            .unwrap(),
    )
    .join(&path);
    let res = fs::read_dir(dir);
    if res.is_ok() {
        let res = res.unwrap();

        let urls = res
            .filter(move |file| file.is_ok())
            .map(|file| {
                let file_name = file.unwrap().file_name();

                format!(
                    "http://{}/images/{}",
                    &ADDR.to_string(),
                    PathBuf::from(path.clone())
                        .join(file_name)
                        .as_os_str()
                        .to_string_lossy()
                )
            })
            .collect::<Vec<String>>();

        Ok(Json(json!(urls)))
    } else {
        Ok(Json(json!(Vec::new() as Vec<String>)))
    }
}

pub fn image_router() -> axum::Router {
    Router::new().route("/image-space/:path", get(get_images_list))
}
