use bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

pub use crate::models::{ability::Ability, action::Action};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Creature {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: String,
    pub size: String,
    pub creature_type: String,
    pub alignment: String,
    pub armour_class: i16,
    pub hit_points: i16,
    pub hit_die: String,
    pub land_speed: Option<i16>,
    pub fly_speed: Option<i16>,
    pub burrow_speed: Option<i16>,
    pub climb_speed: Option<i16>,
    pub hover_speed: Option<i16>,
    pub blindsight: Option<i16>,
    pub darkvision: Option<i16>,
    pub tremorsense: Option<i16>,
    pub truesight: Option<i16>,
    pub strength: i16,
    pub dexterity: i16,
    pub constitution: i16,
    pub intelligence: i16,
    pub wisdom: i16,
    pub charisma: i16,
    pub prof_bonus: i16,
    pub challenge_rating: i16,
    pub reward_xp: i16,
    pub proficiencies: Vec<String>,
    pub saving_throws: Vec<String>,
    pub immunities: Vec<String>,
    pub cond_immunities: Vec<String>,
    pub resistances: Vec<String>,
    pub weaknesses: Vec<String>,
    pub languages: Vec<String>,
    pub actions: Vec<Action>,
    pub abilities: Vec<Ability>,
    pub is_legendary: bool,
    pub has_lair: bool,
}
