import os
import sys
import logging
import json

from django.conf import settings
from django.db import migrations, models

from requests_oauthlib import OAuth1Session
from rest_framework import status
from rest_framework.response import Response
 # Using OAuth1 auth helper
import requests
from requests_oauthlib import OAuth1
from urlparse import parse_qs
from urlparse import urlparse
import tweepy


class Twitter:

    def __init__(self, account_id = None):

        self.account_id = account_id
        self.client_id = settings.SOCIAL_AUTH_TWITTER_KEY
        self.client_secret = settings.SOCIAL_AUTH_TWITTER_SECRET
        self.redirect_uri = os.environ["OAUTH2_REDIRECT_URI"] + "?chan=twitter"
        self.tagname = 'twitter'
        self.oauth = None
        self.url = 'https://www.twitter.com/'


    def fav(self, token, permalink, account_id, post_id):
        """Like an existing tweet given the tweet id"""
        auth = tweepy.OAuthHandler(self.client_id, self.client_secret)
        auth.set_access_token(token['access_token'], token['token_secret'])
        api = tweepy.API(auth)

        try:
            rt = api.create_favorite(id=post_id)
            #print("Tweet RT ID ="+rt.id_str)
            return (rt.id_str)
        except Exception as e:
            return(data['access_token']['screen_name'] + ' ' +
               e[0][0]['message'])



    def get_user_detail(self):
        """
        Get user details
        """
        auth = tweepy.OAuthHandler(self.client_id, self.client_secret)
        auth.set_access_token(self.oauth.access_token,self.oauth.access_token_secret)
        api = tweepy.API(auth)
        user = api.verify_credentials()


        return { "id": user.id,
                "name": user.screen_name,
                "email": user["email"] if hasattr(user, 'email') else 'sin@email.com',
                "image": user.profile_image_url }

    def get_oauth2session(self):
        """
        Returns a Twitter OAuth session
        """
        self.oauth = tweepy.OAuthHandler(self.client_id, self.client_secret,
                self.redirect_uri)
        return self.oauth

    def get_oauthsession(self):
        """
        Returns a Twitter OAuth session
        """
        self.oauth = tweepy.OAuthHandler(self.client_id, self.client_secret,
                self.redirect_uri)
        return self.oauth



    def get_token(self, redirect_response):
        """
        Get a twitter OAuth token
        """
        self.oauth = tweepy.OAuthHandler(self.client_id, self.client_secret)
        self.oauth.request_token = self.request_token
        self.oauth.get_access_token(self.verifier)
        token = {"access_token":self.oauth.access_token,
                "token_secret":self.oauth.access_token_secret}
        return token


    def post(self, token, post, account_id = 0, staff = False):
        """
        New twitter post
        """
        auth = tweepy.OAuthHandler(self.client_id, self.client_secret)
        auth.set_access_token(token['access_token'], token['token_secret'])
        api = tweepy.API(auth)
        copy = post.content['txt']
        imagen = post.content['link'] if 'link' in post.content else None

        if (imagen is None or imagen == ''):
            try:
                twit = api.update_status(status=copy)
                return (twit.id_str)
                #return Response({'id': twit.id_str}, 
                #        status=status.HTTP_200_OK)
            except Exception as e:
                return(e[0][0]['message'])
        #Si la imagen empieza con http hay que descargarla
        elif imagen.startswith("http") :
            #EVALUAR EL TAMANO DE LA IMAGEN
            r = requests.head(imagen)
            if r is not None and \
                r.headers['content-length'] is not None and \
                int(int(r.headers['content-length'])/1024)<3072:
                #DESCARGAMOS IMAGEN SOLO SI ES MENOR A 3072
                file = 'temp.png'
                r = requests.get(imagen, stream=True)
                if r.status_code == 200:
                    with open(file, 'wb') as f:
                        for chunk in r.iter_content(1024):
                            f.write(chunk)
                    try:
                        twit = api.update_with_media(filename=file, status=copy[:140])
                        return (twit.id_str)
                    except Exception as e:
                        return(e[0][0]['message'])
                    finally:
                        os.remove(file)
                    #upload = api.media_upload(filename=file)
                    #media_ids = [upload.media_id_string]

                    #try:
                    #    twit = api.update_status(media_ids, status=copy[:140])
                    #    return (twit.id_str)
                    #except Exception as e:
                    #    return(e[0][0]['message'])
                else:
                    return("Unable to download image")
            else:
                return("Image size bigger than 3MB")

        return "Fail"


    def share(self, token, permalink, account_id, post_id):
        """Re-tweet an existing tweet given the tweet id"""
        auth = tweepy.OAuthHandler(self.client_id, self.client_secret)
        auth.set_access_token(token['access_token'], token['token_secret'])
        api = tweepy.API(auth)

        if post_id == 0:
            path = urlparse(permalink).path
            if path.endswith('/'):
                path = path[:len(path)-1]
            k = path.rfind("/")
            post_id = path[k+1:]

        try:
            rt = api.retweet(id=post_id)
            #print("Tweet RT ID ="+rt.id_str)
            return (rt.id_str)
        except Exception as e:
            return(data['access_token']['screen_name'] + ' ' +
               e[0][0]['message'])



    def set_account_id(self, account_id):
        self.account_id = account_id
