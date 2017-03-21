from django.db import migrations, models
#from facebook import FacebookBucket

class Bucket:

    def initialize(self):
        pass


    def get_token(self, social_account):
        """Get a facebook OAuth2 token"""
        pass


    def post(self, social_account):
        """New facebook post"""
        pass


    def reshare(self, social_account):
        """Re-shar an existing post given the post url"""
        pass


    def fav(self, social_account):
        """Like an existing post"""
        pass



