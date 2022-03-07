from app import db

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, index=True, unique=True)
    reaction = db.Column(db.String(120), index=True, unique=True)
    timestamp_ms = db.Column(db.Integer, index=True, unique=True)
    text = db.Column(db.Integer, index=True, unique=True)
    thread =db.Column(db.Integer, index=True, unique=True)

    def __repr__(self):
        return '<Message {}>'.format(self.id)