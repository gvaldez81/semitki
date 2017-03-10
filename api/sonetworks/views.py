from django.contrib.auth.models import User, Group
from rest_framework.decorators import detail_route
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView


class FacebookLogin(SocialLoginView):
        adapter_class = FacebookOAuth2Adapter
        client_class = OAuth2Client
        callback_url = "localhost:9080"
        serializer_class = SocialLoginSerializer

        def process_login(self):
            get_adapter(self.request).login(self.request, self.user)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class PostViewSet(viewsets.ModelViewSet):
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SocialAccountsGroupViewSet(viewsets.ModelViewSet):
    queryset = SocialAccountsGroup.objects.all()
    serializer_class = SocialAccountsGroupSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @detail_route()
    def search(self, request, *args, **kwargs):
        ag = self.filter(name="algo")


class SocialAccountViewSet(viewsets.ModelViewSet):
    queryset = SocialAccount.objects.all()
    serializer_class = SocialAccountSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class BucketViewSet(viewsets.ModelViewSet):
    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer
    parmission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class AboutViewSet(viewsets.ModelViewSet):
    queryset = StaticPages.objects.all()
    serializer_class = AboutSerializer
