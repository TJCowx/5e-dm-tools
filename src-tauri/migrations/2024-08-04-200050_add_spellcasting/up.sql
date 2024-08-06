-- CREATE THE TABLES
CREATE TABLE magic_schools (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE classes (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE cast_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE range_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    has_defined_range BOOLEAN NOT NULL
);

CREATE TABLE duration_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    has_time_scale BOOLEAN NOT NULL
);

CREATE TABLE time_scales (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE aoe_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE spells (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    higher_levels TEXT NULL,
    spell_slot INTEGER NOT NULL,
    requires_verbal BOOLEAN NOT NULL,
    requires_somatic BOOLEAN NOT NULL,
    requires_material BOOLEAN NOT NULL,
    level INTEGER NOT NULL,
    casting_time TEXT NOT NULL,
    can_ritual_cast BOOLEAN NOT NULL,
    range_type_id INTEGER NOT NULL,
    range TEXT NULL,
    cast_type_id INTEGER NOT NULL,
    cast_time INTEGER NOT NULL,
    aoe_type_id INTEGER NULL,
    aoe_size INTEGER NULL,
    duration_type_id INTEGER NOT NULL,
    time_scale_id INTEGER NULL,
    duration INTEGER NULL,
    hit_count INTEGER NOT NULL,
    FOREIGN KEY (range_type_id) REFERENCES range_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (cast_type_id) REFERENCES cast_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (aoe_type_id) REFERENCES aoe_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (time_scale_id) REFERENCES time_scales(id) ON DELETE RESTRICT,
    FOREIGN KEY (duration_type_id) REFERENCES duration_types(id) ON DELETE RESTRICT
);

CREATE TABLE classes_spells (
    class_id INTEGER NOT NULL,
    spell_id INTEGER NOT NULL,

    PRIMARY KEY (spell_id, class_id),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE
);

CREATE TABLE spell_damages (
    id INTEGER NOT NULL PRIMARY KEY,
    default_damage INTEGER NOT NULL,
    dice TEXT NOT NULL,
    type_id INTEGER NOT NULL,
    spell_id INTEGER NOT NULL,

    FOREIGN KEY (type_id) REFERENCES damage_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE
);

CREATE TABLE magic_schools_spells(
    magic_school_id INTEGER NOT NULL,
    spell_id INTEGER NOT NULL,

    PRIMARY KEY (magic_school_id, spell_id),
    FOREIGN KEY (magic_school_id) REFERENCES magic_schools(id) ON DELETE RESTRICT,
    FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE
);


-- POPULATE THE TABLES
INSERT INTO magic_schools (name) VALUES
    ('Abjuration'),
    ('Conjuration'),
    ('Divination'),
    ('Enchantment'),
    ('Evocation'),
    ('Illusion'),
    ('Necromancy'),
    ('Transmutation');

INSERT INTO classes (name) VALUES
    ('Artificer'),
    ('Barbarian'),
    ('Cleric'),
    ('Druid'),
    ('Fighter'),
    ('Monk'),
    ('Paladin'),
    ('Ranger'),
    ('Rogue'),
    ('Sorcerer'),
    ('Warlock'),
    ('Wizard');

INSERT INTO cast_types (name) VALUES
    ('Action'),
    ('Bonus Action'),
    ('Reaction'),
    ('Minute'),
    ('Hour'),
    ('No Action'),
    ('Special');

INSERT INTO range_types (name, has_defined_range) VALUES
    ('Self', 0),
    ('Touch', 0),
    ('Ranged', 1),
    ('Sight', 0),
    ('Unlimited', 0),
    ('Special', 0);

INSERT INTO duration_types (name, has_time_scale) VALUES
    ('Concentration', 1),
    ('Instant', 0),
    ('Special', 0),
    ('Time', 1),
    ('Until dispelled', 0),
    ('Until dispelled or triggered', 0);

INSERT INTO time_scales (name) VALUES
    ('Round'),
    ('Minute'),
    ('Hour'),
    ('Day');

INSERT INTO aoe_types (name) VALUES
    ('None'),
    ('Cone'),
    ('Cube'),
    ('Cylinder'),
    ('Line'),
    ('Radius'),
    ('Sphere'),
    ('Square'),
    ('Square Feet');






