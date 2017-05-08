from models import *

from django.conf import settings

from buckets import facebook
from .models import *
import requests

def gather():
    """Gather posts from database and distibute among available buckets"""

    Post.objects.get()

    fb = Facebook()


def mop():
    """Mop account secrets"""
    pass


def sweep():
    """Sweep posts accross buckets"""
    pass


class ServiceAccount:

    def __init__(self, account_id):
        pass

