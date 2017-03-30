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
    """
    A project can hold many topics
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)


class Topic(models.Model):
    """
    A topic belongs to one or many projects
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    project = models.ForeignKey(Project)


class Bucket(models.Model):
    """
    Represents marketing targets
    """
    name = models.CharField(primary_key=True, max_length=140, editable=True)
    enabled = models.BooleanField


class SocialAccount(models.Model):
    """
    Managed social accounts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=140)
    email = models.CharField(max_length=256)
    password = models.CharField(max_length=2048, null=True)
    access_token = models.CharField(max_length=2048, null=True)
    token_expiration = models.DateTimeField
    bucket = models.CharField(max_length=256)


class SocialAccountsGroup(models.Model):
    """
    Grouped social accounts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    socialaccounts = models.ManyToManyField(SocialAccount, blank=True)


class StaticPage(models.Model):
    """
    Customizable static pages such as About Us, Contact, etc...
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
    editable=False)
    title = models.CharField(max_length=140)
    content = models.TextField()
    template = models.CharField(max_length=140)
