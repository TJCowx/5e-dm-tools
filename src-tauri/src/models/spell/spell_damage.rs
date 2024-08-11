use serde::{Deserialize, Serialize};

use crate::dto::{damage_type_dto::DamageTypeDto, spell::spell_damage_dto::SpellDamageDto};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SpellDamage {
    pub id: i32,
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,

    pub damage_type: DamageTypeDto,
}

impl SpellDamage {
    pub fn build_full(d: SpellDamageDto) -> Self {
        Self {
            id: d.id,
            default_damage: d.default_damage,
            dice: d.dice.clone(),
            type_id: d.type_id,
            damage_type: DamageTypeDto::get_by_id(d.type_id),
        }
    }
}
