from .serializers import EndOfDayReportSerializer, EndOfDayReport
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['GET', 'POST'])
def end_of_day_report_list(request):
    if request.method == 'GET':
        eod_list = EndOfDayReport.objects.all()
        serializer = EndOfDayReportSerializer(eod_list, many=True)
        # return JsonResponse(status=200, safe=False, data=serializer.data)
        return Response(status=200, data=serializer.data)
    elif request.method == 'POST':
        # print(request.body)
        try:
            data = JSONParser().parse(request)
            # print(data)
            serializer = EndOfDayReportSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                print("Saved successfully", serializer.data['id'])
                return Response(status=status.HTTP_207_MULTI_STATUS, data=serializer.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
        except Exception as ex:
            print(f"Exception occurred while parsing {str(ex)}")
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'error': str(ex),
                                  'message': 'Exception occurred while parsing JSON Data'})


