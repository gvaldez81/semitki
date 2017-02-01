## semitki models
import uuid

from django.db import   models
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
    name= models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    campaing_id = models.ForeignKey(Campaign)

class AccountsGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)

class UserAccount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    group_id = models.ForeignKey(AccountsGroup)
