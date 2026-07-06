from sqlalchemy import case, func, select
from sqlalchemy.orm import Session

from app.enum import ApplicationStatus
from app.models import JobApplication, User
from app.schemas.dashboard import DashboardSummaryResponse
from datetime import date

def status_count(status: ApplicationStatus):
        return func.coalesce(
        func.sum(
                case(
                (JobApplication.status == status, 1),
                else_=0,
                )
        ),
        0,
        )


def get_dashboard_summary(
        db: Session,
        current_user: User,
):
        stmt = (
        select(
                func.count().label("total_applications"),
                status_count(ApplicationStatus.APPLIED).label("applied"),
                status_count(ApplicationStatus.INTERVIEW).label("interview"),
                status_count(ApplicationStatus.OFFER).label("offer"),
                status_count(ApplicationStatus.REJECTED).label("rejected"),
                status_count(ApplicationStatus.WITHDRAWN).label("withdrawn"),
        )
        .select_from(JobApplication)
        .where(JobApplication.user_id == current_user.id)
        )

        result = db.execute(stmt).one()

        return DashboardSummaryResponse(
        total_applications=result.total_applications,
        applied=result.applied,
        interview=result.interview,
        offer=result.offer,
        rejected=result.rejected,
        withdrawn=result.withdrawn,
        )

def get_recent_applications(
                db: Session,
                current_user: User,
):
        RECENT_APPLICATION_LIMIT = 5

        stmt = (
        select(JobApplication)
        .where(JobApplication.user_id == current_user.id)
        .order_by(JobApplication.applied_date.desc())
        .limit(RECENT_APPLICATION_LIMIT)
        )
        applications = db.scalars(stmt).all()

        return applications

def get_upcoming_deadlines(
                db: Session,
                current_user: User,
):
        today = date.today()
        UPCOMING_APPLICATION_LIMIT = 5
        stmt = (
        select(JobApplication)
        .where(
                JobApplication.user_id == current_user.id,
                JobApplication.deadline >= today,
                JobApplication.deadline.is_not(None))
                .order_by(JobApplication.deadline.desc())
                .limit(UPCOMING_APPLICATION_LIMIT)
        )
        applications = db.scalars(stmt).all()
        return applications