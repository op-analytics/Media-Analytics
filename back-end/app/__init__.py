# Import flask and template operators
from flask import Flask,jsonify

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Sample JSON error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify(
            code=404,
            message="not_found"
            ), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.nlp.controllers import nlp as nlp_module

# Register blueprint(s)
app.register_blueprint(nlp_module)
# app.register_blueprint(xyz_module)
