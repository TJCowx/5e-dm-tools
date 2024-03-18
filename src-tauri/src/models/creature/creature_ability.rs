use serde::{Deserialize, Serialize};

use crate::dto::creature::creature_ability_dto::CreatureAbilityDto;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatureAbilityFull {
    pub id: i32,
    pub name: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureAbility {
    pub name: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum CreatureAbility {
    Base(BaseCreatureAbility),
    Full(CreatureAbilityFull),
}

impl From<CreatureAbilityDto> for BaseCreatureAbility {
    fn from(ability: CreatureAbilityDto) -> Self {
        BaseCreatureAbility {
            name: ability.name,
            description: ability.description,
        }
    }
}

impl From<CreatureAbilityDto> for CreatureAbilityFull {
    fn from(a: CreatureAbilityDto) -> Self {
        CreatureAbilityFull {
            id: a.id,
            name: a.name,
            description: a.description,
        }
    }
}
