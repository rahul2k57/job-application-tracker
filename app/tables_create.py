from app.database import Base
from app.database import engine

from app.models import User
from app.models import JobApplication


Base.metadata.create_all(bind=engine)

print("Tables Created Successfully!")