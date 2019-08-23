# Import flask dependencies
from flask import Blueprint, jsonify, request
from marshmallow import ValidationError, __version__ as marshmallow_version
from app.models.model_functions import loadModels
from .schemas import FrequencySchema
import os

routes = Blueprint('timeline', __name__)

models = loadModels(os.environ['TIMELINE_MODELS_DIR'])


@routes.route('/', methods=['GET'])
def index():
    return jsonify({
        'code': 202,
        'message': "Hello from nlp"
    })


@routes.route('/frequency', methods=['POST'])
def getFrequency():
    try:
        #pylint: disable=unexpected-keyword-arg
        FrequencySchema(strict=True).load(request.get_json(force=True)) if int(
            marshmallow_version[0]) < 3 else FrequencySchema().load(request.get_json(force=True))
    except ValidationError as err:
        return jsonify({
            'code': 400,
            'messages': err.messages
        }), 400
    year_from = int(request.json['year_from'])
    year_to = int(request.json['year_to'])
    # Convert word to lowercase to use with models
    word = request.json['word'].lower()
    data = []
    for year, model in models.items():
        year = int(year)
        if year < year_from or year > year_to:
            continue
        try:
            wordCount = model.wv.vocab[word].count
            wordFreq = (wordCount/model.totalWordCount) * 100
            # Add the data to dictionary
            data.append({
                'year': year,
                'word': word,
                'rank': model.wv.vocab[word].index+1,
                'wordCount': wordCount,
                'wordFreq': wordFreq
            })
        except KeyError:
            data.append({
                'year': year,
                'word': word,
                'rank': 0,
                'wordCount': 0,
                'wordFreq': 0
            })
    # return the data dictionary
    return jsonify({
        'code': 202,
        'data': data
    }), 202
