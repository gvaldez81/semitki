# semitki models
import uuid

from django.db import models
from django.contrib.postgres.fields import JSONField



class Campaign(models.Model):
    """
    A project can hold many topics
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)


class Phase(models.Model):
    """
    A topic belongs to one or many projects
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    campaign = models.ForeignKey(Campaign, related_name='phases')
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)

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
    date = models.DateTimeField(blank=False)
    phase = models.ForeignKey(Phase)
    content = JSONField()
    owner = models.ForeignKey('auth.user', related_name='posts')


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
    access_token = JSONField()
    token_expiration = models.DateTimeField(blank=False)
    bucket = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)

class SocialGroup(models.Model):
    """
    Managed social accounts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)


class SocialAccountGroup(models.Model):
    """
    Grouped social accounts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    social_account = models.ForeignKey(SocialAccount, blank=True , related_name='accounts')
    social_group = models.ForeignKey(SocialGroup, blank=True, related_name='related')
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)


class StaticPage(models.Model):
    """
    Customizable static pages such as About Us, Contact, etc...
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
    editable=False)
    title = models.CharField(max_length=140)
    content = models.TextField()
    template = models.CharField(max_length=140)
