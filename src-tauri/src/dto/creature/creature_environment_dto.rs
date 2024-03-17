use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::environment_dto::EnvironmentDto;

#[derive(Queryable, Insertable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creature_environment)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(EnvironmentDto))]
pub struct CreatureEnvironmentDto {
    creature_id: i32,
    environment_id: i32,
}

impl CreatureEnvironmentDto {
    pub fn save_creature_environment(
        conn: &mut SqliteConnection,
        environments: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creature_environment::dsl::*;

        let mapped_environments: Vec<CreatureEnvironmentDto> = environments
            .iter()
            .map(|id| CreatureEnvironmentDto {
                creature_id: *parent_id,
                environment_id: *id,
            })
            .collect();

        diesel::insert_into(creature_environment)
            .values(&mapped_environments)
            .execute(conn)
    }

    pub fn get_envs_by_creature_ids(parent_id: &i32) -> Vec<EnvironmentDto> {
        use crate::schema::environments::dsl::*;

        let conn = &mut crate::db::connect_db();

        environments
            .inner_join(crate::schema::creature_environment::dsl::creature_environment)
            .filter(crate::schema::creature_environment::dsl::creature_id.eq(parent_id))
            .select(environments::all_columns())
            .load::<EnvironmentDto>(conn)
            .expect("Error loading environments")
    }

    pub fn get_env_ids_by_creature_ids(parent_id: &i32) -> Vec<i32> {
        use crate::schema::creature_environment::dsl::*;

        let conn = &mut crate::db::connect_db();
        creature_environment
            .filter(creature_id.eq(parent_id))
            .select(environment_id)
            .load::<i32>(conn)
            .expect("Error loading environment ids")
    }

    pub fn update_creature_environment(
        conn: &mut SqliteConnection,
        new_environments: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_environment::dsl::*;

        let prev_env_ids = Self::get_env_ids_by_creature_ids(&parent_id);
        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for prev_env_id in prev_env_ids.iter() {
            if !new_environments.contains(prev_env_id) {
                to_delete.push(*prev_env_id)
            }
        }

        for new_env_id in new_environments.iter() {
            if !prev_env_ids.contains(new_env_id) {
                to_add.push(*new_env_id)
            }
        }

        println!("[server] DELETING CREATURE ENVIRONMENTS");

        diesel::delete(
            creature_environment.filter(
                creature_id
                    .eq(parent_id)
                    .and(environment_id.eq_any(to_delete)),
            ),
        )
        .execute(conn)?;

        Self::save_creature_environment(conn, to_add, &parent_id)
            .expect("Error saving creature environments");

        Ok(())
    }

    pub fn delete_creature_environments(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creature_environment::dsl::*;

        diesel::delete(creature_environment.filter(creature_id.eq(parent_id))).execute(conn)
    }
}
