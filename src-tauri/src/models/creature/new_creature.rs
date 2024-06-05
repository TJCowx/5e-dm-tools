use serde::{Deserialize, Serialize};

use super::{creature_ability::BaseCreatureAbility, creature_action::CreatureActionFull};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewCreature {
    pub name: String,
    pub description: Option<String>,
    pub armour_class: i32,
    pub hit_points: i32,
    pub hit_die: String,
    pub saving_throws: String,
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

    pub proficiencies: Vec<i32>,
    pub immunities: Vec<i32>,
    pub cond_immunities: Vec<i32>,
    pub resistances: Vec<i32>,
    pub weaknesses: Vec<i32>,
    pub languages: Vec<i32>,
    pub environments: Vec<i32>,
    pub abilities: Vec<BaseCreatureAbility>,
    pub actions: Vec<CreatureActionFull>,
}
