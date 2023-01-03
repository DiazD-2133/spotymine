# Generated by Django 4.1.1 on 2023-01-03 17:24

import cloudinary_storage.storage
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'category',
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('author', models.CharField(max_length=255)),
                ('duration', models.CharField(max_length=10)),
                ('image', models.ImageField(blank=True, storage=cloudinary_storage.storage.MediaCloudinaryStorage, upload_to='songs_image')),
                ('file', models.FileField(upload_to='music1')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='audios.category')),
            ],
        ),
    ]