from azure.identity import DefaultAzureCredential
from azure.purview.catalog import PurviewCatalogClient
import os

default_datacatalog_id = 'ads-datakatalog-prod'


def get_purview_client() -> PurviewCatalogClient:
    datacatalog_id = os.getenv('DATACATALOG-ID', default_datacatalog_id)

    credential = DefaultAzureCredential()
    purview_client = PurviewCatalogClient(
        endpoint=f"https://{datacatalog_id}.purview.azure.com", credential=credential)

    return purview_client
