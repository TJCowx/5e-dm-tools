// @generated automatically by Diesel CLI.

diesel::table! {
    action_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    alignments (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    aoe_types (id) {
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
    cast_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    classes (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    classes_spells (class_id, spell_id) {
        class_id -> Integer,
        spell_id -> Integer,
    }
}

diesel::table! {
    condition_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    creature_abilities (id) {
        id -> Integer,
        name -> Text,
        description -> Text,
        creature_id -> Integer,
    }
}

diesel::table! {
    creature_action_damages (id) {
        id -> Integer,
        default_damage -> Integer,
        dice -> Text,
        type_id -> Integer,
        action_id -> Integer,
    }
}

diesel::table! {
    creature_actions (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        is_attack -> Bool,
        to_hit -> Nullable<Integer>,
        reach -> Nullable<Integer>,
        combatants_hit -> Nullable<Integer>,
        attack_delivery_id -> Nullable<Integer>,
        attack_type_id -> Nullable<Integer>,
        action_type_id -> Integer,
        creature_id -> Integer,
    }
}

diesel::table! {
    creature_environment (creature_id, environment_id) {
        creature_id -> Integer,
        environment_id -> Integer,
    }
}

diesel::table! {
    creature_spells (spell_id, creature_id) {
        spell_id -> Integer,
        creature_id -> Integer,
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
        description -> Nullable<Text>,
        armour_class -> Integer,
        hit_points -> Integer,
        hit_die -> Text,
        saving_throws -> Text,
        land_speed -> Nullable<Integer>,
        fly_speed -> Nullable<Integer>,
        burrow_speed -> Nullable<Integer>,
        climb_speed -> Nullable<Integer>,
        hover_speed -> Nullable<Integer>,
        swim_speed -> Nullable<Integer>,
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
        challenge_rating -> Float,
        reward_xp -> Integer,
        is_legendary -> Bool,
        has_lair -> Bool,
        alignment_id -> Integer,
        creature_type_id -> Integer,
        size_id -> Integer,
        source_abbr -> Nullable<Text>,
    }
}

diesel::table! {
    creatures_condition_immunities (id) {
        id -> Integer,
        creature_id -> Integer,
        condition_type_id -> Integer,
    }
}

diesel::table! {
    creatures_immunities (id) {
        id -> Integer,
        creature_id -> Integer,
        damage_type_id -> Integer,
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
        damage_type_id -> Integer,
    }
}

diesel::table! {
    creatures_weaknesses (id) {
        id -> Integer,
        creature_id -> Integer,
        damage_type_id -> Integer,
    }
}

diesel::table! {
    damage_types (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    duration_types (id) {
        id -> Integer,
        name -> Text,
        has_time_scale -> Bool,
    }
}

diesel::table! {
    environments (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    languages (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    magic_schools (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    magic_schools_spells (magic_school_id, spell_id) {
        magic_school_id -> Integer,
        spell_id -> Integer,
    }
}

diesel::table! {
    proficiencies (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    range_types (id) {
        id -> Integer,
        name -> Text,
        has_defined_range -> Bool,
    }
}

diesel::table! {
    sizes (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    sources (abbreviation) {
        abbreviation -> Text,
        name -> Text,
    }
}

diesel::table! {
    spells (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        higher_levels -> Nullable<Text>,
        spell_slot -> Integer,
        requires_verbal -> Bool,
        requires_somatic -> Bool,
        requires_material -> Bool,
        material_components -> Nullable<Text>,
        level -> Integer,
        casting_time -> Text,
        can_ritual_cast -> Bool,
        range_type_id -> Integer,
        range -> Nullable<Integer>,
        cast_type_id -> Integer,
        cast_time -> Integer,
        aoe_type_id -> Nullable<Integer>,
        aoe_size -> Nullable<Integer>,
        duration_type_id -> Integer,
        time_scale_id -> Nullable<Integer>,
        duration -> Nullable<Integer>,
        source_abbr -> Nullable<Text>,
    }
}

diesel::table! {
    time_scales (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::joinable!(classes_spells -> classes (class_id));
diesel::joinable!(classes_spells -> spells (spell_id));
diesel::joinable!(creature_abilities -> creatures (creature_id));
diesel::joinable!(creature_action_damages -> creature_actions (action_id));
diesel::joinable!(creature_action_damages -> damage_types (type_id));
diesel::joinable!(creature_actions -> action_types (action_type_id));
diesel::joinable!(creature_actions -> attack_deliveries (attack_delivery_id));
diesel::joinable!(creature_actions -> attack_types (attack_type_id));
diesel::joinable!(creature_actions -> creatures (creature_id));
diesel::joinable!(creature_environment -> creatures (creature_id));
diesel::joinable!(creature_environment -> environments (environment_id));
diesel::joinable!(creature_spells -> creatures (creature_id));
diesel::joinable!(creature_spells -> spells (spell_id));
diesel::joinable!(creatures -> alignments (alignment_id));
diesel::joinable!(creatures -> creature_types (creature_type_id));
diesel::joinable!(creatures -> sources (source_abbr));
diesel::joinable!(creatures_condition_immunities -> condition_types (condition_type_id));
diesel::joinable!(creatures_condition_immunities -> creatures (creature_id));
diesel::joinable!(creatures_immunities -> creatures (creature_id));
diesel::joinable!(creatures_immunities -> damage_types (damage_type_id));
diesel::joinable!(creatures_languages -> creatures (creature_id));
diesel::joinable!(creatures_languages -> languages (language_id));
diesel::joinable!(creatures_proficiencies -> creatures (creature_id));
diesel::joinable!(creatures_proficiencies -> proficiencies (proficiency_id));
diesel::joinable!(creatures_resistances -> creatures (creature_id));
diesel::joinable!(creatures_resistances -> damage_types (damage_type_id));
diesel::joinable!(creatures_weaknesses -> creatures (creature_id));
diesel::joinable!(creatures_weaknesses -> damage_types (damage_type_id));
diesel::joinable!(magic_schools_spells -> magic_schools (magic_school_id));
diesel::joinable!(magic_schools_spells -> spells (spell_id));
diesel::joinable!(spells -> aoe_types (aoe_type_id));
diesel::joinable!(spells -> cast_types (cast_type_id));
diesel::joinable!(spells -> duration_types (duration_type_id));
diesel::joinable!(spells -> range_types (range_type_id));
diesel::joinable!(spells -> sources (source_abbr));
diesel::joinable!(spells -> time_scales (time_scale_id));

diesel::allow_tables_to_appear_in_same_query!(
    action_types,
    alignments,
    aoe_types,
    attack_deliveries,
    attack_types,
    cast_types,
    classes,
    classes_spells,
    condition_types,
    creature_abilities,
    creature_action_damages,
    creature_actions,
    creature_environment,
    creature_spells,
    creature_types,
    creatures,
    creatures_condition_immunities,
    creatures_immunities,
    creatures_languages,
    creatures_proficiencies,
    creatures_resistances,
    creatures_weaknesses,
    damage_types,
    duration_types,
    environments,
    languages,
    magic_schools,
    magic_schools_spells,
    proficiencies,
    range_types,
    sizes,
    sources,
    spells,
    time_scales,
);
