from django.contrib import admin
from .models import *


admin.site.register(Post)
admin.site.register(Topic)
admin.site.register(Campaign)
admin.site.register(Project)
admin.site.register(AccountsGroup)
admin.site.register(UserAccount)
admin.site.register(UserAccountsGroup)
