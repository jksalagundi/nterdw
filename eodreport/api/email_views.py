from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from eodreport.models import EODConfig, EndOfDayReport
from masters.models import Location, Games


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
            msg = (f" Will be sending emails for {location_id} / {location.location_name}, "
                   f"on {report_date} for shift {shift}")
            print(msg)
            return Response(status=status.HTTP_200_OK, data={"status": msg})
        except Location.DoesNotExist:
            msg = f" Exception occurred while generating emails. Invalid location sent{location_id}"
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except Exception as ex:
            msg = f" Exception occurred while generating emails {str(ex)}"
            print(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
