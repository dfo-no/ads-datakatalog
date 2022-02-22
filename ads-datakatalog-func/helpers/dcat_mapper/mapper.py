
from typing import Dict
from datacatalogtordf import Catalog, Dataset, Distribution
from helpers.dcat_mapper.term_type import TermType
from datacatalogtordf import Location
from concepttordf import Contact

DFO_NAME = 'Direktoratet for forvaltning og økonomistyrings datakatalog'
DFO_URI = 'https://data.dfo.no'
DFO_ORGNR = '986252932'
# Norsk lisens for offentlige data (NLOD)
LICENCE = 'http://publications.europa.eu/resource/authority/licence/NLOD_2_0'
DCAT_LANGUAGE = 'nb'


def get_guid_from_uri(uri: str) -> str:
    return uri.split('/')[-1]


def first_if_exists(the_list: list) -> any:
    if len(the_list) >= 1:
        return the_list[0]

    return ''


def parse_value(value: str) -> list:
    """Parses the value string and returns a list of codes. The value list looks like "code | description; code2 | description" """
    value_seperator = ";"
    code_and_desc_seperator = "|"

    if value == None:
        return []

    codes = map(
        lambda x: x.split(code_and_desc_seperator)[0].strip(' '),
        value.split(value_seperator)
    )

    return list(codes)


def map_frequency(frequency_codes: list) -> str:
    frequency_uri = 'http://publications.europa.eu/resource/authority/frequency'
    return f'{frequency_uri}/{frequency_codes[0]}'


def map_location(locations: list) -> Location:
    if len(locations) >= 1:
        return Location(locations[0])
    return None


def map_contact(contact_name: str, email: str) -> Location:
    contact = Contact()
    contact.name = {
        DCAT_LANGUAGE: contact_name
    }
    contact.email = email

    return contact


def map_keywords(keywords: list = []) -> dict:
    """Maps to a keyword dictionary. The dictionary has the language identifier as key"""
    return {DCAT_LANGUAGE: ','.join(keywords)}


def map_publisher(publisher_codes: list) -> str:
    publisher_uri = 'https://organization-catalogue.fellesdatakatalog.digdir.no/organizations'
    return f'{publisher_uri}/{publisher_codes[0]}'


def map_formats(formats: list[str]) -> list[str]:
    formats_uri = 'http://publications.europa.eu/resource/authority/file-type'
    return list(map(lambda f: f'{formats_uri}/{f.upper()}', formats))


def map_access_rights(access_rights_codes: list) -> str:
    access_rights_uri = 'http://publications.europa.eu/resource/authority/access-right'
    return f'{access_rights_uri}/{access_rights_codes[0]}'


def map_dataset(jsonDataset: Dict, distributions: list[Distribution]) -> Dataset:
    """Maps a glossary term of type Datasett to a RDF-dataset"""
    attributes: Dict = jsonDataset.get('attributes').get('Datasett')

    dataset = Dataset()
    # Map attributes
    dataset.identifier = f'{DFO_URI}/datasets/{jsonDataset.get("guid")}'
    dataset.title = {DCAT_LANGUAGE: attributes.get('Tittel')}
    dataset.description = {DCAT_LANGUAGE: jsonDataset.get('longDescription')}
    dataset.frequency = map_frequency(
        parse_value(attributes.get('Oppdateringsfrekvens')))
    dataset.publisher = map_publisher(
        parse_value(attributes.get('Utgiver')))
    dataset.theme = parse_value(attributes.get('Tema'))
    dataset.access_rights = map_access_rights(
        parse_value(attributes.get('Tilgangsnivå')))
    dataset.keyword = map_keywords(parse_value(attributes.get('Emneord')))
    dataset.spatial_coverage = map_location(
        parse_value(attributes.get('GeografiskAvgrensning')))
    dataset.contactpoint = map_contact(attributes.get(
        'Dataeier'), attributes.get('DataeierEpost'))
    dataset.license = first_if_exists(parse_value(
        attributes.get('Lisens')))

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
    distribution.identifier = f'{DFO_URI}/distributions/{json_distribution.get("guid")}'
    distribution.title = {DCAT_LANGUAGE: attributes.get('Tittel')}
    distribution.description = {
        DCAT_LANGUAGE: json_distribution.get('longDescription')}
    distribution.formats = map_formats(parse_value(attributes.get('Format')))
    distribution.access_URL = first_if_exists(
        parse_value(attributes.get('TilgangsUrl')))
    distribution.download_URL = first_if_exists(parse_value(
        attributes.get('Nedlastningslenke')))
    distribution.license = first_if_exists(parse_value(
        attributes.get('Lisens')))

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


def map_json_to_rdf(terms: list[dict]) -> str:
    catalog = Catalog()
    catalog.identifier = f'{DFO_URI}/catalogs/1'
    catalog.title = {
        DCAT_LANGUAGE: DFO_NAME
    }
    catalog.publisher = map_publisher([DFO_ORGNR])
    catalog.language = [DCAT_LANGUAGE]
    catalog.license = ''

    json_datasets = []
    json_models = []
    json_distributions = []

    for term in terms:
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
