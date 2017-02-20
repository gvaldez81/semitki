from django.contrib import admin
from .models import *


admin.site.register(Post)
admin.site.register(Topic)
admin.site.register(Campaign)
admin.site.register(Project)
admin.site.register(SocialAccountsGroup)
admin.site.register(SocialAccount)
admin.site.register(GroupedSocialAccounts)
admin.site.register(Bucket)
admin.site.register(StaticPages)

