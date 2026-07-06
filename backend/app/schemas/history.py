from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.enum import ApplicationStatus

class StatusHistoryResponse(BaseModel):

    old_status: ApplicationStatus

    new_status: ApplicationStatus

    changed_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )