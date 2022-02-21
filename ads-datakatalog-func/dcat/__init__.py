import azure.functions as func
from helpers.dcat_mapper.mapper import map_json_to_rdf
from helpers.purview.purview_service import get_terms

glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    terms = get_terms()

    return func.HttpResponse(
        map_json_to_rdf(terms),
        status_code=200,
        mimetype='text/turtle'
    )
