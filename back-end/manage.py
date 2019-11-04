import os

from flask.cli import FlaskGroup

from app import create_app

def create_nyta_app():
    return create_app(config_filename=os.environ.get("APP_SETTINGS", "config.Config"))

app = create_nyta_app()

cli = FlaskGroup(create_app=create_nyta_app)

if __name__ == "__main__":
    cli()
