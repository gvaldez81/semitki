# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.core.exceptions import MultipleObjectsReturned
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.decorators import detail_route
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from semitki_manager.serializers import BillingAccountSerializer
from semitki_manager.models import BillingAccount

# Create your views here.

class BillingAccountView(viewsets.ModelViewSet):
    queryset = BillingAccount.objects.all()
    serializer_class = BillingAccountSerializer
