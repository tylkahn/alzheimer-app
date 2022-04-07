# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
from django.contrib.auth import authenticate  # , login
from rest_framework import generics, mixins
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import UserSerializer

# for debugging
from pprint import pprint

# Create your views here.


# @method_decorator(ensure_csrf_cookie, name="dispatch")
# class UserViewSet(
#     mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
# ):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetUser(mixins.RetrieveModelMixin, generics.GenericAPIView):
    """
    View to get an existing user (and any relevant info)

    idea to get this to work:
    call authenticate with request.data.username and request.data.password
    if a user is returned, deserialize it (turn it into json)
        and somehow pass it to self.retrieve
            Either that or just pass user.id to self.retrieve
                (as a named argument 'pk' perhaps?)
    if None is returned, throw an error somehow
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    # lookup_field = "username"

    def get_object(self):
        # TODO: is this next line necessary?
        queryset = self.filter_queryset(self.get_queryset())  # noqa: F841
        obj = authenticate(
            username=self.request.data["username"],
            password=self.request.data["password"],
        )
        return obj

    def post(self, request, *args, **kwargs):
        # def post(self, request, format=None):
        print("GetUser post")
        print(self)
        print("request")
        pprint(vars(request))
        print("request.data")
        pprint(vars(request.data))
        print(str(request.data))
        print(request.data["username"])
        # user = authenticate(
        #     username=request.data["username"], password=request.data["password"]
        # )
        # print("user after authenticate call: ", dir(user))
        # print(user.id)
        # print(args)
        # print(kwargs)
        # kwargs["pk"] = user.id
        return self.retrieve(request, *args, **kwargs)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CreateUser(mixins.CreateModelMixin, generics.GenericAPIView):
    """
    View to create a new user
    """

    def post(self, request, *args, **kwargs):
        print("CreateUser post")
        print(self)
        print(request)
        print(args)
        print(kwargs)
        return self.create(request, *args, **kwargs)
