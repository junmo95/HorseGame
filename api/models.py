from random import random
from django.db import models

# Create your models here.
class RaceHorse(models.Model):
    horse_name = models.CharField(max_length=70) # 이름
    win_count = models.IntegerField()  # 우승 횟수
    race_count = models.IntegerField() # 경기수
    stat_str = models.IntegerField() # strength
    stat_end = models.IntegerField() # endurance
    stat_con = models.IntegerField() # concentration

    def __str__(self):
        return self.horse_name

class EventData(models.Model):
    event_name = models.CharField(max_length=70)
    event_num = models.IntegerField()

    def __str__(self):
        return self.event_name