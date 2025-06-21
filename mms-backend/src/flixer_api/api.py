
from ninja import NinjaAPI
from .auth import FlexirAuth
from .external.user import external
from .internal.movies import movies
from .internal.user import user

flixer_api= NinjaAPI()

flixer_api.add_router("", external)
flixer_api.add_router("movies", movies, auth=FlexirAuth())
flixer_api.add_router("user", user, auth=FlexirAuth())