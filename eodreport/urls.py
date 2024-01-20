from django.urls import path
from . import views

urlpatterns = [
    path("<str:location>/", views.eod_report_ui, name="eod_report"),
]