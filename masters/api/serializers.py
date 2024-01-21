from rest_framework import serializers
from masters.models import Games, Location
# This has to be imported into another module and used..


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'location_name', 'description', 'location_address', 'location_phone', 
                  'created_date', 'modified_date']
    # id = serializers.IntegerField(read_only=True)
    # location_name = serializers.CharField(required=True, max_length=98)
    # description = serializers.CharField(required=False, max_length=198)
    # location_address = serializers.CharField(max_length=498, required=True)
    # location_phone= serializers.CharField(max_length=18, required=True)
    # created_date = serializers.DateTimeField
    # modified_date = serializers.DateTimeField


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ['id', 'location', 'name', 'short_name', 'created_date', 'modified_date', 
                  'game_description', 'game_props', 'game_steps']
