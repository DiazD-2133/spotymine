# Generated by Django 4.1.1 on 2023-01-22 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audios', '0004_recommendedartist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audio',
            name='author',
        ),
        migrations.AddField(
            model_name='audio',
            name='image_link',
            field=models.CharField(default='', max_length=255),
        ),
    ]