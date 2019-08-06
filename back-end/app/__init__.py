# Import flask and template operators
from flask import Flask, jsonify
from app.api.routes import routes as api_routes
from app.nlp.routes import routes as nlp_routes

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Register blueprint(s)
app.register_blueprint(api_routes)
app.register_blueprint(nlp_routes, url_prefix='/nlp')

# Sample JSON error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'code': 404,
        'message': "not_found"
    }), 404
