CREATE TABLE creatures (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  armour_class INTEGER NOT NULL,
  hit_points INTEGER NOT NULL,
  hit_die TEXT NOT NULL,
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
  challenge_rating NUMBER NOT NULL,
  reward_xp REAL NOT NULL,
  is_legendary INT(1) NOT NULL,
  has_lair INT(1) NOT NULL,
  size_id INTEGER NOT NULL,
  creature_type_id INTEGER NOT NULL,
  FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (creature_type_id) REFERENCES creature_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
-- ADD JOIN TABLES
CREATE TABLE creatures_proficiencies (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  proficiency_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (proficiency_id) REFERENCES proficiencies(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE creatures_saving_throws (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  saving_throw_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (saving_throw_id) REFERENCES saving_throws(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE creatures_immunities (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  immunity_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (immunity_id) REFERENCES immunities(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE creatures_condition_immunities (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  condition_immunity_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (condition_immunity_id) REFERENCES condition_immunities(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE creatures_resistances (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  resistance_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (resistance_id) REFERENCES resistances(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE creatures_languages (
  id INTEGER NOT NULL PRIMARY KEY,
  creature_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);