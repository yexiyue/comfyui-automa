use once_cell::sync::Lazy;
use rocksdb::{Options, DB};
use serde_json::Value;
use std::ops::{Deref, DerefMut};
use uuid::Uuid;

static DB_PATH: &str = "db";
static DB_OPTIONS: Lazy<Options> = Lazy::new(|| {
    let mut options = Options::default();
    options.create_if_missing(true);
    options
});

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
        self.put(id.as_bytes(), value.to_string())?;
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
        self.db.put(uuid, value.to_string())?;
        Ok(uuid)
    }
}
