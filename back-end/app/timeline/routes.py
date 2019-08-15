# Import flask dependencies
from flask import Blueprint, jsonify, request
from marshmallow import Schema, fields, ValidationError
from app.models.model_functions import loadModels
import os

routes = Blueprint('timeline', __name__)

models = loadModels(os.environ['TIMELINE_MODELS_DIR'])

class FrequencySchema(Schema):
    year_from = fields.Int(required=True)
    year_to = fields.Int(required=True)
    word = fields.Str(required=True)


@routes.route('/', methods=['GET'])
def index():
    return jsonify({
        'code': 202,
        'message': "Hello from nlp"
    })


@routes.route('/frequency', methods=['POST'])
def getFrequency():
    try:
        FrequencySchema(strict=True).load(request.json)
    except ValidationError as err:
        return jsonify({
            'code': 400,
            'messages': err.messages
        }), 400
    year_from = int(request.json['year_from'])
    year_to = int(request.json['year_to'])
    word = request.json['word'].lower()
    data = []
    for year, model in models.items():
        totalWordCount = 0
        for w in model.wv.vocab:
            totalWordCount += model.wv.vocab[w].count
        year = int(year)
        if year < year_from or year > year_to:
            continue
        wordCount = model.wv.vocab[word].count
        wordFreq = (wordCount/totalWordCount) * 100
        # Add the data to dictionary
        data.append({
            'year': year,
            'word': word,
            'rank': model.wv.vocab[word].index+1,
            'wordCount': wordCount,
            'wordFreq': wordFreq
        })
    # return the data dictionary
    return jsonify({
        'code': 202,
        'data': data
    }), 202
