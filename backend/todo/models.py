from django.db import models

# Create your models here.


class BasicReminderInfo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True


class Reminder(BasicReminderInfo):
    REMINDERTYPES = (("M", "Medicine"), ("A", "Appointment"), ("O", "Other"))
    REPEATINGTYPES = (("D", "Daily"), ("W", "Weekly"), ("O", "Other"))
    reminderType = models.CharField(max_length=1, choices=REMINDERTYPES)
    repeating = models.CharField(max_length=1, choices=REPEATINGTYPES)
    date = models.DateTimeField()
