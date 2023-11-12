use serde::{Deserialize, Serialize};

use crate::dto::creature::creature_ability_dto::CreatureAbilityDto;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatureAbility {
    pub id: i32,
    pub name: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureAbility {
    pub id: Option<i32>,
    pub name: String,
    pub description: String,
}

impl From<CreatureAbilityDto> for BaseCreatureAbility {
    fn from(ability: CreatureAbilityDto) -> Self {
        BaseCreatureAbility {
            id: Some(ability.id),
            name: ability.name,
            description: ability.description,
        }
    }
}
