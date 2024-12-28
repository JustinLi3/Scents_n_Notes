from django.shortcuts import render, redirect
#Module that django includes where you could create forms
from django.contrib.auth.forms import UserCreationForm  
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from django.contrib import messages  
from .forms import UserRegistrationForm, UserUpdateForm, ProfileUpdateForm

'''
Small popup for users 
messages.debug/info/success/warning/error
'''

# Create your views here.
def register(request):   
    #Essentially checks whether the request being used is post and if so create a form that has the request.POST data 
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)  
        if form.is_valid():   
            # This saves the new user to the database
            form.save()     
            #form.cleaned_data returns dictionary containing all validated form data 
            #get('username') fetches value associated with key 'username'
            username = form.cleaned_data.get('username')  
            #send flash message  
            messages.success(request, f'Your account has been created! You are able to log in')  
            #Redirect user to blog home  
            return redirect('login') 
            #for redirect to work, you must update your template to show flashed messsages (base.html) 

            #Bootstrap styling for forms (since its mad ugly rn: crispy forms)
    else:   
        #create instance of form
        form = UserRegistrationForm()
    return render(request, 'users/register.html', {'form': form, 'title': 'Register'})

#Decorator adds functionality to an existing function, a q  dds have to login before this 
@login_required
def profile(request):   
    #Check if request is post as well as whether data is valid
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance = request.user)  #populate users with current users information 
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance = request.user.profile) 
        if u_form.is_valid() and p_form.is_valid(): 
            u_form.save() 
            p_form.save() 
            messages.success(request, f'Your account has been updated!')  
            #Redirect user to blog home  
            return redirect('profile') 
    #Otherwise if the page is just checked out it would return the prefilled 
    else: 
        u_form = UserUpdateForm(instance = request.user)  #populate users with current users information 
        p_form = ProfileUpdateForm(instance = request.user.profile) 
    #Keys to access template 
    context = {
        'u_form' : u_form, 
        'p_form' : p_form
    }
    return render(request, 'users/profile.html', context)

def logoutView(request):
    logout(request)
    return render(request, 'users/logout.html', {'title':'Logged Out'})  # Show a logout confirmation page 

    