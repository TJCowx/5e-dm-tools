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

# ____________________________________________________________________

sentences = []
words_list = []

while True:
    # Do your readnig into the list
    break;

for sentence in sentences:
    # Here is the iterating over each sentence
    # here you want to split the sentence into words
    # then you want to "extend" (that's your hint)
    # your words_list with the words you got
    print(sentence)