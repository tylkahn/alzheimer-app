from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReminderSerializer, GameSerializer
from .models import Reminder, GameHistory

# Create your views here.

# class TodoView(viewsets.ModelViewSet):
#     serializer_class = TodoSerializer
#     queryset = Todo.objects.all()

class ReminderView(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    queryset = Reminder.objects.all()

class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = GameHistory.objects.all()
    def get_queryset(self):
        queryset = self.queryset
        if self.request.user.is_authenticated:
            query_set = queryset.filter(player=self.request.user)
        else:
            query_set = queryset
        return query_set