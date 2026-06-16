from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import NoticeCreate, CommentCreate

router = APIRouter(prefix="/notices", tags=["notices"])


@router.get("")
async def list_notices(user: dict = Depends(get_current_user)):
    """전체 공지 + 내가 속한 프로젝트 공지 반환"""
    my_projects = (
        supabase.table("project_members")
        .select("project_id")
        .eq("user_id", user["uid"])
        .execute()
    )
    project_ids = [r["project_id"] for r in my_projects.data]

    global_res = (
        supabase.table("notices")
        .select("*, notice_comments(*)")
        .is_("project_id", "null")
        .order("is_pinned", desc=True)
        .order("created_at", desc=True)
        .execute()
    )
    notices = global_res.data

    if project_ids:
        project_res = (
            supabase.table("notices")
            .select("*, notice_comments(*)")
            .in_("project_id", project_ids)
            .order("is_pinned", desc=True)
            .order("created_at", desc=True)
            .execute()
        )
        notices = notices + project_res.data

    notices.sort(key=lambda n: (not n.get("is_pinned", False), n.get("created_at", "")))
    return notices


@router.post("", status_code=201)
async def create_notice(body: NoticeCreate, user: dict = Depends(get_current_user)):
    res = supabase.table("notices").insert({
        "project_id": body.project_id,
        "title": body.title,
        "content": body.content,
        "author_id": user["uid"],
        "author_name": user["name"],
        "is_pinned": body.is_pinned,
        "attachments": body.attachments,
    }).execute()
    return res.data[0]


@router.delete("/{notice_id}", status_code=204)
async def delete_notice(notice_id: str, user: dict = Depends(get_current_user)):
    notice = supabase.table("notices").select("author_id").eq("id", notice_id).single().execute()
    if not notice.data:
        raise HTTPException(status_code=404, detail="공지를 찾을 수 없습니다.")
    if notice.data["author_id"] != user["uid"]:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    supabase.table("notices").delete().eq("id", notice_id).execute()


@router.post("/{notice_id}/comments", status_code=201)
async def add_comment(
    notice_id: str,
    body: CommentCreate,
    user: dict = Depends(get_current_user),
):
    res = supabase.table("notice_comments").insert({
        "notice_id": notice_id,
        "author_name": user["name"],
        "content": body.content,
    }).execute()
    return res.data[0]
