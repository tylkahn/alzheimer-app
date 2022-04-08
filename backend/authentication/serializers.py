from rest_framework import serializers
from django.contrib.auth.models import User


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            # TODO: add additional fields here depending on what
            #   data from django's User object should be returned to frontend
            # "password",
        ]


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]

    def validate_email(self, value):
        try:
            User.objects.get(email__exact=value)
        except User.DoesNotExist:
            # email does not exist (this is a good thing!)
            return value
        # if a user is returned, the email already exists, which is bad given
        # that we are trying to create a new account
        raise serializers.ValidationError("a User with this email already exists!")
