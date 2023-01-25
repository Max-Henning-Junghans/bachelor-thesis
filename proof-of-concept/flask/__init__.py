"""Backend for the supply line proof of concept."""
from flask import Flask
from .api.routes import api


def create_app():
    """Create the app.

    :return: Fully initialized app
    """
    # create and configure the app
    app = Flask(__name__)

    app.register_blueprint(api)

    return app
