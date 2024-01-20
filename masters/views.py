from django.http import JsonResponse
import sys
from masters.models import Location, Games
# Create your views here.


def get_locations(request):
    try:
        locations = []
        loc_records = Location.objects.all()
        for rec in loc_records:
            locations.append({
                'location_name': rec.location_name,
                'description': rec.description,
                'address': rec.location_address,
                'phone': rec.location_phone,
                'created_date': rec.created_date.strftime('%B %d, %Y'),
                'modified_date': rec.modified_date,
            })
        return JsonResponse(status=200, safe=False, data=locations)
    except Exception as ex:
        sys.stderr.write(f"Exception while trying to get locations list {ex.__str__()}\n")
        return JsonResponse(status=400, safe=False, data={
            'error': f"Error while getting locations {ex.__str__()}"
        })

