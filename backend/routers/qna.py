from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import supabase
from models import QnAPostCreate, QnAPostUpdate, QnAReplyCreate

router = APIRouter(prefix="/qna", tags=["qna"])


@router.get("")
async def list_posts(user: dict = Depends(get_current_user)):
    res = (
        supabase.table("qna_posts")
        .select("*, qna_replies(*)")
        .order("created_at", desc=True)
        .execute()
    )
    return res.data


@router.post("", status_code=201)
async def create_post(body: QnAPostCreate, user: dict = Depends(get_current_user)):
    res = supabase.table("qna_posts").insert({
        "title": body.title,
        "content": body.content,
        "author_id": user["uid"],
        "author_name": user["name"] if not body.is_anonymous else "익명",
        "is_anonymous": body.is_anonymous,
        "status": "waiting",
    }).execute()
    return res.data[0]


@router.get("/{post_id}")
async def get_post(post_id: str, user: dict = Depends(get_current_user)):
    # 조회수 증가
    post = supabase.table("qna_posts").select("views").eq("id", post_id).single().execute()
    if not post.data:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    supabase.table("qna_posts").update({"views": post.data["views"] + 1}).eq("id", post_id).execute()

    res = (
        supabase.table("qna_posts")
        .select("*, qna_replies(*)")
        .eq("id", post_id)
        .single()
        .execute()
    )
    return res.data


@router.patch("/{post_id}")
async def update_post(post_id: str, body: QnAPostUpdate, user: dict = Depends(get_current_user)):
    post = supabase.table("qna_posts").select("author_id").eq("id", post_id).single().execute()
    if not post.data:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    if post.data["author_id"] != user["uid"]:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    update_data = body.model_dump(exclude_none=True)
    res = supabase.table("qna_posts").update(update_data).eq("id", post_id).execute()
    return res.data[0]


@router.delete("/{post_id}", status_code=204)
async def delete_post(post_id: str, user: dict = Depends(get_current_user)):
    post = supabase.table("qna_posts").select("author_id").eq("id", post_id).single().execute()
    if not post.data:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    if post.data["author_id"] != user["uid"]:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    supabase.table("qna_posts").delete().eq("id", post_id).execute()


@router.post("/{post_id}/replies", status_code=201)
async def add_reply(post_id: str, body: QnAReplyCreate, user: dict = Depends(get_current_user)):
    res = supabase.table("qna_replies").insert({
        "post_id": post_id,
        "content": body.content,
        "author_id": user["uid"],
        "author_name": "DPH 관리자" if body.is_admin else user["name"],
        "is_admin": body.is_admin,
    }).execute()

    if body.is_admin:
        supabase.table("qna_posts").update({"status": "answered"}).eq("id", post_id).execute()

    return res.data[0]
