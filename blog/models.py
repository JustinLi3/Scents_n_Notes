from django.db import models  
from django.contrib.auth.models import User #import user model
from django.utils import timezone  
from django.urls import reverse
# Think about models for blogs (Users: authors of posts, posts)
# Create your models here. 
# Since the relationship between posts and users is that one user can have multiple posts, this is a one to many relationship 
class Post(models.Model):  #Each class would be its own table in database 
    title = models.CharField(max_length=100) #Character field/String single line
    content = models.TextField() #Lines and lines of text unrestricted  
    date_posted = models.DateTimeField(default=timezone.now) #auto_now: when updated/created  auto_now_add:only when created   
        #default=timezone.now: Use this when you want to set the current date and time as the default (when created), but you still want the option to change it later
        #auto_now: Use this for fields like last_modified or updated_at—fields that should automatically update every time the object is saved
        #auto_now_add: Use this for fields like created_at—fields that should only be set once when the object is created 
    author = models.ForeignKey(User, on_delete=models.CASCADE) #if user created post and was deleted, do we want to delete their posts or hold them as null 
        #ensures that when a user is deleted, their posts are deleted as well 
        #foreign key: link between two database tables, linking each post to a user  
         #use on model with many instances related to one instance of another model   
    def __str__(self): 
        return self.title 
        #changes take effect after reopening

    def get_absolute_url(self):
        return reverse("post-detail", kwargs={"pk": self.pk})
    #Redirect/Reverse: Redirect would redirect you to a specific route while Reverse returns the full URL to that route as a string  

#Rerun migrations after making changes  
  #Run python manage.py makemigrations: Django generates migration files based on the changes you made.
  #Run python manage.py migrate: This applies the migrations to the actual database, updating its structure to match the changes in your models.

#Displays the SQL code that Django would execute if you ran python manage.py migrate
  #python manage.py sqlmigrate _appname_ 0001