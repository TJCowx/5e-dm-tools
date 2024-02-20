PRAGMA foreign_keys = OFF;


-- We need to create the "new" table with the unaltered
CREATE TABLE creature_actions_new (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    is_attack BOOLEAN NOT NULL,
    to_hit INTEGER NULL,
    reach INTEGER NULL,
    combatants_hit INTEGER NULL,
    attack_delivery_id INTEGER NULL,
    attack_type_id INTEGER NULL,
    action_type_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,
    FOREIGN KEY (attack_delivery_id) REFERENCES attack_deliveries(id) ON DELETE CASCADE,
    FOREIGN KEY (action_type_id) REFERENCES action_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (attack_type_id) REFERENCES attack_types(id) ON DELETE CASCADE,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
);

INSERT INTO creature_actions_new SELECT * FROM creature_actions;

DROP TABLE creature_actions;

ALTER TABLE creature_actions_new RENAME TO creature_actions;

PRAGMA foreign_key_check;


PRAGMA foreign_keys = ON;