# Generated by Django 4.0.3 on 2022-04-06 19:28

from django.db import migrations

def create_data(apps, schema_editor):
    JournalEntry = apps.get_model('todo', 'JournalEntry')
    JournalEntry(entry_id=0, title="The starting db title", description="The starting db description").save()

class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_journalentry_todo_remove_reminder_completed_and_more'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
