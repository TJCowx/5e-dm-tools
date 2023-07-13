use std::str::FromStr;

use crate::models::creature::Creature;
use crate::mongo::*;
use bson::oid::ObjectId;
use futures::StreamExt;
use mongodb::bson::doc;

#[tauri::command]
pub async fn get_all_creatures() -> Result<Vec<Creature>, String> {
    let client = get_connection();

    let collection = client
        .database("5e-dm-tools")
        .collection::<Creature>("creatures");

    let mut creatures = Vec::new();

    println!("[server] Retrieving creatures...");

    // Get all creatures and put it in the vector
    let mut cursor = collection
        .find(None, None)
        .await
        .map_err(|e| e.to_string())?;

    println!("[server] Cursor created, pushing into vector");

    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                println!("[server] Found document {}", document.name);
                creatures.push(document);
            }
            Err(e) => {
                println!("[server] Error: {}", e.to_string());
                return Err(e.to_string());
            }
        }
    }

    println!("Creatures finished reading...");

    push_connection(client);

    Ok(creatures)
}

#[tauri::command]
pub async fn get_creature_by_id(id: String) -> Result<Creature, String> {
    let client = get_connection();

    let collection = client
        .database("5e-dm-tools")
        .collection::<Creature>("creatures");

    let creature = collection
        .find_one(doc! { "_id": ObjectId::from_str(&id).unwrap() }, None)
        .await
        .map_err(|e| e.to_string())?
        .unwrap();

    push_connection(client);

    Ok(creature)
}

#[tauri::command]
pub async fn add_creature(creature: Creature) -> Result<(), String> {
    println!("[server] Creature starting");
    let client = get_connection();

    // Print the creature to console
    println!("[server] Creature: {:?}", creature);

    let collection = client
        .database("5e-dm-tools")
        .collection::<Creature>("creatures");

    println!("[server] Adding creature {}", creature.name);

    // Check to see if the creature doesn't already exist, if it doesn't, add it
    if collection
        .find_one(doc! { "name": creature.name.clone() }, None)
        .await
        .map_err(|e| e.to_string())?
        .is_some()
    {
        push_connection(client);
        return Err("Creature already exists!".to_string());
    }

    collection
        .insert_one(creature, None)
        .await
        .map_err(|e| e.to_string())?;

    println!("[server] Creature successfully added!");

    push_connection(client);

    Ok(())
}

#[tauri::command]
pub async fn update_creature(creature: Creature) -> Result<(), String> {
    println!("[server] Updating creature {}", &creature.name);

    let client = get_connection();

    let collection = client
        .database("5e-dm-tools")
        .collection::<Creature>("creatures");

    // If creature doesn't exist, return an error
    if collection
        .find_one(doc! { "_id": &creature.id }, None)
        .await
        .map_err(|e| e.to_string())?
        .is_none()
    {
        push_connection(client);
        return Err("Creature doesn't exist!".to_string());
    }

    println!("Creature exists, updating...");

    // Update the creature, return an error if there is one
    collection
        .update_one(
            doc! { "_id": &creature.id },
            doc! { "$set": bson::to_bson(&creature).unwrap() },
            None,
        )
        .await
        .map_err(|e| e.to_string())?;

    println!("[server] Creature successfully updated!");

    push_connection(client);

    Ok(())
}

#[tauri::command]
pub async fn delete_creature(id: String) -> Result<(), String> {
    println!("[server] Deleting id {}", &id);

    let client = get_connection();

    let collection = client
        .database("5e-dm-tools")
        .collection::<Creature>("creatures");

    collection
        .delete_one(
            doc! {
                "_id": ObjectId::from_str(&id).unwrap()
            },
            None,
        )
        .await
        .map_err(|e| e.to_string())?;

    push_connection(client);

    Ok(())
}
