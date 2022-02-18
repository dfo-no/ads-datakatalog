import azure.functions as func
from helpers.purview_api.purview_api import get_purview_client
import json

glossary_id = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def main(req: func.HttpRequest) -> func.HttpResponse:
    purview_client = get_purview_client()

    # Local test:
    #
    # with open('terms/sample.json') as json_file:
    #     terms = json.load(json_file)

    terms: dict = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)

    term_info: dict = terms.get('termInfo')

    # Fjern alle ikke approved termer
    terms_flattened = map(lambda t: term_info.get(t), term_info)
    approved_terms = list(filter(
        lambda t: t.get('status') == 'Approved',
        terms_flattened))

    # Fjern alle relaterte termer som ikke er approved
    approved_guids = list(map(lambda t: t.get('guid'), approved_terms))
    for term in approved_terms:
        related_terms = term.get('seeAlso')
        approved_related_terms = []
        for related_term in related_terms:
            related_term_guid = related_term.get('termGuid')
            if related_term_guid in approved_guids:
                approved_related_terms.append(related_term)
        term['seeAlso'] = approved_related_terms

    return func.HttpResponse(
        json.dumps(approved_terms),
        status_code=200,
        mimetype='application/json'
    )
