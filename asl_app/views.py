from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ResourceSerializer, UserSerializer, CommentSerializer
from .models import Resource, User, Comment

# Create your views here.


class ResourceView(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer