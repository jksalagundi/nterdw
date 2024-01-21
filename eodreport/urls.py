from django.urls import path
from . import views
from eodreport.api.views import end_of_day_report_list

urlpatterns = [
    path("<str:location>/", views.eod_report_ui, name="eod_report"),
    path("api/list", end_of_day_report_list, name="eod_report_list"),
]