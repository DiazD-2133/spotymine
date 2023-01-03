from django.shortcuts import render
from .models import Playlist, Audio


def index(request):
    audios = Audio.objects.all()
    playlist = Playlist.objects.all()

    return render(request, 'audios/index.html', {'audios': audios, 'playlist': playlist})
