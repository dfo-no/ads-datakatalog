import azure.functions as func
from helpers.dcat.dcat_service import get_dcat

def main(req: func.HttpRequest) -> func.HttpResponse:

    try:
        return func.HttpResponse(
            get_dcat(),
            status_code=200,
            mimetype='text/turtle'
        )
    except Exception as e:
        print(f"An exception occurred: {e}")
        return func.HttpResponse(
            'An exception occurred',
            status_code=500,
            mimetype='text/plain'
        )
        

