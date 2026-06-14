import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import projects, members, formations, notices, schedule, qna, music, profile

load_dotenv()

app = FastAPI(title="DPH API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(members.router)
app.include_router(formations.router)
app.include_router(notices.router)
app.include_router(schedule.router)
app.include_router(qna.router)
app.include_router(music.router)
app.include_router(profile.router)


@app.get("/health")
def health():
    return {"status": "ok"}
