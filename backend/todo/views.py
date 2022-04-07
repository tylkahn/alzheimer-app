from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import Reminder
from .models import JournalEntries


# Create your views here.

class ReminderView(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    queryset = Reminder.objects.all()

class JournalView(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    queryset = JournalEntries.objects.all()

@api_view(['GET', 'POST'])
def journal_entries_list(request):
    if request.method == 'GET':
        data = JournalEntries.objects.all()

        serializer = JournalSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
