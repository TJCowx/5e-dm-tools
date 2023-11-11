CREATE TABLE action_types (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO action_types (name)
VALUES ('Action'),
  ('Reaction'),
  ('Legendary'),
  ('Lair');