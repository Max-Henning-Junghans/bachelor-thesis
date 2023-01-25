from bigchaindb_driver import BigchainDB
from .ai import evaluate_data

bdb_root_url = '0.0.0.0:9984'  # TODO: This is the URL of my local node, put the URL of your node here.
bdb = BigchainDB(bdb_root_url)


def get_with_id(food_id, api="bigchaindb"):
    """Access the data for the requested food from the BigchainDB API.

    :param food_id: Issued ID of the requested food, not the tx id of BigchainDB.
    :param api: The API from which the data should be requested.
    :return: The data of the requested food.
    """
    if api == "bigchaindb":
        return use_bigchaindb_api(food_id)
    elif api == "mongodb":
        return use_mongodb_api(food_id)
    else:
        return ""


def use_bigchaindb_api(food_id):
    """Access the data for the requested food from the BigchainDB API.

    :param food_id: Issued ID of the requested food, not the tx id of BigchainDB.
    :return: The data of the requested food.
    """
    if not bdb.assets.get(search=food_id):
        return [{"Error": "This entry does not exist!"}]
    asset_id = bdb.assets.get(search=food_id)[0]["id"]
    transactions = bdb.transactions.get(asset_id=asset_id)
    result = [transactions[0]["asset"]]
    del result[0]["data"]["id"]
    for i in range(len(transactions)):
        temp = transactions[i]["metadata"]
        if temp is not None:
            result.append(transactions[i]["metadata"])
    result.insert(0, {'ai_model': evaluate_data(result)})
    return result


# TODO Implement request with MongoDB API
def use_mongodb_api(food_id):
    """Access the data for the requested food from the MongoDB API.

    :param food_id: Issued ID of the requested food, not the tx id of BigchainDB.
    :return: The data of the requested food.
    """
    return ""
