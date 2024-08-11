use serde::{Deserialize, Serialize};

use crate::dto::spell::{
    aoe_type_dto::AoeTypeDto, cast_type_dto::CastTypeDto, duration_type_dto::DurationTypeDto,
    magic_school_dto::MagicSchoolDto, magic_school_spells_dto::MagicSchoolSpellDto,
    range_type_dto::RangeTypeDto, spell_damage_dto::SpellDamageDto, spell_dto::SpellDto,
    time_scale_dto::TimeScaleDto,
};

use super::spell_damage::SpellDamage;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Spell {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub higher_levels: Option<String>,
    pub spell_slot: i32,
    pub requires_verbal: bool,
    pub requires_somatic: bool,
    pub requires_material: bool,
    pub level: i32,
    pub casting_time: String,
    pub can_ritual_cast: bool,
    pub range_type_id: i32,
    pub range: Option<String>,
    pub cast_type_id: i32,
    pub cast_time: i32,
    pub aoe_type_id: Option<i32>,
    pub aoe_size: Option<i32>,
    pub duration_type_id: i32,
    pub time_scale_id: Option<i32>,
    pub duration: Option<i32>,
    pub hit_count: i32,

    pub range_type: RangeTypeDto,
    pub cast_type: CastTypeDto,
    pub aoe_type: Option<AoeTypeDto>,
    pub duration_type: DurationTypeDto,
    pub time_scale: Option<TimeScaleDto>,
    pub damages: Vec<SpellDamage>,
    pub magic_schools: Vec<MagicSchoolDto>,
}

impl Spell {
    fn build_full(spell: SpellDto) -> Result<Spell, String> {
        let range_type = match RangeTypeDto::get_by_id(&spell.range_type_id) {
            Ok(found) => found,
            Err(e) => return Err(e),
        };
        let cast_type = match CastTypeDto::get_by_id(&spell.cast_type_id) {
            Ok(found) => found,
            Err(e) => return Err(e),
        };

        let aoe_type = match &spell.aoe_type_id {
            Some(aoe_type_id) => match AoeTypeDto::get_by_id(&aoe_type_id) {
                Ok(variable) => Some(variable),
                Err(e) => return Err(e),
            },
            _ => None,
        };

        let time_scale = match &spell.time_scale_id {
            Some(time_scale_id) => match TimeScaleDto::get_by_id(&time_scale_id) {
                Ok(res) => Some(res),
                Err(e) => return Err(e),
            },
            _ => None,
        };

        let duration_type = match DurationTypeDto::get_by_id(&spell.duration_type_id) {
            Ok(found) => found,
            Err(e) => return Err(e),
        };

        let magic_schools = match MagicSchoolSpellDto::get_schools_by_spell_id(&spell.id) {
            Ok(found) => found,
            Err(e) => return Err(e),
        };

        let damages = match SpellDamageDto::get_damages_by_spell_id(&spell.id) {
            Ok(found) => found,
            Err(e) => return Err(e),
        };

        Ok(Spell {
            id: spell.id,
            name: spell.name,
            description: spell.description,
            higher_levels: spell.higher_levels,
            spell_slot: spell.spell_slot,
            requires_verbal: spell.requires_verbal,
            requires_somatic: spell.requires_somatic,
            requires_material: spell.requires_material,
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
            hit_count: spell.hit_count,
            range_type,
            cast_type,
            aoe_type,
            duration_type,
            time_scale,
            magic_schools,
            damages,
        })
    }
}
