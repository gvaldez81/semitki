from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_auth.registration.serializers import SocialLoginSerializer
from .models import *


class FilteredIsActiveListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(isactive=True)
        return super(FilteredIsActiveListSerializer, self).to_representation(data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                'posts')


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'url', 'date', 'content', 'owner', 'phase')


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        list_serializer_class = FilteredIsActiveListSerializer
        model = Phase
        fields = ('id', 'url', 'name', 'description', 'isactive', 'valid_to',
                'campaign')


class CampaignSerializer(serializers.HyperlinkedModelSerializer):
    #phases = PhaseSerializer(many=True, read_only=True)    
    phases = PhaseSerializer(many=True, read_only=True)
    class Meta:
        list_serializer_class = FilteredIsActiveListSerializer
        model = Campaign
        fields = ('url', 'id', 'name', 'description', 'isactive', 'valid_to',
                'phases')

class SocialAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialAccount
        fields = ('url', 'id', 'username', 'email', 'access_token', 'token_expiration', 
            'isactive', 'valid_to', 'bucket')

class SocialAccountGroupSerializer(serializers.HyperlinkedModelSerializer):
    social_account_url = SocialAccountSerializer(source='social_account')
    social_account = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    social_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = SocialAccountGroup
        fields = ('url', 'id', 'social_account', 'social_account_url' ,'social_group', 
            'isactive','valid_to')

class SocialGroupSerializer(serializers.HyperlinkedModelSerializer):

    related = SocialAccountGroupSerializer(many=True, read_only=True)
    class Meta:
        list_serializer_class = FilteredIsActiveListSerializer
        model = SocialGroup
        fields = ('url', 'id', 'name', 'description', 'isactive', 'valid_to', 'related')

class BucketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bucket
        fields = ('url', 'name')


class StaticPageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = StaticPage
        fields = ('__all__')
