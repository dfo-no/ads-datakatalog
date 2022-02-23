import azure.functions as func
import json
import re
from helpers.purview.purview_service import get_entity

guid_pattern = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'


def create_error(error_message: str) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps(
            {'error': error_message}),
        status_code=400,
        mimetype='application/json'
    )


def main(req: func.HttpRequest) -> func.HttpResponse:
    entity_id = req.route_params.get('id')

    if(not re.match(guid_pattern, entity_id)):
        return create_error(f'<{entity_id}> is not a valid GUID.')

    entity = get_entity(entity_id)

    return func.HttpResponse(
        json.dumps(entity),
        status_code=200,
        mimetype='application/json'
    )
