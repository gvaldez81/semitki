## semitki models

from django.db import models

class Posts(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField('pusblish date')
    topic = models.
