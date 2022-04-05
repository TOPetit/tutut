import json
import sys
from datetime import datetime

ids = {
    "Th\u00c3\u00a9o Petit": 100032236723941,
    "Jodie Moullet": 100009809855629,
    "Matthieu An'ArtRoll Pastag'art Muller": 100014962631116,
    "Cassandra Gilet": 100008800800648,
}


def main(full_file_name):

    file_name = full_file_name.split(
        '\\')[-1].split('/')[-1].replace(".json", '')
    print(file_name)

    output = "output/" + file_name + ".csv"

    with open(full_file_name, 'r') as f:
        print("Found the file " + full_file_name)
        data = json.load(f)

    with open(output, 'w') as f:
        print("Writing .csv in " + output)
        for message in data['messages'][::-1]:
            try:
                if message['content'] == "Tutut":
                    d = datetime.fromtimestamp(message["timestamp_ms"] / 1000)
                    f.write("{};{};{}\n".format(
                        ids[message['sender_name']], d, message["content"]))
            except:
                pass


if __name__ == "__main__":
    args = sys.argv[1:]
    print("------------------")
    if len(args) != 1:
        print("\tExample :\n\t\t> python main.py path/to/file.json\n\t\t> python main.py .\\input\\voyage.json\n\t\t> python main.py ./input/voyage.json")
    else:
        print("Launching script...")
        main(args[0])
        print("Done.")
    print("------------------")
