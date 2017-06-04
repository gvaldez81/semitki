import json
import requests
from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from django.utils.timezone import utc
from django.conf import settings
from django.contrib.auth.models import User, Group
from allauth.socialaccount.models import SocialAccount as SystemAccount
from allauth.socialaccount.models import SocialToken
from oauthlib.oauth2 import WebApplicationClient
from datetime import datetime

from buckets.facebook import *
from buckets.twitter import *
from .models import PagesToken
from .models import Post
from .models import SocialAccount

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


def stuff_it(pk, staff = False, page = False):
    """Publish a post right away"""
    post = Post.objects.get(pk = pk)
    chanstr = post.content["tags"][0]["account"]
    account_id = post.content["tags"][1]["account_id"]

    chan = globals()[chanstr.capitalize()]()

    if chan != None:
        oauth = chan.get_oauth2session()
        if staff:
            social_user = SystemAccount.objects.get(uid = account_id).id
            token = SocialToken.objects.get(account_id = social_user).token
        elif page:
            token = PagesToken.objects.get(page_id = account_id).token
        else:
            token = SocialAccount.objects.get(bucket_id = account_id).access_token

        return chan.post(token = token, post = post, account_id = account_id,
                staff = staff if staff else page )
    else:
        return False
