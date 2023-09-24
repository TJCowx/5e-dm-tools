use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::language_dto::LanguageDto;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(Language))]
pub struct CreatureLanguageDto {
    id: i32,
    creature_id: i32,
    language_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureLanguageDto {
    pub creature_id: i32,
    pub language_id: i32,
}

impl CreatureLanguageDto {
    pub fn save_creature_languages(
        conn: &mut SqliteConnection,
        languages: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_languages::dsl::*;

        let mapped_languages: Vec<NewCreatureLanguageDto> = languages
            .iter()
            .map(|item_id| NewCreatureLanguageDto {
                creature_id: *parent_id,
                language_id: *item_id,
            })
            .collect();

        diesel::insert_into(creatures_languages)
            .values(&mapped_languages)
            .execute(conn)
    }

    pub fn delete_creature_languages(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_languages::dsl::*;

        diesel::delete(creatures_languages.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_languages_by_creature_id(creature_id: &i32) -> Vec<LanguageDto> {
        use crate::schema::languages::dsl::*;

        let conn = &mut crate::db::connect_db();
        languages
            .inner_join(crate::schema::creatures_languages::dsl::creatures_languages)
            .filter(crate::schema::creatures_languages::dsl::creature_id.eq(creature_id))
            .select(languages::all_columns())
            .load::<LanguageDto>(conn)
            .expect("Error loading languages")
    }

    pub fn get_language_ids_by_creature_id(creature_id: &i32) -> Vec<i32> {
        use crate::schema::languages::dsl::*;

        let conn = &mut crate::db::connect_db();
        languages
            .inner_join(crate::schema::creatures_languages::dsl::creatures_languages)
            .filter(crate::schema::creatures_languages::dsl::creature_id.eq(creature_id))
            .select(id)
            .load::<i32>(conn)
            .expect("Error loading languages")
    }
}
