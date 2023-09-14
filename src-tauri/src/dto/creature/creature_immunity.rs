use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::damage_type::DamageType;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(DamageType))]
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
    ) -> QueryResult<usize> {
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
            .execute(conn)
    }

    pub fn delete_creature_immunities(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_immunities::dsl::*;

        diesel::delete(creatures_immunities.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_immunities_by_creature_id(creature_id: &i32) -> Vec<DamageType> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_immunities::dsl::creatures_immunities)
            .filter(crate::schema::creatures_immunities::dsl::creature_id.eq(creature_id))
            .select(damage_types::all_columns())
            .load::<DamageType>(conn)
            .expect("Error loading damage types")
    }
}
