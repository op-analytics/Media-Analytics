# Import flask dependencies
from flask import Blueprint, jsonify

api = Blueprint('api', __name__,)


@api.route('/', methods=['GET'])
def index():
    return jsonify({
        'code': 202,
        'message': "Hello from Media Analytics API"
    })
