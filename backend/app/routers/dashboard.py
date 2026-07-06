from typing import Annotated

from fastapi import APIRouter,Depends,status
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.job_application import JobApplicationResponse
from app.schemas.dashboard import DashboardSummaryResponse
from app.services.dashboard_service import get_dashboard_summary, get_recent_applications,get_upcoming_deadlines

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard Summary"],
)

@router.get(
    "",
    response_model=DashboardSummaryResponse,
    status_code=status.HTTP_200_OK,
)
def dashboard_summary(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return get_dashboard_summary(db,current_user)

@router.get(
    "/recent-applications",
    response_model=list[JobApplicationResponse],
)
def recent_applications(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return get_recent_applications(
        db,
        current_user,
    )

@router.get(
    "/recent-deadlines",
    response_model=list[JobApplicationResponse],
)
def recent_applications(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return get_upcoming_deadlines(
        db,
        current_user,
    )