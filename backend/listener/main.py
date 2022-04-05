from fbchat import Client, log
from getpass import getpass
from datetime import datetime

output_path = "output/"


class TututBot(Client):
    def onMessage(self, author_id, message_object, thread_id, thread_type, **kwargs):
        dt_object = datetime.fromtimestamp(message_object.timestamp / 1000)
        file_name = str(thread_id) + '.csv'
        if message_object.text == "Tutut" or message_object == "tutut":
            tutut = "{};{};{}\n".format(
                author_id, dt_object, message_object.text)
            with open(output_path + file_name, 'a') as f:
                f.write(tutut)


username_theo = "theo.petit.1848"
username = input("username : ")
client = TututBot(username, getpass())
client.listen()
