from django.db import models

class CareerPath(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Resource(models.Model):
    career_path = models.ForeignKey(CareerPath, related_name='resources', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField()
    type = models.CharField(max_length=50)  # e.g., 'video', 'course', 'article'
    rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
