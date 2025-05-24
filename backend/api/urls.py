from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CareerPathViewSet, generate_career_path, rate_resource

router = DefaultRouter()
router.register(r'career-paths', CareerPathViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate-path/', generate_career_path, name='generate-career-path'),
    path('rate-resource/<int:resource_id>/', rate_resource, name='rate-resource'),
]
