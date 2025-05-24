from django.contrib import admin
from .models import CareerPath, Resource

@admin.register(CareerPath)
class CareerPathAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'career_path', 'type', 'rating')
    list_filter = ('type', 'career_path')
    search_fields = ('title', 'description')
