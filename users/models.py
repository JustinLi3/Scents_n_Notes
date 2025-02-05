from django.db import models
#For profile
from django.contrib.auth.models import User 
#Import pillow
from PIL import Image  
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One-to-one relationship
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')  # Image upload location

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        # Save the instance first
        super().save(*args, **kwargs)

        # Resize the image (for locally uploaded images)
        if self.image:
            img = Image.open(self.image)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)

                # Save the resized image to memory instead of local storage
                buffer = BytesIO()
                img.save(buffer, format=img.format)
                buffer.seek(0)

                # Replace the old image with the resized image
                self.image = InMemoryUploadedFile(
                    buffer,
                    'ImageField',
                    self.image.name,
                    img.format.lower(),
                    sys.getsizeof(buffer),
                    None
                )
                super().save(*args, **kwargs)  # Save the instance again

    #grab image saved and then resize using pillow 
    #*args and **kwargs allow Django to send whatever it needs, and super().save(*args, **kwargs) makes sure the object is saved before your custom code runs
    
    # Photo resizing on submit, however Pillow does not work for non-local images
    # def save(self, *args, **kwargs): 
    #     super(Profile, self).save( *args, **kwargs) 
    #     #Open the image of the current instance and resize 
    #     img = Image.open(self.image.path) 

    #     if img.height>300 or img.width > 300: 
    #         output_size = (300,300) 
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)

#Make sure that whenever you change something in models (schema for database), you must make migrations 
#python manage.py makemigrations (generate migration file for changes) 
#python manage.py migrate (apply the migration file changes to the database)
#pillow is used to work with images in python
#Then remember to register to our admin.py 

#Can access profiles through 'from django.contrib.auth.models import User'
#User.objects.filter to get user 
#user.profile.image 
#Location of image: user.profile.image.url