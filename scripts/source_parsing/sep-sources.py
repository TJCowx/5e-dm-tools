import json
from os import path

in_f = open('./source/bestiary-complete.json')

data = json.load(in_f)

for source in data:
    print(f"Exporting: {source['name']}")
    out_f_name = f"{source['acronym']}-{source['name']},json"
    out_path = path.join('./source/individual/', out_f_name) 
    with open(out_path, "w", encoding="utf-8") as out_f:
        json.dump(source, out_f, ensure_ascii=False, indent=2)

print("Finished separating")
