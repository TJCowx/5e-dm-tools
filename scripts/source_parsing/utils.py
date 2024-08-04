import json
from os import listdir, path

IN_DIR = './source/individual'
OUT_DIR = './source/individual/parsed'


def get_path_from_abbr(abbr):
    """
        Finds the source that starts with the inputted abbreviation
    """
    if not abbr:
        print("You must have a source abbreviation")
        exit(-1)

    # Check if there is a file in ./source/individual that starts with an abbr-
    for filename in listdir(IN_DIR):
        if filename.lower().startswith(abbr.lower() + "-") and filename.endswith(".json"):
            file_path = path.join(IN_DIR, filename)
            if path.exists(file_path):
                return file_path
    print(f"No source found with abbr of {abbr}")
    exit(-1)


def dump_file(output, file_name):
    """
        Just dump the file as JSON
    """
    with open(file_name, "w", encoding="utf-8") as out:
        json.dump(output, out, ensure_ascii=False, indent=2)


def transform_attribute(att):
    """
        Transform the short form to the full attribute name
    """
    if att == "str":
        return "Strength" 
    if att == "dex":
        return "Dexterity"
    if att == "con":
        return "Constitution"
    if att == "int":
        return "Intelligence"
    if att == "wis":
        return "Wisdom"
    if att == "cha":
        return "Charisma"
    
    print(f"[ERROR] {att} IS NOT AN ATTRIBUTE")
    exit(-1)


def transform_damage(d, exit_on_missing=False):
    """
        Transform the damage type into the internal id
        Enable exit_on_missing if you want the script to exit, otherwise it will
        just throw an error
    """
    if d == "acid":
        return 1
    if d == "cold":
        return 2
    if d == "fire":
        return 3
    if d == "force":
        return 4
    if d == "lightning":
        return 5
    if d == "necrotic":
        return 6
    if d == "poison":
        return 7
    if d == "psychic":
        return 8
    if d == "radiant":
        return 9
    if d == "thunder":
        return 10
    if d == "bludgeoning":
        return 11
    if d == 'slashing':
        return 12
    if d == 'piercing':
        return 13

    if exit_on_missing:
        print(f"[ERROR] {d} HAS NOT BEEN DEFINED AS DAMAGE");
        exit(-1)

    raise Exception(f"{d} is not a defined damage")

