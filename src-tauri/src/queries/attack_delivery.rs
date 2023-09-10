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
