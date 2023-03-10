# Generated by Django 4.1.1 on 2023-01-03 17:40

import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('slug', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, storage=cloudinary_storage.storage.MediaCloudinaryStorage, upload_to='songs_image')),
                ('songs', models.ManyToManyField(to='audios.audio')),
            ],
        ),
    ]
