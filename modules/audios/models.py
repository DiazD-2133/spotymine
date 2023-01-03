from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage


class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Audio(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    duration = models.CharField(max_length=10)
    image = models.ImageField(upload_to="songs_image", blank=True, storage=MediaCloudinaryStorage)
    file = models.FileField(upload_to="music1")
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.name} - {self.author}"


class Playlist(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    image = models.ImageField(upload_to="songs_image", blank=True, storage=MediaCloudinaryStorage)
    songs = models.ManyToManyField(Audio)

    def __str__(self):
        return self.name

