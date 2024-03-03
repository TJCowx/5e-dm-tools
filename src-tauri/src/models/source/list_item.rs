use serde::{Deserialize, Serialize};

use crate::dto::{creature::creature_dto::CreatureDto, source::source_dto::SourceDto};

#[derive(Debug, Deserialize, Serialize)]
pub struct SourceListItem {
    pub abbreviation: String,
    pub name: String,
    pub creature_count: i64,
}

impl From<SourceDto> for SourceListItem {
    fn from(source: SourceDto) -> Self {
        Self {
            abbreviation: source.abbreviation.clone(),
            name: source.name,
            creature_count: CreatureDto::get_count_by_source_abbr(&source.abbreviation),
        }
    }
}
