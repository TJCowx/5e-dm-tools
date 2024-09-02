PRAGMA foreign_keys = OFF;

ALTER TABLE creatures RENAME TO creatures_old;

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
    -- Start new fields
    spellcasting_ability TEXT NULL,
    spellcasting_save_dc INTEGER NULL,
    spellcasting_attack INTEGER NULL,
    level_one_slots INTEGER NULL,
    level_two_slots INTEGER NULL,
    level_three_slots INTEGER NULL,
    level_four_slots INTEGER NULL,
    level_five_slots INTEGER NULL,
    level_six_slots INTEGER NULL,
    level_seven_slots INTEGER NULL,
    level_eight_slots INTEGER NULL,
    level_nine_slots INTEGER NULL,
    innate_casting_ability TEXT NULL,
    innate_casting_save_dc INTEGER NULL,
    innate_casting_attack INTEGER NULL,
    -- End new fields
    FOREIGN KEY (alignment_id) REFERENCES alignments(id) ON DELETE RESTRICT FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (creature_type_id) REFERENCES creature_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (source_abbr) REFERENCES sources(abbreviation) ON DELETE
    SET
        NULL
);

CREATE TABLE creature_spells (
    spell_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,

    PRIMARY KEY (spell_id, creature_id),
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
);

CREATE TABLE innate_creature_spells (
    spell_id INTEGER NOT NULL,
    creature_id INTEGER NOT NULL,

    PRIMARY KEY (spell_id, creature_id),
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
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
        swim_speed,
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
    swim_speed,
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

DROP TABLE creatures_old;

PRAGMA foreign_keys = ON;
