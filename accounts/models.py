from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    cash = models.IntegerField(blank=True, default=200)