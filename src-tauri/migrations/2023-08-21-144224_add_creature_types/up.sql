CREATE TABLE creature_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO creature_types (name)
VALUES ('Aberration'),
  ('Beast'),
  ('Celestial'),
  ('Construct'),
  ('Dragon'),
  ('Elemental'),
  ('Fey'),
  ('Fiend'),
  ('Giant'),
  ('Humanoid'),
  ('Monstrosity'),
  ('Ooze'),
  ('Plant'),
  ('Undead');