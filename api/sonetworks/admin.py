from django.contrib import admin
from .models import *


class BucketAdmin(admin.ModelAdmin):
    list_display = ['name']


class SocialAccountAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name']


class PhaseAdmin(admin.ModelAdmin):
    list_display = ['name', 'campaign']


admin.site.register(Bucket, BucketAdmin)
admin.site.register(Post)
admin.site.register(Phase, PhaseAdmin)
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(SocialAccount, SocialAccountAdmin)
admin.site.register(SocialGroup)
admin.site.register(SocialAccountGroup)
admin.site.register(StaticPage)


