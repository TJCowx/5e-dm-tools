use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::magic_schools)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct MagicSchoolDto {
    pub id: i32,
    pub name: String,
}

impl MagicSchoolDto {
    pub fn get_all() -> Result<Vec<MagicSchoolDto>, String> {
        use crate::schema::magic_schools::dsl::*;

        let conn = &mut crate::db::connect_db();
        match magic_schools.order(name.asc()).load::<MagicSchoolDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(school_id: &i32) -> Result<MagicSchoolDto, String> {
        use crate::schema::magic_schools::dsl::*;

        let conn = &mut crate::db::connect_db();
        match magic_schools
            .filter(id.eq(school_id))
            .first::<MagicSchoolDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
