from django.db import models
from django.contrib.postgres.fields import jsonb


# Create your models here.
class OrderBookings (models.Model):
    booking_id = models.CharField(max_length=200, verbose_name='Booking ID', unique=True)
    listing = models.CharField(max_length=400, verbose_name='Listing Name')
    arrival_date = models.DateTimeField(verbose_name='Arrival Date & Time', null=True)
    customer_name = models.CharField(max_length=200, verbose_name='Customer Name')
    customer_email = models.CharField(max_length=200, verbose_name='Customer Email', null=True)
    guests = models.IntegerField(verbose_name='# Guests', default=1)
    base_amount = models.DecimalField(verbose_name='Base Amount', max_digits=7, decimal_places=2, default=0.0)
    taxes = models.DecimalField(verbose_name='Taxes', max_digits=7, decimal_places=2, default=0.0)
    addons = models.DecimalField(verbose_name='Taxes', max_digits=7, decimal_places=2, default=0.0)
    coupon_code = models.CharField(max_length=200, verbose_name='Coupon Code', null=True)
    amount = models.DecimalField(verbose_name='Amount', max_digits=7, decimal_places=2, default=0.0)
    adjustments = models.DecimalField(verbose_name='Adjustments', max_digits=7, decimal_places=2, default=0.0)
    total_value = models.DecimalField(verbose_name='Total Value', max_digits=9, decimal_places=2, default=0.0)
    revenue = models.DecimalField(verbose_name='Revenue', max_digits=9, decimal_places=2, default=0.0)
    source = models.CharField(max_length=100, verbose_name='Booking Source ', null=True)
    status = models.CharField(max_length=100, verbose_name='Status', null=True)
    booking_date = models.DateTimeField(verbose_name='Booking Date', null=True)
    reserved_by = models.CharField(max_length=100, verbose_name='Reserved By', null=True)
    location = models.CharField(max_length=100, verbose_name='Business Location', default='Plano')
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)


class LoadLog(models.Model):
    process_date = models.DateField(verbose_name='Process Date', auto_now=True, unique=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(null=True)
    load_stats = models.JSONField(default=dict)
