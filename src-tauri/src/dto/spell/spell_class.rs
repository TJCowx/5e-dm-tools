use std::collections::HashSet;

use diesel::prelude::*;
use log::error;
use serde::{Deserialize, Serialize};

use crate::{
    dto::class::class_dto::ClassDto,
    schema::{classes_spells, creature_spells::spell_id},
};

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
            Ok(res) => Ok(res),
            Err(e) => {
                error!(
                    "There was an error loading classes on spell {}, Error: {}",
                    in_spell_id, e
                );
                Err(e.to_string())
            }
        }
    }

    pub fn get_class_ids_by_spell_id(in_spell_id: &i32) -> Result<Vec<i32>, String> {
        use crate::schema::classes::dsl::*;
        use crate::schema::classes_spells::dsl::{classes_spells, spell_id};

        let conn = &mut crate::db::connect_db();

        match classes
            .inner_join(classes_spells)
            .filter(spell_id.eq(in_spell_id))
            .select(id)
            .load::<i32>(conn)
        {
            Ok(class_ids) => Ok(class_ids),
            Err(e) => {
                error!(
                    "There was an error loading class ids on spell {}, Error: {}",
                    in_spell_id, e
                );
                Err(e.to_string())
            }
        }
    }

    pub fn save_spell_classes(
        conn: &mut SqliteConnection,
        classes: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::classes_spells::dsl::*;

        let mapped_class_spells: Vec<SpellClassDto> = classes
            .iter()
            .map(|item_id| SpellClassDto {
                spell_id: *parent_id,
                class_id: *item_id,
            })
            .collect();

        diesel::insert_into(classes_spells)
            .values(&mapped_class_spells)
            .execute(conn)
    }

    pub fn update_spell_classes(
        conn: &mut SqliteConnection,
        new_classes: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::classes_spells::dsl::*;

        let prev: HashSet<i32> = Self::get_class_ids_by_spell_id(parent_id)
            .map_err(|e| diesel::result::Error::QueryBuilderError(e.into()))?
            .into_iter()
            .collect();
        let new: HashSet<i32> = new_classes.iter().cloned().collect();

        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for id in prev.union(&new) {
            if prev.contains(id) && !new.contains(id) {
                to_delete.push(*id);
            } else if new.contains(id) && !prev.contains(id) {
                to_add.push(*id)
            }
        }

        diesel::delete(
            classes_spells.filter(spell_id.eq(parent_id).and(class_id.eq_any(to_delete))),
        )
        .execute(conn)?;

        Self::save_spell_classes(conn, to_add, parent_id)?;

        Ok(())
    }

    pub fn delete_spell_classes(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::classes_spells::dsl::*;

        diesel::delete(classes_spells.filter(spell_id.eq(parent_id))).execute(conn)
    }
}
