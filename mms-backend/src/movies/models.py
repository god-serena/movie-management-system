from django.db import models
from django.contrib.auth.models import User



class Movie(models.Model):
    uploader = models.ForeignKey(
        User,
        related_name="movies",
        on_delete=models.CASCADE
    )
    title = models.CharField(
        max_length=50
    )
    description = models.TextField(
        max_length=200,
        blank=True,
        null=True
    )
    date_added = models.DateTimeField(
        auto_now_add=True
    )
    date_updated = models.DateTimeField(
        auto_now=True
    )
    video_file = models.FileField(upload_to="movies/videos/")
    thumbnail = models.FileField(upload_to="movies/thumbnail/")
