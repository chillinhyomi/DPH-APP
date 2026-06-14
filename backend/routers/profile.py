from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from auth import get_current_user
from database import supabase

router = APIRouter(prefix="/profile", tags=["profile"])


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar_color: Optional[str] = None
    dancer_role: Optional[str] = None


@router.get("")
async def get_profile(user: dict = Depends(get_current_user)):
    res = (
        supabase.table("profiles")
        .select("*")
        .eq("id", user["uid"])
        .single()
        .execute()
    )
    if not res.data:
        # 프로필이 없으면 자동 생성
        new_profile = {
            "id": user["uid"],
            "name": user["name"],
            "email": user["email"],
            "avatar_color": "#6C3AED",
            "dancer_role": "",
        }
        supabase.table("profiles").insert(new_profile).execute()
        return new_profile
    return res.data


@router.patch("")
async def update_profile(body: ProfileUpdate, user: dict = Depends(get_current_user)):
    update_data = body.model_dump(exclude_none=True)

    # Supabase auth 메타데이터도 동기화
    if "name" in update_data:
        supabase.auth.admin.update_user_by_id(
            user["uid"],
            {"user_metadata": {"name": update_data["name"]}},
        )

    res = (
        supabase.table("profiles")
        .upsert({"id": user["uid"], **update_data})
        .execute()
    )
    return res.data[0]
