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
import receivers
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from .views import *

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'post', PostViewSet)
router.register(r'phase', PhaseViewSet)
router.register(r'campaign', CampaignViewSet)
router.register(r'account', SocialAccountViewSet)
router.register(r'group', SocialGroupViewSet)
router.register(r'account_group', SocialAccountGroupViewSet)
router.register(r'bucket', BucketViewSet)
router.register(r'static_page', StaticPageViewSet)
router.register(r'image_upload', ImageStoreViewSet)
router.register(r'page', PagesTokenViewSet)
router.register(r'tour_view', TourViewSet)
router.register(r'tour_element', TourElementSet)
router.register(r'tour_relates', TourRelatedSet)

#schema_view = get_swagger_view(title='Semitki API')

urlpatterns = [
    #url(r'^$', schema_view),
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/', include('allauth.urls'), name='socialaccount_signup'),
    # System users login
    url(r'^auth/facebook/$', FacebookLogin.as_view(), name="fb_login"),
    url(r'^auth/twitter/$', TwitterLogin.as_view(), name='tw_login'),
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^callback/$', callback, name='callback'),
    url(r'^twitter_auth/$', twitter_auth, name='twitter_auth'),
    url(r'^post/(?P<pk>[^/.]+)/publish/$', publish_now, name='publish_now'),
    url(r'^auth/fb_exchange/$', fb_exchange_token, name='fb_exchange_token'),
    url(r'^auth/tw_request_token/$', tw_request_token, name='tw_request_token'),
]
