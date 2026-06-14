from pydantic import BaseModel
from typing import Literal, Optional


# ─── Project ──────────────────────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    title: str
    description: str
    stage_width: float
    stage_height: float
    password: str

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class ProjectJoin(BaseModel):
    invite_code: str
    password: str


# ─── Member ───────────────────────────────────────────────────────────────────

class MemberUpdate(BaseModel):
    role: Optional[Literal["owner", "editor", "viewer"]] = None
    dancer_role: Optional[str] = None
    color: Optional[str] = None


# ─── Formation ────────────────────────────────────────────────────────────────

class Position(BaseModel):
    member_id: str
    x: float
    y: float

class FormationCreate(BaseModel):
    name: str
    order: int
    duration: float
    positions: list[Position] = []

class FormationUpdate(BaseModel):
    name: Optional[str] = None
    order: Optional[int] = None
    duration: Optional[float] = None
    positions: Optional[list[Position]] = None

class FormationsBulkUpdate(BaseModel):
    formations: list[dict]


# ─── Notice ───────────────────────────────────────────────────────────────────

class NoticeCreate(BaseModel):
    project_id: Optional[str] = None
    title: str
    content: str
    is_pinned: bool = False
    attachments: list[str] = []

class CommentCreate(BaseModel):
    content: str


# ─── Schedule ─────────────────────────────────────────────────────────────────

class ScheduleEventCreate(BaseModel):
    title: str
    date: str
    start_time: str
    end_time: str
    type: Literal["리허설", "공연", "회의", "기타"]
    place: str
    project_id: Optional[str] = None

class ScheduleEventUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    type: Optional[Literal["리허설", "공연", "회의", "기타"]] = None
    place: Optional[str] = None


# ─── Q&A ──────────────────────────────────────────────────────────────────────

class QnAPostCreate(BaseModel):
    title: str
    content: str
    is_anonymous: bool = False

class QnAPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class QnAReplyCreate(BaseModel):
    content: str
    is_admin: bool = False
