from django.contrib import admin
from .models import *


class BucketAdmin(admin.ModelAdmin):
    list_display = ['name']


class SocialAccountAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'isactive']


class PhaseAdmin(admin.ModelAdmin):
	list_display = ['name', 'get_campaign', 'isactive']
	def get_campaign(self, obj):
		return obj.campaign.name
	get_campaign.short_description = 'Campaign'
	get_campaign.admin_order_field = 'campaign__name'


class PostAdmin(admin.ModelAdmin):
	list_display = ['owner', 'date', 'get_phase']
	def get_phase(self, obj):
		return obj.phase.name
	get_phase.short_description = 'Phase'
	get_phase.admin_order_field = 'phase__name'

class SocialGroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'isactive']


class SocialAccountGroupAdmin(admin.ModelAdmin):
    list_display = ('get_group', 'get_account', 'isactive')

    def get_group(self, obj):
        return obj.social_group.name
    get_group.short_description = 'Group'
    get_group.admin_order_field = 'social_group__name'

    def get_account(self, obj):
        return obj.social_account.username

    get_account.short_description = 'Username'
    get_account.admin_order_field = 'social_account__username'

class PagesTokenGroupAdmin(admin.ModelAdmin):
    list_display = ('owner','page_id', 'name')

class PagesTokenGroupAdmin(admin.ModelAdmin):
    list_display = ('owner','page_id', 'name')

class TourViewGroupAdmin(admin.ModelAdmin):
    list_display = ('name','description', 'isactive')

class TourElementAdmin(admin.ModelAdmin):
    list_display = ['name','get_tourview', 'isactive']
    def get_tourview(self, obj):
        return obj.tourview.name


class FileUploadAdmin(admin.ModelAdmin):
    list_display = ['id', 'file_url', 'owner']


class KnownSharingServiceAdmin(admin.ModelAdmin):
    list_display = ['domain_name', 'hosting_type']


admin.site.register(Bucket, BucketAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Phase, PhaseAdmin)
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(SocialAccount, SocialAccountAdmin)
admin.site.register(SocialGroup, SocialGroupAdmin)
admin.site.register(SocialAccountGroup, SocialAccountGroupAdmin)
admin.site.register(PagesToken, PagesTokenGroupAdmin)
admin.site.register(TourView, TourViewGroupAdmin)
admin.site.register(TourElement,TourElementAdmin)
admin.site.register(TourRelated)
admin.site.register(FileUpload, FileUploadAdmin)
admin.site.register(KnownSharingService, KnownSharingServiceAdmin)
