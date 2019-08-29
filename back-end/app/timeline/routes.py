# Import flask dependencies
import os
from functools import reduce

from flask import Blueprint, current_app, jsonify, request
from gensim.models import Word2Vec
from marshmallow import ValidationError
from marshmallow import __version__ as marshmallow_version

from app.models.model_functions import loadModels

from .schemas import FrequencySchema

routes = Blueprint("timeline", __name__)

# TODO: Tidy this up as it seems like bad practice
# Use models from enviroment if not testing
testModel = Word2Vec(
    [["first", "sentence"], ["second", "sentence"]],
    min_count=1,
    batch_words=0.1,
    workers=1,
)
testModel.totalWordCount = reduce(
    lambda total, word: total + word.count, testModel.wv.vocab.values(), 0
)
models = (
    loadModels(os.environ["TIMELINE_MODELS_DIR"])
    if not current_app.config["TESTING"]
    else {"1999": testModel}
)

# The frequency data for each word in words for the year range given.
def getWordFrequencyData(words, year_from, year_to):
    frequencyData = []
    for year, model in models.items():
        year = int(year)
        if year < year_from or year > year_to:
            continue
        for word in words:
            try:
                wordCount = model.wv.vocab[word].count
                wordFreq = (wordCount / model.totalWordCount) * 100
                wordRank = model.wv.vocab[word].index + 1
            except KeyError:  # The word is not in vocabulary for this year.
                wordCount = 0
                wordFreq = 0
                wordRank = 0
            # Get the index of the object containing the current word in frequencyData.
            dataIndex = next(
                (index for (index, w) in enumerate(frequencyData) if w["word"] == word),
                None,
            )
            # If the word is not already in frequencyData.
            if dataIndex == None:
                frequencyData.append(
                    {
                        "word": word,
                        "data": [
                            {
                                "year": year,
                                "rank": wordRank,
                                "wordCount": wordCount,
                                "wordFreq": wordFreq,
                            }
                        ],
                    }
                )
            else:
                # If the word already exists in frequency data, just append the current year's data.
                frequencyData[dataIndex]["data"].append(
                    {
                        "year": year,
                        "rank": wordRank,
                        "wordCount": wordCount,
                        "wordFreq": wordFreq,
                    }
                )
    return frequencyData


@routes.route("/", methods=["GET"])
def index():
    return jsonify({"code": 202, "message": "Hello from timeline"})


@routes.route("/frequency", methods=["POST"])
def getFrequency():
    try:
        # pylint: disable=unexpected-keyword-arg
        FrequencySchema(strict=True).load(
            request.get_json(force=True)
        ) if int(  # Still needed?
            marshmallow_version[0]
        ) < 3 else FrequencySchema().load(
            request.get_json(force=True)
        )
    except ValidationError as err:
        return jsonify({"code": 400, "messages": err.messages}), 400
    year_from = int(request.json["year_from"])
    year_to = int(request.json["year_to"])
    # Convert all words to lowercase to use with models
    words = list(map(lambda word: word.lower(), request.json["words"]))
    wordFrequencyData = getWordFrequencyData(words, year_from, year_to)
    if len(wordFrequencyData) > 0:
        # Return the data dictionary
        return jsonify({"code": 202, "data": wordFrequencyData}), 202
    else:
        return (
            jsonify(
                {
                    "code": 400,
                    "messages": {
                        "year_range": ["No data exists for any year in given range"]
                    },
                }
            ),
            400,
        )
