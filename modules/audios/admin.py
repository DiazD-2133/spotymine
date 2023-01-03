from django.contrib import admin
from . import models


@admin.register(models.Audio)
class AudioAdmin(admin.ModelAdmin):
    list_display = ["name", "author", "duration", "category"]
    search_fields = ['name', "author"]


@admin.register(models.Playlist)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ["songs"]
    prepopulated_fields = {
        'slug': ['name']
    }

