from django.urls import path, include
from rest_framework import routers

from .views import current_user, UserList

from . import views

router = routers.DefaultRouter()
router.register('resources', views.ResourceView)
router.register('users', views.UserView)
router.register('comments', views.CommentView)

urlpatterns = [
    path('', include(router.urls)),
    # path('core/', include('core.urls'))
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]