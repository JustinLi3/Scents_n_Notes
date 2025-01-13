from django.shortcuts import render, redirect
#Module that django includes where you could create forms
from django.contrib.auth.forms import UserCreationForm  
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from django.contrib.auth.decorators import login_required
from django.contrib import messages   
from .forms import UserRegistrationForm, UserUpdateForm, ProfileUpdateForm 
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from django import forms
import json 
from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated






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

class UserListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        posts = User.objects.all()
        serializer = UserSerializer(posts, many=True, context={'request':request})
        return Response(serializer.data)

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text="Enter a valid email address.")

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already registered.")
        return email
    
@csrf_exempt
def register_api(request):
    if request.method == "POST":
        try:
            # Parse the JSON data sent by React
            data = json.loads(request.body)

            # Use the custom UserRegistrationForm
            form = UserRegistrationForm(data)
            if form.is_valid():
                # Save the user and include the email
                user = form.save()

                # Optionally add logging in the user after registration
                # from django.contrib.auth import login
                # login(request, user)

                return JsonResponse({"message": "User registered successfully!"}, status=201)
            else:
                # Return form errors if validation fails
                return JsonResponse({"errors": form.errors}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    elif request.method == "GET":
        return JsonResponse({"message": "This endpoint accepts POST requests for registration."}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)

class LoginView(APIView): 
    def post(self, request): 
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username= username, password=password)
        if user is not None: 
            login(request, user)
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully!", "data": serializer.data})
        return Response(serializer.errors, status=400)
