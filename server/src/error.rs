use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::{json, Value};

#[derive(Debug)]
pub struct ServerError(pub StatusCode, pub String);

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        let status = self.0;
        let body = Json::<Value>(json!({ "code":status.as_u16(),"message":self.1,"error":true }));
        (status, body).into_response()
    }
}