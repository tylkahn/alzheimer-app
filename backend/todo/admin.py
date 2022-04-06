from django.contrib import admin
from .models import GameHistory, Reminder

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')
 
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('title', 'reminderType', 'date', 'repeating', 'description', 'completed')

class GameAdmin(admin.ModelAdmin):
    list_display = ('player', 'score', 'time')

# Register your models here.

# admin.site.register(Todo, TodoAdmin)
admin.site.register(Reminder, ReminderAdmin)
admin.site.register(GameHistory, GameAdmin)
