from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.token import Token
from app.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.services.auth_service import register_user, login_user
from app.core.security import get_current_user
from app.models.user import User
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Annotated[Session, Depends(get_db)],
):
    return register_user(db, user)

@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
)
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    return login_user(db,form_data)

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: Annotated[
        User,
        Depends(get_current_user),
    ],
):
    return current_user