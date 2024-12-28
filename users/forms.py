from django import forms 
from django.contrib.auth.models import User  
#To add custom fields, we must reference User directly
from django.contrib.auth.forms import UserCreationForm 
#Import this to extend it to add custom fields   
from .models import Profile

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField() #true/false for whether required  # Adds an email field to the form
    #Meta is a nested namespace for configurations, we are saying that the model affected is User, and the fields that we want and in what order 
    class Meta: 
        model = User # Tells Django this form is for the User model
        fields = ['username', 'email', 'password1', 'password2']

#Form model
class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField() #true/false for whether required   # Adds an email field to the form 
    class Meta: 
        model = User 
        fields = ['username', 'email']

class ProfileUpdateForm(forms.ModelForm):
    class Meta: 
        model = Profile 
        fields = ['image'] 
    #Now we gotta add to views 