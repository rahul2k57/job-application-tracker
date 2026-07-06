from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class DashboardSummaryResponse(BaseModel):
    total_applications: int
    applied: int
    interview: int
    offer: int
    rejected: int   
    withdrawn: int
