# Import flask dependencies
import os
from functools import reduce

from flask import Blueprint, current_app, jsonify, request
from gensim.models import Word2Vec
from marshmallow import ValidationError
from marshmallow import __version__ as marshmallow_version

from app.models.model_functions import loadModels
from app.utils import Applymap

from .schemas import FrequencySchema 
from .utils.timeline import *

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
    # Convert all words to lowercase and strip spaces to use with models
    words = Applymap(
        [lambda word: word.lower(), lambda word: word.strip()], request.json["words"]
    )
    wordFrequencyData = getWordFrequencyData(models, words, year_from, year_to)
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
