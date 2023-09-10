// use crate::schema::creatures::dsl::creatures as all_creatures;
use crate::{
    db::connect_db,
    schema::creatures::{self, dsl::creatures as all_creatures},
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::{
    creature_ability::CreatureAbility, creature_action::CreatureAction,
    creature_cond_immunity::CreatureCondImmunity, creature_immunity::CreatureImmunity,
    creature_language::CreatureLanguage, creature_prof::CreatureProf,
    creature_resistance::CreatureResistance, creature_weakness::CreatureWeakness,
};
use crate::models::new_creature::NewCreature;

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
    saving_throws: Option<String>,
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

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::creatures)]
struct InsertCreature {
    name: String,
    description: Option<String>,
    armour_class: i32,
    hit_points: i32,
    hit_die: String,
    saving_throws: Option<String>,
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

impl Creature {
    fn make_insert_creature(creature: &NewCreature) -> InsertCreature {
        InsertCreature {
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

    pub fn insert_full_creature(creature: NewCreature) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|connection| {
            let inserted_creature: Creature = diesel::insert_into(creatures::table)
                .values(Self::make_insert_creature(&creature))
                .get_result(connection)?;

            CreatureProf::save_creature_profs(
                connection,
                creature.proficiencies,
                &inserted_creature.id,
            )?;
            CreatureImmunity::save_creature_immunities(
                connection,
                creature.immunities,
                &inserted_creature.id,
            )?;
            CreatureCondImmunity::save_creature_cond_immunities(
                connection,
                creature.cond_immunities,
                &inserted_creature.id,
            )?;
            CreatureResistance::save_creature_resistances(
                connection,
                creature.resistances,
                &inserted_creature.id,
            )?;
            CreatureWeakness::save_creature_weaknesses(
                connection,
                creature.weaknesses,
                &inserted_creature.id,
            )?;
            CreatureLanguage::save_creature_languages(
                connection,
                creature.languages,
                &inserted_creature.id,
            )?;
            CreatureAbility::save_abilities(connection, creature.abilities, &inserted_creature.id)?;
            CreatureAction::save_actions(connection, creature.actions, &inserted_creature.id)?;

            Ok(())
        })
    }
}
