import _pickle as pickle

import click

from mongoengine import (
    Document,
    FloatField,
    IntField,
    ListField,
    StringField,
    ReferenceField,
    connect,
)


connect(
    db="nyta",
    username="",
    password="",
    host="mongodb://localhost/nyta?authSource=admin",
)


media_outlets = [
    "bloomberg",
    "bre",
    "csm",
    "dailymail",
    "guardian",
    "hp",
    "lat",
    "nyp",
    "nyt",
    "wp",
    "wsj",
    "wt",
]

year_range = range(1970, 2020)


class MediaOutlet(Document):
    name = StringField(required=True)


class Sentiment(Document):
    word = StringField(required=True)
    year = IntField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    sentiment = FloatField(required=True)
    meta = {
        'indexes': [
            'word',
            'media_outlet',
            'year',
        ]
    }


class LatentAssociation(Document):
    word = StringField(required=True)
    year_from = IntField(required=True)
    year_to = IntField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    vectors = ListField(required=False)
    meta = {
        'indexes': [
            'word',
            'media_outlet',
            'year_from',
            'year_to',
        ]
    }


class Frequency(Document):
    word = StringField(required=True)
    year = StringField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    rank = IntField(required=True)
    count = IntField(required=True)
    freq = FloatField(required=True)
    meta = {
        'indexes': [
            'word',  # text index
            'media_outlet', # text index
            'year',
        ]
    }


mongo_documents = {
    "sentiment": Sentiment,
    "latent_association": LatentAssociation,
    "frequency": Frequency,
}


@click.group()
def cli():
    pass


@cli.command(help="Adds data from a given path to the database.")
@click.option(
    "--data-type",
    type=click.Choice(mongo_documents.keys()),
    required=True,
    help="The type of data you wish to store from the list of previous options.",
)
@click.option(
    "--media-outlet",
    type=click.Choice(media_outlets),
    required=True,
    help="The news outlet the data was retrieved from.",
)
@click.option(
    "--drop-collection",
    is_flag=True,
    help="Control whether the collection being added to will be dropped first.",
)
@click.argument("file", type=click.Path(exists=True), required=True)
def add(data_type, media_outlet, drop_collection, file):
    MediaOutlet.drop_collection()
    for new_media_outlet in media_outlets:
        MediaOutlet(name=new_media_outlet).save()

    if file.endswith(".pkl"):
        with open(file, "rb") as data_file:
            if drop_collection:
                mongo_documents[data_type].drop_collection()
            pickle_data = pickle.load(data_file)
            print(pickle_data.keys())
            for year, data in pickle_data.items():
                data_year = year
                if data_type == "latent_association":
                    data_year = year.split("-")[0]
                try:
                    data_year = int(data_year)
                except:
                    print("!!invalid year!!")

                if data_year in year_range:
                    with click.progressbar(
                        data.items(),
                        label="Adding words from " + year,
                        length=len(data.items()),
                    ) as year_data:
                        for word, word_data in year_data:
                            if data_type == "frequency":
                                new_word = mongo_documents[data_type](
                                    word=word, year=year, media_outlet=media_outlet, rank=word_data["rank"], count=word_data["count"], freq=word_data["freq"] 
                                )
                            #if data_type == "sentiment":
                            #    new_word = mongo_documents[data_type](
                            #        word, year, media_outlet, word_data
                            #    )

                            if data_type == "latent_association":
                                year_from, year_to = year.split("-")
                                new_word = mongo_documents[data_type](
                                    word=word,
                                    year_from=year_from,
                                    year_to=year_to,
                                    media_outlet=media_outlet,
                                    vectors=word_data["vectors"],
                                )
                            new_word.save()


if __name__ == "__main__":
    cli()
