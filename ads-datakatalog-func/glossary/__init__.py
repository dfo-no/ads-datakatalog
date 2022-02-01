from urllib import request
import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.purview.catalog import PurviewCatalogClient
import json

datacatalog_id = 'ads-datakatalog-prod'
glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    credential = DefaultAzureCredential()
    purview_client = PurviewCatalogClient(
        endpoint=f"https://{datacatalog_id}.purview.azure.com", credential=credential)

    terms = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)

    return func.HttpResponse(
        json.dumps(terms),
        status_code=200
    )
