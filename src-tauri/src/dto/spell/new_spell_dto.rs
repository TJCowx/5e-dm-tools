use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::spell::new_spell::NewSpell;

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewSpellDto {
    pub name: String,
    pub description: Option<String>,
    pub higher_levels: Option<String>,
    pub spell_slot: i32,
    pub requires_verbal: bool,
    pub requires_somatic: bool,
    pub requires_material: bool,
    pub material_components: Option<String>,
    pub level: i32,
    pub casting_time: String,
    pub can_ritual_cast: bool,
    pub range_type_id: i32,
    pub range: Option<i32>,
    pub cast_type_id: i32,
    pub cast_time: i32,
    pub aoe_type_id: Option<i32>,
    pub aoe_size: Option<i32>,
    pub duration_type_id: i32,
    pub time_scale_id: Option<i32>,
    pub duration: Option<i32>,
    pub source_abbr: Option<String>,
}

impl From<&NewSpell> for NewSpellDto {
    fn from(new_spell: &NewSpell) -> Self {
        Self {
            name: new_spell.name.clone(),
            description: new_spell.description.clone(),
            higher_levels: new_spell.higher_levels.clone(),
            spell_slot: new_spell.spell_slot,
            requires_verbal: new_spell.requires_verbal,
            requires_somatic: new_spell.requires_somatic,
            requires_material: new_spell.requires_material,
            material_components: new_spell.material_components.clone(),
            level: new_spell.level,
            casting_time: new_spell.casting_time.clone(),
            can_ritual_cast: new_spell.can_ritual_cast,
            range_type_id: new_spell.range_type_id,
            range: new_spell.range,
            cast_type_id: new_spell.cast_type_id,
            cast_time: new_spell.cast_time,
            aoe_type_id: new_spell.aoe_type_id,
            aoe_size: new_spell.aoe_size,
            duration_type_id: new_spell.duration_type_id,
            time_scale_id: new_spell.time_scale_id,
            duration: new_spell.duration,
            source_abbr: new_spell.source_abbr.clone(),
        }
    }
}
