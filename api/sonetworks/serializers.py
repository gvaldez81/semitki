from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_auth.registration.serializers import SocialLoginSerializer
from allauth.socialaccount.models import SocialAccount as SystemAccount
from .models import *

class FilteredIsActiveListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(isactive=True)
        return super(FilteredIsActiveListSerializer, self).to_representation(data)

class FilteredIsActiveListUser(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super(FilteredIsActiveListUser, self).to_representation(data)

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    bucket_id = serializers.SerializerMethodField()
    bucket = serializers.SerializerMethodField()

    def create(self, validated_data):
        user = User.objects.create(
                username=validated_data["username"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                email=validated_data["email"],
                is_active=validated_data["is_active"],
                is_staff=True
                )
        user.set_password(validated_data["password"])
        user.save()

        return user

    def get_bucket_id(self, user):
        try:
            bucket_id = SystemAccount.objects.get(user=user.id).uid
        except SystemAccount.DoesNotExist:
            bucket_id = ''
        return bucket_id;

    def get_bucket(self, user):
        try:
            bucket = SystemAccount.objects.get(user=user.id).provider
        except SystemAccount.DoesNotExist:
            bucket = ''
        return bucket;

    class Meta:
        list_serializer_class = FilteredIsActiveListUser
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name',
                'posts', 'is_active', 'is_staff', 'is_superuser', 'bucket_id', 'bucket')



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
    image_path = serializers.SerializerMethodField()

    def get_image_path(self, account):
      return account.image.name

    class Meta:
        list_serializer_class = FilteredIsActiveListSerializer
        model = SocialAccount
        fields = ('url', 'id', 'username', 'email', 'access_token', 'token_expiration', 
            'isactive', 'valid_to', 'bucket', 'bucket_id', 'image', 'image_path')

class SocialAccountGroupSerializer(serializers.HyperlinkedModelSerializer):
    social_account_url = SocialAccountSerializer(source='social_account',
            read_only=True)

    class Meta:
        list_serializer_class = FilteredIsActiveListSerializer
        model = SocialAccountGroup
        fields = ('url', 'id', 'social_account', 'social_account_url'
                ,'social_group', 'isactive','valid_to')

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


class ImageStoreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ImageStore
        fields = ('__all__')


class PagesTokenSerializer(serializers.HyperlinkedModelSerializer):
    image_path = serializers.SerializerMethodField()
    account_id = serializers.SerializerMethodField()
    bucket = serializers.SerializerMethodField()
    bucket_id = serializers.SerializerMethodField()
    def get_account_id(self, pages):
      return pages.account.uid

    def get_image_path(self, pages):
      return pages.image.name

    def get_bucket(self, pages):
      return 'facebook'

    def get_bucket_id(self, pages):
      return pages.page_id

    class Meta:
        model = PagesToken
        fields = ('page_id', 'name', 'account_id', 'image_link', 
            'image', 'image_path', 'bucket', 'bucket_id')
