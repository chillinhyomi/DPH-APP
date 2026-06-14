import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Edit3, ChevronRight, FolderOpen, LogOut, Lock, Bell, Trash2, Shield, X, Camera, Upload, Layers, Calendar, HelpCircle, Settings as SettingsIcon, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

function PasswordChangeModal({ onClose }: { onClose: () => void }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("비밀번호가 변경되었습니다.");
    onClose();
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
      padding: "16px",
    }}>
      <div style={{
        background: "var(--card)",
        borderRadius: 16,
        padding: "24px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--foreground)",
          }}>
            비밀번호 변경
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--muted)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="var(--foreground)" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
              display: "block",
              marginBottom: 6,
            }}>
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              placeholder="현재 비밀번호 입력"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 15,
                color: "var(--foreground)",
                outline: "none",
                boxSizing: "border-box" as const,
                minHeight: 48,
              }}
            />
          </div>

          <div>
            <label style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
              display: "block",
              marginBottom: 6,
            }}>
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="새 비밀번호 입력"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 15,
                color: "var(--foreground)",
                outline: "none",
                boxSizing: "border-box" as const,
                minHeight: 48,
              }}
            />
          </div>

          <div>
            <label style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
              display: "block",
              marginBottom: 6,
            }}>
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              placeholder="비밀번호 재입력"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 15,
                color: "var(--foreground)",
                outline: "none",
                boxSizing: "border-box" as const,
                minHeight: 48,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: 12,
              background: "var(--accent)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              marginTop: 6,
              minHeight: 48,
            }}
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

