# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-08-22 17:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('semitki_manager', '0002_organization'),
        ('sonetworks', '0049_posterror_post'),
    ]

    operations = [
        migrations.DeleteModel(
            name='StaticPage',
        ),
        migrations.AddField(
            model_name='campaign',
            name='organization_id',
            field=models.ForeignKey(default='6779403b-fb68-41a5-ba79-9c7c81d4b03c', on_delete=django.db.models.deletion.CASCADE, to='semitki_manager.Organization'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='socialgroup',
            name='organization_id',
            field=models.ForeignKey(default='6779403b-fb68-41a5-ba79-9c7c81d4b03c', on_delete=django.db.models.deletion.CASCADE, to='semitki_manager.Organization'),
            preserve_default=False,
        ),
    ]
