from rest_framework import serializers
from .models import CareerPath, Resource

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'description', 'type', 'rating', 'rating_count']

class CareerPathSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)
    
    class Meta:
        model = CareerPath
        fields = ['id', 'title', 'description', 'created_at', 'resources']

class CareerPathInputSerializer(serializers.Serializer):
    career_goal = serializers.CharField(max_length=100)
