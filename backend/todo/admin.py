from django.contrib import admin
from .models import GameHistory, Reminder
from datetime import datetime

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')


class ReminderAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "reminderType",
        "date",
        "repeating",
        "description",
        "completed",
    )


class GameAdmin(admin.ModelAdmin):
    list_display = ('player', 'score', 'date')
    def save_model(self, request, obj, form, change):
        obj.player = request.user
        super().save_model(request, obj, form, change)

# Register your models here.

# admin.site.register(Todo, TodoAdmin)
admin.site.register(Reminder, ReminderAdmin)
admin.site.register(GameHistory, GameAdmin)
