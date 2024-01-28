from django.urls import path
from . import views
from eodreport.api.views import end_of_day_report_list
from eodreport.api.class_views import EndOfDayReportList, EndOfDayReportDetail
from eodreport.api.email_views import SendEmails

urlpatterns = [
    path("<str:location>/", views.eod_report_ui, name="eod_report"),
    # path("api/list", end_of_day_report_list, name="eod_report_list"),
    path("api/list", EndOfDayReportList.as_view(), name="eod_report_list"),
    path("api/<int:pk>/", EndOfDayReportDetail.as_view(), name="eod_report_detail"),
    path("api/emails/<int:location_id>/<str:report_date>/<str:shift>/",
         SendEmails.as_view(), name="send_report_emails"),
]