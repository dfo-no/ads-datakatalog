import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.purview.catalog import PurviewCatalogClient
import json
import os

default_datacatalog_id = 'ads-datakatalog-prod'
glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    datacatalog_id = os.getenv('DATACATALOG-ID', default_datacatalog_id)

    credential = DefaultAzureCredential()
    purview_client = PurviewCatalogClient(
        endpoint=f"https://{datacatalog_id}.purview.azure.com", credential=credential)

    terms = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)

    return func.HttpResponse(
        json.dumps(terms),
        status_code=200,
        mimetype='application/json'
    )
