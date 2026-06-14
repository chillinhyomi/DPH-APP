from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import MemberUpdate
from routers.projects import _require_member, _require_role

router = APIRouter(prefix="/projects/{project_id}/members", tags=["members"])


@router.get("")
async def list_members(project_id: str, user: dict = Depends(get_current_user)):
    _require_member(project_id, user["uid"])
    res = supabase.table("project_members").select("*").eq("project_id", project_id).execute()
    return res.data


@router.patch("/{member_id}")
async def update_member(
    project_id: str,
    member_id: str,
    body: MemberUpdate,
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    update_data = body.model_dump(exclude_none=True)
    res = (
        supabase.table("project_members")
        .update(update_data)
        .eq("id", member_id)
        .eq("project_id", project_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="멤버를 찾을 수 없습니다.")
    return res.data[0]


@router.delete("/{member_id}", status_code=204)
async def remove_member(
    project_id: str,
    member_id: str,
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner"])
    supabase.table("project_members").delete().eq("id", member_id).eq("project_id", project_id).execute()
