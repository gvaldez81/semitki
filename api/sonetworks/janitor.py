from models import *

from django.conf import settings

from buckets import facebook
from .models import *
import requests

def gather():
    """Gather posts from database and distibute among available buckets"""

    Post.objects.get()

    fb = Facebook()


def mop():
    """Mop account secrets"""
    pass


def sweep():
    """Sweep posts accross buckets"""
    pass


class ServiceAccount:

    def __init__(self, account_id):
        pass



class OAuthDance:

    def handle_callback(self, code=None, token=None):
        if(code != None):
            payload = {'client_id': settings.SOCIAL_AUTH_FACEBOOK_KEY,
                    'redirect_uri': 'http://localhost:8000/callback/',
                    'client_secret': settings.SOCIAL_AUTH_FACEBOOK_SECRET,
                    'code': code}
            r = requests.get('https://graph.facebook.com/v2.9/oauth/access_token',
                    params=payload)
            return r.json()

        if(token != None):
            account = SocialAccount(
                    username="123",
                    email="email",
                    password=None,
                    access_token=token,
                    bucket="facebook"
                    )
            account.save()
            return "Algo"

        if(code == None and token == None):
            return "All empty"
