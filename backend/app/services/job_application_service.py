from sqlalchemy.orm import Session
from sqlalchemy import select, or_, func
from datetime import datetime,UTC
import math

from fastapi import HTTPException, status
from app.models.user import User
from app.models.job_application import JobApplication
from app.models.status_history import StatusHistory
from app.schemas.job_application import JobApplicationCreate, JobApplicationUpdate, JobApplicationFilter

from app.enum import SortOrder

from app.services.s3_service import delete_file
from app.exceptions.s3_exceptions import S3DeleteError

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
    applied_date=datetime.now(UTC),
    user_id=current_user.id,
    )
    db.add(job_application)
    db.commit()
    db.refresh(job_application)

    return job_application


def get_job_applications(
    db: Session,
    application_filter: JobApplicationFilter,
    current_user: User,
):
    stmt = select(JobApplication).where(JobApplication.user_id == current_user.id)

    if application_filter.status:
        stmt = stmt.where(JobApplication.status == application_filter.status)

    if application_filter.company:
        stmt = stmt.where(JobApplication.company.ilike(f"%{application_filter.company}%"))

    if application_filter.role:
        stmt = stmt.where(JobApplication.role.ilike(f"%{application_filter.role}%"))
    

    if application_filter.search:
        stmt = stmt.where(
            or_(
                JobApplication.company.ilike(f"%{application_filter.search}%"),
                JobApplication.role.ilike(f"%{application_filter.search}%"),
            )
        )

    count_stmt = select(func.count()).select_from(
        stmt.subquery()
    )
    total = db.scalar(count_stmt)
    
    total_pages = math.ceil(
        total/application_filter.limit
    )


    if application_filter.sort_by:
        column = getattr(JobApplication,application_filter.sort_by.value)
        if application_filter.sort_order == SortOrder.DESC:
            stmt = stmt.order_by(column.desc())
        else:
            stmt = stmt.order_by(column.asc())
    else:
        stmt = stmt.order_by(JobApplication.applied_date.desc())

    offset = (application_filter.page - 1)* application_filter.limit
    stmt = stmt.offset(offset)
    stmt = stmt.limit(application_filter.limit)

    applications = db.scalars(stmt).all()
    
    return {
        "items": applications,
        "page": application_filter.page,
        "limit": application_filter.limit,
        "total": total,
        "total_pages": total_pages
    }


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
    
    old_status = application.status

    updated_fields = update_data.model_dump(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Field is provided for update",
        )

    for field,value in updated_fields.items():
        setattr(application,field,value)

    if old_status != application.status:
        history = StatusHistory(
        application_id = application.id,
        old_status = old_status,
        new_status = application.status,
        )
        db.add(history)

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

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application Not Found!",
        )

    try:
        if application.resume_url:
            delete_file(application.resume_url)

        db.delete(application)
        db.commit()

    except S3DeleteError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete resume from cloud storage.",
        )

    return application


def get_status_history(
    db: Session,
    application_id: int,
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
            detail="Job Application Not Found!"
        )
    
    history_stmt = (select(StatusHistory).where(
        StatusHistory.application_id == application.id
    ).order_by(
    StatusHistory.changed_at
)
    )

    history = db.scalars(history_stmt).all()

    return history

