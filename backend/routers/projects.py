import random
import string
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import ProjectCreate, ProjectUpdate, ProjectJoin

router = APIRouter(prefix="/projects", tags=["projects"])


def _generate_invite_code() -> str:
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=6))


@router.get("")
async def list_projects(user: dict = Depends(get_current_user)):
    """로그인한 유저가 속한 프로젝트 목록"""
    res = (
        supabase.table("project_members")
        .select("project_id, projects(*)")
        .eq("user_id", user["uid"])
        .execute()
    )
    projects = [row["projects"] for row in res.data if row.get("projects")]
    return projects


@router.post("", status_code=201)
async def create_project(body: ProjectCreate, user: dict = Depends(get_current_user)):
    invite_code = _generate_invite_code()
    project_res = (
        supabase.table("projects")
        .insert({
            "title": body.title,
            "description": body.description,
            "stage_width": body.stage_width,
            "stage_height": body.stage_height,
            "invite_code": invite_code,
            "password": body.password,
            "owner_id": user["uid"],
        })
        .execute()
    )
    project = project_res.data[0]
    supabase.table("project_members").insert({
        "project_id": project["id"],
        "user_id": user["uid"],
        "name": user["name"],
        "color": "#6C3AED",
        "role": "owner",
        "dancer_role": "리드댄서",
    }).execute()
    return project


@router.get("/{project_id}")
async def get_project(project_id: str, user: dict = Depends(get_current_user)):
    _require_member(project_id, user["uid"])
    res = supabase.table("projects").select("*").eq("id", project_id).single().execute()
    return res.data


@router.patch("/{project_id}")
async def update_project(project_id: str, body: ProjectUpdate, user: dict = Depends(get_current_user)):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    update_data = body.model_dump(exclude_none=True)
    res = supabase.table("projects").update(update_data).eq("id", project_id).execute()
    return res.data[0]


@router.delete("/{project_id}", status_code=204)
async def delete_project(project_id: str, user: dict = Depends(get_current_user)):
    _require_role(project_id, user["uid"], allowed=["owner"])
    supabase.table("projects").delete().eq("id", project_id).execute()


@router.post("/{project_id}/favorite")
async def toggle_favorite(project_id: str, user: dict = Depends(get_current_user)):
    _require_member(project_id, user["uid"])
    proj = supabase.table("projects").select("is_favorite").eq("id", project_id).single().execute()
    new_val = not proj.data.get("is_favorite", False)
    supabase.table("projects").update({"is_favorite": new_val}).eq("id", project_id).execute()
    return {"is_favorite": new_val}


@router.post("/join")
async def join_project(body: ProjectJoin, user: dict = Depends(get_current_user)):
    res = (
        supabase.table("projects")
        .select("*")
        .eq("invite_code", body.invite_code)
        .eq("password", body.password)
        .single()
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="초대 코드 또는 비밀번호가 올바르지 않습니다.")
    project = res.data
    existing = (
        supabase.table("project_members")
        .select("id")
        .eq("project_id", project["id"])
        .eq("user_id", user["uid"])
        .execute()
    )
    if not existing.data:
        member_count = len(
            supabase.table("project_members").select("id").eq("project_id", project["id"]).execute().data
        )
        colors = ["#6C3AED", "#EC4899", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"]
        supabase.table("project_members").insert({
            "project_id": project["id"],
            "user_id": user["uid"],
            "name": user["name"],
            "color": colors[member_count % len(colors)],
            "role": "viewer",
            "dancer_role": "댄서",
        }).execute()
    return project


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _require_member(project_id: str, user_id: str):
    res = (
        supabase.table("project_members")
        .select("id")
        .eq("project_id", project_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=403, detail="프로젝트 멤버가 아닙니다.")


def _require_role(project_id: str, user_id: str, allowed: list[str]):
    res = (
        supabase.table("project_members")
        .select("role")
        .eq("project_id", project_id)
        .eq("user_id", user_id)
        .single()
        .execute()
    )
    if not res.data or res.data["role"] not in allowed:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
