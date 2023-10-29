use crate::{
    db::connect_db,
    dto::{alignment_dto::AlignmentDto, proficiency_dto::ProficiencyDto, size_dto::SizeDto},
    models::creature::{Creature, EditableCreature},
    schema::creatures::{self, dsl::creatures as all_creatures},
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::{
    creature_ability_dto::CreatureAbilityDto, creature_action_dto::CreatureActionDto,
    creature_cond_immunity_dto::CreatureCondImmunityDto,
    creature_immunity_dto::CreatureImmunityDto, creature_language_dto::CreatureLanguageDto,
    creature_prof_dto::CreatureProfDto, creature_resistance_dto::CreatureResistanceDto,
    creature_type_dto::CreatureTypeDto, creature_weakness_dto::CreatureWeaknessDto,
};
use crate::models::new_creature::NewCreature;

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, AsChangeset)]
#[diesel(table_name = crate::schema::creatures)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureDto {
    id: i32,
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

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::creatures)]
struct NewCreatureDto {
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

impl From<Creature> for CreatureDto {
    fn from(creature: Creature) -> Self {
        CreatureDto {
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
        }
    }
}

impl CreatureDto {
    // TODO: Maybe turn this into a trait on this struct
    fn make_insert_creature(creature: &NewCreature) -> NewCreatureDto {
        NewCreatureDto {
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

    // TODO: Maybe turn this ino a trait on creature
    fn map_display_creature(creature: Self) -> Creature {
        Creature {
            id: creature.id,
            name: creature.name,
            description: creature.description,
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die,
            saving_throws: creature
                .saving_throws
                .split(',')
                .map(|s| s.to_string())
                .collect(),
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
            alignment: AlignmentDto::get_by_id(&creature.alignment_id),
            creature_type: CreatureTypeDto::get_by_id(&creature.creature_type_id),
            size: SizeDto::get_by_id(&creature.size_id),
            proficiencies: CreatureProfDto::get_profs_by_creature_id(&creature.id),
            immunities: CreatureImmunityDto::get_immunities_by_creature_id(&creature.id),
            cond_immunities: CreatureCondImmunityDto::get_conditions_by_creature_id(&creature.id),
            resistances: CreatureResistanceDto::get_resistances_by_creature_id(&creature.id),
            weaknesses: CreatureWeaknessDto::get_weaknesses_by_creature_id(&creature.id),
            languages: CreatureLanguageDto::get_languages_by_creature_id(&creature.id),
            abilities: CreatureAbilityDto::get_abilities_by_creature_id(&creature.id),
            actions: CreatureActionDto::get_actions_by_creature_id(&creature.id).unwrap(),
        }
    }

    // TODO: turn this into a trait
    pub fn map_edit_creature(creature: Self) -> EditableCreature {
        EditableCreature {
            id: creature.id,
            name: creature.name,
            description: creature.description,
            armour_class: creature.armour_class,
            hit_points: creature.hit_points,
            hit_die: creature.hit_die,
            saving_throws: creature
                .saving_throws
                .split(',')
                .map(|s| s.to_string())
                .collect(),
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
            proficiency_ids: CreatureProfDto::get_prof_ids_by_creature_id(&creature.id),
            immunity_ids: CreatureImmunityDto::get_immunity_ids_by_creature_id(&creature.id),
            cond_immunity_ids: CreatureCondImmunityDto::get_cond_ids_by_creature_id(&creature.id),
            resistance_ids: CreatureResistanceDto::get_resistance_ids_by_creature_id(&creature.id),
            weakness_ids: CreatureWeaknessDto::get_weakness_ids_by_creature_id(&creature.id),
            language_ids: CreatureLanguageDto::get_language_ids_by_creature_id(&creature.id),
            abilities: CreatureAbilityDto::get_abilities_by_creature_id(&creature.id),
            actions: CreatureActionDto::get_actions_by_creature_id(&creature.id).unwrap(),
        }
    }

    pub fn get_all() -> Vec<Creature> {
        let conn = &mut connect_db();

        let creatures = all_creatures
            .load::<CreatureDto>(conn)
            .expect("Failed to get all creatures!");

        creatures
            .into_iter()
            .map(Self::map_display_creature)
            .collect()
    }

    pub fn get_by_id(creature_id: i32) -> Result<Creature, String> {
        let conn = &mut connect_db();

        match all_creatures.find(creature_id).first::<CreatureDto>(conn) {
            Ok(found) => Ok(Self::map_display_creature(found)),
            Err(e) => Err(format!("Error getting creature: {}", e)),
        }
    }

    pub fn get_editable_by_id(creature_id: i32) -> Result<EditableCreature, String> {
        let conn = &mut connect_db();

        match all_creatures.find(creature_id).first::<CreatureDto>(conn) {
            Ok(found) => Ok(Self::map_edit_creature(found)),
            Err(e) => Err(format!("Error getting creature: {}", e)),
        }
    }

    pub fn insert_full_creature(creature: NewCreature) -> QueryResult<()> {
        let conn = &mut connect_db();
        println!("{:?}", creature);

        conn.transaction(|connection| {
            let inserted_creature: CreatureDto = diesel::insert_into(creatures::table)
                .values(Self::make_insert_creature(&creature))
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

    pub fn update(creature: &Creature) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|connection| {
            // diesel::update(all_creatures.find(creature.id))
            //     .set(Self::make_insert_creature(creature))
            //     .execute(connection)?;

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
            // CreatureAction::delete_actions(connection, &id)?;

            diesel::delete(all_creatures.find(id)).execute(connection)?;

            Ok(())
        })
    }
}
