from typing import Annotated
from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, UploadFile, File
from app.database import get_db
from app.models.user import User
from app.core.security import get_current_user
from app.services.resume_service import upload_resume, get_resume
router = APIRouter(
    prefix=["/resume"],
    tags=["Resume Upload"]
)

@router.post("")
def resume_upload(
    db:Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    file: Annotated[UploadFile,File(...)]
):
    return upload_resume(db,current_user,file)

@router.get("")
def download_resume(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return get_resume(
        db,
        current_user,
    )