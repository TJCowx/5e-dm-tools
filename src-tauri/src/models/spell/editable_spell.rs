use serde::{Deserialize, Serialize};

use crate::dto::spell::{spell_class::SpellClassDto, spell_dto::SpellDto};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EditableSpell {
    pub id: i32,
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
    pub magic_school_id: i32,

    pub classes: Vec<i32>,
}

impl EditableSpell {
    pub fn build(spell: SpellDto) -> Result<EditableSpell, String> {
        Ok(EditableSpell {
            id: spell.id,
            name: spell.name,
            description: spell.description,
            higher_levels: spell.higher_levels,
            spell_slot: spell.spell_slot,
            requires_verbal: spell.requires_verbal,
            requires_somatic: spell.requires_somatic,
            requires_material: spell.requires_material,
            material_components: spell.material_components,
            level: spell.level,
            casting_time: spell.casting_time,
            can_ritual_cast: spell.can_ritual_cast,
            range_type_id: spell.range_type_id,
            range: spell.range,
            cast_type_id: spell.cast_type_id,
            cast_time: spell.cast_time,
            aoe_type_id: spell.aoe_type_id,
            aoe_size: spell.aoe_size,
            duration_type_id: spell.duration_type_id,
            time_scale_id: spell.time_scale_id,
            duration: spell.duration,
            source_abbr: spell.source_abbr,
            magic_school_id: spell.magic_school_id,

            classes: SpellClassDto::get_class_ids_by_spell_id(&spell.id)?,
        })
    }
}
