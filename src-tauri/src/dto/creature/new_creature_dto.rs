use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::new_creature::NewCreature;

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::creatures)]
pub struct NewCreatureDto {
    name: String,
    description: Option<String>,
    armour_class: i32,
    hit_points: i32,
    hit_die: String,
    saving_throws: String,
    land_speed: Option<i32>,
    fly_speed: Option<i32>,
    burrow_speed: Option<i32>,
    climb_speed: Option<i32>,
    hover_speed: Option<i32>,
    blindsight: Option<i32>,
    darkvision: Option<i32>,
    tremorsense: Option<i32>,
    truesight: Option<i32>,
    strength: i32,
    dexterity: i32,
    constitution: i32,
    intelligence: i32,
    wisdom: i32,
    charisma: i32,
    prof_bonus: i32,
    challenge_rating: f32,
    reward_xp: i32,
    is_legendary: bool,
    has_lair: bool,
    alignment_id: i32,
    creature_type_id: i32,
    size_id: i32,
}

impl From<&NewCreature> for NewCreatureDto {
    fn from(creature: &NewCreature) -> Self {
        Self {
            name: creature.name.clone(),
            description: creature.description.clone(),
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die.clone(),
            saving_throws: creature.saving_throws.clone(),
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
        }
    }
}
