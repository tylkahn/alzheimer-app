from rest_framework import serializers
from .models import GameHistory, Reminder

# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ('id', 'title', 'description', 'completed')


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = (
            "id",
            "title",
            "reminderType",
            "date",
            "repeating",
            "description",
            "completed",
        )

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameHistory
        fields = ('id', 'player', 'score', 'date')
