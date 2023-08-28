use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureWeakness {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureWeakness {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureWeakness {
    pub fn save_creature_weaknesses(
        conn: &mut SqliteConnection,
        weaknesses: Vec<i32>,
        parent_id: &i32,
    ) {
        use crate::schema::creatures_weaknesses::dsl::*;

        let mapped_weaknesses: Vec<NewCreatureWeakness> = weaknesses
            .iter()
            .map(|weakness_id| NewCreatureWeakness {
                creature_id: *parent_id,
                damage_type_id: *weakness_id,
            })
            .collect();

        diesel::insert_into(creatures_weaknesses)
            .values(&mapped_weaknesses)
            .execute(conn);
    }
}
