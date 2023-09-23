use crate::dto::creature::creature_ability_dto::CreatureAbilityDto;
use crate::dto::creature::creature_action_dto::CreatureActionDto;
use crate::dto::creature::creature_type_dto::CreatureTypeDto;
use crate::dto::damage_type_dto::DamageTypeDto;
use crate::dto::language_dto::LanguageDto;

use serde::{Deserialize, Serialize};

use crate::dto::alignment_dto::AlignmentDto;
use crate::dto::condition_type_dto::ConditionTypeDto;
use crate::dto::proficiency_dto::ProficiencyDto;
use crate::dto::size_dto::SizeDto;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Creature {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub armour_class: i32,
    pub hit_points: i32,
    pub hit_die: String,
    pub saving_throws: Option<String>,
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

    pub alignment: AlignmentDto,
    pub creature_type: CreatureTypeDto,
    pub size: SizeDto,

    pub proficiencies: Vec<ProficiencyDto>,
    pub immunities: Vec<DamageTypeDto>,
    pub cond_immunities: Vec<ConditionTypeDto>,
    pub resistances: Vec<DamageTypeDto>,
    pub weaknesses: Vec<DamageTypeDto>,
    pub languages: Vec<LanguageDto>,
    pub abilities: Vec<CreatureAbilityDto>,
    pub actions: Vec<CreatureActionDto>,
}
