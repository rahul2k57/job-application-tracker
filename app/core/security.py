from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.core.config import SECRET_KEY, ALGORITHM
from app.database import get_db
from app.models.user import User

from app.core.config import( 
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    )

from datetime import datetime,timedelta,UTC


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto")

def hash_password(password:str) -> str :
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str) ->bool :
    return pwd_context.verify(
        plain_password,
        hashed_password,
        )

def create_access_token(
        data:dict,
):
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode["exp"] = expire

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return encoded_jwt


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)
def get_current_user(
        token : Annotated[str, Depends(oauth2_scheme)],
        db : Annotated[str, Depends(get_db)]
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Couldnot validate credentials",
        headers={"WWW-Authenticate":"Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
    
        user_id = payload.get("sub")
        if user_id is None :
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    stmt = select(User).where(User.id == int(user_id))
    user = db.scalars(stmt).first()

    if user is None :
        raise credentials_exception
    
    return user
    


