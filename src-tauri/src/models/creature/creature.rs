use crate::dto::{
    alignment_dto::AlignmentDto,
    condition_type_dto::ConditionTypeDto,
    creature::{
        creature_ability_dto::CreatureAbilityDto, creature_action_dto::CreatureActionDto,
        creature_cond_immunity_dto::CreatureCondImmunityDto, creature_dto::CreatureDto,
        creature_environment_dto::CreatureEnvironmentDto,
        creature_immunity_dto::CreatureImmunityDto, creature_language_dto::CreatureLanguageDto,
        creature_prof_dto::CreatureProfDto, creature_resistance_dto::CreatureResistanceDto,
        creature_type_dto::CreatureTypeDto, creature_weakness_dto::CreatureWeaknessDto,
    },
    damage_type_dto::DamageTypeDto,
    environment_dto::EnvironmentDto,
    language_dto::LanguageDto,
    proficiency_dto::ProficiencyDto,
    size_dto::SizeDto,
    source::source_dto::SourceDto,
};

use serde::{Deserialize, Serialize};

use super::creature_action::CreatureActionFull;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Creature {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub armour_class: i32,
    pub hit_points: i32,
    pub hit_die: String,
    pub saving_throws: Vec<String>,
    pub land_speed: Option<i32>,
    pub fly_speed: Option<i32>,
    pub burrow_speed: Option<i32>,
    pub climb_speed: Option<i32>,
    pub hover_speed: Option<i32>,
    pub swim_speed: Option<i32>,
    pub blindsight: Option<i32>,
    pub darkvision: Option<i32>,
    pub tremorsense: Option<i32>,
    pub truesight: Option<i32>,
    pub strength: i32,
    pub dexterity: i32,
    pub constitution: i32,
    pub intelligence: i32,
    pub wisdom: i32,
    pub charisma: i32,
    pub prof_bonus: i32,
    pub challenge_rating: f32,
    pub reward_xp: i32,
    pub is_legendary: bool,
    pub has_lair: bool,
    pub alignment_id: i32,
    pub creature_type_id: i32,
    pub size_id: i32,
    pub source_abbr: Option<String>,

    pub alignment: Option<AlignmentDto>,
    pub creature_type: Option<CreatureTypeDto>,
    pub size: Option<SizeDto>,
    pub source: Option<SourceDto>,

    pub proficiencies: Option<Vec<ProficiencyDto>>,
    pub immunities: Option<Vec<DamageTypeDto>>,
    pub cond_immunities: Option<Vec<ConditionTypeDto>>,
    pub resistances: Option<Vec<DamageTypeDto>>,
    pub weaknesses: Option<Vec<DamageTypeDto>>,
    pub languages: Option<Vec<LanguageDto>>,
    pub environments: Option<Vec<EnvironmentDto>>,
    pub abilities: Option<Vec<CreatureAbilityDto>>,
    pub actions: Option<Vec<CreatureActionFull>>,
}

impl From<CreatureDto> for Creature {
    fn from(creature: CreatureDto) -> Self {
        let source = if let Some(ref abbr) = creature.source_abbr {
            Some(SourceDto::get_by_id(&abbr))
        } else {
            None
        };

        Self {
            id: creature.id,
            name: creature.name,
            description: creature.description,
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die,
            saving_throws: creature
                .saving_throws
                .split(',')
                .map(|s| s.to_string())
                .collect(),
            land_speed: creature.land_speed,
            fly_speed: creature.fly_speed,
            burrow_speed: creature.burrow_speed,
            climb_speed: creature.climb_speed,
            hover_speed: creature.hover_speed,
            swim_speed: creature.swim_speed,
            blindsight: creature.blindsight,
            darkvision: creature.darkvision,
            tremorsense: creature.tremorsense,
            truesight: creature.truesight,
            strength: creature.strength,
            dexterity: creature.dexterity,
            constitution: creature.constitution,
            intelligence: creature.intelligence,
            wisdom: creature.wisdom,
            charisma: creature.charisma,
            prof_bonus: creature.prof_bonus,
            challenge_rating: creature.challenge_rating,
            reward_xp: creature.reward_xp,
            is_legendary: creature.is_legendary,
            has_lair: creature.has_lair,
            alignment_id: creature.alignment_id,
            creature_type_id: creature.creature_type_id,
            size_id: creature.size_id,
            source_abbr: creature.source_abbr,
            alignment: Some(AlignmentDto::get_by_id(&creature.alignment_id)),
            creature_type: Some(CreatureTypeDto::get_by_id(&creature.creature_type_id)),
            size: Some(SizeDto::get_by_id(&creature.size_id)),
            proficiencies: Some(CreatureProfDto::get_profs_by_creature_id(&creature.id)),
            immunities: Some(CreatureImmunityDto::get_immunities_by_creature_id(
                &creature.id,
            )),
            cond_immunities: Some(CreatureCondImmunityDto::get_conditions_by_creature_id(
                &creature.id,
            )),
            resistances: Some(CreatureResistanceDto::get_resistances_by_creature_id(
                &creature.id,
            )),
            weaknesses: Some(CreatureWeaknessDto::get_weaknesses_by_creature_id(
                &creature.id,
            )),
            languages: Some(CreatureLanguageDto::get_languages_by_creature_id(
                &creature.id,
            )),
            environments: Some(CreatureEnvironmentDto::get_envs_by_creature_ids(
                &creature.id,
            )),
            abilities: Some(CreatureAbilityDto::get_abilities_by_creature_id(
                &creature.id,
            )),
            actions: Some(CreatureActionDto::get_actions_by_creature_id(&creature.id).unwrap()),
            source,
        }
    }
}
