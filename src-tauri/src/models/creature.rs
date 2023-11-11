use crate::dto::{
    alignment_dto::AlignmentDto,
    condition_type_dto::ConditionTypeDto,
    creature::{creature_ability_dto::CreatureAbilityDto, creature_type_dto::CreatureTypeDto},
    damage_type_dto::DamageTypeDto,
    language_dto::LanguageDto,
    proficiency_dto::ProficiencyDto,
    size_dto::SizeDto,
};

use serde::{Deserialize, Serialize};

use super::creature_action::CreatureAction;

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

    pub alignment: Option<AlignmentDto>,
    pub creature_type: Option<CreatureTypeDto>,
    pub size: Option<SizeDto>,

    pub proficiencies: Option<Vec<ProficiencyDto>>,
    pub immunities: Option<Vec<DamageTypeDto>>,
    pub cond_immunities: Option<Vec<ConditionTypeDto>>,
    pub resistances: Option<Vec<DamageTypeDto>>,
    pub weaknesses: Option<Vec<DamageTypeDto>>,
    pub languages: Option<Vec<LanguageDto>>,
    pub abilities: Option<Vec<CreatureAbilityDto>>,
    pub actions: Option<Vec<CreatureAction>>,
}

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

    pub proficiency_ids: Vec<i32>,
    pub immunity_ids: Vec<i32>,
    pub cond_immunity_ids: Vec<i32>,
    pub resistance_ids: Vec<i32>,
    pub weakness_ids: Vec<i32>,
    pub language_ids: Vec<i32>,

    pub abilities: Vec<CreatureAbilityDto>,
    pub actions: Vec<CreatureAction>,
}
