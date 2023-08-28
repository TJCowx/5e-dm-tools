use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_saving_throws)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureSavingThrow {
    id: i32,
    creature_id: i32,
    saving_throw_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_saving_throws)]
pub struct NewCreatureSavingThrow {
    pub creature_id: i32,
    pub saving_throw_id: i32,
}

impl CreatureSavingThrow {
    pub fn save_creature_saving_throws(
        conn: &mut SqliteConnection,
        saving_throws: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_saving_throws::dsl::*;

        let mapped_saving_throws: Vec<NewCreatureSavingThrow> = saving_throws
            .iter()
            .map(|item_id| NewCreatureSavingThrow {
                creature_id: *parent_id,
                saving_throw_id: *item_id,
            })
            .collect();

        diesel::insert_into(creatures_saving_throws)
            .values(&mapped_saving_throws)
            .execute(conn)
    }
}
