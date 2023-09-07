use axum::{extract::Path, http::StatusCode, response::IntoResponse, Extension, Json};
use serde_json::{json, Value};

use crate::{
    database::{DataBase, DBMAP},
    error::ServerError,
    ServeResult,
};

static DATE: &str = "default";

pub async fn find_all(Extension(dbs): Extension<DBMAP>) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(DATE) {
        Some(db) => db,
        None => {
            let db = DataBase::new(DATE);
            dbs.insert(DATE.to_string(), db);
            dbs.get(DATE).unwrap()
        }
    };
    let value = db.find_all().map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to find all".to_string(),
        )
    })?;
    Ok(Json(value))
}

pub async fn create(
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(DATE) {
        Some(db) => db,
        None => {
            let db = DataBase::new(DATE);
            dbs.insert(DATE.to_string(), db);
            dbs.get(DATE).unwrap()
        }
    };
    let mut data=value.clone();
    let templates=data["template_id"].clone();
    let template_id=templates.as_str().unwrap();
    let template_db=dbs.get(crate::templates::controller::DATE).unwrap();
    let template=template_db.find_by_id(template_id).unwrap().unwrap();
    data["template"]=template;
    let res = db.create(&data).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to create".to_string(),
        )
    })?;
    Ok(Json(json!({ "id": res.to_string() })))
}

pub async fn update(
    Path(id): Path<String>,
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(DATE) {
        Some(db) => db,
        None => {
            let db = DataBase::new(DATE);
            dbs.insert(DATE.to_string(), db);
            dbs.get(DATE).unwrap()
        }
    };
    let res = db.update(&id, &value).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to update".to_string(),
        )
    })?;
    Ok(Json(json!({ "id": res.to_string() })))
}

pub async fn find_by_id(
    Path(id): Path<String>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(DATE) {
        Some(db) => db,
        None => {
            let db = DataBase::new(DATE);
            dbs.insert(DATE.to_string(), db);
            dbs.get(DATE).unwrap()
        }
    };
    let res = db.find_by_id(&id).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to find by id".to_string(),
        )
    })?;
    Ok(Json(json!({ "data": res })))
}

pub async fn delete(
    Path(id): Path<String>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(DATE) {
        Some(db) => db,
        None => {
            let db = DataBase::new(DATE);
            dbs.insert(DATE.to_string(), db);
            dbs.get(DATE).unwrap()
        }
    };
    let data = db.find_by_id(&id).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to find by id".to_string(),
        )
    })?;
    db.delete(&id).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to delete".to_string(),
        )
    })?;
    Ok(Json(json!({ "data": data })))
}
