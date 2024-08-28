use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSpell {
    pub name: String,
    pub description: Option<String>,
    pub higher_levels: Option<String>,
    pub spell_slot: i32,
    pub requires_verbal: bool,
    pub requires_somatic: bool,
    pub requires_material: bool,
    pub material_components: Option<String>,
    pub level: i32,
    pub casting_time: String,
    pub can_ritual_cast: bool,
    pub range_type_id: i32,
    pub range: Option<i32>,
    pub cast_type_id: i32,
    pub cast_time: i32,
    pub aoe_type_id: Option<i32>,
    pub aoe_size: Option<i32>,
    pub duration_type_id: i32,
    pub time_scale_id: Option<i32>,
    pub duration: Option<i32>,
    pub source_abbr: Option<String>,
    pub magic_school_id: i32,

    pub class_ids: Vec<i32>,
}
