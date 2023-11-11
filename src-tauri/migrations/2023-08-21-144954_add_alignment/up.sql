CREATE TABLE alignments (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO alignments (name)
VALUES ('Lawful Good'),
  ('Neutral Good'),
  ('Chaotic Good'),
  ('Lawful Neutral'),
  ('Neutral'),
  ('Chaotic Neutral'),
  ('Lawful Evil'),
  ('Neutral Evil'),
  ('Chaotic Evil'),
  ('Unaligned');