use crate::dto::attack_delivery::AttackDelivery;

#[tauri::command]
pub fn get_all_attack_deliveries() -> Result<Vec<AttackDelivery>, String> {
    println!("[server] Getting all attack deliveries");
    let attack_deliveries = AttackDelivery::get_all();

    println!(
        "[server] Retrieved {} attack deliveries",
        attack_deliveries.len()
    );

    Ok(attack_deliveries)
}

#[tauri::command]
pub fn get_attack_delivery_by_id(id: i32) -> Result<AttackDelivery, String> {
    println!("[server] Getting attack delivery with id {}", id);
    let attack_delivery = AttackDelivery::get_by_id(id);

    println!("[server] Retrieved attack delivery with id {}", id);

    Ok(attack_delivery)
}
