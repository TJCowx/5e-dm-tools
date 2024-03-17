use crate::{
    dto::creature::{
        creature_ability_dto::CreatureAbilityDto, creature_dto::CreatureDto,
        creature_environment_dto::CreatureEnvironmentDto,
        creature_immunity_dto::CreatureImmunityDto, creature_language_dto::CreatureLanguageDto,
        creature_prof_dto::CreatureProfDto, creature_resistance_dto::CreatureResistanceDto,
        creature_weakness_dto::CreatureWeaknessDto,
    },
    models::creature::{
        creature_ability::BaseCreatureAbility, creature_action::BaseCreatureAction,
    },
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportExportCreature {
    pub name: String,
    pub description: Option<String>,
    pub armour_class: i32,
    pub hit_points: i32,
    pub hit_die: String,
    pub saving_throws: Vec<String>,
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

    pub proficiencies: Vec<i32>,
    pub immunities: Vec<i32>,
    pub resistances: Vec<i32>,
    pub weaknesses: Vec<i32>,
    pub languages: Vec<i32>,
    pub environments: Vec<i32>,

    pub abilities: Vec<BaseCreatureAbility>,
    pub actions: Vec<BaseCreatureAction>,
}

impl From<CreatureDto> for ImportExportCreature {
    fn from(dto: CreatureDto) -> Self {
        Self {
            name: dto.name,
            description: dto.description,
            armour_class: dto.armour_class,
            hit_points: dto.hit_points,
            hit_die: dto.hit_die,
            saving_throws: dto
                .saving_throws
                .split(',')
                .map(|s| s.to_string())
                .collect(),
            land_speed: dto.land_speed,
            fly_speed: dto.fly_speed,
            burrow_speed: dto.burrow_speed,
            climb_speed: dto.climb_speed,
            hover_speed: dto.hover_speed,
            blindsight: dto.blindsight,
            darkvision: dto.darkvision,
            tremorsense: dto.tremorsense,
            truesight: dto.truesight,
            strength: dto.strength,
            dexterity: dto.dexterity,
            constitution: dto.constitution,
            intelligence: dto.intelligence,
            wisdom: dto.wisdom,
            charisma: dto.charisma,
            prof_bonus: dto.prof_bonus,
            challenge_rating: dto.challenge_rating,
            reward_xp: dto.reward_xp,
            is_legendary: dto.is_legendary,
            has_lair: dto.has_lair,

            alignment_id: dto.alignment_id,
            creature_type_id: dto.creature_type_id,
            size_id: dto.size_id,
            source_abbr: dto.source_abbr,
            proficiencies: CreatureProfDto::get_prof_ids_by_creature_id(&dto.id),
            immunities: CreatureImmunityDto::get_immunity_ids_by_creature_id(&dto.id),
            resistances: CreatureResistanceDto::get_resistance_ids_by_creature_id(&dto.id),
            weaknesses: CreatureWeaknessDto::get_weakness_ids_by_creature_id(&dto.id),
            languages: CreatureLanguageDto::get_language_ids_by_creature_id(&dto.id),
            environments: CreatureEnvironmentDto::get_env_ids_by_creature_ids(&dto.id),
            abilities: CreatureAbilityDto::get_abilities_by_creature_id(&dto.id)
                .iter()
                .map(|a| BaseCreatureAbility::from(*a))
                .collect::<Vec<BaseCreatureAbility>>(),
            // actions: todo!(), // Option<Vec<BaseCreatureAction>>,
        }
    }
}
