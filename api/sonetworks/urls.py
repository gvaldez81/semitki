"""sonetworks URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from .views import *

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'post', PostViewSet)
router.register(r'topic', TopicViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'account', SocialAccountViewSet)
router.register(r'accounts_group', SocialAccountsGroupViewSet)
router.register(r'bucket', BucketViewSet)
router.register(r'static_page', StaticPageViewSet)

schema_view = get_swagger_view(title='Semitki API')

urlpatterns = [
    url(r'^$', schema_view),
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/facebook/$', FacebookLogin.as_view(), name="fb_login"),
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
]
