from django.urls import path

from . import views

urlpatterns = [
    path("", views.orders_list, name='orders_list'),
    path("latest", views.get_latest_orders, name='orders_latest'),
    path("api/<str:location>/", views.get_latest_orders_api, name='orders_latest_api'),
]