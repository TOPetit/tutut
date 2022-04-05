from fbchat import Client, log
from getpass import getpass
from datetime import datetime

output_path = "output/"


def isUnique(file_name, dt_object, id):
    try:
        with open(file_name, 'r') as f:
            lines = f.readlines()
            print()
        for line in lines[::-1]:
            data = line.split(';')[1].split(' ')[1].split(':')[0:2]
            # If Tutut is correct
            if data[0] == data[1]:

                time = line.split(';')[1]

                year = int(time.split(' ')[0].split('-')[0])
                month = int(time.split(' ')[0].split('-')[1])
                day = int(time.split(' ')[0].split('-')[2])

                hour = int(time.split(' ')[1].split(':')[0])
                minute = int(time.split(' ')[1].split(':')[1])
                second = int(time.split(' ')[1].split(':')[0][0:2])

                date_time_obj = datetime(
                    year, month, day, hour, minute, second, 0)
                same_minute = dt_object.minute == date_time_obj.minute
                same_id = line.split(';')[0] == id

                if same_minute and same_id:
                    return False

                if not same_minute:
                    break
    except FileNotFoundError:
        print("Oops, file does not exists yet")
    return True


def isCorrect(message):
    s1 = "Tutut"
    s2 = message
    d = {}
    lenstr1 = len(s1)
    lenstr2 = len(s2)
    for i in range(-1, lenstr1+1):
        d[(i, -1)] = i+1
    for j in range(-1, lenstr2+1):
        d[(-1, j)] = j+1

    for i in range(lenstr1):
        for j in range(lenstr2):
            if s1[i] == s2[j]:
                cost = 0
            else:
                cost = 1
            d[(i, j)] = min(
                d[(i-1, j)] + 1,  # deletion
                d[(i, j-1)] + 1,  # insertion
                d[(i-1, j-1)] + cost,  # substitution
            )
            if i and j and s1[i] == s2[j-1] and s1[i-1] == s2[j]:
                d[(i, j)] = min(d[(i, j)], d[i-2, j-2] + cost)  # transposition

    return(d[lenstr1-1, lenstr2-1])


class TututBot(Client):
    def onMessage(self, author_id, message_object, thread_id, thread_type, **kwargs):
        dt_object = datetime.fromtimestamp(message_object.timestamp / 1000)
        file_name = str(thread_id) + '.csv'
        if message_object.text == "Tutut" or message_object == "tutut":
            isUnique(file_name, dt_object, author_id)
            if isUnique(file_name, dt_object, author_id):
                tutut = "{};{};{}\n".format(
                    author_id, dt_object, message_object.text)
                with open(output_path + file_name, 'a') as f:
                    f.write(tutut)


client = TututBot("theo.petit.1848", getpass())
client.listen()
