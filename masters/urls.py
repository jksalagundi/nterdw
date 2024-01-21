from django.urls import path

from . import views
from .api.views import get_locations_api, get_games

urlpatterns = [
    path("locations", views.get_locations, name='locations_list'),
    path("api/locations", get_locations_api, name='locations_list_api'),
    path("api/games", get_games, name='games_list'),
]