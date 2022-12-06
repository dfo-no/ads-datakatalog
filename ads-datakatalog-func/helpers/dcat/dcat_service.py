from typing import final
from atlasdcat import AtlasDcatMapper, AtlasGlossaryClient, Attribute
from pyapacheatlas.auth import ServicePrincipalAuthentication
from cachetools import cached, TTLCache
import os

DEFAULT_CATALOG_ID: final = 'ads-datakatalog-prod'

@cached(cache=TTLCache(maxsize=1024, ttl=300))
def get_dcat() -> str:
    datacatalog_id = os.getenv('DATACATALOG-ID', DEFAULT_CATALOG_ID)
    
    # Apache Atlas authentication using Azure Service Principal
    auth = ServicePrincipalAuthentication(
        tenant_id=os.getenv("AZURE_TENANT_ID", ""),
        client_id=os.getenv("AZURE_CLIENT_ID", ""),
        client_secret=os.getenv("AZURE_CLIENT_SECRET", ""),
    )

    # Setup Apache Atlas glossary client
    atlas_client = AtlasGlossaryClient(
        endpoint_url=f"https://{datacatalog_id}.purview.azure.com/catalog/api/atlas/v2", authentication=auth
    )

    # Initialize Atlas DCAT Mapper
    mapper = AtlasDcatMapper(
        glossary_client=atlas_client,
        glossary_id='ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1',
        catalog_uri='https://data.dfo.no/catalogs/1',
        catalog_language='http://publications.europa.eu/resource/authority/language/NOB',
        catalog_title='Direktoratet for forvaltning og økonomistyrings datakatalog',
        catalog_publisher='https://organization-catalogue.fellesdatakatalog.digdir.no/organizations/986252932',
        dataset_uri_template="https://data.dfo.no/datasets/{guid}",
        distribution_uri_template="https://data.dfo.no/distributions/{guid}",
        language='nb',
        include_approved_only=True,
        attr_mapping={
            Attribute.ACCESS_RIGHTS: "Tilgangsnivå",
            Attribute.ACCESS_URL: "TilgangsUrl",
            Attribute.CONTACT_EMAIL: "DataeierEpost",
            Attribute.CONTACT_NAME: "Dataeier",
            Attribute.DATASET: "Datasett",
            Attribute.DISTRIBUTION: "Distribusjon",
            Attribute.DOWNLOAD_URL: "Nedlastningslenke",
            Attribute.FORMAT: "Format",
            Attribute.FREQUENCY: "Oppdateringsfrekvens",
            Attribute.INCLUDE_IN_DCAT: "PubliseresPåFellesDatakatalog",
            Attribute.KEYWORD: "Emneord",
            Attribute.LICENSE: "Lisens",
            Attribute.PUBLISHER: "Utgiver",
            Attribute.SPATIAL: "GeografiskAvgrensning",
            Attribute.SPATIAL_RESOLUTION_IN_METERS: "GeografiskOppløsning",
            Attribute.THEME: "Tema",
            Attribute.TITLE: "Tittel",
            Attribute.TEMPORAL_START_DATE: "TidsmessigAvgrensetFra",
            Attribute.TEMPORAL_END_DATE: "TidsmessigAvgrensetTil",
            Attribute.TEMPORAL_RESOLUTION: "PeriodeOppløsning",
        },
    )

    # Fetch glossary and map terms to dataset catalog
    mapper.fetch_glossary()
    catalog = mapper.map_glossary_terms_to_dataset_catalog()
    # Return RDF (Turtle)
    return catalog.to_rdf()
