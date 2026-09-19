from django.urls import path
from .views import prediction_history


urlpatterns = [
    path('', prediction_history, name='prediction_history'),
]