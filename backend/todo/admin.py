from django.contrib import admin
from .models import Reminder

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')
 
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('title', 'reminderType', 'date', 'repeating', 'description', 'completed')

class JournalAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')

# Register your models here.

# admin.site.register(Todo, TodoAdmin)
admin.site.register(Reminder, ReminderAdmin)
