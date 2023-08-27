// use crate::schema::creatures::dsl::creatures as all_creatures;
use crate::schema::{
    creature_abilities,
    creatures::{self, dsl::creatures as all_creatures},
    creatures_condition_immunities, creatures_immunities, creatures_languages,
    creatures_proficiencies, creatures_resistances, creatures_saving_throws, creatures_weaknesses,
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::db::connect_db;

use super::{
    creature_ability::NewCreatureAbility,
    creature_cond_immunity::{CreatureCondImmunity, NewCreatureCondImmunity},
    creature_immunity::NewCreatureImmunity,
    creature_language::NewCreatureLanguage,
    creature_prof::NewCreatureProf,
    creature_resistance::NewCreatureResistance,
    creature_saving_throw::NewCreatureSavingThrow,
    creature_weakness::NewCreatureWeakness,
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

            let mapped_profs: Vec<NewCreatureProf> = associations
                .proficiencies
                .iter()
                .map(|prof_id| NewCreatureProf {
                    creature_id: inserted_creature.id,
                    proficiency_id: *prof_id,
                })
                .collect();

            let mapped_saving_throws: Vec<NewCreatureSavingThrow> = associations
                .saving_throws
                .iter()
                .map(|saving_throw_id| NewCreatureSavingThrow {
                    creature_id: inserted_creature.id,
                    saving_throw_id: *saving_throw_id,
                })
                .collect();

            let mapped_immunities: Vec<NewCreatureImmunity> = associations
                .immunities
                .iter()
                .map(|damage_type_id| NewCreatureImmunity {
                    creature_id: inserted_creature.id,
                    damage_type_id: *damage_type_id,
                })
                .collect();

            let mapped_cond_immunity: Vec<NewCreatureCondImmunity> = associations
                .cond_immunities
                .iter()
                .map(|condition_type_id| NewCreatureCondImmunity {
                    creature_id: inserted_creature.id,
                    condition_type_id: *condition_type_id,
                })
                .collect();

            let mapped_resistances: Vec<NewCreatureResistance> = associations
                .resistances
                .iter()
                .map(|damage_type_id| NewCreatureResistance {
                    creature_id: inserted_creature.id,
                    damage_type_id: *damage_type_id,
                })
                .collect();

            let mapped_weaknesses: Vec<NewCreatureWeakness> = associations
                .weaknesses
                .iter()
                .map(|damage_type_id| NewCreatureWeakness {
                    creature_id: inserted_creature.id,
                    damage_type_id: *damage_type_id,
                })
                .collect();

            let mapped_languages: Vec<NewCreatureLanguage> = associations
                .languages
                .iter()
                .map(|language_id| NewCreatureLanguage {
                    creature_id: inserted_creature.id,
                    language_id: *language_id,
                })
                .collect();

            diesel::insert_into(creatures_proficiencies::table)
                .values(&mapped_profs)
                .execute(connection)?;

            diesel::insert_into(creatures_saving_throws::table)
                .values(&mapped_saving_throws)
                .execute(connection)?;

            diesel::insert_into(creatures_immunities::table)
                .values(&mapped_immunities)
                .execute(connection)?;

            diesel::insert_into(creatures_condition_immunities::table)
                .values(&mapped_cond_immunity)
                .execute(connection)?;

            diesel::insert_into(creatures_resistances::table)
                .values(&mapped_resistances)
                .execute(connection)?;

            diesel::insert_into(creatures_weaknesses::table)
                .values(&mapped_weaknesses)
                .execute(connection)?;

            diesel::insert_into(creatures_languages::table)
                .values(&mapped_languages)
                .execute(connection)?;

            // TODO: Abilities
            for id in associations.abilities {
                // diesel::insert_into(creature_abilities::table).values((
                //     creature_abilities::creature_id.eq(inserted_creature.id),
                //     creature_abilities::name.eq(),
                // ))
            }
            // TODO: Actions

            Ok(())
        })
    }
}
