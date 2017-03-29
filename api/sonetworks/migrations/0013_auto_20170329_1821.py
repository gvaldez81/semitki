# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-29 18:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0012_auto_20170321_1319'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupedsocialaccount',
            name='social_account_group_id',
        ),
        migrations.RemoveField(
            model_name='groupedsocialaccount',
            name='social_account_id',
        ),
        migrations.AddField(
            model_name='socialaccountsgroup',
            name='socialaccounts',
            field=models.ManyToManyField(to='sonetworks.SocialAccount'),
        ),
        migrations.DeleteModel(
            name='GroupedSocialAccount',
        ),
    ]
