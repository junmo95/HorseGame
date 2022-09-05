from rest_framework.urlpatterns import  format_suffix_patterns
from django.urls import path,include
from . import views
from .views import RaceHorseListAPI,EventDataListAPI


app_name = 'api'

raceHorse_list = RaceHorseListAPI.as_view({
    'post':'create',
    'get':'list'
})

eventData_list = EventDataListAPI.as_view({
    'post':'create',
    'get':'list'
})

raceHorse_detail = RaceHorseListAPI.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

eventData_detail = EventDataListAPI.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})


urlpatterns = format_suffix_patterns([
    # path('auth/',include('rest_framework.urls', namespace='rest_framework')),
    path('raceHorse/', raceHorse_list , name='raceHorse_list'),
    path('eventData/', eventData_list , name='eventData_list'),
    path('raceHorse/<int:pk>/', raceHorse_detail, name='raceHorse_detail'),
    path('eventData/<int:pk>/', eventData_detail, name='eventData_detail'),
    path('rank/', views.rank),
    # path('plus/<int:pk>/', views.win_count_plus),
    path('update/<int:pk>/', views.update, name='update'),
    path('sessionTest/', views.sessionTest, name='sessionTest'),
])