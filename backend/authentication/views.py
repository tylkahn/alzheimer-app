from django.contrib.auth import authenticate, login, get_user, logout
from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import GetUserSerializer, CreateUserSerializer
from django.http import Http404

# Create your views here.

# Q: what's with this weird method decorator thing? well I'm so glad you asked :)
# first, go look up what CSRF (Cross-Site Request Forgery) is on wikipedia or something.
# done? ok let's begin
# This view is called by a POST form, and while I don't think any unsanitized data is
# being directly used, I obviously can't be 110% sure. So to help me sleep at night,
# whenever Django sees a view that renders a template with the `csrf_token` tag, it
# creates a cookie with a token to be used whenever an unsafe request is sent to the
# server. Then by including CsrfViewMiddleware in the MIDDLEWARE section of settings.py,
# Django will require that all views receive said token before doing anything with a
# request. This is great, except for the fact that this view doesn't render a template
# with the mentioned tag (actually it doesn't render a template at all). So Django may
# not set the cookie, and now all my infosec friends are laughing at me when they
# realize that they can steal all the info in my database with a CSRF attack. This
# decorator forces Django to set the cookie no matter what, so that CSRF attacks don't
# happen :)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetUser(mixins.RetrieveModelMixin, generics.GenericAPIView):
    """
    View to get an existing user (and any relevant info)

    I have to override get_object because the form that passes data to this view
    does not include the User object (because that's what we're looking for!)
    So in order to tell the view what object to fetch from the db, I first have to
    determine the object from a username and password, then if that object exists, I can
    return it and django rest framework will do some magic to slap it into the request,
    query the db, return an object, serialize it to json, and then return that to the
    frontend.
    """

    queryset = User.objects.all()
    serializer_class = GetUserSerializer

    def get_object(self):
        # TODO: is the queryset= line necessary?
        #   gut reaction says no since I'm doing a lower level call to get the User obj
        # queryset = self.filter_queryset(self.get_queryset())  # noqa: F841
        user = authenticate(
            username=self.request.data["id"],
            password=self.request.data["password"],
        )
        if user is None:
            # maybe id is not a username, but an email address
            try:
                user = User.objects.get(email__exact=self.request.data["id"])
            except User.DoesNotExist:
                print("requested user does not exist!")
                user = None
                # I could tell the frontend that this block only runs if the
                # username/email doesn't exist, but that's bad for security, so I won't
                raise Http404
            else:
                # id was an email and user was found, check provided password
                if user.check_password(self.request.data["password"]):
                    # attach User to request (and all future requests from the same
                    # User, until logout is called)
                    login(self.request, user)
                else:
                    user = None  # return anonymous user
                    raise Http404
        else:
            # id was a username and user was authenticated, so log them in
            login(self.request, user)
        return user

    def post(self, request, *args, **kwargs):
        print(vars(request.session))
        return self.retrieve(request, *args, **kwargs)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CreateUser(mixins.CreateModelMixin, generics.GenericAPIView):
    """
    View to create a new user
    """

    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        response = self.create(request, *args, **kwargs)
        # TODO: i assume i need to call login here to tie the user to the request?
        # as far as i know, the default create function doesn't do this
        try:
            user = User.objects.get(username__exact=request.data["username"])
        except User.DoesNotExist:
            raise RuntimeError(
                "newly created user object does not exist in the database!"
            )
        login(self.request, user)
        return response


class IsUserLoggedIn(APIView):
    """
    View to check if a user is tied to the request
    """

    def get(self, request, *args, **kwargs):
        userObj = get_user(request)
        if userObj.is_authenticated:
            return Response(
                data={"requestHasUser": True, "username": userObj.get_username()},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                data={"requestHasUser": False}, status=status.HTTP_401_UNAUTHORIZED
            )


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LogoutUser(APIView):
    """
    View to log the current user out
    """

    def post(self, request, *args, **kwargs):
        userObj = get_user(request)
        if userObj.is_authenticated:
            logout(request)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
