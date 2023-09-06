use once_cell::sync::Lazy;
use rocksdb::{Options, DB};
use serde_json::{json, Value};
use tracing::info;
use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
    sync::{Arc, Mutex},
};
use uuid::Uuid;

static DB_PATH: &str = "db";
static DB_OPTIONS: Lazy<Options> = Lazy::new(|| {
    let mut options = Options::default();
    options.create_if_missing(true);
    options
});
#[derive(Debug)]
pub struct DataBase {
    db: rocksdb::DB,
}

impl Default for DataBase {
    fn default() -> Self {
        let db = DB::open(&DB_OPTIONS, DB_PATH).unwrap();
        Self { db }
    }
}

impl Deref for DataBase {
    type Target = DB;
    fn deref(&self) -> &Self::Target {
        &self.db
    }
}

impl DerefMut for DataBase {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.db
    }
}

impl DataBase {
    pub fn new(name: &str) -> Self {
        let db = DB::open(&DB_OPTIONS, format!("{}/{}", DB_PATH, name)).unwrap();
        Self { db }
    }

    pub fn create(&self, value: &Value) -> Result<Uuid, rocksdb::Error> {
        let id = Uuid::new_v4();
        let mut data: Value = value.clone();
        data["id"] = json!(id.to_string());
        data["create_time"] = json!(chrono::Local::now().to_string());
        self.put(id, data.to_string())?;
        Ok(id)
    }

    pub fn find_by_id(&self, id: &str) -> Result<Option<Value>, rocksdb::Error> {
        let uuid = Uuid::parse_str(id).expect("解析错误");
        let value = self.db.get(uuid)?;
        if let Some(value) = value {
            return Ok(Some(serde_json::from_slice(&value)).unwrap().unwrap());
        }
        Ok(None)
    }

    pub fn find_all(&self) -> Result<Vec<Value>, rocksdb::Error> {
        let mut values: Vec<Value> = Vec::new();
        let iter = self.db.iterator(rocksdb::IteratorMode::Start);
        for item in iter {
            if item.is_ok() {
                let value: Value = serde_json::from_slice(&item.unwrap().1).unwrap();
                values.push(value);
            }
        }
        values.sort_by(|a, b| {
            let a_time = a["create_time"].as_str().unwrap();
            let b_time = b["create_time"].as_str().unwrap();
            return a_time.cmp(b_time);
        });
        info!("{values:#?}");
        Ok(values)
    }

    pub fn delete(&self, id: &str) -> Result<Uuid, rocksdb::Error> {
        let uuid = Uuid::parse_str(id).expect("uuid解析错误");
        self.db.delete(uuid)?;
        Ok(uuid)
    }

    /// 传入全量数据
    pub fn update(&self, id: &str, value: &Value) -> Result<Uuid, rocksdb::Error> {
        let uuid = Uuid::parse_str(id).expect("uuid解析错误");
        let mut preValue=self.find_by_id(id).unwrap().unwrap();
        let data = value.clone();
        let data=data.as_object().unwrap();
        for (key,v) in data {
            preValue[key]=v.clone();
        }
        self.db.put(uuid, preValue.to_string())?;
        Ok(uuid)
    }
}

pub type DBMAP = Arc<Mutex<HashMap<String, DataBase>>>;

pub static DBS: Lazy<Arc<Mutex<HashMap<String, DataBase>>>> = Lazy::new(|| {
    let mut hashmap = HashMap::new();
    hashmap.insert("default".to_string(), DataBase::default());
    Arc::new(Mutex::new(hashmap))
});
