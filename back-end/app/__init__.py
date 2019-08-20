# Import flask dependencies
from flask import Flask, jsonify, g

# Create Plugins
# Example db = sqlAlchemy()


def create_app(config_filename='config.Config'):
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config_filename)

    # Initialize Plugins
    # Example db.init_app(app)
    with app.app_context():
        # Import and Register blueprint(s)
        from app.api.routes import routes as api_routes
        from app.nlp.routes import routes as nlp_routes

        app.register_blueprint(api_routes)
        app.register_blueprint(nlp_routes, url_prefix='/nlp')

        @app.errorhandler(404)
        #pylint: disable=unused-variable
        def not_found():
            return jsonify({
                'code': 404,
                'message': "not_found",
            }), 404
        return app
