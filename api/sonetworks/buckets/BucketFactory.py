from django.db import migrations, models
#from facebook import FacebookBucket

class Bucket:

    def initialize(self):
        pass


    def fav(self, social_account):
        """
        Like an existing post
        """
        pass


    def get_user_detail(self):
        """
        Get user details
        """
        pass


    def get_oauth2session(self):
        """
        Return a social network requests_oauthlib OAuth2Session
        """


    def get_token(self, social_account):
        """
        Get an OAuth2 token
        """
        pass


    def post(self, social_account):
        """
        Publish a post
        """
        pass


    def reshare(self, social_account):
        """Re-shar an existing post given the post url"""
        pass


    def set_account_id(self, account_id):
        self.account_id = account_id


