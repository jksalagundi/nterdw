from datetime import date, datetime, timedelta
import sys
from orders.bookings.xola_bookings_api import get_xola_orders
from orders.bookings.data_upsert import upsert_booking_data
from orders.models import LoadLog
import logging

from django.core.management.base import BaseCommand, CommandError

logger = logging.getLogger('nterdw')
DATE_FORMAT = '%Y-%m-%d'


class Command(BaseCommand):
    help = "Loads the booking data from XOLA"

    @staticmethod
    def generate_arrival_dates(start_from):
        dates = []
        try:
            start_from_arrival = datetime.strptime(start_from, DATE_FORMAT)
            today_arrival = datetime.today()
            one_day = timedelta(days=1)
            while start_from_arrival <= today_arrival:
                dates.append(start_from_arrival.strftime(DATE_FORMAT))
                start_from_arrival += one_day

        except Exception as ex:
            logger.error(f"Failed to generate dates ... {str(ex)}")
        return dates

    @staticmethod
    def update_load_log(stats):
        today = datetime.now().strftime('%Y-%m-%d')
        try:
            load_log = LoadLog.objects.get(process_date=today)
            load_log.load_stats = stats
        except LoadLog.DoesNotExist:
            load_log = LoadLog(load_stats=stats)
        load_log.save()

    def add_arguments(self, parser):
        parser.add_argument("--location",  dest='location', required=True,
                            help="Business Location / Store [mckinney | plano]")
        parser.add_argument("--arrival_date",  dest='arrival_date', required=False,
                            help="Update for this arrival date [yyyy-mm-dd] ")
        parser.add_argument("--from_arrival",  dest='from_arrival_date', required=False,
                            help="Updates starting from this arrival date [yyyy-mm-dd] ")

    def process_bookings_data(self, arrival, location):
        self.stdout.write("Bookings data will be processed for location - " + location)
        logger.debug("*" * 100)
        orders = get_xola_orders(location=location, arrival_date=arrival)
        logger.info(f"Processing Data for {location} on {datetime.now()}. Count : {len(orders)}")
        stats = {'location': location,
                 'inserts': 0,
                 'updates': 0}
        insert_count = 0
        update_count = 0
        for o in orders:
            # print(f"Will be running an upsert on {o['booking_id']}")
            inserted = upsert_booking_data(o)
            if inserted:
                insert_count += 1
            else:
                update_count += 1
        stats['inserts'] = insert_count
        stats['updates'] = update_count
        Command.update_load_log(stats)

    def handle(self, *args, **options):
        if options['location'] is None:
            self.stderr.write("Error: Failed to find business store or location", ending="")
            sys.exit(-1)
        else:
            self.stdout.write("Will be processing data for location: " + options['location'])

        if options['location'] == 'Plano' or options['location'] == 'plano':
            options['location'] = 'Plano'

        if options['location'] == 'McKinney' or options['location'] == 'mckinney':
            options['location'] = 'McKinney'

        if options['from_arrival_date'] is not None:
            dates = Command.generate_arrival_dates(options['from_arrival_date'])
            for arrival_date in dates:
                self.stdout.write(f"Will be processing data for arrival date : {arrival_date}")
                self.process_bookings_data(arrival=arrival_date, location=options['location'])
        else:
            self.process_bookings_data(arrival=options['arrival_date'], location=options['location'])

