from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.enum import ApplicationStatus
from app.models.job_application import JobApplication

class StatusHistory(Base):
    
    __tablename__ = "status_history"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    application_id: Mapped[int] = mapped_column(
        ForeignKey("job_applications.id"),
        nullable=False,
    )

    old_status: Mapped[ApplicationStatus] = mapped_column(
        nullable=False,
    )

    new_status: Mapped[ApplicationStatus] = mapped_column(
        nullable=False,
    )

    changed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )
    
    application: Mapped["JobApplication"] = relationship(
        back_populates="status_history",
    )