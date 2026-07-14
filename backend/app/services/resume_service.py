from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from fastapi import UploadFile, HTTPException, status
from app.models.job_application import JobApplication

import uuid
from app.services.s3_service import upload_file,delete_file,generate_presigned_url
from app.exceptions.s3_exceptions import S3UploadError,S3DeleteError,S3DownloadError

MAX_FILE_SIZE = 5 * 1024 * 1024


def upload_resume(
        db:Session,
        application_id:int,
        current_user:User,
        file: UploadFile,
):
    stmt = select(JobApplication).where(
    JobApplication.id == application_id,
    JobApplication.user_id == current_user.id,
    )
    application = db.scalars(stmt).first()

    if not application:
        raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Job Application Not Found!",
    )

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
    

    object_key = (
        f"resumes/{application.id}/{uuid.uuid4()}.pdf"
    )
    old_resume = application.resume_url
    try:
        
        upload_file(
            file_contents=file_contents,
            object_key=object_key,
            )
        if old_resume:
            delete_file(old_resume)
        application.resume_url = object_key
    
    except (S3UploadError, S3DeleteError):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload resume."
        )

    db.commit()
    db.refresh(application)

    return {
        "message": "Resume Uploaded Successfully",
        "resume_url": application.resume_url,
    }


def get_resume(
        db:Session,
        application_id:int,
        current_user: User,
):
    stmt = select(JobApplication).where(
    JobApplication.id == application_id,
    JobApplication.user_id == current_user.id,
)
    application = db.scalars(stmt).first()

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job Application Not Found!",
        )

    if not application.resume_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Resume Found!",
        )
    
    try:
        download_url = generate_presigned_url(application.resume_url)
        return {
            "download_url":download_url
        }
    except S3DownloadError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to generate download link."
        )

    