from django.urls import path
from .views import generate_career_path, rate_resource

urlpatterns = [
    path('generate-path/', generate_career_path, name='generate-path'),
    path('rate-resource/', rate_resource, name='rate-resource'),
]
