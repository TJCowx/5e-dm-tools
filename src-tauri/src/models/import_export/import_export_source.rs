use super::import_export_creature::ImportExportCreature;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ImportExportSource {
    abbreviation: String,
    name: String,
    creature: Vec<ImportExportCreature>,
}
