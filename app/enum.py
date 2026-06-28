from enum import Enum

class ApplicationStatus(str, Enum):
    APPLIED = "Applied"
    OA = "Online Assessment"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"