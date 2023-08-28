use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureImmunity {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureImmunity {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureImmunity {
    pub fn save_creature_immunities(
        conn: &mut SqliteConnection,
        immunities: Vec<i32>,
        parent_id: &i32,
    ) {
        use crate::schema::creatures_immunities::dsl::*;

        let mapped_immunities: Vec<NewCreatureImmunity> = immunities
            .iter()
            .map(|immunity_id| NewCreatureImmunity {
                creature_id: *parent_id,
                damage_type_id: *immunity_id,
            })
            .collect();

        diesel::insert_into(creatures_immunities)
            .values(&mapped_immunities)
            .execute(conn);
    }
}
