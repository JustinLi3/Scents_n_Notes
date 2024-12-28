from django.urls import path   
from .views import PostListView, PostDetailView, PostCreateView
from . import views 

urlpatterns = [
    #Looking for a template with the naming convention of the app/model/viewtype.html, app = blog, model = post, list.html ALL CLASS BASED INSTEAD OF FUNCTION BASED VIEW
    path('', PostListView.as_view() , name='blog-home'),  
    #this is a url pattern that contains variable, 'post/1, post/2', where int:pk represents primary key index of the post and what kind of type is it 
    path('post/<int:pk>/', PostDetailView.as_view() , name='post-detail'),   
    #this url pattern that creates a new post with /new/ 
    path('post/new/', PostCreateView.as_view(), name='post-create'),

    #Set as the homepage
    #Specify the view that we want to handle logic at that home page route 
    #Specify name for route to not collide with other routes  
    path('about/',views.about, name='blog-about')
] 

