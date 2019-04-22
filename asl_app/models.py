from django.db import models

class Resource(models.Model):
    resource_name = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=400)
    address = models.CharField(max_length=400)
    url = models.CharField(max_length=400, default='None')
    contact_number = models.CharField(max_length=255)

    def __str__(self):
        return self.resource_name

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Comment(models.Model):
    comment = models.CharField(max_length=400)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.comment
