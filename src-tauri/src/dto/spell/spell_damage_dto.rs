use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::spell::spell_damage::SpellDamage;

#[derive(Debug, Serialize, Deserialize, Queryable, AsChangeset)]
#[diesel(table_name = crate::schema::spell_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(DamageType))]
#[diesel(belongs_to(Spell))]
pub struct SpellDamageDto {
    pub id: i32,
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
    pub spell_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::spell_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewSpellDamageDto {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
    pub spell_id: i32,
}

impl SpellDamageDto {
    pub fn get_damages_by_spell_id(parent_id: &i32) -> Result<Vec<SpellDamage>, String> {
        use crate::schema::spell_damages::dsl::*;

        let conn = &mut crate::db::connect_db();

        match spell_damages
            .filter(spell_id.eq(parent_id))
            .load::<SpellDamageDto>(conn)
        {
            Ok(spells) => Ok(spells
                .into_iter()
                .map(SpellDamage::build_full)
                .collect::<Vec<SpellDamage>>()),
            Err(e) => {
                println!(
                    "[server][SpellDamageDto] Error getting damages on spell {}, Error: {}",
                    parent_id,
                    e.to_string()
                );
                Err(e.to_string())
            }
        }
    }
}
