use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewSpellDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub higher_levels: Option<String>,
    pub spell_slot: i32,
    pub requires_verbal: bool,
    pub requires_somatic: bool,
    pub requires_material: bool,
    pub level: i32,
    pub casting_time: String,
    pub can_ritual_cast: bool,
    pub range_type_id: i32,
    pub range: Option<String>,
    pub cast_type_id: i32,
    pub cast_time: i32,
    pub aoe_type_id: Option<i32>,
    pub aoe_size: Option<i32>,
    pub duration_type_id: i32,
    pub time_scale_id: Option<i32>,
    pub duration: Option<i32>,
    pub hit_count: i32,
}

impl NewSpellDto {}
