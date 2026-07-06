from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class User(Base):

    __tablename__ = "users"
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key = True,
        index = True,
    )
    username: Mapped[str] = mapped_column(
        String(50),
        unique = True,
        nullable = False,
    )
    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(70),
        unique = True,
        nullable = False,
    )
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable = False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda : datetime.now(UTC),
    )
    
    resume_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )
    applications: Mapped[list["JobApplication"]] = relationship(
        back_populates = "user"
    )
