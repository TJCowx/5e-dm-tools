use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::proficiency::Proficiency;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(Proficiency))]
pub struct CreatureProf {
    id: i32,
    creature_id: i32,
    proficiency_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureProf {
    pub creature_id: i32,
    pub proficiency_id: i32,
}

impl CreatureProf {
    pub fn save_creature_profs(
        conn: &mut SqliteConnection,
        proficiencies: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_proficiencies::dsl::*;

        let mapped_profs: Vec<NewCreatureProf> = proficiencies
            .iter()
            .map(|prof_id| NewCreatureProf {
                creature_id: *parent_id,
                proficiency_id: *prof_id,
            })
            .collect();

        diesel::insert_into(creatures_proficiencies)
            .values(&mapped_profs)
            .execute(conn)
    }

    pub fn delete_creature_profs(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_proficiencies::dsl::*;

        diesel::delete(creatures_proficiencies.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_profs_by_creature_id(creature_id: &i32) -> Vec<Proficiency> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        proficiencies
            .inner_join(crate::schema::creatures_proficiencies::dsl::creatures_proficiencies)
            .filter(crate::schema::creatures_proficiencies::dsl::creature_id.eq(creature_id))
            .select(proficiencies::all_columns())
            .load::<Proficiency>(conn)
            .expect("Error loading proficiencies")
    }
}
