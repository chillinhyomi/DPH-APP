from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from auth import get_current_user
from database import supabase
from routers.projects import _require_member, _require_role

router = APIRouter(prefix="/projects/{project_id}/music", tags=["music"])

BUCKET = "music"
ALLOWED_TYPES = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/ogg", "audio/m4a", "audio/aac"}
MAX_SIZE = 50 * 1024 * 1024  # 50MB


@router.get("")
async def get_music(project_id: str, user: dict = Depends(get_current_user)):
    _require_member(project_id, user["uid"])
    res = (
        supabase.table("music_files")
        .select("*")
        .eq("project_id", project_id)
        .order("uploaded_at", desc=True)
        .limit(1)
        .execute()
    )
    return res.data[0] if res.data else None


@router.post("", status_code=201)
async def upload_music(
    project_id: str,
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="지원하지 않는 파일 형식입니다. (mp3, wav, ogg, m4a, aac)")

    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="파일 크기는 50MB 이하여야 합니다.")

    storage_path = f"{project_id}/{file.filename}"

    # 기존 파일 삭제
    existing = (
        supabase.table("music_files")
        .select("storage_path")
        .eq("project_id", project_id)
        .execute()
    )
    for row in existing.data:
        try:
            supabase.storage.from_(BUCKET).remove([row["storage_path"]])
        except Exception:
            pass
    supabase.table("music_files").delete().eq("project_id", project_id).execute()

    # Supabase Storage 업로드
    supabase.storage.from_(BUCKET).upload(
        path=storage_path,
        file=contents,
        file_options={"content-type": file.content_type},
    )

    public_url = supabase.storage.from_(BUCKET).get_public_url(storage_path)

    res = supabase.table("music_files").insert({
        "project_id": project_id,
        "file_name": file.filename,
        "file_url": public_url,
        "storage_path": storage_path,
        "uploaded_by": user["uid"],
    }).execute()

    return res.data[0]


@router.delete("", status_code=204)
async def delete_music(project_id: str, user: dict = Depends(get_current_user)):
    _require_role(project_id, user["uid"], allowed=["owner", "editor"])

    existing = (
        supabase.table("music_files")
        .select("storage_path")
        .eq("project_id", project_id)
        .execute()
    )
    for row in existing.data:
        try:
            supabase.storage.from_(BUCKET).remove([row["storage_path"]])
        except Exception:
            pass
    supabase.table("music_files").delete().eq("project_id", project_id).execute()
