CREATE TABLE creature_spells (
    spell_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,

    PRIMARY KEY (spell_id, creature_id),
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
);

