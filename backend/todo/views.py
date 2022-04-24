from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import status
from rest_framework import viewsets
from .models import JournalEntries, Reminder, GameHistory
from .serializers import JournalSerializer, ReminderSerializer, GameSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
# from django.shortcuts import render


# Create your views here.
class JournalView(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    queryset = JournalEntries.objects.all()


@api_view(["GET", "POST"])
def journal_entries_list(request):
    if request.method == "GET":
        data = JournalEntries.objects.all()

        serializer = JournalSerializer(data, context={"request": request}, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReminderView(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    queryset = Reminder.objects.all()

@method_decorator(ensure_csrf_cookie, name="dispatch")
class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = GameHistory.objects.all()
        if self.request.user.is_authenticated:
            query_set = queryset.filter(player=self.request.user)
        else:
            query_set = queryset
        return query_set
    
    def perform_create(self, serializer):
        serializer.save(player=self.request.user)