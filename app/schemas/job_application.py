from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.enum import ApplicationStatus

class JobApplicationBase(BaseModel):

    company: str = Field(
        min_length=1,
        max_length=100,
    )

    role: str = Field(
        min_length=1,
        max_length=100,
    )
    job_link: str | None = None
    notes: str | None = None
    deadline: datetime | None = None

class JobApplicationCreate(JobApplicationBase):
    status : ApplicationStatus = ApplicationStatus.APPLIED


class JobApplicationUpdate(BaseModel):

    company: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    role: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )
    job_link: str | None = None
    notes: str | None = None
    deadline: datetime | None = None
    status: ApplicationStatus | None = None

class JobApplicationResponse(JobApplicationBase):

    id: int
    status: ApplicationStatus
    applied_date: datetime
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )