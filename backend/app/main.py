from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routers import auth

from app.routers import job_application

from app.routers import dashboard

app = FastAPI()

origins = [
    "http://localhost:5173",
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

@app.get("/")
def home():
    return {"Message : Job Tracker API"}

@app.get("/test")
def test():
    return{"Message: Hello from Fastapi"}
