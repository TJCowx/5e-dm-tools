use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::db::connect_db;

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, AsChangeset)]
#[diesel(table_name = crate::schema::spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct SpellDto {
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

impl SpellDto {
    pub fn get_all() -> Result<Vec<SpellDto>, String> {
        use crate::schema::spells::dsl::*;

        let conn = &mut connect_db();

        println!("[server] Loading all spells");
        match spells.load::<SpellDto>(conn) {
            Ok(all_spells) => {
                // TODO: Convert spells into non-dto version
                let spell_iter = all_spells.into_iter().map(|s| s).collect();

                Ok(spell_iter)
            }
            Err(e) => {
                println!("[server] There was an error reading spells");
                println!("{}", e);
                Err(e.to_string())
            }
        }
    }

    pub fn get_by_id(spell_id: &i32) -> Result<SpellDto, String> {
        use crate::schema::spells::dsl::*;

        let conn = &mut connect_db();
        println!("[server] Loading spell with id {}", spell_id);

        match spells.find(spell_id).first::<SpellDto>(conn) {
            Ok(found_spell) => {
                println!("[server] Found spell {}", spell_id);

                // TODO: Convert the spell into a non-dto version
                Ok(found_spell)
            }
            Err(e) => {
                println!("[server] Error reading spell {}, Error: {}", spell_id, e);
                Err(format!("Error getting spell (id: {}): {}", spell_id, e))
            }
        }
    }

    // TODO: pub fn get_editable_by_id(spell_id: &i32) -> Result<, String> {}
    // TODO: pub fn insert_full_spell(spell) -> QueryResult<()> {}
    // TODO: pub fn update(spell) -> QueryResult<()> {}
    // TODO: pub fn delete(spell_id: &i32) -> Result<(), String> {}
}
