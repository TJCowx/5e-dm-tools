CREATE TABLE condition_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO condition_types (name)
VALUES ('Blinded'),
  ('Charmed'),
  ('Deafened'),
  ('Frightened'),
  ('Grappled'),
  ('Incapacitated'),
  ('Invisible'),
  ('Paralyzed'),
  ('Petrified'),
  ('Poisoned'),
  ('Prone'),
  ('Restrained'),
  ('Stunned'),
  ('Unconscious');