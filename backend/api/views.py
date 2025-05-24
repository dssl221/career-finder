from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CareerPath, Resource
from .serializers import CareerPathSerializer, ResourceSerializer, CareerPathInputSerializer

# Career paths data (simulated database)
CAREER_PATHS = {
    "data analyst": {
        "title": "Data Analyst Career Path",
        "description": "Step-by-step guide to become a Data Analyst",
        "resources": [
            {
                "title": "SQL Fundamentals",
                "url": "https://www.w3schools.com/sql/",
                "description": "Learn SQL basics",
                "type": "course",
                "rating": 4.5,
                "rating_count": 100
            },
            {
                "title": "Python for Data Analysis",
                "url": "https://www.coursera.org/learn/python-data-analysis",
                "description": "Master Python for data analysis",
                "type": "course",
                "rating": 4.8,
                "rating_count": 200
            }
        ]
    },
    "software developer": {
        "title": "Software Developer Career Path",
        "description": "Complete roadmap to become a Software Developer",
        "resources": [
            {
                "title": "JavaScript Basics",
                "url": "https://javascript.info/",
                "description": "Learn JavaScript fundamentals",
                "type": "tutorial",
                "rating": 4.6,
                "rating_count": 150
            },
            {
                "title": "Git & GitHub",
                "url": "https://www.github.com/skills",
                "description": "Master version control",
                "type": "course",
                "rating": 4.7,
                "rating_count": 180
            }
        ]
    }
}

class CareerPathViewSet(viewsets.ModelViewSet):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer

@api_view(['POST'])
def generate_career_path(request):
    serializer = CareerPathInputSerializer(data=request.data)
    if serializer.is_valid():
        career_goal = serializer.validated_data['career_goal'].lower()
        
        if career_goal in CAREER_PATHS:
            career_data = CAREER_PATHS[career_goal]
            return Response(career_data)
        else:
            return Response(
                {"error": "Career path not found. Please try a different career goal."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def rate_resource(request, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
        rating = request.data.get('rating', 0)
        
        if 1 <= rating <= 5:
            resource.rating = ((resource.rating * resource.rating_count) + rating) / (resource.rating_count + 1)
            resource.rating_count += 1
            resource.save()
            
            serializer = ResourceSerializer(resource)
            return Response(serializer.data)
        else:
            return Response(
                {"error": "Rating must be between 1 and 5"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Resource.DoesNotExist:
        return Response(
            {"error": "Resource not found"},
            status=status.HTTP_404_NOT_FOUND
        )
