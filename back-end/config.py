import os


class Config:
    # Statement for enabling the development environment
    DEBUG = False

    # Define the application directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2

    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = True


class Testing(Config):
    TESTING = True
    MONGODB_SETTINGS = {"db": "mongoenginetest", "host": "mongomock://localhost"}
    DEBUG = True


class Dev(Config):
    DEBUG = True
    MONGODB_SETTINGS = {
        "db": os.environ.get("DB_NAME"),
        "host": os.environ.get("DB_HOST"),
        "username": os.environ.get("DB_USERNAME"),
        "password": os.environ.get("DB_PASSWORD"),
    }


class Prod(Config):
    pass
