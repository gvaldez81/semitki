import mimetypes
from .models import KnownSharingService
from .serializers import UserSerializer
import requests
from urlparse import urlparse


def jwt_response_payload_handler(token, user=None, request=None):
    return {
            'token': token,
            'user': UserSerializer(user, context={'request': request}).data,
            'debug': True
            }


def check_link(url, linkType='html'):

    mt = mimetypes.types_map.values()
    r = requests.get(url)
    # TODO filter non image and video types from mt
    if linkType is 'img':
        if r.status_code is not 200 or r.headers['Content-Type'] not in mt:
            return False
    else:
        # Test for text/html content type, returns a positive value if found
        # returns -1 if not
        ct = r.headers['Content-Type'].find('text/html')
        if r.status_code is not 200 or ct is -1:
            # TODO do a better validation
            return False
    return True
