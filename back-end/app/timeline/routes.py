# Import flask dependencies

from flask import Blueprint, current_app, jsonify, request
from marshmallow import ValidationError
from marshmallow import __version__ as marshmallow_version

from app.utils import apply_map

from .models import Sentiment
from .schemas import LatentAssociationSchema, TimelineSchema
from .utils import (
    get_latent_association_data,
    get_word_frequency_data,
    get_word_sentiment_data,
)

routes = Blueprint("timeline", __name__)

@routes.route("/", methods=["GET"])
def index():
    """Get a page that confirms the endpoint works"""
    return jsonify({"code": 202, "message": "Hello from timeline"})


@routes.route("/frequency", methods=["POST"])
def get_frequency():
    """Get frequency data for a set of words"""
    # Compare the incoming parameters to the Timeline schema
    try:
        TimelineSchema().load(request.get_json(force=True))
    except ValidationError as err:
        return jsonify({"code": 400, "messages": err.messages}), 400

    year_from = int(request.json["year_from"])
    year_to = int(request.json["year_to"])

    # Convert all words to lowercase and strip spaces to use with models
    words = apply_map(
        [lambda word: word.lower(), lambda word: word.strip()], request.json["words"]
    )
    word_frequency_data = get_word_frequency_data(words, year_from, year_to)
    if word_frequency_data:
        return jsonify({"code": 202, "data": word_frequency_data}), 202
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


@routes.route("/sentiment", methods=["POST"])
def get_sentiment():
    """Get sentiment data for a set of words"""
    # Compare incomng parameters to Timeline schema
    try:
        TimelineSchema().load(request.get_json(force=True))
    except ValidationError as err:
        return jsonify({"code": 400, "messages": err.messages}), 400

    year_from = int(request.json["year_from"])
    year_to = int(request.json["year_to"])
    # Convert all words to lowercase and strip spaces to use with models
    words = apply_map(
        [lambda word: word.lower(), lambda word: word.strip()], request.json["words"]
    )
    word_sentiment_data = get_word_sentiment_data(
        Sentiment.objects(word__in=words, year__lte=year_to, year__gte=year_from)
    )

    if word_sentiment_data:
        return jsonify({"code": 202, "data": word_sentiment_data}), 202
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


@routes.route("/latent-association", methods=["POST"])
def get_latent_association():
    """Get latent association data for two sets of words"""
    # Compare incoming parameters to Latent Association schema
    try:
        LatentAssociationSchema().load(request.get_json(force=True))
    except ValidationError as err:
        return jsonify({"code": 400, "messages": err.messages}), 400

    year_from = request.json["year_from"]
    year_to = request.json["year_to"]

    # Convert all words to lowercase and strip spaces to use with models
    concept_1 = apply_map(
        [lambda word: word.lower(), lambda word: word.strip()],
        request.json["concept_1"],
    )
    concept_2 = apply_map(
        [lambda word: word.lower(), lambda word: word.strip()],
        request.json["concept_2"],
    )

    latent_association_data = get_latent_association_data(
        year_from, year_to, concept_1, concept_2
    )

    if latent_association_data:
        return jsonify({"code": 202, "data": latent_association_data}), 202
    return (
        jsonify(
            {
                "code": 400,
                "messages": {"concepts": ["Could not get enough data for these words"]},
            }
        ),
        400,
    )
