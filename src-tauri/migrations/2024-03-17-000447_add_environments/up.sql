CREATE TABLE environments (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO environments (name)
VALUES ('Arctic'),
  ('Coastal'),
  ('Desert'),
  ('Forest'),
  ('Grassland'),
  ('Hill'),
  ('Mountain'),
  ('Swamp'),
  ('Underdark'),
  ('Underwater'),
  ('Urban');

CREATE TABLE creature_environment (
    creature_id INTEGER NOT NULL,
    environment_id INTEGER NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE,
    FOREIGN KEY (environment_id) REFERENCES environments(id) ON DELETE CASCADE,
    PRIMARY KEY (creature_id, environment_id)
);
