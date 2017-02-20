# semitki models
import uuid

from django.db import models
from django.contrib.postgres.fields import JSONField


class Post(models.Model):
    """
    txt XOR url
    data: {
        txt: "string",
        url: "string",
        imgurl: "string",
        tags: ["fb","tw","<3","r",...],
    }
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField('pusblish date')
    topic = models.CharField(max_length=140)
    data = JSONField()
    owner = models.ForeignKey('auth.user', related_name='posts')


class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class Campaign(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic_id = models.ForeignKey(Topic)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    campaing_id = models.ForeignKey(Campaign)


class Bucket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)


class SocialAccountsGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class SocialAccount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class GroupedSocialAccounts(models.Model):
    social_account_group_id = models.ForeignKey(SocialAccountsGroup)
    social_account_id = models.ForeignKey(SocialAccount)


class StaticPages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
    editable=False)
    title = models.CharField(max_length=140)
    content = models.TextField()
    template = models.CharField(max_length=140)
    page = models.CharField(max_length=100)
