// @generated automatically by Diesel CLI.

diesel::table! {
    action_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    actions (id) {
        id -> Integer,
        name -> Text,
        description -> Text,
        is_attack -> Integer,
        to_hit -> Integer,
        reach -> Integer,
        attack_delivery_id -> Nullable<Integer>,
        action_type_id -> Integer,
    }
}

diesel::table! {
    alignments (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    attack_deliveries (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    attack_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    condition_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    creature_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    creatures (id) {
        id -> Integer,
        name -> Text,
        armour_class -> Integer,
        hit_points -> Integer,
        hit_die -> Text,
        land_speed -> Nullable<Integer>,
        fly_speed -> Nullable<Integer>,
        burrow_speed -> Nullable<Integer>,
        climb_speed -> Nullable<Integer>,
        hover_speed -> Nullable<Integer>,
        blindsight -> Nullable<Integer>,
        darkvision -> Nullable<Integer>,
        tremorsense -> Nullable<Integer>,
        truesight -> Nullable<Integer>,
        strength -> Integer,
        dexterity -> Integer,
        constitution -> Integer,
        intelligence -> Integer,
        wisdom -> Integer,
        charisma -> Integer,
        prof_bonus -> Integer,
        challenge_rating -> Double,
        reward_xp -> Float,
        is_legendary -> Integer,
        has_lair -> Integer,
        size_id -> Integer,
        creature_type_id -> Integer,
    }
}

diesel::table! {
    creatures_condition_immunities (id) {
        id -> Integer,
        creature_id -> Integer,
        condition_immunity_id -> Integer,
    }
}

diesel::table! {
    creatures_immunities (id) {
        id -> Integer,
        creature_id -> Integer,
        immunity_id -> Integer,
    }
}

diesel::table! {
    creatures_languages (id) {
        id -> Integer,
        creature_id -> Integer,
        language_id -> Integer,
    }
}

diesel::table! {
    creatures_proficiencies (id) {
        id -> Integer,
        creature_id -> Integer,
        proficiency_id -> Integer,
    }
}

diesel::table! {
    creatures_resistances (id) {
        id -> Integer,
        creature_id -> Integer,
        resistance_id -> Integer,
    }
}

diesel::table! {
    creatures_saving_throws (id) {
        id -> Integer,
        creature_id -> Integer,
        saving_throw_id -> Integer,
    }
}

diesel::table! {
    damage (id) {
        id -> Integer,
        default_damage -> Integer,
        dice -> Text,
        type_id -> Integer,
        action_id -> Integer,
    }
}

diesel::table! {
    damage_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    damages (id) {
        id -> Integer,
        default_damage -> Integer,
        dice -> Text,
        type_id -> Integer,
        action_id -> Integer,
    }
}

diesel::table! {
    languages (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    proficiencies (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    sizes (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::joinable!(actions -> action_types (action_type_id));
diesel::joinable!(actions -> attack_deliveries (attack_delivery_id));
diesel::joinable!(creatures -> creature_types (creature_type_id));
diesel::joinable!(creatures -> sizes (size_id));
diesel::joinable!(creatures_condition_immunities -> creatures (creature_id));
diesel::joinable!(creatures_immunities -> creatures (creature_id));
diesel::joinable!(creatures_languages -> creatures (creature_id));
diesel::joinable!(creatures_languages -> languages (language_id));
diesel::joinable!(creatures_proficiencies -> creatures (creature_id));
diesel::joinable!(creatures_proficiencies -> proficiencies (proficiency_id));
diesel::joinable!(creatures_resistances -> creatures (creature_id));
diesel::joinable!(creatures_saving_throws -> creatures (creature_id));
diesel::joinable!(damage -> actions (action_id));
diesel::joinable!(damage -> damage_types (type_id));
diesel::joinable!(damages -> actions (action_id));
diesel::joinable!(damages -> damage_types (type_id));

diesel::allow_tables_to_appear_in_same_query!(
    action_types,
    actions,
    alignments,
    attack_deliveries,
    attack_types,
    condition_types,
    creature_types,
    creatures,
    creatures_condition_immunities,
    creatures_immunities,
    creatures_languages,
    creatures_proficiencies,
    creatures_resistances,
    creatures_saving_throws,
    damage,
    damage_types,
    damages,
    languages,
    proficiencies,
    sizes,
);
