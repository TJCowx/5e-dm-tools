import json
import sys
from source_parsing.utils import get_path_from_abbr


def main(abbr):
    file_path = get_path_from_abbr(abbr)
    file = open(file_path)
    data = json.load(file)
    monsters = data.get("monster")
    print(monsters)


if __name__ == "__main__":
    main(sys.argv[1])
