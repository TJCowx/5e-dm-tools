use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::damage_type::DamageType;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(DamageType))]
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
    ) -> QueryResult<usize> {
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
            .execute(conn)
    }

    pub fn delete_creature_weaknesses(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_weaknesses::dsl::*;

        diesel::delete(creatures_weaknesses.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_weaknesses_by_creature_id(creature_id: &i32) -> Vec<DamageType> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_weaknesses::dsl::creatures_weaknesses)
            .filter(crate::schema::creatures_weaknesses::dsl::creature_id.eq(creature_id))
            .select(damage_types::all_columns())
            .load::<DamageType>(conn)
            .expect("Error loading damage types")
    }
}
