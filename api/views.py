from django.views.generic import ListView
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import viewsets
import random
from django.http import HttpResponse


class RaceHorseListAPI(viewsets.ModelViewSet):
    queryset = RaceHorse.objects.all()
    serializer_class = RaceHorseSerializer

    def perform_create(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        # return Response(serializer.data)


class RaceHorseList(ListView):
    model = RaceHorse
    template_name = 'horseRaceApp/apiTest.html'


class EventDataListAPI(viewsets.ModelViewSet):
    queryset = EventData.objects.all()
    serializer_class = EventDataSerializer

    def perform_create(self, serializer):
        serializer.save()


class EventDataList(ListView):
    model = EventData
    template_name = 'horseRaceApp/apiTest2.html'


@api_view(['GET'])
def rank(self):
    rank = RaceHorse.objects.values()
    return Response(data=rank)


# @api_view(['GET'])
# def random_horse_list(self, arr):
#     random_list = random.sample(list(RaceHorse.objects.values()), 2)
#     return Response(data=random_list)
# @api_view(['PATCH'])
# def win_count_plus(self, pk):
# win_count_plus = RaceHorse.objects.values(id=pk)
# serializer = RaceHorseSerializer(win_count_plus, many=True)
# print(serializer)
# print(serializer.data)
# return Response(serializer.data)
# win_count_plus = RaceHorse.objects.values(id=pk)
# return response(data=win_count_plus)

# def win_count_plus(request, pk):
#     racehorse = RaceHorse.objects.get(id=pk)
#     print(racehorse)
#     racehorse.win_count += 1
#     racehorse.save()
#     return redirect('/list/raceHorse/')

def update(request, pk):
    raceHorse = RaceHorse.objects.get(id=pk)
    raceHorse.race_count = raceHorse.race_count + 1
    raceHorse.save()

    return redirect('list:raceHorseList')


def updateWinner(request, pk):
    raceHorse = RaceHorse.objects.get(id=pk)
    raceHorse.win_count = raceHorse.win_count + 1
    # raceHorse.race_count = raceHorse.race_count + 1
    raceHorse.save()

    return redirect('list:raceHorseList')


def sessionTest(request):
    # request.session.flush()
    print('sessionflush ok!')
    raceHorse = random.sample(list(RaceHorse.objects.values()), 6)

    # raceHorse = list(RaceHorse.objects.values())
    request.session.modified = True
    request.session['sessionData'] = raceHorse

    print('from sessionTest!!')
    # print(raceHorse[0]['horse_name'])
    return redirect('main:pick_horse')


def mysessionTest(request):
    request.session.modified = True
    request.session['mysessionData'] = request.GET.get('context')

    return redirect('main:game_start')


def mysessionTestEnd(request):
    request.session.modified = True
    request.session['mysessionEndData'] = request.GET.get('context')

    return redirect('main:game_end')


def session(request):
    print(request.session.get('sessionData', False))
    return HttpResponse(request.session)