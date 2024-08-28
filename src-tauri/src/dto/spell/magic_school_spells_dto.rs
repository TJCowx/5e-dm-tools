use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::magic_schools_spells;

use super::magic_school_dto::MagicSchoolDto;

#[derive(Queryable, Insertable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::magic_schools_spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(MagicSchoolDto))]
#[diesel(belongs_to(SpellDto))]
pub struct MagicSchoolSpellDto {
    magic_school_id: i32,
    spell_id: i32,
}

impl MagicSchoolSpellDto {
    pub fn get_schools_by_spell_id(in_spell_id: &i32) -> Result<Vec<MagicSchoolDto>, String> {
        use crate::schema::magic_schools::dsl::*;
        use crate::schema::magic_schools_spells::dsl::{magic_schools_spells, spell_id};

        let conn = &mut crate::db::connect_db();

        match magic_schools
            .inner_join(magic_schools_spells)
            .filter(spell_id.eq(in_spell_id))
            .select(magic_schools::all_columns())
            .load::<MagicSchoolDto>(conn)
        {
            Ok(schools) => Ok(schools),
            Err(e) => {
                println!("[server][MagicSchoolSpellDto] There was an error loading magic schools on spell {}, Error: {}", in_spell_id, e);
                Err(e.to_string())
            }
        }
    }

    pub fn save_spell_schools(
        conn: &mut SqliteConnection,
        schools: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::magic_schools_spells::dsl::*;

        let mapped_spell_schools: Vec<MagicSchoolSpellDto> = schools
            .iter()
            .map(|item_id| MagicSchoolSpellDto {
                spell_id: *parent_id,
                magic_school_id: *item_id,
            })
            .collect();

        diesel::insert_into(magic_schools_spells)
            .values(&mapped_spell_schools)
            .execute(conn)
    }
}
