use diesel::prelude::*;
use log::error;
use serde::{Deserialize, Serialize};

use crate::dto::class::class_dto::ClassDto;

#[derive(Queryable, Insertable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::classes_spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(ClassDto))]
#[diesel(belongs_to(SpellDto))]
pub struct SpellClassDto {
    class_id: i32,
    spell_id: i32,
}

impl SpellClassDto {
    pub fn get_classes_by_spell_id(in_spell_id: &i32) -> Result<Vec<ClassDto>, String> {
        use crate::schema::classes::dsl::*;
        use crate::schema::classes_spells::dsl::{classes_spells, spell_id};

        let conn = &mut crate::db::connect_db();

        match classes
            .inner_join(classes_spells)
            .filter(spell_id.eq(in_spell_id))
            .select(classes::all_columns())
            .load::<ClassDto>(conn)
        {
            Ok(schools) => Ok(schools),
            Err(e) => {
                error!(
                    "There was an error loading classes on spell {}, Error: {}",
                    in_spell_id, e
                );
                Err(e.to_string())
            }
        }
    }
}
