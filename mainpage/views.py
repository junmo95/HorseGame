from urllib import request, response
from django.shortcuts import render
from django.views.generic import ListView
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from rest_framework import viewsets
from django.http import HttpResponse
from accounts.models import User
from api.models import EventData
from api.serializers import *


def main(request):
    user_list = {'user_list': User.objects.all().order_by('-cash')}
    return render(request, 'main.html', user_list)


def pick_horse(request):
    print('from pick horse!!')
    print(request.session.get('sessionData', False))
    context = {'context': request.session.get('sessionData', False)}

    return render(request, 'pick_horse.html', context)


def game_start(request):
    eventdata = EventData.objects.values()
    request.session.modified = True
    context = {'context': request.session.get('sessionData', False),
               'mycontext': request.session.get('mysessionData', False), 'eventdata': eventdata}

    return render(request, 'game_test.html', context)


def game_end(request):
    context = {'context': request.session.get('sessionData', False),
               'mycontext': request.session.get('mysessionData', False),
               'mysessionEndData': request.session.get('mysessionEndData', False)}

    return render(request, 'result.html', context)



