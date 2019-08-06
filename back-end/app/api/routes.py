# Import flask dependencies
from flask import Blueprint, jsonify

routes = Blueprint('api', __name__,)


@routes.route('/', methods=['GET'])
def index():
    return jsonify({
        'code': 202,
        'message': "Hello from Media Analytics API"
    })
