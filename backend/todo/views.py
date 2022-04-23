# from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReminderSerializer, GameSerializer
from .models import Reminder, GameHistory

# from pprint import pprint

# Create your views here.

# class TodoView(viewsets.ModelViewSet):
#     serializer_class = TodoSerializer
#     queryset = Todo.objects.all()


class ReminderView(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    queryset = Reminder.objects.all()


class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = GameHistory.objects.all()
        # print("gameview get_queryset")
        # pprint(vars(self.request))
        # pprint(vars(self.request.session))
        # print(self.request.session)
        # pprint(self.request.user.username)
        if self.request.user.is_authenticated:
            query_set = queryset.filter(player=self.request.user)
        else:
            query_set = queryset
        return query_set
