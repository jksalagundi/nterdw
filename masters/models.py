from django.db import models

# Create your models here.


class Location(models.Model):
    """
    Model that stores business location details
    """
    location_name = models.CharField(null=False, verbose_name="Location Name:", max_length=100)
    description = models.CharField(null=True, default="Descripiton")
    location_address = models.TextField(null=False, verbose_name="Location Address")
    location_phone = models.CharField(null=False, verbose_name="Location Phone Number", max_length=20)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)


class Games(models.Model):
    """
    Model that stores escape games associated with each of the location
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    name = models.CharField(null=False, verbose_name="Game Name", max_length=100)
    short_name = models.CharField(null=False, verbose_name="Game Short Name", max_length=10)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)
    game_description = models.TextField(null=False, verbose_name="Detailed description")
    game_steps = models.JSONField(null=True, default=dict)
    game_props = models.JSONField(null=True, default=dict)


