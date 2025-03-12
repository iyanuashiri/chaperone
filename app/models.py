from sqlmodel import Field, SQLModel 
from pydantic import EmailStr, HttpUrl

from .security import generate_hashed_password


class UserBase(SQLModel):
    first_name: str
    last_name: str
    email: EmailStr = Field(max_length=255, index=True, unique=True)
    

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str  
    is_acive: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    
    def set_password(self, raw_password):
        self.hashed_password = generate_hashed_password(raw_password=raw_password)
        self.save()

class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: int
    