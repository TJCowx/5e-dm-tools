use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::language::Language;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(Language))]
pub struct CreatureLanguage {
    id: i32,
    creature_id: i32,
    language_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureLanguage {
    pub creature_id: i32,
    pub language_id: i32,
}

impl CreatureLanguage {
    pub fn save_creature_languages(
        conn: &mut SqliteConnection,
        languages: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_languages::dsl::*;

        let mapped_languages: Vec<NewCreatureLanguage> = languages
            .iter()
            .map(|item_id| NewCreatureLanguage {
                creature_id: *parent_id,
                language_id: *item_id,
            })
            .collect();

        diesel::insert_into(creatures_languages)
            .values(&mapped_languages)
            .execute(conn)
    }

    pub fn get_languages_by_creature_id(id: &i32) -> Vec<Language> {
        use crate::schema::languages::dsl::*;

        let conn = &mut crate::db::connect_db();
        languages
            .inner_join(crate::schema::creatures_languages::dsl::creatures_languages)
            .filter(crate::schema::creatures_languages::dsl::creature_id.eq(id))
            .select(languages::all_columns())
            .load::<Language>(conn)
            .expect("Error loading languages")
    }
}
