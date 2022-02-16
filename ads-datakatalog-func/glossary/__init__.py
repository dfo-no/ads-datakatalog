import azure.functions as func
from purview_api.purview_api import get_purview_client
import json

glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    purview_client = get_purview_client()

    terms = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)


    return func.HttpResponse(
        json.dumps(terms.termInfo),
        status_code=200,
        mimetype='application/json'
    )
