# pylint: disable=no-member
from app import db


class Sentiment(db.Document):
    """MongoEngine document schema for Sentiment collection"""

    year = db.IntField(required=True)
    word = db.StringField(required=True)
    sentiment = db.FloatField(required=True)


class LatentAssociation(db.Document):
    """MongoEngine document schema for LatentAssociation collection"""

    year_from = db.IntField(required=True)
    year_to = db.IntField(required=True)
    word = db.StringField(required=True)
    vectors = db.ListField(required=True)

class Frequency(db.Document):
    """MongoEngine document schema for Frequency collection"""

    word = db.StringField(required=True)
    year = db.IntField(required=True)
    rank = db.IntField(required=True)
    count = db.IntField(required=True)
    freq = db.FloatField(required=True)
