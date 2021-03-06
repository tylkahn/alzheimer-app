"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views as todoViews
from authentication import views as authViews

router = routers.DefaultRouter()
router.register(r"game", todoViews.GameView, "game")
router.register(r"journalentries", todoViews.JournalView, "journalentry")
router.register(r"reminders", todoViews.ReminderView, "reminder")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", authViews.GetUser.as_view()),
    path("logout/", authViews.LogoutUser.as_view()),
    path("signup/", authViews.CreateUser.as_view()),
    path("get-current-user/", authViews.IsUserLoggedIn.as_view()),
    path("api/", include(router.urls)),
]
