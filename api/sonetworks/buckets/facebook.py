import os
import sys
import logging
import json

from django.conf import settings
from django.db import migrations, models
from BucketFactory import Bucket

from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from oauthlib.oauth2 import WebApplicationClient


class Facebook:

    def __init__(self, account_id = None):

        self.account_id = account_id
        self.graph_url = 'https://graph.facebook.com/'
        self.token_url = self.graph_url + 'oauth/access_token'
        self.client_id = settings.SOCIAL_AUTH_FACEBOOK_KEY
        self.client_secret = settings.SOCIAL_AUTH_FACEBOOK_SECRET
        self.redirect_uri = os.environ["OAUTH2_REDIRECT_URI"] + "?chan=facebook"
        self.tagname = 'facebook'
        self.oauth = None


    def fav(self, social_account):
        """Like an existing post"""
        pass


    def get_user_detail(self):
        """
        Get user details
        """
        user = json.loads(
                self.oauth.get(self.graph_url + "me?fields=id,name,email").content)
        # Fetch user profile image
        image = json.loads(
                self.oauth.get(self.graph_url + user["id"]+"/picture?width=160&height=160&redirect=0").content)

        return { "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "image": image["data"]["url"] }


    def get_oauthsession(self):
        """
        Returns a Facebook requests_oauthlib OAuth2Session
        """

        return self.get_oauth2session()

    def get_oauth2session(self):
        """
        Returns a Facebook requests_oauthlib OAuth2Session
        """
        self.oauth = OAuth2Session(client_id = self.client_id,
                redirect_uri = self.redirect_uri)
        self.oauth = facebook_compliance_fix(self.oauth)

        return self.oauth


    def get_token(self, redirect_response):
        """
        Get a facebook OAuth2 token
        """
        token = self.oauth.fetch_token(
                 token_url = self.token_url,
                client_secret = self.client_secret,
                 authorization_response = redirect_response
                )

        return token


    def post(self, token, post):
        """
        New facebook post
        """
        copy = post.content["txt"]
        node = self.graph_url + "me/"
        payload = { "message": copy}
        if ("img" in post.content):
            imagen = post.content["img"]
            if (imagen is None):
                node = node + "feed?"
            else:
                node = node + "photos?"
                payload["url"] = imagen
        else:
            node = node + "feed?"

        if (type(token) != str):
            self.oauth.token = token
        else:
            node = node + "access_token"  + token

        #response = self.oauth.post(node, data = payload)

        return type(token)


    def reshare(self, social_account):
        """Re-shar an existing post given the post url"""
        pass


    def set_account_id(self, account_id):
        self.account_id = account_id
