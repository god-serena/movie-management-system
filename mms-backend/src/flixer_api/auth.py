from ninja.security import HttpBearer
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from ninja.errors import HttpError
from datetime import datetime, timezone
from django.conf import settings
from django.contrib.auth.models import User


class FlexirAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            payload = decode_token(token)
            request.user_id = payload.get("user_id")
            user = User.objects.get(id=request.user_id)
            request.user = user
            return request
        except ExpiredSignatureError:
            raise HttpError(401, "Token has expired")
        except InvalidTokenError:
            raise HttpError(401, "Invalid token")
        except User.DoesNotExist:
            raise HttpError(404, "User not found")


def generate_access_token(data):
    return jwt.encode(
        {
            "user_id": data["user"].id,
            "exp": datetime.now(timezone.utc)
            + settings.JWT_SETTING["ACCESS_TOKEN_LIFETIME"],
            "iat": datetime.now(timezone.utc),
        },
        settings.SECRET_KEY,
        algorithm="HS256",
    )


def generate_refresh_token(data):
    return jwt.encode(
        {
            "user_id": data["user"].id,
            "exp": datetime.now(timezone.utc)
            + settings.JWT_SETTING["REFRESH_TOKEN_LIFETIME"],
            "iat": datetime.now(timezone.utc),
            "type": "refresh",
        },
        settings.SECRET_KEY,
        algorithm="HS256",
    )


def decode_token(token, verify_exp=True):
    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=["HS256"],
        options={"verify_exp": verify_exp},
    )