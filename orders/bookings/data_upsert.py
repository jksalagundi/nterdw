from orders.models import OrderBookings
from datetime import datetime
import logging

ARRIVAL_DATE_FORMAT = '%m/%d/%y %I:%M%p'
BOOKING_DATE_FORMAT = '%m/%d/%y, %I:%M %p'
logger = logging.getLogger('nterdw')


def upsert_booking_data(br):
    """
    Insert booking_record (br) if it does not exist or update if it exists
    """
    inserted = False
    try:
        booking = OrderBookings.objects.get(booking_id=br['booking_id'])
        booking.booking_id = br['booking_id']
        booking.listing = br['listing_name']
        booking.arrival_date = br['arrival_date_time']
        booking.customer_name = br['customer_name']
        booking.customer_email = br['customer_email']
        booking.guests = br['guest_count']
        booking.base_amount = br['base_amount']
        booking.taxes = br['taxes']
        booking.addons = br['addons']
        booking.coupon_code = br['coupon_code']
        booking.amount = br['amount']
        booking.adjustments = br['adjustments']
        booking.total_value = br['total_value']
        booking.revenue = br['revenue']
        booking.source = br['source']
        booking.status = br['status']
        booking.booking_date = br['booking_date']
        booking.reserved_by = br['reserved_by']
        booking.location = br['location']
        booking.modified_date = datetime.now()
        logger.debug(f"{booking.booking_id} with arrival {booking.arrival_date} is updated on {booking.modified_date}")
    except OrderBookings.DoesNotExist:
        booking = OrderBookings(
            booking_id=br['booking_id'],
            listing=br['listing_name'],
            arrival_date=br['arrival_date_time'],
            customer_name=br['customer_name'],
            customer_email=br['customer_email'],
            guests=br['guest_count'],
            base_amount=br['base_amount'],
            taxes=br['taxes'],
            addons=br['addons'],
            coupon_code=br['coupon_code'],
            amount=br['amount'],
            adjustments=br['adjustments'],
            total_value=br['total_value'],
            revenue=br['revenue'],
            source=br['source'],
            status=br['status'],
            booking_date=br['booking_date'],
            reserved_by=br['reserved_by'],
            location=br['location'],
        )
        inserted = True
        logger.debug(f"{booking.booking_id} with arrival {br['arrival_date_time']}is created")
    booking.save()
    return inserted
