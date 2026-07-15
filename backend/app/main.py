from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routers import auth

from app.routers import job_application

from app.routers import dashboard

from app.routers import resume

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://job-application-tracker-frontend-one.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

app.include_router(job_application.router)

app.include_router(dashboard.router)

app.include_router(resume.router)

@app.get("/")
def home():
    return {"Message : Job Tracker API"}

