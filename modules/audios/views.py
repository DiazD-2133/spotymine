from django.shortcuts import render
from .models import Playlist, Audio


def index(request):
    audios = Audio.objects.select_related('category').all()[:7]
    new_audios = Audio.objects.order_by("-id")[:8]
    playlists = Playlist.objects.all()

    return render(request, 'audios/index.html', {'audios': audios, 'playlists': playlists,
                                                 "new_audios": new_audios})
