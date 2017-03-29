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
    content = JSONField()
    owner = models.ForeignKey('auth.user', related_name='posts')


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    project = models.ForeignKey(Project)


class Bucket(models.Model):
    name = models.CharField(primary_key=True, max_length=140, editable=True)
    enabled = models.BooleanField


class SocialAccount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=140)
    email = models.CharField(max_length=256)
    password = models.CharField(max_length=2048, null=True)
    access_token = models.CharField(max_length=2048, null=True)
    token_expiration = models.DateTimeField
    bucket = models.CharField(max_length=256)


class SocialAccountsGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    socialaccounts = models.ManyToManyField(SocialAccount, null=True)


class StaticPages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
    editable=False)
    title = models.CharField(max_length=140)
    content = models.TextField()
    template = models.CharField(max_length=140)
    page = models.CharField(max_length=100)


class UserInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
    editable=False)
    name = models.CharField(max_length=100)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    mail = models.CharField(max_length=100)
