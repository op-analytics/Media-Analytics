# Import flask dependencies
from flask import Blueprint, jsonify, request
from marshmallow import Schema, fields, ValidationError
from app.models.model_functions import loadModels
import os

routes = Blueprint('timeline', __name__)


class FrequencySchema(Schema):
    year_from = fields.Str(required=True)
    year_too = fields.Str(required=True)
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
    models = loadModels(os.environ['TIMELINE_MODELS_DIR'])
    return jsonify({
        'code': 202,
        'messages': "Successfully made the request"
    }), 202
