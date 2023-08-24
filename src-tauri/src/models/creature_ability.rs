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
