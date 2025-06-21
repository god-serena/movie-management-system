from typing import List, Optional
from django.shortcuts import get_object_or_404
from ninja import (
    Router,
    Schema,
    File,
    Form
)
from ninja.errors import HttpError
from ninja.files import UploadedFile
from django.db import transaction
from movies.models import Movie

movies = Router()

class MovieResponseSchema(Schema):
    id: int
    title: str
    description: str
    video_file: str
    thumbnail: str

class MovieUpload(Schema):
    title: str
    description: str
    video_file: File[UploadedFile]
    thumbnail: File[UploadedFile]


@movies.get("", response=List[MovieResponseSchema])
def get_movie(request):
    user = request.user
    query_set = Movie.objects.filter(uploader=user).order_by("-date_added")
    return [
        MovieResponseSchema(
            id=movie.id,
            title=movie.title,
            description=movie.description,
            video_file=f'http://localhost:8000{movie.video_file.url}' if movie.video_file else "",
            thumbnail=f'http://localhost:8000{movie.thumbnail.url}' if movie.thumbnail else "",
        )
        for movie in query_set
    ]

@movies.post("")
def upload_movie(
    request,
    title: str= Form(...),
    description: str = Form(...),
    video_file: UploadedFile = File(...),
    thumbnail: UploadedFile = File(...),
):
    with transaction.atomic():
        if Movie.objects.filter(title=title).exists():
            raise HttpError(409, "Movie already exists")
        user = request.user
        Movie.objects.create(
            uploader=user,
            title=title,
            description=description,
            video_file=video_file,
            thumbnail=thumbnail
        )
        return 200

@movies.delete("{id}")
def delete_movie(request, id: int):
     with transaction.atomic():
        movie = get_object_or_404(Movie, id=id)
        movie.delete()
        return 200

@movies.put("{id}")
def update_movie(
    request,
    id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    video_file: Optional[UploadedFile] = File(None),
    thumbnail: Optional[UploadedFile] = File(None),
):
    data = {
        "title": title,
        "description": description,
        "video_file": video_file,
        "thumbnail": thumbnail
    }
    
    with transaction.atomic():
        movie = get_object_or_404(Movie, id=id)

        for key, item in data.items():
            if hasattr(movie, key) and item:
                setattr(movie, key, item)
        movie.save()

        return 200

        
        