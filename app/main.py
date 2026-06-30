from fastapi import FastAPI

from app.routers import auth

from app.routers import job_application

app = FastAPI()

app.include_router(auth.router)

app.include_router(job_application.router)

@app.get("/")
def home():
    return {"Message : Job Tracker API"}