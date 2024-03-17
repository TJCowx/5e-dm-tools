use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::creature::creature_ability::{BaseCreatureAbility, CreatureAbility};

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
        abilities: &Vec<CreatureAbility>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_abilities::dsl::*;

        // Get the Ids of the abilities that are not null
        let ids: Vec<i32> = abilities
            .iter()
            .filter_map(|a| match a {
                CreatureAbility::Id(ca) => Some(ca.id),
                _ => None,
            })
            .collect();

        // Delete the abilities that are not in the list of ids
        diesel::delete(creature_abilities.filter(creature_id.eq(parent_id).and(id.ne_all(ids))))
            .execute(conn)?;

        // Update all existing Ids
        let update_operations = abilities
            .iter()
            .filter_map(|ability| match ability {
                CreatureAbility::Id(a) => Some(a),
                _ => None,
            })
            .map(|a| {
                diesel::update(
                    creature_abilities.filter(creature_id.eq(parent_id).and(id.eq(a.id))),
                )
                .set((name.eq(&a.name), description.eq(&a.description)))
            });

        // Execute all update operations
        for operation in update_operations {
            operation.execute(conn)?;
        }

        // Get the abilities that do not have the id set
        let new_abilities: Vec<BaseCreatureAbility> = abilities
            .iter()
            .filter_map(|ability| match ability {
                CreatureAbility::Base(a) => Some(BaseCreatureAbility {
                    name: a.name.clone(),
                    description: a.description.clone(),
                }),
                _ => None,
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
