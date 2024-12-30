"""
URL configuration for django_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include 
from django.conf import settings 
from django.conf.urls.static import static 
from users import views as user_views  
from django.contrib.auth import views as auth_views 


urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', include('blog.urls')),    
    path('register/', user_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name = 'users/login.html', extra_context={'title': 'Login'}), name='login'),   #CLASS BASED VIEWS, does not handle templates so we could do it, Add templates to users 
    path('logout/', user_views.logoutView, name='logout'), 
    #Password reset view (route that provides a user with a form to fill out that would send a password reset instructions to the email)
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'), name='password_reset_done'),
    #Confirmation for added layer of security, with tokens verifying user (essentially the view of the link opened from the email)
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'), name='password_reset_complete'),

    path('profile/', user_views.profile, name = 'profile' )
] 

if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)  
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#using this bit tells Django how to serve the uploaded images, if we are currently in debug mode 
