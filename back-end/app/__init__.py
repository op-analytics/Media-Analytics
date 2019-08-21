# Import flask dependencies
from flask import Flask, jsonify, g, request
from flask_cors import CORS


# Create Plugins
# Example db = sqlAlchemy()
cors = CORS()


def create_app(config_filename='config.Config'):
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config_filename)

    # Initialize Plugins
    # Example db.init_app(app)
    cors.init_app(app)
    with app.app_context():
        # Import and Register blueprint(s)
        from app.api.routes import routes as api_routes
        from app.nlp.routes import routes as nlp_routes
        from app.timeline.routes import routes as timeline_routes

        app.register_blueprint(api_routes)
        app.register_blueprint(nlp_routes, url_prefix='/nlp')
        app.register_blueprint(timeline_routes, url_prefix='/timeline')

        @app.errorhandler(404)
        #pylint: disable=unused-variable
        def not_found():
            return jsonify({
                'code': 404,
                'message': "not_found",
            }), 404
        return app
