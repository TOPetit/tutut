
file_name = "voyage"

with open(file_name + ".csv", 'r') as f:
    data = f.read()

with open(file_name + "_formatted" + ".csv", 'w') as f:
    f.write(data.replace('/', '-'))
