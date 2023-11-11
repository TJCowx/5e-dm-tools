CREATE TABLE damage_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO damage_types (name)
VALUES ('Acid'),
  ('Cold'),
  ('Fire'),
  ('Force'),
  ('Lightning'),
  ('Necrotic'),
  ('Poison'),
  ('Psychic'),
  ('Radiant'),
  ('Thunder'),
  ('Non-Magical'),
  ('Magic Weapons'),
  ('Bludgeoning'),
  ('Slashing'),
  ('Piercing');