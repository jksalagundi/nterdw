import sys
import os
import glob
from orders.bookings import process_booking_file
import logging

from django.core.management.base import BaseCommand, CommandError

logger = logging.getLogger('nterdw')


class Command(BaseCommand):
    help = "Loads the booking data from XOLA"

    def add_arguments(self, parser):
        parser.add_argument("--location",  dest='location', required=True, help="Business Location / Store")
        parser.add_argument('--data_dir', dest='data_dir', required=True, help='Data Directory containing load files')
        parser.add_argument('--overwrite', dest='overwrite', required=False,
                            help='Erase old data and overwrite: Caution')

    def process_bookings_files(self, path, location):
        self.stdout.write("Bookings data will be processed from - " + path)
        logger.debug("*" * 100)
        logger.debug(f"{path} will be path from which all files will be processed")
        files_to_process = []
        for filename in glob.glob(f"{path}/*orders*.xlsx", recursive=False):
            self.stdout.write('\n' + 80 * '-' + '\n')
            self.stdout.write(f'Processing : {filename}')
            files_to_process.append(filename)

        for f in sorted(files_to_process):
            logger.debug(f"Starting to process file : {f}\n")
            process_booking_file.load_bookings_data(f, location)

    def handle(self, *args, **options):
        if options['location'] is None:
            self.stderr.write("Error: Failed to find business store or location", ending="")
            sys.exit(-1)
        else:
            self.stdout.write("Will be processing data for location: " + options['location'])

        if options['data_dir'] is None:
            self.stderr.write("Error: Incorrect parameter. Data Dir must be specified")
        else:
            if os.path.exists(options['data_dir']):
                self.stdout.write("Will be processing bookings data from " + options['data_dir'])
            else:
                self.stderr.write(options['data_dir'] + " does not exist as a valid path: ")
                sys.exit(-1)

        self.process_bookings_files(options['data_dir'], options['location'])

