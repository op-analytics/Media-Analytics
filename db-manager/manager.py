import os

import click
from mongoengine import Document, FloatField, IntField, StringField, connect

import _pickle as pickle

connect("nyta")


class Sentiment(Document):
    year = IntField(required=True)
    word = StringField(required=True)
    sentiment = FloatField(required=True)


mongo_documents = {"sentiment": Sentiment}


@click.group()
def cli():
    pass


@cli.command(help='Adds data from a given path to the database.')
@click.option("--data-type", type=click.Choice(mongo_documents.keys()), required=True, help='The type of data you wish to store from the list of previous options.')
@click.argument("file-path", type=click.Path(exists=True), required=True)
def add(data_type, file_path):
    files = os.listdir(file_path)
    for file in files:
        if file.endswith(".pkl"):
            with open(os.path.join(file_path, file), "rb") as data_file:
                year_data = pickle.load(data_file)
            with click.progressbar(
                year_data, label="Adding words from " + file, length=len(year_data)
            ) as year_data_to_load:
                for word_data in year_data_to_load:
                    word = mongo_documents[data_type](**word_data)
                    word.save()


if __name__ == "__main__":
    cli()
