from tkinter import CASCADE
from django.db import models
from django.conf import settings
from datetime import datetime    

# Create your models here.


class BasicReminderInfo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(default="")
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True

class GameHistory (models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, null=True)
    score = models.PositiveIntegerField()
    date = models.DateTimeField(default=datetime.now, blank=True)

class Reminder(BasicReminderInfo):
    REMINDERTYPES = (("M", "Medicine"), ("A", "Appointment"), ("O", "Other"))
    REPEATINGTYPES = (("D", "Daily"), ("W", "Weekly"), ("O", "Other"))
    reminderType = models.CharField(max_length=1, choices=REMINDERTYPES)
    repeating = models.CharField(max_length=1, choices=REPEATINGTYPES)
    date = models.DateTimeField()
