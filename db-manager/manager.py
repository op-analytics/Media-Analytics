import _pickle as pickle
import os

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

connect("nyta")

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

year_range = range(1900, 2000)


class MediaOutlet(Document):
    name = StringField(required=True)


class Sentiment(Document):
    word = StringField(required=True)
    year = IntField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    sentiment = FloatField(required=True)


class LatentAssociation(Document):
    word = StringField(required=True)
    year_from = IntField(required=True)
    year_to = IntField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    vectors = ListField(required=False)


class Frequency(Document):
    word = StringField(required=True)
    year = StringField(required=True)
    media_outlet = ReferenceField(MediaOutlet, required=True)
    rank = IntField(required=True)
    count = IntField(required=True)
    freq = FloatField(required=True)
    rel_freq = FloatField(required=False)


mongo_documents = {
    "sentiment": Sentiment,
    "latent_association": LatentAssociation,
    "frequency": Frequency,
}


def add_relative_frequency(year, media_outlet):
    frequency_objects = Frequency.objects(year=year, media_outlet=media_outlet)
    max_freq = frequency_objects.order_by("-freq")[0]["freq"]
    with click.progressbar(
        frequency_objects,
        label="Calculating relative frequencies...",
        length=len(frequency_objects),
    ) as frequencies:
        for word in frequencies:
            word["rel_freq"] = word["freq"] / max_freq
            word.save()


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
        MediaOutlet(new_media_outlet).save()

    if file.endswith(".pkl"):
        with open(file, "rb") as data_file:
            if drop_collection:
                mongo_documents[data_type].drop_collection()
            pickle_data = pickle.load(data_file)
            for year, data in pickle_data.items():
                data_year = year
                if data_type == "latent_association":
                    data_year = year.split("-")[0]
                if int(data_year) in year_range:
                    with click.progressbar(
                        data.items(),
                        label="Adding words from " + year,
                        length=len(data.items()),
                    ) as year_data:
                        for word, word_data in year_data:
                            new_word = mongo_documents[data_type](
                                word, year, media_outlet, **word_data
                            )
                            if data_type == "latent_association":
                                year_from, year_to = year.split("-")
                                new_word = mongo_documents[data_type](
                                    word,
                                    year_from,
                                    year_to,
                                    media_outlet,
                                    word_data["vectors"],
                                )
                            new_word.save()
                    if data_type == "frequency":
                        add_relative_frequency(year, media_outlet)


if __name__ == "__main__":
    cli()
