from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from .models import PagesToken
from buckets import facebook
from allauth.socialaccount.models import SocialAccount 
from allauth.socialaccount.models import SocialToken


@receiver(post_save, sender=SocialToken)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
    	chan = facebook.Facebook()
    	oauth = chan.get_oauth2session()
        token = instance.token
        account = SocialAccount.objects.get(id = instance.id)
        user = User.objects.get(id = account.user_id)
        
        pages = chan.get_user_pages(token = token, account_id = account.uid)
        for page in pages:
        	imagen = chan.get_page_image(page_id = page["page_id"], token = page["token"])
        	PagesToken.objects.create(owner = user, 
        			page_id = page["page_id"], name=page["name"], token=page["token"], 
        			image_link = chan.image["data"]["url"] 
                        		if "data" in chan.image and "url" in chan.image["data"] else None)