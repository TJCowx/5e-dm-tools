CREATE TABLE creature_abilities (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  creature_id INTEGER NOT NULL,
  FOREIGN KEY (creature_id) REFERENCES creatures(id) ON DELETE CASCADE
);