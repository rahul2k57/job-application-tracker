from typing import Annotated

from fastapi import APIRouter,Depends,status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import get_current_user
from app.models.user import User

from app.schemas.job_application import (
    JobApplicationCreate,
    JobApplicationResponse,
    JobApplicationUpdate,
    JobApplicationFilter,
    PaginationJobApplicationResponse
)
from app.schemas.history import StatusHistoryResponse
from app.services.job_application_service import (
    create_job_application,
    get_job_applications,
    get_job_application,
    update_job_application,
    delete_job_application,
    get_status_history
    )

router = APIRouter(
    prefix="/applications",
    tags=["Job Applications"],
)

@router.post(
    "",
    response_model=JobApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_application(
    application: JobApplicationCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return create_job_application(db,application,current_user)

@router.get(
    "",
    response_model=PaginationJobApplicationResponse,
)
def get_applications(
    filter: Annotated[JobApplicationFilter,Query()],
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User,Depends(get_current_user)],
):
    return get_job_applications(
        db,
        filter,
        current_user,
        )

@router.get(
    "/{application_id}",
    response_model=JobApplicationResponse,
)
def get_application(
    application_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User,Depends(get_current_user)],
):
    return get_job_application(
        db,
        application_id,
        current_user,
        )

@router.patch(
    "/{application_id}",
    response_model=JobApplicationResponse,
)
def update_application(
    application_id: int,
    update_data: JobApplicationUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User,Depends(get_current_user)],
):
    return update_job_application(
        db,
        application_id,
        update_data,
        current_user,
        )

@router.delete(
    "/{application_id}",
    response_model=JobApplicationResponse,
)
def delete_application(
    application_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User,Depends(get_current_user)],
):
    return delete_job_application(
        db,
        application_id,
        current_user,
        )

@router.get(
    "/{application_id}/history",
    response_model= list[StatusHistoryResponse]
)
def get_application_history(
    application_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return get_status_history(
        db,
        application_id,
        current_user,
    )

