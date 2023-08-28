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

pub struct BaseCreatureAbility {
    pub name: String,
    pub description: String,
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
}
