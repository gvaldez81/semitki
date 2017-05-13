import json
from models import *
from datetime import datetime
from django.utils.timezone import utc

from django.conf import settings

from buckets.facebook import Facebook
from .models import *
import requests
from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from oauthlib.oauth2 import WebApplicationClient

def gather():
    """
    Gather posts from database and distibute among available buckets
    """

    like = {}
    rs = {}

    posts = Post.objects.filter(date__lte = datetime.date(
        datetime.now().replace(tzinfo=utc)
        )).filter(published = False)

    accounts = SocialAccount.objects.all()

    # Get IDs of accounts to rs or <3
    for p in posts:
        like_id = p.content["tags"][2]["like"][0]
        like_account = accounts.get(pk = like_id)
        like[like_id] = (like_account.bucket, like_account.access_token)
        rs_id = p.content["tags"][3]["rs"][0]
        rs_account = accounts.get(pk = rs_id)
        rs[rs_id] = (rs_account.bucket, rs_account.access_token)

    # Post to channels
    ## TODO make a registry just like collections in frontend for channels
    fb = Facebook()
    for k, v in like.iteritems():

        if v[0] == "facebook":
            fb.set_account_id(k)
            fb.post(token, url)




def mop():
    """Mop account secrets"""
    pass


def sweep():
    """Sweep posts accross buckets"""
    pass


def stuff_it(pk):
    """Publish a post right away"""
    p = Post.objects.get(pk = pk)
    chanstr = p.content["tags"][0]["account"]
    account_id = p.content["tags"][1]["account_id"]
    chan = None
    if chanstr == "facebook":
        chan = Facebook(account_id)

    if chan != None:
        oauth = chan.get_oauth2session()
        token = SocialAccount.objects.get(bucket_id = account_id)
        return chan.post(token, p)
    else:
        return False
