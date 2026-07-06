from sqlalchemy.orm import Session
from app.models.user import User
from fastapi import UploadFile, HTTPException, status
from fastapi.responses import FileResponse
import os
MAX_FILE_SIZE = 5 * 1024 * 1024
UPLOAD_DIR = "uploads/resumes"

def upload_resume(
        db:Session,
        current_user:User,
        file: UploadFile,
):
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file is selected"
        )
    
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only Pdf's are allowed to upload"
        )
    
    file_contents = file.file.read()
    file_size = len(file_contents)


    if file_size > MAX_FILE_SIZE :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File Size should not exceed 5MB"
        )
    

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True,
    )
    file_name = f"user_{current_user.id}_resume.pdf"

    file_path = os.path.join(UPLOAD_DIR,file_name,)

    with open(file_path,"wb") as resume:
        resume.write(file_contents)
    
    current_user.resume_url = os.path.join(UPLOAD_DIR,file_name,)
    db.commit()
    db.refresh(current_user)

    return {
        "message": "Resume Uploaded Successfully",
        "resume_url": current_user.resume_url,
    }


def get_resume(
        db:Session,
        current_user: User,
):
    if not current_user.resume_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Resume Found!",
        )
    
    if not os.path.exists(current_user.resume_url):
        raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Resume file not found."
    )

    return FileResponse(
    path=current_user.resume_url,
    filename=f"user_{current_user.id}_resume.pdf",
    media_type="application/pdf",
)