from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView, TarefasCreateVIew, TarefasGetView

urlpatterns = [
    path('user/login/', LoginView.as_view()),
    path('user/register/', RegisterView.as_view()),
    path('tarefas/create/', TarefasCreateVIew.as_view()),
    path('tarefas/get/', TarefasGetView.as_view())
]