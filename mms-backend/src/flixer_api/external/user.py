from ninja import (
    Router,
    Schema)
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction
from django.core.exceptions import PermissionDenied
from typing import Optional

from flixer_api.auth import generate_refresh_token, generate_access_token

external = Router()

class UserSchema(Schema):
    id: int
    email: str
    first_name: str
    last_name: str
    
class UserSignInForm(Schema):
    email: str
    username: Optional[str] = None
    password: str

class UserCreate(Schema):
    first_name: str
    email: str
    last_name: str
    password: str

@external.post("/sign-in", response={404: str, 200: dict})
def sign_in_user(request, payload: UserSignInForm):
    data = payload.dict()
    try:
        user = User.objects.get(email__iexact=data["email"])
        auth_user = authenticate(username=user.username, password=data["password"])
    
        if auth_user is None:
            raise User.DoesNotExist

        return 200, {
            "user": UserSchema.from_orm(user),
            "tokens": {
                "access_token": generate_access_token(data={"user": user}),
                "refresh_token": generate_refresh_token(data={"user": user}),
            },
        }
    except User.DoesNotExist:
        return 404, "User not found."

@external.post("/sign-up")
def sign_up_user(request, payload: UserCreate):
    data = payload.dict()
    with transaction.atomic():
        new_user = User.objects.create_user(
            **data, username=f"{data['first_name']} {data['last_name']}"
        )
        return 200, {
            "user": UserSchema.from_orm(new_user),
            "tokens": {
                "access_token": generate_access_token(data={"user": new_user}),
                "refresh_token": generate_refresh_token(data={"user": new_user}),
            },
        }

@external.post("/sign-out")
def sign_up_user(request):
        return 200

@external.post("/refresh-access-token")
def refresh_token(request):
    pass
        


