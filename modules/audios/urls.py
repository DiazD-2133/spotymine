from django.urls import path
from . import views


app_name = 'audios'
urlpatterns = [
    path('', views.index, name='Index'),
]
