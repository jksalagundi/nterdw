import requests
import json
import logging

# ?seller=591a17b5332e75a52a8b458f
# &items.experience=596952ad6864eabc768b459b
# &sort=-id
# limit=20
# skip=0"
logger = logging.getLogger('nterdw')

headers = {
    "accept": "application/json",
    "X-API-VERSION": "2018-06-26",
    "X-API-KEY": "_gGNcJfcct-f4v355FFOZmXVf4fbr7XmAcxnrzrHBKM"
}

seller_ids = {
    'McKinney': '591a17b5332e75a52a8b458f',
    'Plano': '5cd9bce58c7e314a887072bb',
}

url = "https://xola.com/api/orders"


class XOLAExceptions(Exception):
    pass


def get_xola_orders(location, arrival_date):
    """
        location: ['McKinney', 'Plano']
        arrival_date: 'yyyy-mm-dd'
    """
    try:
        params = {
            'seller': seller_ids[location],
            'sort': '-id',
            'skip': 0,
        }
        if arrival_date is not None:
            params['items.arrival'] = arrival_date
        response = requests.get(url, headers=headers, params=params)
        booking = {}
        orders = []
        """
        We have to only process 'Order' objects and not 'Coupons' or 'Gift' type bookings
        """
        for rec in response.json()['data']:
            # No need to process other bookings...
            if rec['object'] != 'order':
                continue
            try:
                if 'items' in rec:
                    if len(rec['items']) > 0:
                        booking['booking_id'] = rec['id']
                        exp = rec['items'][0]
                        booking['listing_name'] = exp['name']
                        booking['arrival_date_time'] = exp['arrivalDatetime']
                        booking['customer_name'] = rec['customerName']
                        booking['customer_email'] = rec['customerEmail']
                        booking['revenue'] = float(exp['amount'])
                        booking['guest_count'] = exp['quantity']
                        booking['base_amount'] = float(exp['baseAmount'])
                        booking['taxes'] = booking['revenue'] - booking['base_amount']
                        booking['addons'] = 0.0
                        booking['coupon_code'] = 'TBD'
                        booking['amount'] = booking['revenue']
                        booking['source'] = rec['source']
                        booking['status'] = 'TBD'
                        booking['reserved_by'] = 'TBD'
                        booking['location'] = location
                        booking['booking_date'] = rec['createdAt']
                        booking['adjustments'] = 0.0
                        booking['total_value'] = booking['revenue']

            except KeyError as keyEx:
                logging.warning(f"Key error occurred ..{str(rec)} as {str(keyEx)}")
                raise XOLAExceptions(keyEx)
            orders.append(booking)
            booking = {}
        logging.info(f"Returning {len(orders)} order bookings for {location}")
        return orders
    except Exception as ex:
        print(f"Error occurred ... {ex.__str__()}")
