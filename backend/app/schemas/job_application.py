from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.enum import ApplicationStatus, SortField, SortOrder

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


class JobApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    job_link: str | None
    status: ApplicationStatus
    notes: str | None
    applied_date: datetime
    deadline: datetime | None
    resume_url: str | None = None
    model_config = ConfigDict(
        from_attributes=True
    )

class JobApplicationFilter(BaseModel):
    company: str | None = None
    role: str | None = None
    status: ApplicationStatus | None = None
    search: str | None = None

    sort_by: SortField | None = None
    sort_order: SortOrder = SortOrder.ASC

    page: int = Field(default=1,ge=1)
    limit: int = Field(default=10,ge=1,le=100)

class PaginationJobApplicationResponse(BaseModel):
    items: list[JobApplicationResponse]
    page: int
    limit: int
    total: int
    total_pages: int

    