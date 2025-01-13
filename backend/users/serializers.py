from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User
        fields = ['username','email','password']
    from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile  # Assuming Profile handles the image field

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image']  # Only the image field

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Nested serializer for Profile

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']  # Include username, email, and profile

    def update(self, instance, validated_data):
        # Handle profile image separately
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        # Update user fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update profile fields
        if 'image' in profile_data:
            profile.image = profile_data['image']
            profile.save()

        return instance



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image']  # Assuming Profile model only has an image field
    

    