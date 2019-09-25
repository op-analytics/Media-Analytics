from app import db

class Sentiment(db.Document):
    year = db.IntField(required=True)
    word = db.StringField(required=True)
    sentiment = db.FloatField(required=True)