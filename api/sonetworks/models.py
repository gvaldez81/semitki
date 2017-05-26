
# semitki models
import uuid

from django.db import models
from django.contrib.postgres.fields import JSONField
import urllib
import os
import requests
import urlparse
from django.core.files.temp import NamedTemporaryFile
from allauth.socialaccount.models import SocialAccount as LoginAccount


class Campaign(models.Model):
    """
    A project can hold many topics
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)

    def __unicode__(self):
        """Unicode class."""
        return unicode(self.name)


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
    def __unicode__(self):
        """Unicode class."""
        return unicode(self.name)

class Post(models.Model):
    """
    txt XOR url
    data: {
        txt: "string",
        img: "string",
        tags: [
                {"account": "facebook"},
                {"account_id": "idFacebook"},
                {"like": "idFacebook"},
                ,...],
    }
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(blank=False)
    phase = models.ForeignKey(Phase)
    content = JSONField()
    owner = models.ForeignKey('auth.user', related_name='posts')
    published = models.BooleanField(default = 0)
    #publish_id = models.CharField(max_length=100, default='', null=True, blank=True)
    #publish_result=JSONField()
    """
    data: {
        id: "string",
        url: "string",
        likes: ["username1","username2","username3","x",...],
        likes_count: "string",
        shares: ["username1","username2","username3","x",...],
        shares_count: "string",
    }
    """


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
    bucket_id=models.CharField(max_length=256, null=True)
    image=models.ImageField(upload_to='img/', blank=True)
    image_link = models.CharField(max_length=255, null=True, blank=True)
    access_token = JSONField()
    token_expiration = models.DateTimeField(blank=True, null=True)
    bucket = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)

    def __unicode__(self):
        """Unicode class."""
        return unicode(self.bucket + ' - ' + self.username)

    def save(self, *args, **kwargs):
        """Store image locally if we have a URL"""
        if self.image_link and not self.image:
            result = requests.get(self.image_link)
            profilePic = NamedTemporaryFile(delete=True)
            profilePic.write(result.content)
            profilePic.flush()
            urlclean = urlparse.urljoin(self.image_link, urlparse.urlparse(self.image_link).path)
            self.image.save(str(self.bucket_id)+'_'+os.path.basename(urlclean), profilePic )
            self.save()
        super(SocialAccount, self).save()


class SocialGroup(models.Model):
    """
    Managed social accounts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140)
    description = models.CharField(max_length=256)
    isactive = models.BooleanField(default = True)
    valid_to = models.DateField(null=True, blank=True)

    def __unicode__(self):
        """Unicode class."""
        return unicode(self.name)


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


class ImageStore(models.Model):
    """
    Image store
    """
    id = models.UUIDField(primary_key = True, default = uuid.uuid4,
            editable = False)
    image = models.ImageField(upload_to='uploads/', blank=True)

class PagesToken(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4,
            editable = False)
    owner = models.ForeignKey('auth.user', related_name='tokens', default=1)
    page_id = models.CharField(max_length=256, null=False)
    account = models.ForeignKey(LoginAccount,related_name='accounts')
    name = models.CharField(max_length=256, null=False)
    token = models.CharField(max_length=256, null=False)
    image=models.ImageField(upload_to='img/', blank=True)
    image_link = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        """Store image locally if we have a URL"""
        if self.image_link and not self.image:
            result = requests.get(self.image_link)
            profilePic = NamedTemporaryFile(delete=True)
            profilePic.write(result.content)
            profilePic.flush()
            urlclean = urlparse.urljoin(self.image_link, urlparse.urlparse(self.image_link).path)
            self.image.save(str(self.page_id)+'_'+os.path.basename(urlclean), profilePic )
            self.save()
        super(PagesToken, self).save()
    