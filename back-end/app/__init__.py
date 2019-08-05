# Import flask and template operators
from flask import Flask,jsonify

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Import flask modules to use below
from app.nlp.controller import nlp as nlp_module
from app.api.controller import api as api_module

# Register blueprint(s)
app.register_blueprint(api_module)
app.register_blueprint(nlp_module, url_prefix='/nlp')

# Sample JSON error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'code':404,
        'message':"not_found"
    }), 404

