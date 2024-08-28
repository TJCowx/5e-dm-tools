use serde::{Deserialize, Serialize};

use crate::dto::{
    class::class_dto::ClassDto,
    source::source_dto::SourceDto,
    spell::{
        aoe_type_dto::AoeTypeDto, cast_type_dto::CastTypeDto, duration_type_dto::DurationTypeDto,
        magic_school_dto::MagicSchoolDto, magic_school_spells_dto::MagicSchoolSpellDto,
        range_type_dto::RangeTypeDto, spell_class::SpellClassDto, spell_dto::SpellDto,
        time_scale_dto::TimeScaleDto,
    },
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Spell {
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

    pub range_type: RangeTypeDto,
    pub cast_type: CastTypeDto,
    pub aoe_type: Option<AoeTypeDto>,
    pub duration_type: DurationTypeDto,
    pub time_scale: Option<TimeScaleDto>,
    pub magic_schools: Vec<MagicSchoolDto>,
    pub classes: Vec<ClassDto>,
    pub source: Option<SourceDto>,
}

impl Spell {
    pub fn build_full(spell: SpellDto) -> Result<Spell, String> {
        let aoe_type = match &spell.aoe_type_id {
            Some(aoe_type_id) => Some(AoeTypeDto::get_by_id(&aoe_type_id)?),
            _ => None,
        };

        let time_scale = match &spell.time_scale_id {
            Some(time_scale_id) => Some(TimeScaleDto::get_by_id(&time_scale_id)?),
            _ => None,
        };

        let source = match &spell.source_abbr {
            Some(abbr) => Some(SourceDto::get_by_id(&abbr)),
            _ => None,
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

            aoe_type,
            time_scale,
            range_type: RangeTypeDto::get_by_id(&spell.range_type_id)?,
            cast_type: CastTypeDto::get_by_id(&spell.cast_type_id)?,
            duration_type: DurationTypeDto::get_by_id(&spell.duration_type_id)?,
            magic_schools: MagicSchoolSpellDto::get_schools_by_spell_id(&spell.id)?,
            classes: SpellClassDto::get_classes_by_spell_id(&spell.id)?,
            source,
        })
    }
}
