import json
from models import *
from django.utils.timezone import utc

from django.conf import settings

from buckets import facebook
from .models import *
import requests
from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from oauthlib.oauth2 import WebApplicationClient

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


def stuff_it(pk):
    """Publish a post right away"""
    p = Post.objects.get(pk = pk)

    client_id = settings.SOCIAL_AUTH_FACEBOOK_KEY
    client_secret = settings.SOCIAL_AUTH_FACEBOOK_SECRET
    graph_url = 'https://graph.facebook.com/'
    node = graph_url + "me/feed?"
    token = json.JSONDecoder().decode("{\"access_token\": \"EAALSDfc2j6UBAFYa0uIGkbePjb7AT8gmoZC1L6au2mvbrCvXFdCaUGUePYLiQCIiXYmgAvrVngohUedZBy93feF7YDoiHE9YBiiS3Qgj9kDJ803ckuCIEp8mKqYKTJINxxoPyOaZBSFiFqBb9nRezHfI7sC9NdlJoTErdS2WwZDZD\", \"token_type\": \"bearer\", \"expires_in\": 5183743, \"expires_at\": 1499480919.301521}")
    oauth = OAuth2Session(client_id = client_id, token = token)
##    oauth.access_token(token)
##    oauth.token(token)
    oauth = facebook_compliance_fix(oauth)

    payload = { "message": p.content["txt"],
            "img": p.content["img"]
            }

    r = oauth.post(node, data = payload)

    return r.text
