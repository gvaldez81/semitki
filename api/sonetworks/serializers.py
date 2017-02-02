from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Post, Topic, Campaign, Project, AccountsGroup, UserAccount

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'date', 'topic', 'data')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fileds = ('id', 'name', 'description')

class CampaignSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Campaign
        fields = ('id', 'topic_id', 'name', 'description')

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'campaign_id')

class AccountsGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AccountsGroup
        fields = ('id', 'name', 'description')

class UserAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserAccount
        fileds = ('id', 'name', 'description', 'group_id')
