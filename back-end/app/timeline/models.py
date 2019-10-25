# pylint: disable=no-member
from app import db


class Sentiment(db.Document):
    year = db.IntField(required=True)
    word = db.StringField(required=True)
    sentiment = db.FloatField(required=True)


class LatentAssociation(db.Document):
    year_from = db.IntField(required=True)
    year_to = db.IntField(required=True)
    word = db.StringField(required=True)
    vectors = db.ListField(required=True)
