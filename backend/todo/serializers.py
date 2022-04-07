from rest_framework import serializers
from .models import Reminder
from .models import JournalEntries

# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ('id', 'title', 'description', 'completed')

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ('id', 'title', 'reminderType', 'date', 'repeating', 'description', 'completed')

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntries
        fields = ('id', 'title', 'description')