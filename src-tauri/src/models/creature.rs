use crate::dto::creature::creature_ability::CreatureAbility;
use crate::dto::creature::creature_action::CreatureAction;
use crate::dto::creature::creature_type::CreatureType;
use crate::dto::damage_type::DamageType;
use crate::dto::language::Language;

use serde::{Deserialize, Serialize};

use crate::dto::alignment::Alignment;
use crate::dto::condition_type::ConditionType;
use crate::dto::proficiency::Proficiency;
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

    pub alignment: Alignment,
    pub creature_type: CreatureType,
    pub size: SizeDto,

    pub proficiencies: Vec<Proficiency>,
    pub immunities: Vec<DamageType>,
    pub cond_immunities: Vec<ConditionType>,
    pub resistances: Vec<DamageType>,
    pub weaknesses: Vec<DamageType>,
    pub languages: Vec<Language>,
    pub abilities: Vec<CreatureAbility>,
    pub actions: Vec<CreatureAction>,
}
