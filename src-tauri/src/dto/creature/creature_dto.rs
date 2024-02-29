use crate::{
    db::connect_db,
    dto::creature::new_creature_dto::NewCreatureDto,
    models::{creature::Creature, editable_creature::EditableCreature},
    schema::creatures::{self, dsl::creatures as all_creatures},
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::{
    creature_ability_dto::CreatureAbilityDto, creature_action_dto::CreatureActionDto,
    creature_cond_immunity_dto::CreatureCondImmunityDto,
    creature_immunity_dto::CreatureImmunityDto, creature_language_dto::CreatureLanguageDto,
    creature_prof_dto::CreatureProfDto, creature_resistance_dto::CreatureResistanceDto,
    creature_weakness_dto::CreatureWeaknessDto,
};
use crate::models::new_creature::NewCreature;

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, AsChangeset)]
#[diesel(table_name = crate::schema::creatures)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureDto {
    pub id: i32,
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
}

impl From<Creature> for CreatureDto {
    fn from(creature: Creature) -> Self {
        Self {
            id: creature.id,
            name: creature.name,
            description: creature.description,
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die,
            saving_throws: creature.saving_throws.join(","),
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
            source_abbr: creature.source_abbr,
        }
    }
}

impl From<&EditableCreature> for CreatureDto {
    fn from(creature: &EditableCreature) -> Self {
        Self {
            id: creature.id,
            name: creature.name.clone(),
            description: creature.description.clone(),
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die.clone(),
            saving_throws: creature.saving_throws.join(","),
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
            source_abbr: creature.source_abbr.clone(),
        }
    }
}

impl CreatureDto {
    pub fn get_all() -> Vec<Creature> {
        let conn = &mut connect_db();

        let creatures = all_creatures
            .load::<CreatureDto>(conn)
            .expect("Failed to get all creatures!");

        creatures.into_iter().map(|c| Creature::from(c)).collect()
    }

    pub fn get_by_id(creature_id: i32) -> Result<Creature, String> {
        let conn = &mut connect_db();

        match all_creatures.find(creature_id).first::<CreatureDto>(conn) {
            Ok(found) => Ok(Creature::from(found)),
            Err(e) => Err(format!("Error getting creature: {}", e)),
        }
    }

    pub fn get_editable_by_id(creature_id: i32) -> Result<EditableCreature, String> {
        let conn = &mut connect_db();

        match all_creatures.find(creature_id).first::<CreatureDto>(conn) {
            Ok(found) => Ok(EditableCreature::from(found)),
            Err(e) => Err(format!("Error getting creature: {}", e)),
        }
    }

    pub fn insert_full_creature(creature: NewCreature) -> QueryResult<()> {
        let conn = &mut connect_db();
        println!("{:?}", creature);

        conn.transaction(|connection| {
            let inserted_creature: CreatureDto = diesel::insert_into(creatures::table)
                .values(NewCreatureDto::from(&creature))
                .get_result(connection)?;

            CreatureProfDto::save_creature_profs(
                connection,
                creature.proficiencies,
                &inserted_creature.id,
            )?;
            CreatureImmunityDto::save_creature_immunities(
                connection,
                creature.immunities,
                &inserted_creature.id,
            )?;
            CreatureCondImmunityDto::save_creature_cond_immunities(
                connection,
                creature.cond_immunities,
                &inserted_creature.id,
            )?;
            CreatureResistanceDto::save_creature_resistances(
                connection,
                creature.resistances,
                &inserted_creature.id,
            )?;
            CreatureWeaknessDto::save_creature_weaknesses(
                connection,
                creature.weaknesses,
                &inserted_creature.id,
            )?;
            CreatureLanguageDto::save_creature_languages(
                connection,
                creature.languages,
                &inserted_creature.id,
            )?;
            CreatureAbilityDto::save_abilities(
                connection,
                creature.abilities,
                &inserted_creature.id,
            )?;
            CreatureActionDto::save_actions(connection, creature.actions, &inserted_creature.id)?;

            Ok(())
        })
    }

    pub fn update(creature: &EditableCreature) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|trans| {
            diesel::update(all_creatures.find(creature.id))
                .set(Self::from(creature))
                .execute(trans)?;

            CreatureProfDto::update_creature_profs(trans, &creature.proficiencies, &creature.id)?;
            CreatureImmunityDto::update_creature_immunities(
                trans,
                &creature.immunities,
                &creature.id,
            )?;
            CreatureCondImmunityDto::update_creature_cond_immunities(
                trans,
                &creature.cond_immunities,
                &creature.id,
            )?;
            CreatureResistanceDto::update_creature_resistances(
                trans,
                &creature.resistances,
                &creature.id,
            )?;
            CreatureWeaknessDto::update_creature_weaknesses(
                trans,
                &creature.weaknesses,
                &creature.id,
            )?;
            CreatureLanguageDto::update_creature_languages(
                trans,
                &creature.languages,
                &creature.id,
            )?;
            CreatureAbilityDto::update_abilities(trans, &creature.abilities, &creature.id)?;
            CreatureActionDto::update_actions(trans, &creature.actions, &creature.id)?;

            Ok(())
        })
    }

    pub fn delete(id: i32) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|connection| {
            CreatureProfDto::delete_creature_profs(connection, &id)?;
            CreatureImmunityDto::delete_creature_immunities(connection, &id)?;
            CreatureCondImmunityDto::delete_creature_cond_immunities(connection, &id)?;
            CreatureResistanceDto::delete_creature_resistances(connection, &id)?;
            CreatureWeaknessDto::delete_creature_weaknesses(connection, &id)?;
            CreatureLanguageDto::delete_creature_languages(connection, &id)?;
            CreatureAbilityDto::delete_abilities(connection, &id)?;
            CreatureActionDto::delete_actions_by_creature_id(connection, &id)?;

            diesel::delete(all_creatures.find(id)).execute(connection)?;

            Ok(())
        })
    }
}
