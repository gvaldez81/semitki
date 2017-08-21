from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers
from allauth.socialaccount.models import SocialAccount as SystemAccount
from .models import *

class BillingAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillingAccount
        fields = ('__all__')
