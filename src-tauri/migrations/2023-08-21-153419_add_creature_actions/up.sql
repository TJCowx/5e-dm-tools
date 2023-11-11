CREATE TABLE attack_deliveries (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE attack_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE creature_actions (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
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
-- PRE-POPULATE TABLES
INSERT INTO attack_deliveries (name)
VALUES ('Melee'),
  ('Ranged');
INSERT INTO attack_types (name)
VALUES ('Weapon'),
  ('Spell');