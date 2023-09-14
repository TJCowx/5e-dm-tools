use crate::models::base_creature_ability::BaseCreatureAbility;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creature_abilities)]
#[diesel(belongs_to(Creature))]
pub struct CreatureAbility {
    id: i32,
    name: String,
    description: String,
    creature_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_abilities)]
pub struct NewCreatureAbility {
    pub name: String,
    pub description: String,
    pub creature_id: i32,
}

impl CreatureAbility {
    pub fn save_abilities(
        conn: &mut SqliteConnection,
        abilities: Vec<BaseCreatureAbility>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creature_abilities::dsl::*;

        let mapped_abilities: Vec<NewCreatureAbility> = abilities
            .iter()
            .map(|ability| NewCreatureAbility {
                name: ability.name.clone(),
                description: ability.description.clone(),
                creature_id: *parent_id,
            })
            .collect();

        diesel::insert_into(creature_abilities)
            .values(&mapped_abilities)
            .execute(conn)
    }

    pub fn delete_abilities(conn: &mut SqliteConnection, parent_id: &i32) -> QueryResult<usize> {
        use crate::schema::creature_abilities::dsl::*;

        diesel::delete(creature_abilities.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_abilities_by_creature_id(parent_id: &i32) -> Vec<CreatureAbility> {
        use crate::schema::creature_abilities::dsl::*;

        let conn = &mut crate::db::connect_db();

        creature_abilities
            .filter(creature_id.eq(parent_id))
            .load::<CreatureAbility>(conn)
            .expect("Error loading abilities")
    }
}
