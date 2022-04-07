from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            # TODO: add additional fields here depending on what
            #   data from django's User object should be returned to frontend
            # "password",
        ]
