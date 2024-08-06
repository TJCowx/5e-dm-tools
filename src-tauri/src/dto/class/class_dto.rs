use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::classes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ClassDto {
    pub id: i32,
    pub name: String,
}

impl ClassDto {
    pub fn get_all() -> Result<Vec<ClassDto>, String> {
        use crate::schema::classes::dsl::*;

        let conn = &mut crate::db::connect_db();
        match classes.order(name.asc()).load::<ClassDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(class_id: &i32) -> Result<ClassDto, String> {
        use crate::schema::classes::dsl::*;

        let conn = &mut crate::db::connect_db();
        match classes.filter(id.eq(class_id)).first::<ClassDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
