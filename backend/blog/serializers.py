from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer): 
    author_username = serializers.CharField(source='author.username')  
    #implicitly looks for a method in the serializer with the name: get_<field_name>
    author_img_url = serializers.SerializerMethodField()  
    class Meta: 
        model = Post 
        fields = ['id', 'author', 'author_username', 'title', 'content', 'date_posted', 'author_img_url'] 
        read_only_fields = ['date_posted', 'author'] 

    def get_author_img_url(self, obj):
        #Retrieve request object passed necessary to generate URL : http://127.0.0.1:8000/
        request = self.context.get('request')
        if obj.author.profile.image:  # Assuming `author.profile.image` holds the image file
            return request.build_absolute_uri(obj.author.profile.image.url)
        return None