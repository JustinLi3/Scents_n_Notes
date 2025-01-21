from django.conf import settings
from django.conf.urls.static import static
from django.urls import path   
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView, UserPostListView, picks, find_scent, buy_cologne,works
from . import views 

urlpatterns = [
    #Looking for a template with the naming convention of the app/model/viewtype.html, app = blog, model = post, list.html ALL CLASS BASED INSTEAD OF FUNCTION BASED VIEW
    path('', PostListView.as_view() , name='blog-home'),  
    #this is a url pattern that contains variable, 'post/1, post/2', where int:pk represents primary key index of the post and what kind of type is it 
    path('post/<int:pk>/', PostDetailView.as_view() , name='post-detail'),   
    #this url pattern that creates a new post with /new/ 
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    #To update a post, we need to include the primary key to know what post we are updating 
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'), 
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),  
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),

    #Set as the homepage
    #Specify the view that we want to handle logic at that home page route   
    #Specify name for route to not collide with other routes  
    path('about/',views.about, name='blog-about'), 
    #Side bar options
    path('picks/',views.picks, name='justin-picks'), 
    path('find-scent/',views.find_scent, name='find-scent'), 
    path('buy-cologne/',views.buy_cologne, name='buy-cologne'), 
    path('what-works/',views.works, name='what-works'), 
    path('recommend/', views.recommend, name="recommend" )




] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
