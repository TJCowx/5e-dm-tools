use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct BaseCreatureAbility {
    pub name: String,
    pub description: String,
}
