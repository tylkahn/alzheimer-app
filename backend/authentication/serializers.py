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

    def create(self, validated_data):
        # i have to override this because the standard create function does not handle
        # passwords even remotely close to how a sane person would assume it should
        # thanks django rest framework, very cool :/
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_email(self, value):
        try:
            User.objects.get(email__exact=value)
        except User.DoesNotExist:
            # email does not exist (this is a good thing!)
            return value
        # if a user is returned, the email already exists, which is bad given
        # that we are trying to create a new account
        raise serializers.ValidationError("a User with this email already exists!")
