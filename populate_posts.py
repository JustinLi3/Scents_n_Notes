import json
from blog.models import Post
from django.contrib.auth.models import User

with open('posts.json') as f:
   posts_json = json.load(f)
for p in posts_json:
    try:
        user = User.objects.get(pk=p['user_id'])
        post = Post(
            title=p['title'], 
            content=p['content'], 
            author=user
        )
        post.save()
    except User.DoesNotExist:
        print(f"Skipping post: User with ID {p['user_id']} does not exist.")