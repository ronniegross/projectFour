from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('resources', views.ResourceView)
router.register('users', views.UserView)
router.register('comments', views.CommentView)

urlpatterns = [
    path('', include(router.urls))
]