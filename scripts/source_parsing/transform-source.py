import json
import sys
from numbers import Number
from os import listdir, path

IN_DIR = "./source/individual"
OUT_DIR = './source/individual/parsed'

class SourceParser:
    _output = {} 
    _in_monsters = []
    
    def __init__(self, in_file):
        self._in_file = in_file
        self._out_file = in_file.replace(IN_DIR, OUT_DIR)

    def _map_ac(self, in_m, out_m):
        if isinstance(in_m["ac"][0], dict):
            out_m["armourClass"] = in_m["ac"][0]["ac"]
        else:
            out_m["armourClass"] = in_m["ac"][0]

    def _map_saving_throws(self, in_m, out_m):
        try:
            save = in_m['save']
        except KeyError:
            print(f'"{in_m.get("name")} has no saving throws')
            return;

        out_m["savingThrows"] = list(map(transform_attribute, save))

    def _map_speed(self, in_m, out_m):
        speeds = in_m["speed"]
        
        for key in speeds.keys():
            if key not in ["walk", "fly", "burrow", "climb"]:
                print(f"[ERROR] {key} has not been defined!")
                exit(-1)
            if not isinstance(speeds[key], Number):
                print(f"[ERROR] {key} isn't a number! {speeds[key]}") 

        out_m["landSpeed"] = speeds.get("walk", None)
        out_m["flySpeed"] = speeds.get("fly", None)
        out_m["burrowSpeed"] = speeds.get("burrow", None)
        out_m["climbSpeed"] = speeds.get("climb", None)

    def _map_senses(self, in_m, out_m):
        senses = in_m["senses"]
        for unparsed in senses:
            sense, distance, *rest = unparsed.lower().split(' ')
            match sense:
                case 'blindsight':
                    out_m['blindsight'] = distance
                case 'darkvision':
                    out_m['darkvision'] = distance
                case 'truesight':
                    out_m['truesight'] = distance
                case 'tremorsense':
                    out_m['tremorsense'] = distance
                case _:
                    print(f"[ERROR] {sense} has not bee defined!")
                    exit(-1)

    def _map_cr(self, in_m, out_m):
        match in_m["cr"]:
            case "0":
                out_m['challengeRating'] = 0
                out_m['rewardXp'] = 0
                out_m['profBonus'] = 2
            case "1/8":
                out_m['challengeRating'] = 0.125
                out_m['rewardXp'] = 25
                out_m['profBonus'] = 2
            case "1/4":
                out_m['challengeRating'] = 0.25
                out_m['rewardXp'] = 50
                out_m['profBonus'] = 2
            case "1/2":
                out_m['challengeRating'] = 0.5
                out_m['rewardXp'] = 100
                out_m['profBonus'] = 2
            case "1":
                out_m['challengeRating'] = 1
                out_m['rewardXp'] = 200
                out_m['profBonus'] = 2
            case "2":
                out_m['challengeRating'] = 2
                out_m['rewardXp'] = 450
                out_m['profBonus'] = 2
            case "3":
                out_m['challengeRating'] = 3
                out_m['rewardXp'] = 700
                out_m['profBonus'] = 2
            case "4":
                out_m['challengeRating'] = 4
                out_m['rewardXp'] = 1100
                out_m['profBonus'] = 2
            case "5":
                out_m['challengeRating'] = 5
                out_m['rewardXp'] = 1800
                out_m['profBonus'] = 3
            case "6":
                out_m['challengeRating'] = 6
                out_m['rewardXp'] = 2300
                out_m['profBonus'] = 3
            case "7":
                out_m['challengeRating'] = 7
                out_m['rewardXp'] = 2900
                out_m['profBonus'] = 3
            case "8":
                out_m['challengeRating'] = 8
                out_m['rewardXp'] = 3900
                out_m['profBonus'] = 3
            case "9":
                out_m['challengeRating'] = 9
                out_m['rewardXp'] = 5000
                out_m['profBonus'] = 4
            case "10":
                out_m['challengeRating'] = 10
                out_m['rewardXp'] = 5900
                out_m['profBonus'] = 4
            case "11":
                out_m['challengeRating'] = 11
                out_m['rewardXp'] = 7200
                out_m['profBonus'] = 4
            case "12":
                out_m['challengeRating'] = 12
                out_m['rewardXp'] = 8400
                out_m['profBonus'] = 4
            case "13":
                out_m['challengeRating'] = 13
                out_m['rewardXp'] = 10000
                out_m['profBonus'] = 5
            case "14":
                out_m['challengeRating'] = 14
                out_m['rewardXp'] = 11500
                out_m['profBonus'] = 25
            case "15":
                out_m['challengeRating'] = 15
                out_m['rewardXp'] = 13000
                out_m['profBonus'] = 25
            case "16":
                out_m['challengeRating'] = 16
                out_m['rewardXp'] = 15000
                out_m['profBonus'] = 5
            case "17":
                out_m['challengeRating'] = 17
                out_m['rewardXp'] = 18000
                out_m['profBonus'] = 6
            case "18":
                out_m['challengeRating'] = 18
                out_m['rewardXp'] = 20000
                out_m['profBonus'] = 6
            case "19":
                out_m['challengeRating'] = 19
                out_m['rewardXp'] = 22000
                out_m['profBonus'] = 6
            case "20":
                out_m['challengeRating'] = 20
                out_m['rewardXp'] = 25000
                out_m['profBonus'] = 26
            case "21":
                out_m['challengeRating'] = 21
                out_m['rewardXp'] = 33000
                out_m['profBonus'] = 7
            case "22":
                out_m['challengeRating'] = 22
                out_m['rewardXp'] = 41000
                out_m['profBonus'] = 7
            case "23":
                out_m['challengeRating'] = 23
                out_m['rewardXp'] = 50000
                out_m['profBonus'] = 7
            case "24":
                out_m['challengeRating'] = 24
                out_m['rewardXp'] = 62000
                out_m['profBonus'] = 7
            case "25":
                out_m['challengeRating'] = 25
                out_m['rewardXp'] = 75000
                out_m['profBonus'] = 8
            case "26":
                out_m['challengeRating'] = 26
                out_m['rewardXp'] = 90000
                out_m['profBonus'] = 8
            case "27":
                out_m['challengeRating'] = 27
                out_m['rewardXp'] = 105000
                out_m['profBonus'] = 8
            case "28":
                out_m['challengeRating'] = 28
                out_m['rewardXp'] = 120000
                out_m['profBonus'] = 8
            case "29":
                out_m['challengeRating'] = 29
                out_m['rewardXp'] = 135000
                out_m['profBonus'] = 9
            case "30":
                out_m['challengeRating'] = 30
                out_m['rewardXp'] = 155000
                out_m['profBonus'] = 9 

    def _map_profs(self, in_m, out_m):
        profs = in_m['skill']
        out_m['proficiencyIds'] = []

        for prof in profs.keys():
            match prof:
                case "athletics":
                    out_m["proficiencyIds"].append(1)
                case "acrobatics":
                    out_m["proficiencyIds"].append(2)
                case "sleight of hand":
                    out_m["proficiencyIds"].append(3)
                case "stealth":
                    out_m["proficiencyIds"].append(4)
                case "arcana":
                    out_m["proficiencyIds"].append(5)
                case "history":
                    out_m["proficiencyIds"].append(6)
                case "investigation":
                    out_m["proficiencyIds"].append(7)
                case "nature":
                    out_m["proficiencyIds"].append(8)
                case "religion":
                    out_m["proficiencyIds"].append(9)
                case "animal handling":
                    out_m["proficiencyIds"].append(10)
                case "insight":
                    out_m["proficiencyIds"].append(11)
                case "medicine":
                    out_m["proficiencyIds"].append(12)
                case "perception":
                    out_m["proficiencyIds"].append(13)
                case "survival":
                    out_m["proficiencyIds"].append(14)
                case "deception":
                    out_m["proficiencyIds"].append(15)
                case "intimidation":
                    out_m["proficiencyIds"].append(16)
                case "persuation":
                    out_m["proficiencyIds"].append(17)
                case _:
                    print(f"{prof} has not been defined!")
                    exit(-1)

    def _map_alignment(self, in_m):
        alignments = in_m["alignment"]

        # True neutral
        if len(alignments) == 1:
            return 5 if alignments[0] == "N" else 10

        # I genuinely don't care if there is more than one alignment, that's insane
        if isinstance(alignments[0], dict):
            alignments = alignments[0]

        # Get if it's chaotic or good
        good_evil = "N"
        if "G" in alignments:
            good_evil = "G"
        elif "E" in alignments:
            good_evil = "E"

        law_chaotic = "N"
        if "C" in alignments:
            law_chaotic = "C"
        elif "L" in alignments:
            law_chaotic = "L"

        if good_evil == "G":
            if law_chaotic == "L":
                return 1
            if law_chaotic == "C":
                return 3
            return 2
        if good_evil == "E":
            if law_chaotic == "L":
                return 7
            if law_chaotic == "C":
                return 9
            return 8
        if law_chaotic == "L":
            return 4
        return 7

    def _map_type(self, in_m, out_m):
        type = in_m["type"]
        if isinstance(type, dict):
            print("TODO: HANDLE DICTIONARY TYPES")
            print(f"[ERROR] HANDLE DICT CREATURE TYPE: {type}")
            return;

        match type:
            case "aberration":
                return 1
            case "beast":
                return 2
            case "celestial":
                return 3
            case "construct":
                return 4
            case "dragon":
                return 5
            case "elemental":
                return 6
            case "fey":
                return 7
            case "fiend":
                return 8
            case "giant":
                return 9
            case "humanoid":
                return 10
            case "monstrosity":
                return 11
            case "ooze":
                return 12
            case "plant":
                return 13
            case "undead":
                return 14
            case _:
                print(f"[ERROR] {type} IS NOT A MAPPED CREATURE TYPE")
                exit(-1)
    
    def _map_size(self, in_m):
        match in_m["size"]:
            case "T":
                return 1
            case "S":
                return 2
            case "M":
                return 3
            case "L":
                return 4
            case "H":
                return 5
            case "G":
                return 6
            case _:
                print(f"{in_m['size']} is not a defined size")

    def _map_immunities(self, in_m, out_m):
        out_m['immunities'] = [transform_damage(i) for i in in_m.get("immune", [])] 

    def _map_cond_immunities(self, in_m, out_m):
        out_m["condImmunities"] = [transform_damage(c) for c in in_m.get("conditionImmune", [])]

    def _map_resistances(self, in_m, out_m):
        out_m["resistances"] = [transform_damage(r) for r in in_m.get("resist", [])]

    def _map_weaknesses(self, in_m, out_m):
        out_m["weaknesses"] = [transform_damage(v) for v in in_m.get("vulnerable", [])]

    # TODO: This
    def _map_languages(self, in_m, out_m):
        # TODO: Need more languages
        print("TODO: Map Languages")

    def _map_abilities(self, in_m, out_m):
        abilities = in_m['trait']
        out_m['abilities'] = []
        for a in abilities:
            ability = {}
            ability['name'] = a.get('name')
            ability['description'] = ' '.join(a.get('entries'))
            out_m['abilities'].append(ability)
        print("TODO: Map Spellcasting")
    
    # TODO: This
    def _map_actions(self, in_m, out_m):
        print("TODO: Map actions")

    def _remap_monsters(self):
        for m in self._in_monsters:
            out_m = {}
            out_m["name"] = m.get("name")
            self._map_ac(m, out_m)
            out_m["hitPoints"] = m["hp"]["average"]
            out_m["hitDie"] = m["hp"]["formula"]
            self._map_saving_throws(m, out_m)
            self._map_speed(m, out_m)
            self._map_senses(m, out_m)
            out_m["strength"] = m.get("str")
            out_m["dexterity"] = m.get("dex")
            out_m["constitution"] = m.get("con")
            out_m["intelligence"] = m.get("int")
            out_m["wisdom"] = m.get("wis")
            out_m["charisma"] = m.get("cha")
            self._map_profs(m, out_m)
            self._map_cr(m, out_m)
            # TODO: Handle legendary
            # TODO: Handle Lair
            out_m["alignmentId"] = self._map_alignment(m)
            self._map_type(m, out_m)
            out_m["sizeId"] = self._map_size(m)
            self._map_immunities(m, out_m)
            self._map_resistances(m, out_m)
            self._map_weaknesses(m, out_m)
            self._map_languages(m, out_m)
            self._map_abilities(m, out_m)
            self._map_actions(m, out_m)
            out_m["sourceAbbr"] = m.get("source")

            self._output['creatures'].append(out_m)

    def parse(self):
        # Get the JSON file
        in_f = open(self._in_file)
        data = json.load(in_f)
        # Set the base source info
        self._output["name"] = data.get("name")
        self._output["abbreviation"] = data.get("acronym")
        self._output["creatures"] = []
        self._in_monsters = data.get("monster")
        self._remap_monsters()

    def output(self):
        with open(self._out_file, "w", encoding="utf-8") as out:
            json.dump(self._output, out, ensure_ascii=False, indent=2)

def transform_attribute(att): 
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

def transform_damage(d):
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

    print(f"[ERROR] {d} HAS NOT BEEN DEFINED AS DAMAGE");
    exit(-1)

def find_file(abbr):
    # Check if there is a file in ./source/individual that starts with an abbr-
    for filename in listdir(IN_DIR):
        if filename.lower().startswith(abbr.lower() + "-") and filename.endswith(".json"):
            file_path = path.join(IN_DIR, filename)
            if path.exists(file_path):
                return file_path
    return None

def main(abbr):
    # Validate that the source is there
    try:
        file = find_file(abbr)
    except:
        print("Error trying to find file file")
        exit(-1)

    if file is None:
        print(f"No source found with the abbr \"{abbr}\"")
        exit(-1)

    parser = SourceParser(file)
    parser.parse()
    print("Parsed... Now outputting")
    parser.output()
    print("source has been output successfully")
    

if __name__ == "__main__":
    try:
        source = sys.argv[1]
    except:
        print("You must have a source abbr arguement")
        exit(-1)

    main(source)
