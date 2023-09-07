use axum::{extract::Path, http::StatusCode, response::IntoResponse, Extension, Json};
use serde_json::{json, Value};

use crate::{
    database::{DataBase, DBMAP},
    error::ServerError,
    ServeResult,
};

pub async fn find_all(
    Path(date): Path<String>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
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
    Path(date): Path<String>,
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
        }
    };
    let res = db.create(&value).map_err(|_| {
        ServerError(
            StatusCode::INTERNAL_SERVER_ERROR,
            "failed to create".to_string(),
        )
    })?;
    Ok(Json(json!({ "id": res.to_string() })))
}

pub async fn update(
    Path((date, id)): Path<(String, String)>,
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
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
    Path((date, id)): Path<(String, String)>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
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
    Path((date, id)): Path<(String, String)>,
    Extension(dbs): Extension<DBMAP>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
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

pub async fn create_from_list(
    Path(date): Path<String>,
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
        }
    };
    let values = value.clone();
    for v in values.as_array().unwrap() {
        db.create(&v).map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "failed to create".to_string(),
            )
        })?;
    }
    Ok(Json(json!({ "success": true })))
}

pub async fn create_force(
    Path(date): Path<String>,
    Extension(dbs): Extension<DBMAP>,
    Json(value): Json<Value>,
) -> ServeResult<impl IntoResponse> {
    let mut dbs = dbs.lock().unwrap();
    let db = match dbs.get(&date) {
        Some(db) => db,
        None => {
            let db = DataBase::new(&date);
            dbs.insert(date.clone(), db);
            dbs.get(&date).unwrap()
        }
    };
    let old_values=db.find_all().unwrap();
    for v in old_values {
        let id=v["id"].as_str().unwrap();
        db.delete(id).unwrap();
    }
    
    let values = value.clone();
    for v in values.as_array().unwrap() {
        db.create(&v).map_err(|_| {
            ServerError(
                StatusCode::INTERNAL_SERVER_ERROR,
                "failed to create".to_string(),
            )
        })?;
    }
    Ok(Json(json!({ "success": true })))
}