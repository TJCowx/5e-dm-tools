// use crate::schema::creatures::dsl::creatures as all_creatures;
use crate::schema::{
    creatures::{self, dsl::creatures as all_creatures},
    creatures_condition_immunities, creatures_immunities, creatures_languages,
    creatures_proficiencies, creatures_resistances, creatures_saving_throws, proficiencies,
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::db::connect_db;

use super::creature_ability::NewCreatureAbility;

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

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures)]
pub struct NewCreature {
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
}

pub struct CreatureAssociations {
    proficiencies: Vec<i32>,
    saving_throws: Vec<i32>,
    immunities: Vec<i32>,
    cond_immunities: Vec<i32>,
    resistances: Vec<i32>,
    weaknesses: Vec<i32>,
    languages: Vec<i32>,
    abilities: Vec<NewCreatureAbility>,
    // pub actions: Vec<Action>,
}

impl Creature {
    pub fn get_all() -> Vec<Creature> {
        let conn = &mut connect_db();

        all_creatures
            .load::<Creature>(conn)
            .expect("Failed to get all creatures!")
    }

    // TODO: Get all properties eventually
    pub fn get_by_id(id: i32) -> Creature {
        let conn = &mut connect_db();

        all_creatures
            .find(id)
            .first::<Creature>(conn)
            .expect("Failed to get creature")
    }

    pub fn insert_full_creature(
        creature: NewCreature,
        associations: CreatureAssociations,
    ) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|connection| {
            let inserted_creature: Creature = diesel::insert_into(creatures::table)
                .values(&creature)
                .get_result(connection)?;

            for id in associations.proficiencies {
                diesel::insert_into(creatures_proficiencies::table)
                    .values((
                        creatures_proficiencies::creature_id.eq(inserted_creature.id),
                        creatures_proficiencies::proficiency_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            for id in associations.saving_throws {
                diesel::insert_into(creatures_saving_throws::table)
                    .values((
                        creatures_saving_throws::creature_id.eq(inserted_creature.id),
                        creatures_saving_throws::saving_throw_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            for id in associations.immunities {
                diesel::insert_into(creatures_immunities::table)
                    .values((
                        creatures_immunities::creature_id.eq(inserted_creature.id),
                        creatures_immunities::immunity_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            for id in associations.cond_immunities {
                diesel::insert_into(creatures_condition_immunities::table)
                    .values((
                        creatures_condition_immunities::creature_id.eq(inserted_creature.id),
                        creatures_condition_immunities::condition_immunity_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            for id in associations.resistances {
                diesel::insert_into(creatures_resistances::table)
                    .values((
                        creatures_resistances::creature_id.eq(inserted_creature.id),
                        creatures_resistances::resistance_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            for id in associations.weaknesses {
                // TODO: Missing creatures weaknesses
            }

            for id in associations.languages {
                diesel::insert_into(creatures_languages::table)
                    .values((
                        creatures_languages::creature_id.eq(inserted_creature.id),
                        creatures_languages::language_id.eq(id),
                    ))
                    .execute(connection)?;
            }

            // TODO: Abilities
            // TODO: Actions

            Ok(())
        })
    }
}
