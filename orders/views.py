from django.contrib.auth.decorators import login_required
from orders.models import OrderBookings
from django.http import JsonResponse
import sys
import requests
import json
from datetime import datetime
from orders.bookings.xola_bookings_api import get_xola_orders

DATE_FORMAT = '%m/%d/%y %I:%M %p'
import time


# Create your views here.
@login_required(login_url='/')
def orders_list(request):
    data = []
    for ob in OrderBookings.objects.all():
        data.append(
            {
                'booking_id': ob.booking_id,
                'listing': ob.listing,
                'arrival_date': ob.arrival_date.strftime(DATE_FORMAT),
                'customer_name': ob.customer_name,
                'customer_email': ob.customer_email,
                'guests': ob.guests,
                'taxes': float(ob.taxes),
                'revenue': float(ob.revenue),
                'coupon_code': ob.coupon_code,
                'location': ob.location,
                'booking_date': ob.booking_date.strftime(DATE_FORMAT)
            }
        )
    print("Got orders ... ", len(data))
    # time.sleep(3)
    return JsonResponse(data=data, safe=False, status=200)


headers = {
    "accept": "application/json",
    "X-API-VERSION": "2018-06-26",
    "X-API-KEY": "_gGNcJfcct-f4v355FFOZmXVf4fbr7XmAcxnrzrHBKM"
}


@login_required(login_url='/')
def get_latest_orders(request):
    response = None
    try:
        url = "https://xola.com/api/orders?seller=591a17b5332e75a52a8b458f&items.experience=596952ad6864eabc768b459b&sort=-id&limit=20&skip=0"
        response = requests.get(url, headers=headers)
        data = response.json()['data']
        if data is not None:
            sys.stdout.write(f"Latest orders for today {datetime.now()}. Count ... : {len(data)}")
        return JsonResponse(status=response.status_code, data=data, safe=False)
    except Exception as ex:
        sys.stderr.write(f"Exception occurred while attempting to get the latest orders ...{str(ex)}")
        if response is not None:
            return JsonResponse(status=response.status_code, safe=False,
                                data={'error': f"Some exception occurred {str(ex)}"})
        else:
            return JsonResponse(status=500, safe=False, data={'error': 'Internal or Networking error'})


@login_required(login_url='/')
def get_latest_orders_api(request, location):
    response = None
    try:
        data = get_xola_orders(location=location, arrival_date=None)
        if data is not None:
            sys.stdout.write(f"Latest orders for today {datetime.now()}. Count ... : {len(data)}")
        return JsonResponse(status=200, data=data, safe=False)
    except Exception as ex:
        sys.stderr.write(f"Exception occurred while attempting to get the latest orders ...{str(ex)}")
        if response is not None:
            return JsonResponse(status=403, safe=False,
                                data={'error': f"Some exception occurred {str(ex)}"})
        else:
            return JsonResponse(status=500, safe=False, data={'error': 'Internal or Networking error'})