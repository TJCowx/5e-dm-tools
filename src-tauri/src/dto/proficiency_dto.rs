use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ProficiencyDto {
    pub id: i32,
    pub name: String,
}

impl ProficiencyDto {
    pub fn get_all() -> Vec<ProficiencyDto> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = proficiencies
            .order(name.asc())
            .load::<ProficiencyDto>(conn)
            .expect("Error loading proficiencies");

        results
    }

    pub fn get_proficiencies_by_creature_id(creature_id: &i32) -> Vec<ProficiencyDto> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        proficiencies
            .inner_join(crate::schema::creatures_proficiencies::dsl::creatures_proficiencies)
            .filter(crate::schema::creatures_proficiencies::dsl::creature_id.eq(creature_id))
            .select(proficiencies::all_columns())
            .load::<ProficiencyDto>(conn)
            .expect("Error loading proficiencies")
    }
}
