from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from eodreport.models import EODConfig, EndOfDayReport
from masters.models import Location, Games
from datetime import datetime


class ShiftException(Exception):
    pass


class SendEmails(APIView):
    """
    View to send emails to configured distribution list
    """
    def get(self, request, location_id, report_date, shift, format=None):
        """
        Sends email
        """
        try:
            location = Location.objects.get(pk=location_id)
            rdate = datetime.strptime(report_date, "%Y-%m-%d")
            msg = (f" Will be sending emails for {location_id} / {location.location_name}, "
                   f"on {report_date} / for shift {shift}")
            if shift[:2].upper() not in (["AM", "PM"]):
                raise ShiftException(f"Invalid shift data {shift}")
            eod_reports = EndOfDayReport.objects.filter(report_date__date=rdate)
            print(f"Got {eod_reports.count()} records with date")
            eod_reports = eod_reports.filter(location=location).filter(shift=shift)
            print(f"Got {eod_reports.count()} records with location & shift")
            print(msg)
            return Response(status=status.HTTP_200_OK, data={"status": msg})
        except ShiftException:
            msg = f" Exception occurred while generating emails. Invalid shift value {shift}. Should only be AM/PM "
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except ValueError:
            msg = (f" Exception occurred while generating emails. Invalid report date format {report_date}. "
                   f"Expect YYYY-MM-DD")
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except Location.DoesNotExist:
            msg = f" Exception occurred while generating emails. Invalid location sent{location_id}"
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except Exception as ex:
            msg = f" Exception occurred while generating emails {str(ex)}"
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
