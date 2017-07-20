import json
import requests
from django.http import HttpResponse
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
from .models import SocialAccountGroup



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
    posts = Post.objects.filter(date__lte = datetime.now().replace(tzinfo=utc)
        ).filter(published = False)

    response = None
    for p in posts:
        if(p.content["tags"][4]["is_page"]):
            print ("page")
            response = stuff_it(pk = p.id, page = True)
            print ("page_success")
        if(p.content["tags"][5]["is_staff"]):
            print ("staff")
            response = stuff_it(pk = p.id, staff = True)
            print ("staff_success")

        if(response):
            p.published = True
            p.save()

    print(response)



def stuff_it(pk, staff = False, page = False):
    """Publish a post right away"""
    post = Post.objects.get(pk = pk)
    chanstr = post.content["tags"][0]["account"]
    account_id = post.content["tags"][1]["account_id"]

    chan = globals()[chanstr.capitalize()]()

    if chan != None:
        oauth = chan.get_oauth2session()
        if staff:
            social_user = SystemAccount.objects.get(uid = account_id)
            social_token = SocialToken.objects.get(account_id = social_user.id)
            if chanstr == 'facebook':
                token = social_token.token
            else:
                token = {'access_token':social_token.token, 'token_secret':social_token.token_secret}
                user_tw = social_user.extra_data['screen_name']

        elif page:
            token = PagesToken.objects.get(page_id = account_id).token
        else:
            sac = SocialAccount.objects.get(bucket_id = account_id)
            token = sac.access_token
            user_tw = sac.username

        copy = post.content["txt"]

        #SI LA PUBLICACION NO ES UNA LIGA URL DE SOCIAL NETWORK
        if (not copy.startswith(chan.url)):
            response =  chan.post(token = token, post = post, account_id = account_id,
                staff = staff if staff else page )
            if type(response) is not requests.models.Response:
                return False

            if chanstr == 'facebook':
                out = json.loads(response.text)
                post_id = out['id']
                status_ok = response.status_code
            else:
                status_ok = requests.codes.ok
                post_id = response
            #vamos a mandar llamar el share y like
            permalink_url = chan.url
            if chanstr == 'facebook':
                permalink_url = permalink_url + account_id + '/'
                if ("linkType" in post.content
                    and post.content["linkType"] == "img") :
                    permalink_url = permalink_url + 'photos/'
                else:
                    permalink_url = permalink_url + 'posts/'
                    post_id = post_id.split("_",1)[1]
            else:
                permalink_url = permalink_url + user_tw + '/status/'

            permalink_url = permalink_url + post_id
        else:
            status_ok = status.HTTP_200_OK
            permalink_url = copy
            post_id = 0

        if  status_ok == requests.codes.ok:
            response = HttpResponse('Succesfully posted',
                    status=status.HTTP_200_OK)

            post.content['permalink'] = permalink_url
            post.published = True
            post.save()

            if (post.content['tags'][3]['rs'] is not None):

                for grupo in post.content['tags'][3]['rs']:
                    account_groups = SocialAccountGroup.objects.filter(
                        social_group_id = grupo, isactive = True)
                    for ag in account_groups:
                        account = SocialAccount.objects.get(pk = ag.social_account_id)
                        share = chan.share(account.access_token,
                            permalink_url, account.bucket_id, post_id )

            if (post.content['tags'][2]['like'] is not None):
                for grupo in post.content['tags'][2]['like']:
                    account_groups = SocialAccountGroup.objects.filter(
                        social_group_id = grupo, isactive = True)
                    for ag in account_groups:
                        account = SocialAccount.objects.get(pk = ag.social_account_id)
                        fav = chan.fav(account.access_token,
                            permalink_url, account.bucket_id, post_id )

        return response

    else:
        return False
