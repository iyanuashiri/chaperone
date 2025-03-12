from typing import Union, Annotated
from typing_extensions import Doc

from fastapi.param_functions import Form


from fastapi.security import OAuth2PasswordRequestForm 

from passlib.context import CryptContext
from fastapi_login import LoginManager
from decouple import config
from passlib.hash import pbkdf2_sha256


SECRET = config("SECRET_KEY") 
manager = LoginManager(SECRET, "/login")
pwd_context = CryptContext(schemes=["bcrypt"])


def generate_hashed_password(raw_password: str) -> str:
    hashed_password = pbkdf2_sha256.hash(raw_password)
    return hashed_password


def verify_hashed_password(raw_password: str, hashed_password: str) -> bool:
    return pbkdf2_sha256.verify(secret=raw_password, hash=hashed_password)


class OAuth2PasswordNewRequestForm(OAuth2PasswordRequestForm):
    def __init__(self,
                 *,
                 grant_type: Annotated[
                     Union[str, None],
                     Form(pattern="password"),
                     Doc(
                         """
                         The OAuth2 spec says it is required and MUST be the fixed string
                         "password". Nevertheless, this dependency class is permissive and
                         allows not passing it. If you want to enforce it, use instead the
                         `OAuth2PasswordRequestFormStrict` dependency.
                         """
                     ),
                 ] = None,
                 email: Annotated[
                     str,
                     Form(),
                     Doc(
                         """
                         `email` string. The OAuth2 spec requires the exact field name
                         `email`.
                         """
                     ),
                 ],
                 password: Annotated[
                     str,
                     Form(),
                     Doc(
                         """
                         `password` string. The OAuth2 spec requires the exact field name
                         `password".
                         """
                     ),
                 ],
                 scope: Annotated[
                     str,
                     Form(),
                     Doc(
                         """
                         A single string with actually several scopes separated by spaces. Each
                         scope is also a string.
     
                         For example, a single string with:
     
                         ```python
                         "items:read items:write users:read profile openid"
                         ````
     
                         would represent the scopes:
     
                         * `items:read`
                         * `items:write`
                         * `users:read`
                         * `profile`
                         * `openid`
                         """
                     ),
                 ] = "",
                 client_id: Annotated[
                     Union[str, None],
                     Form(),
                     Doc(
                         """
                         If there's a `client_id`, it can be sent as part of the form fields.
                         But the OAuth2 specification recommends sending the `client_id` and
                         `client_secret` (if any) using HTTP Basic auth.
                         """
                     ),
                 ] = None,
                 client_secret: Annotated[
                     Union[str, None],
                     Form(),
                     Doc(
                         """
                         If there's a `client_password` (and a `client_id`), they can be sent
                         as part of the form fields. But the OAuth2 specification recommends
                         sending the `client_id` and `client_secret` (if any) using HTTP Basic
                         auth.
                         """
                     ),
                 ] = None,
                 ):
        self.grant_type = grant_type
        self.email = email
        self.password = password
        self.scopes = scope.split()
        self.client_id = client_id
        self.client_secret = client_secret