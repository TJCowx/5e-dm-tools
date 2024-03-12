use crate::dto::creature::{
    creature_ability_dto::CreatureAbilityDto, creature_action_dto::CreatureActionDto,
    creature_cond_immunity_dto::CreatureCondImmunityDto, creature_dto::CreatureDto,
    creature_immunity_dto::CreatureImmunityDto, creature_language_dto::CreatureLanguageDto,
    creature_prof_dto::CreatureProfDto, creature_resistance_dto::CreatureResistanceDto,
    creature_weakness_dto::CreatureWeaknessDto,
};

use super::{creature_ability::BaseCreatureAbility, creature_action::CreatureAction};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EditableCreature {
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

    pub proficiencies: Vec<i32>,
    pub immunities: Vec<i32>,
    pub cond_immunities: Vec<i32>,
    pub resistances: Vec<i32>,
    pub weaknesses: Vec<i32>,
    pub languages: Vec<i32>,

    pub abilities: Vec<BaseCreatureAbility>,
    pub actions: Vec<CreatureAction>,
}

impl From<CreatureDto> for EditableCreature {
    fn from(creature: CreatureDto) -> Self {
        EditableCreature {
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
            proficiencies: CreatureProfDto::get_prof_ids_by_creature_id(&creature.id),
            immunities: CreatureImmunityDto::get_immunity_ids_by_creature_id(&creature.id),
            cond_immunities: CreatureCondImmunityDto::get_cond_ids_by_creature_id(&creature.id),
            resistances: CreatureResistanceDto::get_resistance_ids_by_creature_id(&creature.id),
            weaknesses: CreatureWeaknessDto::get_weakness_ids_by_creature_id(&creature.id),
            languages: CreatureLanguageDto::get_language_ids_by_creature_id(&creature.id),
            abilities: CreatureAbilityDto::get_abilities_by_creature_id(&creature.id)
                .into_iter()
                .map(|a| BaseCreatureAbility::from(a))
                .collect(),
            actions: CreatureActionDto::get_actions_by_creature_id(&creature.id).unwrap(),
        }
    }
}
