"""asl_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import path, re_path, include
from rest_framework_jwt.views import obtain_jwt_token
# from .views import current_user, UserList
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.FrontendAppView.as_view()),  # New URL for the index route
    path('api/', include('asl_app.urls')),
    path('token-auth/', obtain_jwt_token),

    # path('current_user/', current_user),
    # path('users/', UserList.as_view()),

    path('asl_app/', include('asl_app.urls')),

    re_path(r'^.*$', views.FrontendAppView.as_view()), # add this route as a catch all route

    # path('accounts/', include('django.contrib.auth.urls')),
]