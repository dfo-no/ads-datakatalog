
from typing import Dict
from datacatalogtordf import Catalog, Dataset, Distribution

from dcat_mapper.term_type import TermType

dfo_uri = "https://data.dfo.no"
dfo_orgnr = "986252932"


def get_guid_from_uri(uri: str) -> str:
    return uri.split('/')[-1]


def first_if_exists(the_list: list) -> any:
    if len(the_list) >= 1:
        return the_list[0]

    return None


def parse_value(value: str) -> list:
    """Parses the value string and returns a list of codes. The value list looks like "code | description; code2 | description" """
    value_seperator = ";"
    code_and_desc_seperator = "|"

    codes = map(
        lambda x: x.split(code_and_desc_seperator)[0].strip(' '),
        value.split(value_seperator)
    )

    return list(codes)


def map_frequency(frequency_codes: list) -> str:
    frequency_uri = "https://purl.org/dc/terms/Frequency"
    return f"{frequency_uri}/{frequency_codes[0]}"


def map_publisher(publisher_codes: list) -> str:
    publisher_uri = "https://organization-catalogue.fellesdatakatalog.digdir.no/organizations"
    return f"{publisher_uri}/{publisher_codes[0]}"


def map_access_rights(access_rights_codes: list) -> str:
    access_rights_uri = "https://publications.europa.eu/resource/authority/access-right"
    return f"{access_rights_uri}/{access_rights_codes[0]}"


def map_dataset(jsonDataset: Dict, distributions: list[Distribution]) -> Dataset:
    """Maps a glossary term of type Datasett to a RDF-dataset"""
    attributes: Dict = jsonDataset.get('attributes').get('Datasett')

    dataset = Dataset()

    # Map attributes
    dataset.identifier = f"{dfo_uri}/datasets/{jsonDataset.get('guid')}"
    dataset.title = {"nb": attributes.get('Tittel')}
    dataset.description = {"nb": jsonDataset.get('longDescription')}
    dataset.frequency = map_frequency(
        parse_value(attributes.get('Oppdateringsfrekvens')))
    dataset.publisher = map_publisher(
        parse_value(attributes.get('Utgiver')))
    dataset.theme = parse_value(attributes.get('Tema'))
    dataset.access_rights = map_access_rights(
        parse_value(attributes.get('Tilgangsnivå')))

    # Map related terms
    distribution_guids = dict(
        map(lambda d: [get_guid_from_uri(d.identifier), d], distributions))

    for related_term in jsonDataset.get('seeAlso'):
        if related_term.get('termGuid') in distribution_guids:
            dataset.distributions.append(
                distribution_guids[related_term.get('termGuid')])

    return dataset


def map_distribution(json_distribution: Dict) -> Distribution:
    """Maps a glossary term of type Distribution to a RDF-dataset"""
    attributes: Dict = json_distribution.get('attributes').get('Distribusjon')

    distribution = Distribution()
    distribution.identifier = f"{dfo_uri}/distributions/{json_distribution.get('guid')}"
    distribution.title = {"nb": attributes.get('Tittel')}
    distribution.description = {"nb": json_distribution.get('longDescription')}
    distribution.formats = parse_value(attributes.get('Format'))
    distribution.access_URL = first_if_exists(
        parse_value(attributes.get('TilgangsUrl')))
    distribution.download_URL = first_if_exists(parse_value(
        attributes.get('Nedlastningslenke')))

    return distribution


def get_term_type(term: Dict) -> TermType:
    """Figures out what kind of term a term is"""

    if 'Datasett' in term.get('attributes'):
        return TermType.DATASET
    if 'Informasjonsmodell' in term.get('attributes'):
        return TermType.INFORMATION_MODEL
    if 'Distribusjon' in term.get('attributes'):
        return TermType.DISTRIBUTION

    return TermType.UNKNOWN


def map_json_to_rdf(json: Dict) -> str:
    catalog = Catalog()
    catalog.identifier = f"{dfo_uri}/catalogs/1"
    catalog.title = {
        "no": "Direktoratet for forvaltning og økonomistyrings datakatalog"
    }
    catalog.publisher = map_publisher([dfo_orgnr])
    catalog.language = ['no']

    json_datasets = []
    json_models = []
    json_distributions = []

    for termId in json.get('termInfo'):
        term = json.get('termInfo').get(termId)

        termType = get_term_type(term)
        if termType == TermType.DATASET:
            json_datasets.append(term)
        if termType == TermType.INFORMATION_MODEL:
            json_models.append(term)
        if termType == TermType.DISTRIBUTION:
            json_distributions.append(term)

    for json_distribution in json_distributions:
        distribution = map_distribution(json_distribution)
        catalog.distributions.append(distribution)

    for json_dataset in json_datasets:
        dataset = map_dataset(json_dataset, catalog.distributions)
        catalog.datasets.append(dataset)

    return catalog.to_rdf()
