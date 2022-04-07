
file_name = "voyage1"

with open(file_name + ".csv", 'r') as f:
    data = f.readlines()

with open(file_name + ".js", 'w') as f:
    f.write("data = [\n")
    for d in data:
        f.write("\t\"" + d.replace("\n", '') + "\",\n")
    f.write("];")
