use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureResistance {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureResistance {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureResistance {
    pub fn save_creature_resistances(
        conn: &mut SqliteConnection,
        resistances: Vec<i32>,
        parent_id: &i32,
    ) {
        use crate::schema::creatures_resistances::dsl::*;

        let mapped_resistances: Vec<NewCreatureResistance> = resistances
            .iter()
            .map(|resistance_id| NewCreatureResistance {
                creature_id: *parent_id,
                damage_type_id: *resistance_id,
            })
            .collect();

        diesel::insert_into(creatures_resistances)
            .values(&mapped_resistances)
            .execute(conn);
    }
}
