from .serializers import EndOfDayReportSerializer, EndOfDayReport
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class EndOfDayReportList(APIView):
    def get(self, request, format=None):
        eod_list = EndOfDayReport.objects.all()
        serializer = EndOfDayReportSerializer(eod_list, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def post(self, request, format=None):
        try:
            serializer = EndOfDayReportSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                eod_list = EndOfDayReport.objects.all()
                serializer = EndOfDayReportSerializer(eod_list, many=True)
                return Response(status=status.HTTP_207_MULTI_STATUS, data=serializer.data)
            else:
                print("Failed as there are errors in serialization", serializer.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
        except Exception as ex:
            print(f"Exception occurred while parsing {str(ex)}")
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'error': str(ex),
                                  'message': 'Exception occurred while parsing JSON Data'})


class EndOfDayReportDetail(APIView):
    """
    Retrieve, update & delete an instance of EOD Report
    """

    def get_object(self, pk):
        return EndOfDayReport.objects.get(pk=pk)

    def get(self, request, pk, format=None):
        try:
            eod_report = self.get_object(pk)
            serializer = EndOfDayReportSerializer(eod_report)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        except EndOfDayReport.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'message': f"Could not fetch EOD Report with Primary Key of {pk}"})

    def put(self, request, pk, format=None):
        try:
            eod_report = self.get_object(pk)
            serializer = EndOfDayReportSerializer(eod_report, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except EndOfDayReport.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'message': f"Could not fetch EOD Report with Primary Key of {pk}"})

    def delete(self, request, pk, format=None):
        try:
            eod_report = self.get_object(pk)
            eod_report.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EndOfDayReport.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'message': f"Could not fetch EOD Report with Primary Key of {pk}"})
