import azure.functions as func
from helpers.purview.purview_api import get_purview_client
import json

from helpers.purview.purview_service import get_terms

glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:

    approved_terms = get_terms()

    return func.HttpResponse(
        json.dumps(approved_terms),
        status_code=200,
        mimetype='application/json'
    )
