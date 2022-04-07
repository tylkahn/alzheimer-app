from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Reminder (Todo):
    REMINDERTYPES = (('M', 'Medicine'), ('A', 'Appointment'), ('O', 'Other'))
    REPEATINGTYPES = (('D', 'Daily'), ('W', 'Weekly'), ('O', 'Other'))
    reminderType = models.CharField(max_length=1, choices=REMINDERTYPES)
    repeating = models.CharField(max_length=1, choices=REPEATINGTYPES)
    date = models.DateTimeField()

class JournalEntries (Todo):
    entry_id = models.IntegerField()

