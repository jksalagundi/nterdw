from django.db import models
from masters.models import Location, Games


class EndOfDayReport(models.Model):
    """
    End-of-day Report Class
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    report_date = models.DateTimeField(verbose_name='Report Day', auto_now=True)
    shift = models.CharField(max_length=2, verbose_name='AM or PM Shift')
    shift_lead = models.CharField(max_length=100, verbose_name='Shift Lead')
    traffic_status = models.CharField(max_length=20, verbose_name='Traffic Status')
    location_cleaned_status = models.CharField(max_length=30, null=False)
    games_sold = models.IntegerField(verbose_name='Games Sold', default=0)
    walkins_declined = models.IntegerField(verbose_name='Number of Walkins Declined', default=0)
    cash_in_box = models.IntegerField(verbose_name='Cash In the Box', default=0)
    inventory_reorder = models.CharField(max_length=200, default='No Reorder')
    eod_notes = models.TextField(null=False, default='EOD Notes TBD')
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)


class EODGameStatus(models.Model):
    """
    End of day Game Status
    """
    eod_report = models.ForeignKey(EndOfDayReport, on_delete=models.CASCADE)
    game = models.ForeignKey(Games, on_delete=models.CASCADE)
    # Three choices --> Good / Functional / Broken
    status = models.CharField(max_length=20, null=False, default="Good")
    notes = models.TextField(null=True)




