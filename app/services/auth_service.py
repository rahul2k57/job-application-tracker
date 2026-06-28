from sqlalchemy.orm import Session
from sqlalchemy import select

from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserLogin
from app.models.user import User
from app.core.security import hash_password, verify_password,create_access_token

def register_user(db:Session,user_data : UserCreate):
    
    stmt = select(User).where(User.email == user_data.email)
    existing_user = db.scalars(stmt).first()
    
    if existing_user :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    stmt = select(User).where(User.username == user_data.username)
    existing_username = db.scalars(stmt).first()

    if existing_username :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = "Username already exists",
        )
    
    hashed_password = hash_password(user_data.password)

    user = User(
        username = user_data.username,
        full_name = user_data.full_name,
        email = user_data.email,
        hashed_password = hashed_password,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def login_user(db: Session, form_data: OAuth2PasswordRequestForm):

    stmt = select(User).where(User.email == form_data.username)
    existing_user = db.scalars(stmt).first()

    if existing_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        form_data.password,
        existing_user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {
            "sub": str(existing_user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }