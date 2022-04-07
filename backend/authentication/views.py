from django.contrib.auth import authenticate  # , login
from rest_framework import generics, mixins
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import UserSerializer

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
    serializer_class = UserSerializer

    def get_object(self):
        # TODO: is the queryset= line necessary?
        #   gut reaction says no since I'm doing a lower level call to get the User obj
        # queryset = self.filter_queryset(self.get_queryset())  # noqa: F841
        obj = authenticate(
            username=self.request.data["username"],
            password=self.request.data["password"],
        )
        return obj

    def post(self, request, *args, **kwargs):
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
