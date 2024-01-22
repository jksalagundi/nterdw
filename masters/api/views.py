from masters.models import Location, Games
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import LocationSerializer, GameSerializer


@api_view(['GET', ])
def get_locations_api(request):
    try:
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(data=serializer.data,status=200)
    except Exception as ex:
        return Response(status=400, data={'status': f'Failed due to this exception {str(ex)}'})


@api_view(['GET', ])
def get_games(request):
    try:
        games = Games.objects.all()
        serializer = GameSerializer (games, many=True)
        return Response(data=serializer.data,status=200)
    except Exception as ex:
        return Response(status=400, data={'status': f'Failed due to this exception {str(ex)}'})