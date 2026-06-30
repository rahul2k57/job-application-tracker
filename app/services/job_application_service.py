from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime,UTC

from fastapi import HTTPException, status
from app.models.user import User
from app.models.job_application import JobApplication
from app.schemas.job_application import JobApplicationCreate, JobApplicationUpdate


def create_job_application(
    db: Session,
    application_data: JobApplicationCreate,
    current_user: User,

):
    stmt = select(JobApplication).where(
        JobApplication.user_id == current_user.id,
        JobApplication.company == application_data.company,
        JobApplication.role == application_data.role,
)

    existing_application = db.scalars(stmt).first()
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already added this application.",
        )
    
    job_application = JobApplication(
    company=application_data.company,
    role=application_data.role,
    job_link=application_data.job_link,
    status=application_data.status,
    notes=application_data.notes,
    applied_date=(
        application_data.applied_date
        if application_data.applied_date
        else datetime.now(UTC)
    ),
    user_id=current_user.id,
    )
    db.add(job_application)
    db.commit()
    db.refresh(job_application)

    return job_application


def get_job_applications(
    db: Session,
    current_user: User,
):
    stmt = select(JobApplication).where(JobApplication.user_id == current_user.id)
    applications = db.scalars(stmt).all()
    
    return applications


def get_job_application(
        db:Session,
        application_id:int,
        current_user: User,
):
    stmt = select(JobApplication).where(
        JobApplication.id == application_id, 
        JobApplication.user_id == current_user.id,
    )
    application = db.scalars(stmt).first()

    if application is None :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application Not found!"
        )
    return application


def update_job_application(
    db:Session,
    application_id: int,
    update_data: JobApplicationUpdate,
    current_user: User,
):
    stmt = select(JobApplication).where(
        JobApplication.id == application_id,
        JobApplication.user_id == current_user.id,
    )

    application = db.scalars(stmt).first()

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application Not found!"
        )
    
    updated_fields = update_data.model_dump(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Field is provided for update",
        )

    for field,value in updated_fields.items():
        setattr(application,field,value)

    if (
    "company" in updated_fields
    or
    "role" in updated_fields
    ):
        duplicate_stmt = select(JobApplication).where(
            JobApplication.user_id == current_user.id,
            JobApplication.company == application.company,
            JobApplication.role == application.role,
            JobApplication.id != application_id,
        )

        duplicate_application = db.scalars(
            duplicate_stmt
        ).first()

        if duplicate_application:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You already have an application with this company and role",
            )
    db.commit()
    db.refresh(application)

    return application


def delete_job_application(
    db: Session,
    application_id: int,
    current_user: User,
):
    stmt = select(JobApplication).where(
        JobApplication.id == application_id,
        JobApplication.user_id == current_user.id,
    )
    application = db.scalars(stmt).first()

    if not application :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application Not Found !",
        )
    
    db.delete(application)
    db.commit()

    return application