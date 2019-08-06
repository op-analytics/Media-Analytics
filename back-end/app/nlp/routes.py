# Import flask dependencies
from flask import Blueprint, jsonify

nlp = Blueprint('nlp', __name__)


@nlp.route('/', methods=['GET'])
def index():
    return jsonify({
        'code': 202,
        'message': "Hello from nlp"
    })
