import json
from typing import final
from helpers.purview.purview_api import get_purview_client

glossary_id: final = 'ef38fdb9-bbd5-4c5e-92fd-30bebc07a3f1'


def get_terms(include_drafts: bool = False) -> list[dict]:
    purview_client = get_purview_client()

    # Local test:
    #
    # with open('terms/sample.json') as json_file:
    #     all_terms = json.load(json_file)

    all_terms: dict = purview_client.glossary.get_detailed_glossary(
        glossary_id, include_term_hierarchy=True)

    term_info: dict = all_terms.get('termInfo')

    # Fjern alle ikke approved termer
    terms_flattened = map(lambda t: term_info.get(t), term_info)
    terms = list(filter(
        lambda t: include_drafts or t.get('status') == 'Approved',
        terms_flattened))

    # Fjern alle relaterte termer som ikke er approved
    included_guids = list(map(lambda t: t.get('guid'), terms))
    for term in terms:
        related_terms = term.get('seeAlso')
        included_related_terms = []
        for related_term in related_terms:
            related_term_guid = related_term.get('termGuid')
            if related_term_guid in included_guids:
                included_related_terms.append(related_term)
        term['seeAlso'] = included_related_terms

    return terms
