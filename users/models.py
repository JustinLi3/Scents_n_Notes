from django.db import models
#For profile
from django.contrib.auth.models import User 
#Import pillow
from PIL import Image 

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #one to one relationship with a profile and user, cascade to delete user and profile
    image = models.ImageField(default = 'default.jpg', upload_to='profile_pics') #default image is default.jpg, if user puts in picture, it is sent to that directory
    def __str__(self): 
        return f'{self.user.username} Profile' 
        #changes take effect after reopening  

    #grab image saved and then resize using pillow
    def save(self): 
        super().save() 

        #Open the image of the current instance and resize 
        img = Image.open(self.image.path) 

        if img.height>300 or img.width > 300: 
            output_size = (300,300) 
            img.thumbnail(output_size)
            img.save(self.image.path)

#Make sure that whenever you change something in models (schema for database), you must make migrations 
#python manage.py makemigrations (generate migration file for changes) 
#python manage.py migrate (apply the migration file changes to the database)
#pillow is used to work with images in python
#Then remember to register to our admin.py 

#Can access profiles through 'from django.contrib.auth.models import User'
#User.objects.filter to get user 
#user.profile.image 
#Location of image: user.profile.image.url