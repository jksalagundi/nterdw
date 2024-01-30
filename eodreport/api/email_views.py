from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .send_email_wrapper import SendEmailWrapper, SendEmailWrapperException

logger = logging.getLogger("nterdw")


class SendEmails(APIView):
    def __init__(self):
        self.wrapper = SendEmailWrapper()

    def get(self, request, location_id, report_date, shift, format=None):
        try:
            msg = self.wrapper.send_eod_report(location_id, report_date, shift)
            return Response(data={'status': msg}, status=status.HTTP_200_OK)
        except SendEmailWrapperException as ex:
            logger.error(f"Exception occurred while invoking API from Web..{str(ex)}")
            return Response(data={'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)
