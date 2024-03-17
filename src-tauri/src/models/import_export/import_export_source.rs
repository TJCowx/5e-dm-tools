use super::import_export_creature::ImportExportCreature;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ImportExportSource {
    pub abbreviation: String,
    pub name: String,
    pub creature: Vec<ImportExportCreature>,
}
