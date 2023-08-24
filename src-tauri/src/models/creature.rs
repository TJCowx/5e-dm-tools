// use crate::schema::creatures::dsl::creatures as all_creatures;
use crate::schema::creatures::dsl::creatures as all_creatures;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::db::connect_db;

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creatures)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Creature {
    id: i32,
    name: String,
    description: Option<String>,
    armour_class: i32,
    hit_points: i32,
    hit_die: String,
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
    // pub proficiencies: Vec<String>,
    // pub saving_throws: Vec<String>,
    // pub immunities: Vec<String>,
    // pub cond_immunities: Vec<String>,
    // pub resistances: Vec<String>,
    // pub weaknesses: Vec<String>,
    // pub languages: Vec<String>,
    // pub actions: Vec<Action>,
}

impl Creature {
    pub fn get_all() -> Vec<Creature> {
        let conn = &mut connect_db();

        all_creatures
            .load::<Creature>(conn)
            .expect("Failed to get all creatures!")
    }
}
