use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BaseCreatureAbility {
    pub name: String,
    pub description: String,
}
