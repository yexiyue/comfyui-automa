use axum::{extract::Path, http::StatusCode, response::IntoResponse, Extension, Json, Router};
use serde_json::{json, Map, Value};

use crate::{database::{DBMAP, DataBase}, error::ServerError, ServeResult};
pub async fn apis(
    Path(id): Path<String>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get("default") {
        None => {
            return Err(ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "failed to find by id".to_string(),
            ))
        }
        Some(db) => db,
    };
    let default = db
        .find_by_id(&id)
        .map_err(|_| ServerError(StatusCode::BAD_REQUEST, "No default found".to_string()))?
        .unwrap();
    let id = default["id"].as_str().unwrap();

    let value = if let Some(dates) = dbs.get(id) {
        dates.find_all().map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "failed to find all".to_string(),
            )
        })?
    } else {
        let my_dates=DataBase::new(id);
        dbs.insert(id.to_string(), my_dates);
        dbs.get(id).unwrap().find_all().map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "failed to find all".to_string(),
            )
        })?
    };

    let filter_values = value
        .iter()
        .filter(|x| x["open"].as_bool().unwrap())
        .collect::<Vec<&Value>>();
    let mut meta_map = Map::new();
    let meta = default["meta"].as_array().unwrap();

    for item in meta {
        let name = item["name"].as_str().unwrap();
        let value = item["value"].clone();
        meta_map.insert(name.to_string(), value);
    }
    Ok(Json(json!({
        "meta":meta_map,
        "dates":filter_values
    })))
}

pub fn api_routers() -> Router {
    Router::new().route("/apis/:id", axum::routing::get(apis))
}
