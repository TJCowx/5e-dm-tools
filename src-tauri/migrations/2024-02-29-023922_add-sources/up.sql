PRAGMA foreign_keys = OFF;

-- Create the new source table!
CREATE TABLE sources (
    abbreviation TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

ALTER TABLE
    creatures RENAME TO creatures_old;

-- Add the optional relation to the creatures table
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
    FOREIGN KEY (source_abbr) REFERENCES sources(abbreviation) ON DELETE RESTRICT
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
        size_id
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
    size_id
FROM
    creatures_old;

PRAGMA foreign_keys = ON;