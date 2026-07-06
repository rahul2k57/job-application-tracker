from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

class UserBase(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    full_name: str = Field(min_length=1, max_length=100)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=50)

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=50)

class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )