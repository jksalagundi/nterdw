import sys
import logging
from django.core.management.base import BaseCommand
from masters.models import Games, Location
from masters.data.locations import LOCATIONS
from masters.data.games import GAMES

logger = logging.getLogger('nterdw')


class Command(BaseCommand):
    help = "Loads Games & Location Master Data"

    def add_arguments(self, parser):
        parser.add_argument('--overwrite', dest='overwrite', required=False,
                            help='Erase old data and overwrite: Caution')

    def load_locations(self):
        self.stdout.write("Creating locations... ")
        if Location.objects.all().count() == 0:
            for rec in LOCATIONS:
                loc = Location(
                    location_name=rec['name'],
                    description=rec['description'],
                    location_address=rec['address'],
                    location_phone=rec['phone']
                )
                loc.save()
        else:
                self.stderr.write("Sorry. There are existing location records")

    def load_games(self):
        try:
            self.stdout.write("Creating Games... ")
            if Games.objects.all().count() == 0:
                for rec in GAMES:
                    loc = Location.objects.get(location_name=rec['location'])
                    game = Games(
                        location=loc,
                        name=rec['name'],
                        short_name=rec['short_name'],
                        game_description="TBD"
                    )
                    game.save()
            else:
                self.stderr.write('Sorry. There are existing games.')
        except Exception as ex:
            self.stderr.write('Exception occurred while loading game data ' + ex.__str__())
            pass

    def handle(self, *args, **options):

        if options['overwrite'] is None:
            self.stdout.write("Existing data about Games & Locations will not be erased")
        else:
            self.stderr.write("WARNING:: EXISTING MASTER DATA WILL BE ERASED")
            sure = input("Are you sure (Y/N) ? ")
            if sure == "Y" or sure == 'y':
                # TODO :: Erase old master data
                Games.objects.all().delete()
                Location.objects.all().delete()
                sys.stdout.write("Old games & location data is erased and will be reloaded")
                self.load_locations()
                self.load_games()
            else:
                self.stderr.write("Master data is not erased")
                sys.exit(-1)


