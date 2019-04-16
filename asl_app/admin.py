from django.contrib import admin
from .models import Resource, User, Comment

# Register your models here.


admin.site.register([Resource, User, Comment])