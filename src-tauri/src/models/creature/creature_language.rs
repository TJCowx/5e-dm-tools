use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
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
    ) {
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
            .execute(conn);
    }
}
