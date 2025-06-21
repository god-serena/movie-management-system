from ninja import (
    Router,
    Schema
)
from django.contrib.auth.models import User

user = Router()

class UserSchema(Schema):
    id: int
    email: str
    first_name: str
    last_name: str

@user.get("/me", response=UserSchema)
def get_user(request):
    return request.user 