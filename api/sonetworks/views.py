from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.views import LoginView
from rest_auth.social_serializers import TwitterLoginSerializer
from rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):
        adapter_class = FacebookOAuth2Adapter


class TwitterLogin(LoginView):
        serializer_class = TwitterLoginSerializer
        adapter_class = TwitterOAuthAdapter


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class PostViewSet(viewsets.ModelViewSet):
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class AccountsGroupViewSet(viewsets.ModelViewSet):
    queryset = AccountsGroup.objects.all()
    serializer_class = AccountsGroupSerializer

class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

