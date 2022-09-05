from django.contrib import admin
from .models import RaceHorse,EventData
# Register your models here.
class RaceHorseAdmin(admin.ModelAdmin):
    search_fields = ['RaceHorse']

admin.site.register(RaceHorse, RaceHorseAdmin)

class EventDataAdmin(admin.ModelAdmin):
    search_fields = ['EventData']

admin.site.register(EventData, EventDataAdmin)
