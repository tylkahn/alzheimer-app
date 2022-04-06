from tkinter import CASCADE
from django.db import models
from django.conf import settings

# Create your models here.

class Reminder (models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(default="")
    completed = models.BooleanField(default=False)
    REMINDERTYPES = (('M', 'Medicine'), ('A', 'Appointment'), ('O', 'Other'))
    REPEATINGTYPES = (('D', 'Daily'), ('W', 'Weekly'), ('O', 'Other'))
    reminderType = models.CharField(max_length=1, choices=REMINDERTYPES)
    repeating = models.CharField(max_length=1, choices=REPEATINGTYPES)
    date = models.DateTimeField()

    def _str_(self):
        return self.title

class GameHistory (models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    time = models.DateTimeField()