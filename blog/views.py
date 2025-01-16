from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin 
from django.contrib.auth.models import User 
#Import for search functionality
from django.db.models import Q 
#Class based views (list view)
from django.views.generic import (
    ListView, 
    DetailView, 
    CreateView, 
    UpdateView, 
    DeleteView
)
from .models import Post  


#Use as dummy data, as if you retrieved this data from a database
# posts = [
#     {
#         'author': 'Justin', 
#         'title': 'My Cologne Choice PT 1', 
#         'content': 'Favorite Cologne', 
#         'date_posted': 'October 3, 2024'
#     }, 
#      {
#         'author': 'Leanne', 
#         'title': 'Whats up with Nursing?', 
#         'content': 'Nursing Inquiry', 
#         'date_posted': 'October 10, 2024'
#     }, 
# ]

#Function based views: Url patterns directed to a certain view, which are these functions, and the views handle the logic for routes and render templates 
#Class based views: More functionality as it handles more backend logic (list, detail, create, update, delete views)
# Examples: List view (blog posts, subscriptions,) clicking on one would send us to a Detail view (descriptions), then we could update and delete views (update/del views) 

# def home(request):   
#     # return HttpResponse('<h1>Blog Home</h1>')  
#     context = { #create context just so you could pass in additional information
#         'posts': Post.objects.all(),   #posts variable is going to be accessible within our template 
#         'title': 'Home'
#     }
#     return render(request, 'blog/home.html', context) #template name that we want to render, specifying the subdirectory within templates
#     #Additional optional parameter to pass in information into our template

def about(request): 
    return render(request, 'blog/about.html', {'title':'About'}) 

#inherit from that list view
class PostListView(ListView):  
    #Tell our model what to query 
    model = Post 
    template_name = 'blog/home.html' #rerouting our template from list to home  
    #Route convention: <app>/<model>_<viewtype>.html    blog/post_detail.html <-TEMPLATE
    context_object_name = 'posts' #We need this variable name template for easy reference {{posts}} instead of {{object_list}} 
    ordering = ['-date_posted'] #We are essentially ordering our blogs such that (with -) the most recent are at the top 
    paginate_by = 5 #posts per page 
    #now we need to add a link to other pages  (manually: /?page=_), this is done within home.html
    def get_queryset(self):
        query = self.request.GET.get('q')  # Get the search query
        # print(f"Search query: {query}")  # Debugging: Check the search term in the terminal

        if query:
            # Filter posts by title or content, case-insensitive
            return Post.objects.filter(
                Q(title__icontains=query) | Q(content__icontains=query)
            )
        return Post.objects.all()  # Default: Return all posts


class UserPostListView(ListView):  
    #Tell our model what to query 
    model = Post 
    template_name = 'blog/user_posts.html' #rerouting our template from list to home  
    #Route convention: <app>/<model>_<viewtype>.html    blog/post_detail.html <-TEMPLATE
    context_object_name = 'posts' #We need this variable name template for easy reference {{posts}} instead of {{object_list}}  
    paginate_by = 5 #posts per page  
    def get_queryset(self):
        user = get_object_or_404(User,username=self.kwargs.get('username'))
        return Post.objects.filter(author = user).order_by('-date_posted')
         

#Detail view for each post in PostListView 
class PostDetailView(DetailView): 
    model = Post

#Create a new post with the fields being a title and content, with date being automatically filled 
#V here we put in the login mixin, ensuring that the user is logged in prior to creating posts 
class PostCreateView(LoginRequiredMixin, CreateView): 
    model = Post
    fields = ['title', 'content'] 

    #Problem is that we are trying to create a post without having a null user, so every post MUST have a user, being the currently logged in user 
    def form_valid(self, form): 
        #We are essentially saying that before we submit, take the instance and set the author to the currently logged in user, then it is validated
        form.instance.author  = self.request.user 
        #Setting the author to the logged-in user before we save this form to the database as usual.
        return super().form_valid(form)
        #HOWEVER, we still need a redirect url, post-submit, let view know where to redirect 
        #Must create a get absolute URL method in our model returning path   

        #NOTE, since only logged in users can create posts, we need to use a login mixin (Decorators only for function-based views)

#UserPassesTestMixin allows us to define a function that runs before view is executed, return true if user is allowed to access view, otherwise not 
#Adds restrictions to views 
class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView): 
    model = Post 
    fields = ['title', 'content'] 
    def form_valid(self, form): 
            form.instance.author = self.request.user 
            return super().form_valid(form)
    
    def test_func(self):
         post = self.get_object()
         if self.request.user == post.author:
              return True
         return False 

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView): 
    model = Post  
    #setting success url for deletion, back to homepage
    success_url = '/'
    def test_func(self):
         post = self.get_object()
         if self.request.user == post.author:
              return True
         return False 

#blog -> templates -> blog -> template.html  

