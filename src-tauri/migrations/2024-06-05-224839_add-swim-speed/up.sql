PRAGMA foreign_keys = OFF;

-- Fix a broken migration from add-sources
DROP TABLE IF EXISTS creature_abilities_old;

-- Continue
ALTER TABLE creatures RENAME TO creatures_old;

-- Add the swimming speed to the creatures table
CREATE TABLE creatures (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NULL,
    armour_class INTEGER NOT NULL,
    hit_points INTEGER NOT NULL,
    hit_die TEXT NOT NULL,
    saving_throws TEXT NOT NULL,
    land_speed INTEGER NULL,
    fly_speed INTEGER NULL,
    burrow_speed INTEGER NULL,
    climb_speed INTEGER NULL,
    hover_speed INTEGER NULL,
    swim_speed INTEGER NULL,
    blindsight INTEGER NULL,
    darkvision INTEGER NULL,
    tremorsense INTEGER NULL,
    truesight INTEGER NULL,
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    constitution INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL,
    prof_bonus INTEGER NOT NULL,
    challenge_rating REAL NOT NULL,
    reward_xp INTEGER NOT NULL,
    is_legendary BOOLEAN NOT NULL,
    has_lair BOOLEAN NOT NULL,
    alignment_id INTEGER NOT NULL,
    creature_type_id INTEGER NOT NULL,
    size_id INTEGER NOT NULL,
    source_abbr TEXT,
    FOREIGN KEY (alignment_id) REFERENCES alignments(id) ON DELETE RESTRICT FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (creature_type_id) REFERENCES creature_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (source_abbr) REFERENCES sources(abbreviation) ON DELETE
    SET
        NULL
);

INSERT INTO
    creatures (
        id,
        name,
        description,
        armour_class,
        hit_points,
        hit_die,
        saving_throws,
        land_speed,
        fly_speed,
        burrow_speed,
        climb_speed,
        hover_speed,
        blindsight,
        darkvision,
        tremorsense,
        truesight,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        prof_bonus,
        challenge_rating,
        reward_xp,
        is_legendary,
        has_lair,
        alignment_id,
        creature_type_id,
        size_id,
        source_abbr
    )
SELECT
    id,
    name,
    description,
    armour_class,
    hit_points,
    hit_die,
    saving_throws,
    land_speed,
    fly_speed,
    burrow_speed,
    climb_speed,
    hover_speed,
    blindsight,
    darkvision,
    tremorsense,
    truesight,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    prof_bonus,
    challenge_rating,
    reward_xp,
    is_legendary,
    has_lair,
    alignment_id,
    creature_type_id,
    size_id,
    source_abbr
FROM
    creatures_old;

-- Rename old tables
ALTER TABLE creatures_proficiencies RENAME TO creatures_proficiencies_old;
ALTER TABLE creatures_immunities RENAME TO creatures_immunities_old;
ALTER TABLE creatures_condition_immunities RENAME TO creatures_condition_immunities_old;
ALTER TABLE creatures_resistances RENAME TO creatures_resistances_old;
ALTER TABLE creatures_weaknesses RENAME TO creatures_weaknesses_old;
ALTER TABLE creatures_languages RENAME TO creatures_languages_old;
ALTER TABLE creature_abilities RENAME TO creature_abilities_old;
ALTER TABLE creature_actions RENAME TO creature_actions_old;
ALTER TABLE creature_action_damages RENAME TO creature_action_damages_old; 
ALTER TABLE creature_environment RENAME TO creature_environment_old;

-- Re-add into new tables
CREATE TABLE creatures_proficiencies (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    proficiency_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (proficiency_id) REFERENCES proficiencies(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creatures_immunities (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    damage_type_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (damage_type_id) REFERENCES damage_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creatures_condition_immunities (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    condition_type_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (condition_type_id) REFERENCES condition_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creatures_resistances (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    damage_type_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (damage_type_id) REFERENCES damage_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creatures_weaknesses (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    damage_type_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE RESTRICT,
    FOREIGN KEY (damage_type_id) REFERENCES damage_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creatures_languages (
    id INTEGER NOT NULL PRIMARY KEY,
    creature_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE creature_abilities (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    creature_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
);

CREATE TABLE creature_actions (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NULL,
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

CREATE TABLE creature_action_damages (
    id INTEGER NOT NULL PRIMARY KEY,
    default_damage INTEGER NOT NULL,
    dice TEXT NOT NULL,
    type_id INTEGER NOT NULL,
    action_id INTEGER NOT NULL,
    FOREIGN KEY (type_id) REFERENCES damage_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (action_id) REFERENCES creature_actions ON DELETE CASCADE
);

CREATE TABLE creature_environment (
    creature_id INTEGER NOT NULL,
    environment_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE,
    FOREIGN KEY (environment_id) REFERENCES environments(id) ON DELETE CASCADE,
    PRIMARY KEY (creature_id, environment_id)
);
-- Copy data from old into new
INSERT INTO creatures_proficiencies SELECT * FROM creatures_proficiencies_old;
INSERT INTO creatures_immunities SELECT * FROM creatures_immunities_old;
INSERT INTO creatures_condition_immunities SELECT * FROM creatures_condition_immunities_old;
INSERT INTO creatures_resistances SELECT * FROM creatures_resistances_old;
INSERT INTO creatures_weaknesses SELECT * FROM creatures_weaknesses_old;
INSERT INTO creatures_languages SELECT * FROM creatures_languages_old;
INSERT INTO creature_abilities SELECT * FROM creature_abilities_old;
INSERT INTO creature_actions SELECT * FROM creature_actions_old;
INSERT INTO creature_action_damages SELECT * FROM creature_action_damages_old;
INSERT INTO creature_environment SELECT * FROM creature_environment_old;

-- Drop tables after imported
DROP TABLE creatures_proficiencies_old;
DROP TABLE creatures_immunities_old;
DROP TABLE creatures_condition_immunities_old;
DROP TABLE creatures_resistances_old;
DROP TABLE creatures_weaknesses_old;
DROP TABLE creatures_languages_old;
DROP TABLE creature_abilities_old;
DROP TABLE creature_actions_old;
DROP TABLE creature_action_damages_old;
DROP TABLE creature_environment_old;
DROP TABLE creatures_old;

PRAGMA foreign_keys = ON;