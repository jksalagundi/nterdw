from django.urls import path

from . import views

urlpatterns = [
    path("locations", views.get_locations, name='locations_list'),
]