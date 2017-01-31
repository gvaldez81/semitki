## semitki models
import uuid

from django.db import   models
from django.contrib.postgres.fields import JSONField

class Posts(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField('pusblish date')
    topic = models.CharField(max_length=100)
    bucket = JSONField()

class Topic(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)

class Company(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topicID = models.ForeignKey(Topic)
    name= models.CharField(max_length=100)
    description = models.CharField(max_length=200)

class Project(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name= models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    companyID = models.ForeignKey(Company)


class Groups(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)

class Users(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)     
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    groupID = models.ForeignKey(Groups)


