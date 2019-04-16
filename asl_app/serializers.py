from rest_framework import serializers

from .models import Resource, User, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'comment', 'user', 'resource')

class ResourceSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Resource
        fields = ('id', 'resource_name', 'photo_url', 'address', 'contact_number', 'comments')


class UserSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'age', 'gender', 'comments')

