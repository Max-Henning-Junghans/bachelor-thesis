"""Handle the API endpoints for the API requests. Only returns data, no html."""
from flask import (
    Blueprint
)
from ..bigchaindb import get_with_id
from flask_cors import CORS

api = Blueprint('api', __name__, url_prefix='/api/v1/food')
CORS(api)


@api.route('/<food_id>', methods=('GET',))
def index(food_id):
    """Get the data for the food with a specific id.

    :param food_id: The food id of the food. This is not the tx id from BigchainDB.
    :return: The data of the requested food.
    """
    data_from_bigchaindb = get_with_id(food_id)
    return data_from_bigchaindb
