from .models import KnownSharingService
from .serializers import UserSerializer
import requests
from urlparse import urlparse


MIME_TYPE = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif'
        ]

def jwt_response_payload_handler(token, user=None, request=None):
    return {
            'token': token,
            'user': UserSerializer(user, context={'request': request}).data,
            'debug': True
            }


def check_link(url):

    r = requests.get(url)
    if r.status_code is not 200 or r.headers['Content-Type'] not in MIME_TYPE:
        return False
    else:
        return True

