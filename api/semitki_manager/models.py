# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class PaymentGateway(models.Model):
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    name = models.CharField(max_length=255)


class BillingAccount(models.Model):

