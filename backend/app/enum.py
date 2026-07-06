from enum import Enum

class ApplicationStatus(str, Enum):
    APPLIED = "Applied"
    OA = "Online Assessment"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"
    WITHDRAWN = "Withdrawn"

class SortField(str, Enum):
    COMPANY = "company"
    ROLE = "role"
    STATUS = "status"
    APPLIED_DATE = "applied_date"
    DEADLINE = "deadline"

class SortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"

