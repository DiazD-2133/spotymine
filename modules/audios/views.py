from django.shortcuts import render
from .models import Playlist, Audio


def index(request):
    audios = Audio.objects.select_related('category').all()[:7]
    playlists = Playlist.objects.all()

    return render(request, 'audios/index.html', {'audios': audios, 'playlists': playlists})
