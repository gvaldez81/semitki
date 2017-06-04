import os, time
import json
from datetime import datetime, tzinfo
from django.contrib.auth.models import User, Group
from rest_framework.decorators import detail_route
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from .serializers import *
from .models import *

from allauth.account.adapter import get_adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.views import LoginView
from rest_auth.social_serializers import TwitterLoginSerializer

from django.http import HttpResponse, HttpResponseRedirect

import requests
from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from oauthlib.oauth2 import BackendApplicationClient
from oauthlib.oauth2 import WebApplicationClient
from janitor import *
from buckets import facebook
from buckets import twitter


class FacebookLogin(SocialLoginView):
    """
    Facebook login for system user accounts
    """
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "localhost:9080"
    serializer_class = SocialLoginSerializer

    def process_login(self):
        get_adapter(self.request).login(self.request, self.user)


class TwitterLogin(LoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


class UserViewSet(viewsets.ModelViewSet):
    """
    Allows system users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    lookup_field = 'username'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class PostViewSet(viewsets.ModelViewSet):
    """
    Scheduled posts
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PhaseViewSet(viewsets.ModelViewSet):
    """
    Topics, these belong to one or many projects
    """
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # def update(self, request, *args, **kwargs):
    # #def update(self, request, pk=None):
    #     pk=kwargs['pk']
    #     print('Update phase id ='+pk)
    #     #print('ob j =',getattr(self.get_object(),'description'))
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=False)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(status=status.HTTP_200_OK, statusText='success')


class CampaignViewSet(viewsets.ModelViewSet):
    """
    Marketing projects or campaignsi, these hold many topics
    """
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class SocialAccountViewSet(viewsets.ModelViewSet):
    """
    Managed social accounts
    """
    queryset = SocialAccount.objects.all()
    serializer_class = SocialAccountSerializer
    permission_classes = (permissions.AllowAny,)

class SocialGroupViewSet(viewsets.ModelViewSet):
    """
    Managed social accounts
    """
    queryset = SocialGroup.objects.all()
    serializer_class = SocialGroupSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SocialAccountGroupViewSet(viewsets.ModelViewSet):
    """
    Groups of social accounts
    """
    queryset = SocialAccountGroup.objects.all()
    serializer_class = SocialAccountGroupSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @detail_route()
    def search(self, request, *args, **kwargs):
        ag = self.filter(name="algo")


class BucketViewSet(viewsets.ModelViewSet):
    """
    Marketing channels registry
    """

    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class StaticPageViewSet(viewsets.ModelViewSet):
    """
    Customizable system static pages
    """
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class ImageStoreViewSet(viewsets.ModelViewSet):
    """
    Image store vireset
    """
    queryset = ImageStore.objects.all()
    serializer_class = ImageStoreSerializer
    parser_classes = (FormParser, MultiPartParser)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(image = self.request.data.get('image'))

class PagesTokenViewSet(viewsets.ModelViewSet):
    """
    Customizable system static pages
    """
    queryset = PagesToken.objects.all()
    serializer_class = PagesTokenSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


def twitter_auth(request):
    """
    Twitter login of Follower accounts only
    """
    bucket = twitter.Twitter()
    oauth = bucket.get_oauthsession()
    url = oauth.get_authorization_url()
    request.session['request_token'] = oauth.request_token
    return HttpResponseRedirect(url)


def callback(request):
    """
    Generic (perhaps) callback endpoint for any social network
    when registering Follower accounts.
    """
    # Set to 0 for production, 1 is for development only
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    # Only process if a chan is present
    if 'chan' in request.GET:
        user = None
        bucket = None
        ## Facebook callback handling
        if (request.GET.get("chan") == "facebook"):
            bucket = facebook.Facebook()
        elif (request.GET.get("chan") == "twitter"):
            bucket = twitter.Twitter()
            request_token = request.session['request_token']
            del request.session['request_token']
            bucket.request_token = request_token
            bucket.verifier = request.GET.get('oauth_verifier')

        oauth = bucket.get_oauth2session()
        token = bucket.get_token(request.get_full_path())
        user = bucket.get_user_detail()

        if user is not None:
            social_account = SocialAccount(
                    username = user["name"],
                    email = user["email"],
                    bucket_id = user["id"],
                    image_link = user["image"],
                    access_token = token, #json.JSONEncoder().encode(token),
                    token_expiration = datetime.fromtimestamp(token["expires_in"])
                                if "expires_in" in token  else None,
                    bucket = bucket.tagname)
            social_account.save()
        parameter="?action=success"
    else:
        parameter="?action=error"

    return HttpResponseRedirect(os.environ["SEMITKI_LANDING"]+parameter)


def publish_now(request, pk):
    """Publish a new post"""
    staff = False
    page = False
    if ("staff" in request.GET):
        staff = True
    if ("page" in request.GET):
        page = True
    return HttpResponse(stuff_it(pk, staff, page))

