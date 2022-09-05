from django.urls import path
from django.contrib import admin
from django.urls import path, include
from . import views
from api import views as viewsAPI
app_name = 'main'

urlpatterns = [
    path('', views.main, name='main'),
    path('main/', views.main),
    # path('pick_horse/', views.pick_horse),
    path('pick_horse/', views.pick_horse, name='pick_horse'),
    path('pick_horse_session/', viewsAPI.sessionTest, name='pick_horse_session'),
    path('game_session/', viewsAPI.mysessionTest, name='game_session'),
    path('game_end_session/', viewsAPI.mysessionTestEnd, name='game_end_session'),
    path('game_start/', views.game_start, name='game_start'),
    path('game_end/', views.game_end, name='game_end'),
]