# Generated by Django 2.2 on 2019-04-22 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('asl_app', '0002_resource_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='url',
            field=models.CharField(default='None', max_length=400),
        ),
    ]
