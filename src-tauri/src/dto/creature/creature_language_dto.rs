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

    pub fn update_creature_languages(
        conn: &mut SqliteConnection,
        new_languages: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creatures_languages::dsl::*;

        let prev_language_ids = CreatureLanguageDto::get_language_ids_by_creature_id(parent_id);
        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for prev_language_id in prev_language_ids.iter() {
            if !new_languages.contains(prev_language_id) {
                to_delete.push(*prev_language_id);
            }
        }

        for new_language_id in new_languages.iter() {
            if !prev_language_ids.contains(new_language_id) {
                to_add.push(*new_language_id);
            }
        }

        diesel::delete(
            creatures_languages
                .filter(creature_id.eq(parent_id).and(language_id.eq_any(to_delete))),
        )
        .execute(conn)?;

        Self::save_creature_languages(conn, to_add, parent_id)?;

        Ok(())
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
