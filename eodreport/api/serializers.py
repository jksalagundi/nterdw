from eodreport.models import EndOfDayReport, Games
from rest_framework.serializers import ModelSerializer


class EndOfDayReportSerializer(ModelSerializer):
    class Meta:
        # depth = 1
        model = EndOfDayReport
        fields = ['id', 'location', 'report_date', 'shift', 'shift_lead',
                  'traffic_status',
                  'location_cleaned_status', 'games_sold', 'walkins_declined',
                  'cash_in_box', 'inventory_reorder', 'eod_notes', 'game_status',
                  'created_date', 'modified_date']

    def create(self, validated_date):
        return EndOfDayReport.objects.create(**validated_date)

    def update(self, instance, validated_data):
        instance.location = validated_data.get('location', instance.location)
        instance.report_date = validated_data.get('report_date', instance.report_date)
        instance.shift = validated_data.get('shift', instance.shift)
        instance.traffic_status = validated_data.get('traffic_status', instance.traffic_status)
        instance.location_cleaned_status = validated_data.get('location_cleaned_status',
                                                              instance.location_cleaned_status)
        instance.games_sold = validated_data.get('games_sold', instance.games_sold)
        instance.walkins_declined = validated_data.get('walkins_declined', instance.walkins_declined)
        instance.cash_in_box = validated_data.get('cash_in_box', instance.cash_in_box)
        instance.inventory_reorder = validated_data.get('inventory_reorder', instance.inventory_reorder)
        instance.eod_notes = validated_data.get('eod_notes', instance.eod_notes)
        instance.modified_date = validated_data.get('modified_date', instance.modified_date)
        instance.game_status = validated_data.get('game_status', instance.game_status)
        instance.save()
        return instance



