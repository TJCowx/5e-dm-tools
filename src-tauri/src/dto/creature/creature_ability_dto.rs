use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::creature::creature_ability::BaseCreatureAbility;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creature_abilities)]
#[diesel(belongs_to(Creature))]
pub struct CreatureAbilityDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub creature_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_abilities)]
pub struct NewCreatureAbilityDto {
    pub name: String,
    pub description: String,
    pub creature_id: i32,
}

impl CreatureAbilityDto {
    pub fn save_abilities(
        conn: &mut SqliteConnection,
        abilities: Vec<BaseCreatureAbility>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creature_abilities::dsl::*;

        let mapped_abilities: Vec<NewCreatureAbilityDto> = abilities
            .iter()
            .map(|ability| NewCreatureAbilityDto {
                name: ability.name.clone(),
                description: ability.description.clone(),
                creature_id: *parent_id,
            })
            .collect();

        diesel::insert_into(creature_abilities)
            .values(&mapped_abilities)
            .execute(conn)
    }

    pub fn update_abilities(
        conn: &mut SqliteConnection,
        abilities: &Vec<BaseCreatureAbility>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_abilities::dsl::*;

        // Get the Ids of the abilities that are not null
        let ids: Vec<i32> = abilities
            .iter()
            .filter(|ability| ability.id.is_some())
            .map(|ability| ability.id.unwrap())
            .collect();

        // Delete the abilities that are not in the list of ids
        diesel::delete(creature_abilities.filter(creature_id.eq(parent_id).and(id.ne_all(ids))))
            .execute(conn)?;

        // Update the abilities that have the id set
        for ability in abilities.iter().filter(|ability| ability.id.is_some()) {
            diesel::update(
                creature_abilities
                    .filter(creature_id.eq(parent_id).and(id.eq(ability.id.unwrap()))),
            )
            .set((name.eq(&ability.name), description.eq(&ability.description)))
            .execute(conn)?;
        }

        // Get the abilities that do not have the id set
        let new_abilities: Vec<BaseCreatureAbility> = abilities
            .iter()
            .filter(|ability| ability.id.is_none())
            .map(|ability| BaseCreatureAbility {
                id: None,
                name: ability.name.clone(),
                description: ability.description.clone(),
            })
            .collect();

        // Insert the new abilities
        Self::save_abilities(conn, new_abilities, parent_id)?;

        Ok(())
    }

    pub fn delete_abilities(conn: &mut SqliteConnection, parent_id: &i32) -> QueryResult<usize> {
        use crate::schema::creature_abilities::dsl::*;

        diesel::delete(creature_abilities.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_abilities_by_creature_id(parent_id: &i32) -> Vec<CreatureAbilityDto> {
        use crate::schema::creature_abilities::dsl::*;

        let conn = &mut crate::db::connect_db();

        creature_abilities
            .filter(creature_id.eq(parent_id))
            .load::<CreatureAbilityDto>(conn)
            .expect("Error loading abilities")
    }
}
