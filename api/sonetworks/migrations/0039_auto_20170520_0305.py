# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-20 03:05
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0038_pagestoken_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagestoken',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tokens', to=settings.AUTH_USER_MODEL),
        ),
    ]
