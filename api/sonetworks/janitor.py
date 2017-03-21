from models import *

from buckets import facebook

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


