#product/serializers.py
from rest_framework import serializers
from .models import *

class RaceHorseSerializer(serializers.ModelSerializer) :
    class Meta :
        model = RaceHorse        # RaceHorse 모델 사용
        fields = '__all__'          # 모든 필드 포함


class EventDataSerializer(serializers.ModelSerializer) :
    class Meta :
        model = EventData        # EventData 모델 사용
        fields = '__all__'          # 모든 필드 포함
