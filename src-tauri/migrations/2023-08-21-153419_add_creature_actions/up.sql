CREATE TABLE attack_deliveries (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE attack_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE actions (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  is_attack INTEGER(1) NOT NULL,
  to_hit INTEGER NOT NULL,
  reach INTEGER NOT NULL,
  attack_delivery_id INTEGER NULL,
  action_type_id INTEGER NOT NULL,
  FOREIGN KEY (attack_delivery_id) REFERENCES attack_deliveries(id) ON DELETE CASCADE,
  FOREIGN KEY (action_type_id) REFERENCES action_types(id) ON DELETE RESTRICT
);
CREATE TABLE damages (
  id INTEGER NOT NULL PRIMARY KEY,
  default_damage INTEGER NOT NULL,
  dice TEXT NOT NULL,
  type_id INTEGER NOT NULL,
  action_id INTEGER NOT NULL,
  FOREIGN KEY (type_id) REFERENCES damage_types(id) ON DELETE RESTRICT,
  FOREIGN KEY (action_id) REFERENCES actions(id) ON DELETE CASCADE
);
-- PRE-POPULATE TABLES
INSERT INTO attack_deliveries (name)
VALUES ('Melee'),
  ('Ranged');
INSERT INTO attack_types (name)
VALUES ('Weapon'),
  ('Spell');