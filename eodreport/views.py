from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import render
from datetime import datetime
from masters.models import Games, Location


def __get_games_list(location):
    try:
        games_list = []
        for game in Games.objects.filter(location=location):
            games_list.append(f"{game.name} ({game.short_name}) ")
        return sorted(games_list)
    except Exception as ex:
        print(f"Failed to get the list of games due to exception {ex.__str__()}")


def eod_report_ui(request, location):
    try:
        template = loader.get_template("eod_prime/index.html")
        location_object = Location.objects.get(location_name=location.lower())
        context = {
            "location": f"NTER {location}",
            "report_date": datetime.now().strftime('%B %d, %Y'),
            "games": __get_games_list(location_object)
        }
        print("Games Found ... ", context['games'])
        return HttpResponse(template.render(context, request))
    except Location.DoesNotExist:
        print(f"Location does not exist {location}")
    except Exception as ex:
        print("Exception occurred .. No template found ... ", ex.__str__())


def eod_test(request):
    print("Getting post request ... ", request)
    return JsonResponse(safe=False, data={'status': 'will be working'}, status=200)
