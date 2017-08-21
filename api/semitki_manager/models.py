# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from sonetworks import models as sn
from django.contrib.auth.models import User


class PaymentGateway(models.Model):
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    name = models.CharField(max_length=255)


class BillingAccount(models.Model):

    STATUS = (
            ('trial', 'trial'),
            ('billed', 'billed'),
            ('grace', 'grace'))

    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    customer_id = models.ForeignKey('auth.user', related_name='billing_account')
    status = models.CharField(max_length=6, choices=STATUS)
    status_change = models.DateTimeField(auto_now_add=True)
    payment_method_id = models.ForeignKey(PaymentGateway)


class Bill(models.Model):
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    billing_account_id = models.ForeignKey(BillingAccount)
    cycle_start = models.DateField()
    cycle_end = models.DateField()
    amount = models.DecimalField(max_digits=6,decimal_places=2)
    details = models.TextField()
