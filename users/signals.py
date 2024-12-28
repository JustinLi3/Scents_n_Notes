#signal that gets fired after an object is saved (In this case the user) 
from django.db.models.signals import post_save
from django.contrib.auth.models import User 
#function that listens for a signal and runs custom code 
from django.dispatch import receiver  
#Want user profile created for each user 
from .models import Profile

#Essentially, when a user is saved, send the signal to the receiever and then call the create profile takes all of those arguments that it passed to it, one of them being instence and created

@receiver(post_save, sender = User)
def create_profile(sender, instance, created, **kwargs): 
    if created:
        Profile.objects.create(user = instance)

#Save profile, saves profile everytime user profile is saved 

@receiver(post_save, sender = User)
def save_profile(sender, instance, created, **kwargs): 
    instance.profile.save()