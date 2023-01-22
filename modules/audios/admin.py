from django.contrib import admin
from . import models


@admin.register(models.Audio)
class AudioAdmin(admin.ModelAdmin):
    list_display = ["name", "artist", "duration", "category"]
    search_fields = ['name', "artist"]


@admin.register(models.Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    autocomplete_fields = ["songs"]
    prepopulated_fields = {
        'slug': ['name']
    }


@admin.register(models.Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(models.Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ["name"]


admin.site.register(models.RecommendedArtist)
