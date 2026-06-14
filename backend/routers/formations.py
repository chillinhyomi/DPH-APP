from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import FormationCreate, FormationUpdate, FormationsBulkUpdate
from routers.projects import _require_member, _require_role

router = APIRouter(prefix="/projects/{project_id}/formations", tags=["formations"])


@router.get("")
async def list_formations(project_id: str, user: dict = Depends(get_current_user)):
    _require_member(project_id, user["uid"])
    res = (
        supabase.table("formations")
        .select("*")
        .eq("project_id", project_id)
        .order("order")
        .execute()
    )
    return res.data


@router.post("", status_code=201)
async def create_formation(
    project_id: str,
    body: FormationCreate,
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    res = supabase.table("formations").insert({
        "project_id": project_id,
        "name": body.name,
        "order": body.order,
        "duration": body.duration,
        "positions": [p.model_dump() for p in body.positions],
    }).execute()
    _update_formation_count(project_id)
    return res.data[0]


@router.put("")
async def bulk_update_formations(
    project_id: str,
    body: FormationsBulkUpdate,
    user: dict = Depends(get_current_user),
):
    """포메이션 전체를 한 번에 교체 (워크스페이스 저장 시 사용)"""
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    supabase.table("formations").delete().eq("project_id", project_id).execute()
    if body.formations:
        rows = [
            {**f, "project_id": project_id}
            for f in body.formations
        ]
        supabase.table("formations").insert(rows).execute()
    _update_formation_count(project_id)
    res = supabase.table("formations").select("*").eq("project_id", project_id).order("order").execute()
    return res.data


@router.patch("/{formation_id}")
async def update_formation(
    project_id: str,
    formation_id: str,
    body: FormationUpdate,
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    update_data = body.model_dump(exclude_none=True)
    if "positions" in update_data:
        update_data["positions"] = [p.model_dump() for p in body.positions]
    res = (
        supabase.table("formations")
        .update(update_data)
        .eq("id", formation_id)
        .eq("project_id", project_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="포메이션을 찾을 수 없습니다.")
    return res.data[0]


@router.delete("/{formation_id}", status_code=204)
async def delete_formation(
    project_id: str,
    formation_id: str,
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])
    supabase.table("formations").delete().eq("id", formation_id).eq("project_id", project_id).execute()
    _update_formation_count(project_id)


def _update_formation_count(project_id: str):
    count = len(supabase.table("formations").select("id").eq("project_id", project_id).execute().data)
    supabase.table("projects").update({"formation_count": count}).eq("id", project_id).execute()
