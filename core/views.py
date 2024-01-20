from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.template import loader


# Create your views here.

def front(request):
    context = {}
    return render(request, "index.html", context)


def eod_report_ui(request):
    context = {}
    return render(request, "index.html", context)


def sign_in(request):
    if request.GET['username'] is not None and request.GET['password'] is not None:
        username = request.GET['username']
        password = request.GET['password']
    else:
        return JsonResponse(data={'status': 'failed login',
                                  'error': f"Provided combination is not valid to authenticate"}, status=401)
    print(f" Will be authenticating {username} with {password}")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        print(f"Wohoo !! {username} is authenticated {user.__str__()}")
        return JsonResponse(data={'status': 'success', 'username': username}, status=200)
    else:
        print("Failed to authenticate")
        return JsonResponse(data={'status': 'failed login',
                                  'error': f"Provided combination is not valid to authenticate"}, status=401)