function PrivacySettingsModal({ onClose }: { onClose: () => void }) {
  const [profilePublic, setProfilePublic] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [allowSearch, setAllowSearch] = useState(true);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
      padding: "16px",
    }}>
      <div style={{
        background: "var(--card)",
        borderRadius: 16,
        padding: "24px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--foreground)",
          }}>
            개인정보 보호
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--muted)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="var(--foreground)" />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "var(--muted)",
            borderRadius: 12,
            minHeight: 48,
          }}>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--foreground)",
            }}>
              프로필 공개
            </span>
            <div
              onClick={() => setProfilePublic(!profilePublic)}
              style={{
                width: 48,
                height: 28,
                borderRadius: 14,
                background: profilePublic ? "var(--accent)" : "var(--border)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: 2,
                left: profilePublic ? 22 : 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }} />
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "var(--muted)",
            borderRadius: 12,
            minHeight: 48,
          }}>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--foreground)",
            }}>
              이메일 표시
            </span>
            <div
              onClick={() => setShowEmail(!showEmail)}
              style={{
                width: 48,
                height: 28,
                borderRadius: 14,
                background: showEmail ? "var(--accent)" : "var(--border)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: 2,
                left: showEmail ? 22 : 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }} />
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "var(--muted)",
            borderRadius: 12,
            minHeight: 48,
          }}>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--foreground)",
            }}>
              검색 허용
            </span>
            <div
              onClick={() => setAllowSearch(!allowSearch)}
              style={{
                width: 48,
                height: 28,
                borderRadius: 14,
                background: allowSearch ? "var(--accent)" : "var(--border)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: 2,
                left: allowSearch ? 22 : 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }} />
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "14px",
              borderRadius: 12,
              background: "var(--accent)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              marginTop: 8,
              minHeight: 48,
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { logout } = useApp();
  const [confirmText, setConfirmText] = useState("");

  function handleDelete() {
    if (confirmText !== "계정 삭제") {
      alert("확인 텍스트를 정확히 입력해주세요.");
      return;
    }
    logout();
    navigate("/");
    alert("계정이 삭제되었습니다.");
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
      padding: "16px",
    }}>
      <div style={{
        background: "var(--card)",
        borderRadius: 16,
        padding: "24px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--destructive)",
          }}>
            계정 삭제
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#FEE2E2",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="var(--destructive)" />
          </button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: 14,
            color: "var(--foreground)",
            lineHeight: 1.6,
            marginBottom: 12,
          }}>
            계정을 삭제하면 모든 프로젝트, 포메이션, 일정 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </p>
          <div style={{
            background: "#FEE2E2",
            borderRadius: 12,
            padding: "12px 16px",
            border: "1px solid var(--destructive)",
          }}>
            <p style={{
              fontSize: 13,
              color: "var(--destructive)",
              fontWeight: 600,
            }}>
              ⚠️ 이 작업은 되돌릴 수 없습니다
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--foreground)",
            display: "block",
            marginBottom: 6,
          }}>
            계속하려면 "계정 삭제"를 입력하세요
          </label>
          <input
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
            placeholder="계정 삭제"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 12,
              border: "1px solid var(--destructive)",
              background: "var(--card)",
              fontSize: 15,
              color: "var(--foreground)",
              outline: "none",
              boxSizing: "border-box" as const,
              minHeight: 48,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 12,
              background: "var(--muted)",
              color: "var(--foreground)",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              minHeight: 48,
            }}
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 12,
              background: "var(--destructive)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              minHeight: 48,
            }}
          >
            계정 삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, projects, qnaPosts, logout, updateUser } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [profileImage, setProfileImage] = useState<string | null>(currentUser?.profileImage || null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [scheduleNotif, setScheduleNotif] = useState(true);
  const [noticeNotif, setNoticeNotif] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSaveProfile() {
    if (previewImage) {
      setProfileImage(previewImage);
      if (updateUser) {
        updateUser({ ...currentUser!, name, profileImage: previewImage });
      }
      setPreviewImage(null);
    } else if (updateUser) {
      updateUser({ ...currentUser!, name });
    }
    setEditMode(false);
  }

  function handleCancelEdit() {
    setName(currentUser?.name || "");
    setPreviewImage(null);
    setEditMode(false);
  }

  const stats = [
    { label: "프로젝트", value: projects.length, icon: FolderOpen, color: "var(--accent)" },
    { label: "포메이션", value: projects.reduce((s, p) => s + p.formationCount, 0), icon: Layers, color: "#F59E0B" },
    { label: "일정", value: 24, icon: Calendar, color: "#0EA5E9" },
  ];

  const quickActions = [
    { label: "내 프로젝트", icon: FolderOpen, path: "/projects", color: "var(--accent)" },
    { label: "내 포메이션", icon: Layers, path: "/formations", color: "#F59E0B" },
    { label: "내 일정", icon: Calendar, path: "/schedule", color: "#0EA5E9" },
  ];

  const settings = [
    { icon: SettingsIcon, label: "계정 설정", action: () => navigate("/account-settings") },
    { icon: Bell, label: "알림 설정", toggle: true, on: scheduleNotif, onToggle: () => setScheduleNotif(!scheduleNotif) },
    { icon: Shield, label: "개인정보 관리", action: () => setShowPrivacyModal(true) },
    { icon: HelpCircle, label: "도움말", action: () => navigate("/help") },
    { icon: LogOut, label: "로그아웃", action: () => setShowLogoutConfirm(true), danger: true },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      {showPasswordModal && <PasswordChangeModal onClose={() => setShowPasswordModal(false)} />}
      {showPrivacyModal && <PrivacySettingsModal onClose={() => setShowPrivacyModal(false)} />}
      {showDeleteModal && <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          padding: "16px",
        }}>
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "24px",
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
              <h2 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--foreground)",
              }}>
                로그아웃
              </h2>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--muted)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} color="var(--foreground)" />
              </button>
            </div>

            <p style={{
              fontSize: 15,
              color: "var(--foreground)",
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              정말 로그아웃 하시겠습니까?
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--muted)",
                  color: "var(--foreground)",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--destructive)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      <MobilePage>
        <PageHeader title="마이페이지" />

        <PageContent>
          {/* Profile Card */}
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid var(--border)",
            marginBottom: 16,
          }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: (previewImage || profileImage) ? `url(${previewImage || profileImage}) center/cover` : "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {!(previewImage || profileImage) && (
                    <span style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "white",
                    }}>
                      {currentUser?.name?.[0]}
                    </span>
                  )}
                </div>
                {editMode && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "var(--accent)",
                      border: "2px solid var(--card)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Camera size={14} color="white" />
                  </button>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {editMode ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="이름 입력"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "8px 12px",
                        color: "var(--foreground)",
                        fontSize: 15,
                        fontWeight: 600,
                        outline: "none",
                        width: "100%",
                      }}
                    />
                    {previewImage && (
                      <div style={{
                        fontSize: 11,
                        color: "var(--muted-foreground)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                        <Upload size={10} />
                        새 프로필 사진 미리보기
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <h2 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--foreground)",
                      marginBottom: 2,
                    }}>
                      {currentUser?.name}
                    </h2>
                    <p style={{
                      fontSize: 13,
                      color: "var(--muted-foreground)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {currentUser?.email}
                    </p>
                  </>
                )}
              </div>

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--muted)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Edit3 size={16} color="var(--foreground)" />
                </button>
              ) : null}
            </div>

            {editMode && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleSaveProfile}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: 10,
                    background: "var(--accent)",
                    border: "none",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: 44,
                  }}
                >
                  저장
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: 10,
                    background: "var(--muted)",
                    border: "none",
                    color: "var(--foreground)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: 44,
                  }}
                >
                  취소
                </button>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              현황
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}>
              {stats.map(stat => (
                <div
                  key={stat.label}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${stat.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}>
                    <stat.icon size={20} color={stat.color} />
                  </div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "var(--foreground)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    fontWeight: 600,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Questions */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}>
              <h3 style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}>
                내 질문
              </h3>
              <button
                onClick={() => navigate("/qna")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                전체보기 →
              </button>
            </div>

            {currentUser && qnaPosts.filter(p => p.authorId === currentUser.uid).length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {qnaPosts
                  .filter(p => p.authorId === currentUser.uid)
                  .slice(0, 3)
                  .map(post => (
                    <button
                      key={post.id}
                      onClick={() => navigate(`/qna/${post.id}`)}
                      style={{
                        background: "var(--card)",
                        borderRadius: 16,
                        padding: "16px",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 8,
                          background: post.status === "answered" ? "var(--success)" : "var(--warning)",
                          opacity: 0.9,
                        }}>
                          {post.status === "answered" ? (
                            <CheckCircle size={12} color="white" />
                          ) : (
                            <Clock size={12} color="white" />
                          )}
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "white",
                          }}>
                            {post.status === "answered" ? "답변완료" : "대기중"}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 12,
                          color: "var(--muted-foreground)",
                        }}>
                          {post.createdAt}
                        </span>
                      </div>
                      <h4 style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {post.title}
                      </h4>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}>
                          <MessageCircle size={14} color="var(--muted-foreground)" />
                          <span style={{
                            fontSize: 12,
                            color: "var(--muted-foreground)",
                            fontWeight: 600,
                          }}>
                            {post.replies.length}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            ) : (
              <div style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: "32px 24px",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}>
                <MessageCircle size={32} color="var(--muted-foreground)" style={{ marginBottom: 8 }} />
                <p style={{
                  fontSize: 14,
                  color: "var(--muted-foreground)",
                  marginBottom: 12,
                }}>
                  아직 작성한 질문이 없습니다
                </p>
                <button
                  onClick={() => navigate("/qna/create")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 10,
                    background: "var(--accent)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  질문 작성하기
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              빠른 이동
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {quickActions.map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minHeight: 48,
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${action.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <action.icon size={20} color={action.color} />
                  </div>
                  <span style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    textAlign: "left",
                  }}>
                    {action.label}
                  </span>
                  <ChevronRight size={20} color="var(--muted-foreground)" />
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              설정
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              {settings.map((setting, idx) => (
                <button
                  key={setting.label}
                  onClick={() => {
                    if ("toggle" in setting && "onToggle" in setting) {
                      setting.onToggle();
                    } else if ("action" in setting) {
                      setting.action();
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: idx < settings.length - 1 ? "1px solid var(--border)" : "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left" as const,
                    minHeight: 56,
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <setting.icon size={20} color={("danger" in setting && setting.danger) ? "var(--destructive)" : "var(--foreground)"} />
                  </div>

                  <span style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: 600,
                    color: ("danger" in setting && setting.danger) ? "var(--destructive)" : "var(--foreground)",
                  }}>
                    {setting.label}
                  </span>

                  {"toggle" in setting ? (
                    <div style={{
                      width: 48,
                      height: 28,
                      borderRadius: 14,
                      background: setting.on ? "var(--accent)" : "var(--border)",
                      position: "relative",
                      transition: "background 0.2s",
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "white",
                        position: "absolute",
                        top: 2,
                        left: setting.on ? 22 : 2,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        transition: "left 0.2s",
                      }} />
                    </div>
                  ) : (
                    <ChevronRight size={20} color="var(--muted-foreground)" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* App Version */}
          <div style={{
            textAlign: "center",
            padding: "16px",
          }}>
            <p style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
            }}>
              DPH v1.0.0
            </p>
          </div>
        </PageContent>
      </MobilePage>
    </>
  );
}
