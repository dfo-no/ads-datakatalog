import json
from typing import final
import azure.functions as func
from helpers.purview.purview_api import get_purview_client

glossary_id: final = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    purview_client = get_purview_client()
    all_terms: dict = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)

    return func.HttpResponse(
        json.dumps(all_terms),
        status_code=200
    )
