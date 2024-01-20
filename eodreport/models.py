from django.db import models
from masters.models import Location, Games


class EODReport(models.Model):
    """
    End-of-day Report Class
    """
    report_date = models.DateField(verbose_name='Report Day', null=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    game_status = models.JSONField(default=dict, null=False)
    location_status = models.CharField(max_length=100, null=False)
    games_served = models.IntegerField(verbose_name='Games Served', default=0)
    location_cleaned_status = models.CharField(max_length=100, null=False)
    eod_notes = models.TextField(null=False)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)





