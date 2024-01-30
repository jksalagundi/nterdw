import sys
import os
import glob
import logging
from eodreport.models import EODConfig, EndOfDayReport
from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
logger = logging.getLogger('nterdw')


class Command(BaseCommand):
    help = "Send emails from EOD Report filed"

    def __init__(self):
        super(Command, self).__init__()
        self.from_report_date = None
        self.resend = False

    def add_arguments(self, parser):
        parser.add_argument("--from_report_date",  dest='from_report_date', required=False,
                            help="Send reports from this date")
        parser.add_argument('--resend', dest='resend', required=False,
                            help='Resend emails from this date')

    def handle(self, *args, **options):
        if options['from_report_date'] is not None:
            self.stdout.write("Will be processing data from this report date: " + options['from_report_date'])
            self.from_report_date = options['from_report_date']

        if options['resend'] is not None:
            self.resend = True

        logger.info(f"Will be sending emails from this date ... "
                    f"{datetime.today() if self.from_report_date is None else self.from_report_date}")


