from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import ScheduleEventCreate, ScheduleEventUpdate

router = APIRouter(prefix="/schedule", tags=["schedule"])


@router.get("")
async def list_events(user: dict = Depends(get_current_user)):
    """내 개인 일정 + 내가 속한 프로젝트 일정"""
    my_projects = (
        supabase.table("project_members")
        .select("project_id")
        .eq("user_id", user["uid"])
        .execute()
    )
    project_ids = [r["project_id"] for r in my_projects.data]

    personal_res = (
        supabase.table("schedule_events")
        .select("*")
        .eq("user_id", user["uid"])
        .is_("project_id", "null")
        .order("date")
        .execute()
    )
    events = personal_res.data

    if project_ids:
        project_res = (
            supabase.table("schedule_events")
            .select("*")
            .in_("project_id", project_ids)
            .order("date")
            .execute()
        )
        events = events + project_res.data

    events.sort(key=lambda e: (e.get("date", ""), e.get("start_time", "")))
    return events


@router.post("", status_code=201)
async def create_event(body: ScheduleEventCreate, user: dict = Depends(get_current_user)):
    res = supabase.table("schedule_events").insert({
        "user_id": user["uid"],
        "title": body.title,
        "date": body.date,
        "start_time": body.start_time,
        "end_time": body.end_time,
        "type": body.type,
        "place": body.place,
        "project_id": body.project_id,
    }).execute()
    return res.data[0]


@router.patch("/{event_id}")
async def update_event(
    event_id: str,
    body: ScheduleEventUpdate,
    user: dict = Depends(get_current_user),
):
    event = supabase.table("schedule_events").select("user_id").eq("id", event_id).single().execute()
    if not event.data:
        raise HTTPException(status_code=404, detail="일정을 찾을 수 없습니다.")
    if event.data["user_id"] != user["uid"]:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    update_data = body.model_dump(exclude_none=True)
    res = supabase.table("schedule_events").update(update_data).eq("id", event_id).execute()
    return res.data[0]


@router.delete("/{event_id}", status_code=204)
async def delete_event(event_id: str, user: dict = Depends(get_current_user)):
    event = supabase.table("schedule_events").select("user_id").eq("id", event_id).single().execute()
    if not event.data:
        raise HTTPException(status_code=404, detail="일정을 찾을 수 없습니다.")
    if event.data["user_id"] != user["uid"]:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    supabase.table("schedule_events").delete().eq("id", event_id).execute()
