use diesel::prelude::*;
use log::{error, info};
use serde::{Deserialize, Serialize};

use crate::{
    db::connect_db,
    dto::spell::{
        magic_school_spells_dto::MagicSchoolSpellDto, new_spell_dto::NewSpellDto,
        spell_class::SpellClassDto,
    },
    models::spell::{new_spell::NewSpell, spell::Spell},
};

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, AsChangeset)]
#[diesel(table_name = crate::schema::spells)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct SpellDto {
    pub id: i32,
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
}

impl SpellDto {
    pub fn get_all() -> Result<Vec<Spell>, String> {
        use crate::schema::spells::dsl::*;

        let conn = &mut connect_db();

        info!("Loading all spells");
        let found_spells = match spells.load::<SpellDto>(conn) {
            Ok(all_spells) => all_spells,
            Err(e) => {
                error!("There was an error reading spells");
                error!("{}", e);
                return Err(e.to_string());
            }
        };

        info!(
            "Retreived {} spells, building full spell..",
            found_spells.len()
        );
        let mapped = found_spells
            .into_iter()
            .try_fold(Vec::new(), |mut acc, s| match Spell::build_full(s) {
                Ok(spell) => {
                    acc.push(spell);
                    Ok(acc)
                }
                Err(e) => Err(e),
            })?;

        info!("All spells mapped successfully");

        Ok(mapped)
    }

    pub fn get_by_id(spell_id: &i32) -> Result<Spell, String> {
        use crate::schema::spells::dsl::*;

        let conn = &mut connect_db();
        info!("Loading spell with id {}", spell_id);

        match spells.find(spell_id).first::<SpellDto>(conn) {
            Ok(found_spell) => {
                info!("Found spell {}", spell_id);

                let spell = Spell::build_full(found_spell)?;
                Ok(spell)
            }
            Err(e) => {
                error!("Error reading spell {}, Error: {}", spell_id, e);
                Err(format!("Error getting spell (id: {}): {}", spell_id, e))
            }
        }
    }

    pub fn insert_full_spell(new_spell: NewSpell) -> QueryResult<()> {
        let conn = &mut connect_db();

        conn.transaction(|connection| {
            info!("Inserting new spell...");
            let inserted_spell: SpellDto = diesel::insert_into(crate::schema::spells::table)
                .values(NewSpellDto::from(&new_spell))
                .get_result(connection)?;

            info!("Spell inserted succesfully!");

            MagicSchoolSpellDto::save_spell_schools(
                connection,
                new_spell.magic_school_ids,
                &inserted_spell.id,
            )?;

            info!("Spells' magic schools inserted succesfully");

            SpellClassDto::save_spell_classes(connection, new_spell.class_ids, &inserted_spell.id)?;

            info!("Spells' classes inserted succesfully");

            Ok(())
        })
    }

    // TODO: pub fn get_editable_by_id(spell_id: &i32) -> Result<, String> {}
    // TODO: pub fn update(spell) -> QueryResult<()> {}
    // TODO: pub fn delete(spell_id: &i32) -> Result<(), String> {}
}
