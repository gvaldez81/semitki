# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class PaymentGateway(models.Model):
    """
    Currently only a stub class which eventually will implement
    payment gateway related to :model:`BillingAccount`.
    """
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    name = models.CharField(max_length=255)


class BillingAccount(models.Model):
    """
    Staff user account :model:`auth.User` linked to billing details
    :model:`PaymentGateway`
    """
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
    """
    Billing history related to a :model:`BillingAccount`
    """
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    billing_account_id = models.ForeignKey(BillingAccount)
    cycle_start = models.DateField()
    cycle_end = models.DateField()
    amount = models.DecimalField(max_digits=6,decimal_places=2)
    details = models.TextField()


class Organization(models.Model):
    """
    An organization holds social and staff accounts and related pages to
    a :model:`BillingAccount`.
    """
    id = models.UUIDField(max_length=255, primary_key=True,
            editable=False)
    name = models.CharField(max_length=255)
    billing_account_id = models.ForeignKey(BillingAccount)
