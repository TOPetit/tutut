from fbchat import Client, ThreadType
from getpass import getpass
from datetime import datetime

output_path = "data/"


class TututBot(Client):
    def onMessage(self, author_id, message_object, thread_id, **kwargs):
        try:
            dt_object = datetime.fromtimestamp(message_object.timestamp / 1000)
            file_name = str(thread_id) + '.csv'
            if message_object.text == "Tutut" or message_object == "tutut":
                tutut = "{};{};{}\n".format(
                    author_id, dt_object, message_object.text)
                with open(output_path + file_name, 'a') as f:
                    f.write(tutut)
        except:
            pass

    def onPendingMessage(self, **kwargs): pass
    def onColorChange(self, **kwargs): pass
    def onEmojiChange(self, **kwargs): pass
    def onTitleChange(self, **kwargs): pass
    def onImageChange(self, **kwargs): pass
    def onNicknameChange(self, **kwargs): pass
    def onAdminAdded(self, **kwargs): pass
    def onAdminRemoved(self, **kwargs): pass
    def onApprovalModeChange(self, **kwargs): pass
    def onMessageSeen(self, **kwargs): pass
    def onMessageDelivered(self, **kwargs): pass
    def onMarkedSeen(self, **kwargs): pass
    def onMessageUnsent(self, **kwargs): pass
    def onPeopleAdded(self, **kwargs): pass
    def onPersonRemoved(self, **kwargs): pass
    def onFriendRequest(self, **kwargs): pass
    def onInbox(self, **kwargs): pass
    def onTyping(self, **kwargs): pass
    def onGamePlayed(self, **kwargs): pass
    def onReactionAdded(self, **kwargs): pass
    def onReactionRemoved(self, **kwargs): pass
    def onBlock(self, **kwargs): pass
    def onUnblock(self, **kwargs): pass
    def onLiveLocation(self, **kwargs): pass
    def onCallStarted(self, **kwargs): pass
    def onCallEnded(self, **kwargs): pass
    def onUserJoinedCall(self, **kwargs): pass
    def onPollCreated(self, **kwargs): pass
    def onPollVoted(self, **kwargs): pass
    def onPlanCreated(self, **kwargs): pass
    def onPlanEnded(self, **kwargs): pass
    def onPlanEdited(self, **kwargs): pass
    def onPlanDeleted(self, **kwargs): pass
    def onPlanParticipation(self, **kwargs): pass
    def onChatTimestamp(self, **kwargs): pass
    def onBuddylistOverlay(self, **kwargs): pass
    def onUnknownMesssageType(self, **kwargs): pass
    def onMessageError(self, **kwargs): pass


username_theo = "theo.petit.1848"
# username = input("username : ")
client = TututBot(username_theo, getpass())
client.listen()
