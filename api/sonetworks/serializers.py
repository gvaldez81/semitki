from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'first_name', 'last_name', 'posts')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('__all__')


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = ('url', 'id', 'name', 'description')


class CampaignSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Campaign
        fields = ('__all__')


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('url', 'id', 'name', 'description', 'campaing_id')


class SocialAccountsGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialAccountsGroup
        fields = ('url', 'id', 'name', 'description')


class SocialAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialAccount
        fields = ('url', 'id', 'name', 'description')


class BucketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bucket
        fields = ('url', 'id', 'name')


class AboutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StaticPages
        fields = ('__all__')
