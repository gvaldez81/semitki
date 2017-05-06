import os
from django.contrib.auth.models import User, Group
from rest_framework.decorators import detail_route
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *

from allauth.account.adapter import get_adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView

from django.http import HttpResponse

from janitor import OAuthDance

import requests
from requests_oauthlib import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from oauthlib.oauth2 import BackendApplicationClient
from oauthlib.oauth2 import WebApplicationClient


class FacebookLogin(SocialLoginView):
    """
    Facebook login
    """
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "localhost:9080"
    serializer_class = SocialLoginSerializer

    def process_login(self):
        get_adapter(self.request).login(self.request, self.user)


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


def callback(request):
    # Set to 0 for production, 1 is for development only
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    client_id = settings.SOCIAL_AUTH_FACEBOOK_KEY
    client_secret = settings.SOCIAL_AUTH_FACEBOOK_SECRET

    redirect_response = request.get_full_path()
    redirect_uri = 'http://159.203.134.236:8000/callback/'
    graph_url = 'https://graph.facebook.com/'
    token_url = graph_url + 'oauth/access_token'
    code = request.GET.get("code")
    #client = BackendApplicationClient(client_id = client_id)
    oauth = OAuth2Session(client_id = client_id, 
		redirect_uri = redirect_uri)
    oauth = facebook_compliance_fix(oauth)
    token = oauth.fetch_token(
             token_url = token_url
             ,client_secret = client_secret
             ,authorization_response = redirect_response
    	    )

    return HttpResponse(oauth.get(graph_url + 'me?').content)
