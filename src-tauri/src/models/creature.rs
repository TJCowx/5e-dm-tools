// use crate::schema::creatures::dsl::creatures as all_creatures;
use crate::schema::creatures::{self, dsl::creatures as all_creatures};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::db::connect_db;

use super::{
    creature_ability::{BaseCreatureAbility, CreatureAbility},
    creature_action::{CreatureAction, CreatureActionIn},
    creature_cond_immunity::CreatureCondImmunity,
    creature_immunity::CreatureImmunity,
    creature_language::CreatureLanguage,
    creature_prof::CreatureProf,
    creature_resistance::CreatureResistance,
    creature_saving_throw::CreatureSavingThrow,
    creature_weakness::CreatureWeakness,
};

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
    abilities: Vec<BaseCreatureAbility>,
    actions: Vec<CreatureActionIn>,
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

            CreatureProf::save_creature_profs(
                conn,
                associations.proficiencies,
                &inserted_creature.id,
            );
            CreatureSavingThrow::save_creature_saving_throws(
                conn,
                associations.saving_throws,
                &inserted_creature.id,
            );
            CreatureImmunity::save_creature_immunities(
                conn,
                associations.immunities,
                &inserted_creature.id,
            );
            CreatureCondImmunity::save_creature_cond_immunities(
                conn,
                associations.cond_immunities,
                &inserted_creature.id,
            );
            CreatureResistance::save_creature_resistances(
                conn,
                associations.resistances,
                &inserted_creature.id,
            );
            CreatureWeakness::save_creature_weaknesses(
                conn,
                associations.weaknesses,
                &inserted_creature.id,
            );
            CreatureLanguage::save_creature_languages(
                conn,
                associations.languages,
                &inserted_creature.id,
            );
            CreatureAbility::save_abilities(conn, associations.abilities, &inserted_creature.id);
            CreatureAction::save_actions(conn, associations.actions, &inserted_creature.id);

            Ok(())
        })
    }
}
