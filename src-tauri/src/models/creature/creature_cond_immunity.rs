use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureCondImmunity {
    id: i32,
    creature_id: i32,
    condition_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureCondImmunity {
    pub creature_id: i32,
    pub condition_type_id: i32,
}

impl CreatureCondImmunity {
    pub fn save_creature_cond_immunities(
        conn: &mut SqliteConnection,
        cond_immunities: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_condition_immunities::dsl::*;

        let mapped_cond_immunities: Vec<NewCreatureCondImmunity> = cond_immunities
            .iter()
            .map(|cond_immunity_id| NewCreatureCondImmunity {
                creature_id: *parent_id,
                condition_type_id: *cond_immunity_id,
            })
            .collect();

        diesel::insert_into(creatures_condition_immunities)
            .values(&mapped_cond_immunities)
            .execute(conn)
    }
}
