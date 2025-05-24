from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

@api_view(['POST'])
def generate_career_path(request):
    try:
        career_goal = request.data.get('career_goal', '').lower()
        
        # Career paths database (simplified version)
        career_paths = {
            'data analyst': {
                'steps': [
                    {
                        'description': 'Master the Fundamentals',
                        'resources': [
                            {
                                'id': '1',
                                'title': 'SQL Fundamentals',
                                'url': 'https://www.w3schools.com/sql/',
                                'rating': 4.5
                            },
                            {
                                'id': '2',
                                'title': 'Statistics Basics',
                                'url': 'https://www.khanacademy.org/math/statistics-probability',
                                'rating': 4.8
                            }
                        ]
                    },
                    {
                        'description': 'Learn Python for Data Analysis',
                        'resources': [
                            {
                                'id': '3',
                                'title': 'Python for Data Science',
                                'url': 'https://www.coursera.org/learn/python-data-analysis',
                                'rating': 4.7
                            },
                            {
                                'id': '4',
                                'title': 'Pandas Tutorial',
                                'url': 'https://pandas.pydata.org/docs/getting_started/',
                                'rating': 4.6
                            }
                        ]
                    },
                    {
                        'description': 'Data Visualization',
                        'resources': [
                            {
                                'id': '5',
                                'title': 'Tableau Fundamentals',
                                'url': 'https://www.tableau.com/learn/training/20201',
                                'rating': 4.9
                            },
                            {
                                'id': '6',
                                'title': 'Power BI Essential Training',
                                'url': 'https://www.linkedin.com/learning/power-bi-essential-training',
                                'rating': 4.7
                            }
                        ]
                    }
                ]
            },
            'web developer': {
                'steps': [
                    {
                        'description': 'Learn HTML, CSS, and JavaScript',
                        'resources': [
                            {
                                'id': '7',
                                'title': 'MDN Web Docs',
                                'url': 'https://developer.mozilla.org/en-US/docs/Learn',
                                'rating': 4.9
                            },
                            {
                                'id': '8',
                                'title': 'freeCodeCamp Web Development',
                                'url': 'https://www.freecodecamp.org/learn/responsive-web-design/',
                                'rating': 4.8
                            }
                        ]
                    }
                ]
            }
        }
        
        if career_goal not in career_paths:
            return Response({
                'steps': [
                    {
                        'description': f'Career path for "{career_goal}" not found. Here are some general steps:',
                        'resources': [
                            {
                                'id': 'gen1',
                                'title': 'LinkedIn Learning',
                                'url': 'https://www.linkedin.com/learning',
                                'rating': 4.5
                            },
                            {
                                'id': 'gen2',
                                'title': 'Coursera',
                                'url': 'https://www.coursera.org',
                                'rating': 4.7
                            }
                        ]
                    }
                ]
            })
            
        return Response(career_paths[career_goal])
        
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def rate_resource(request):
    try:
        resource_id = request.data.get('resource_id')
        rating = request.data.get('rating')
        
        # In a real application, you would save this to a database
        return Response({'success': True, 'message': f'Rating {rating} saved for resource {resource_id}'})
        
    except Exception as e:
        return Response({'error': str(e)}, status=400)
