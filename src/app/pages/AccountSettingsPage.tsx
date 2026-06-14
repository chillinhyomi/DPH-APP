import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bell, Moon, Play, Database, Lock, Smartphone, LogOut, Trash2, X, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function AccountSettingsPage() {
  const navigate = useNavigate();
  const { logout } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [likesNotif, setLikesNotif] = useState(true);
  const [commentsNotif, setCommentsNotif] = useState(true);
  const [followersNotif, setFollowersNotif] = useState(false);
  const [announcementsNotif, setAnnouncementsNotif] = useState(true);

  const [followSystemTheme, setFollowSystemTheme] = useState(() => {
    return localStorage.getItem("dph-follow-system-theme") === "true";
  });

  const [autoPlay, setAutoPlay] = useState(true);
  const [restrictOnMobile, setRestrictOnMobile] = useState(true);

  // Handle system theme preference
  useEffect(() => {
    if (followSystemTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        const isDark = e.matches;
        if (isDark && theme !== "dark") {
          toggleTheme();
        } else if (!isDark && theme !== "light") {
          toggleTheme();
        }
      };

      handleChange(mediaQuery);
      mediaQuery.addEventListener("change", handleChange);
      localStorage.setItem("dph-follow-system-theme", "true");

      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      localStorage.setItem("dph-follow-system-theme", "false");
    }
  }, [followSystemTheme, theme, toggleTheme]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearCacheModal, setShowClearCacheModal] = useState(false);

  return (
    <>
      {/* Password Modal */}
      {showPasswordModal && (
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
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)" }}>
                비밀번호 변경
              </h2>
              <button
                onClick={() => setShowPasswordModal(false)}
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

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <input
                type="password"
                placeholder="현재 비밀번호"
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
              <input
                type="password"
                placeholder="새 비밀번호"
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
              onClick={() => {
                alert("비밀번호가 변경되었습니다.");
                setShowPasswordModal(false);
              }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "var(--accent)",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                minHeight: 48,
              }}
            >
              변경하기
            </button>
          </div>
        </div>
      )}

      {/* Devices Modal */}
      {showDevicesModal && (
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
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)" }}>
                로그인된 기기
              </h2>
              <button
                onClick={() => setShowDevicesModal(false)}
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

            <div style={{ marginBottom: 20 }}>
              <div style={{
                padding: "12px",
                background: "var(--muted)",
                borderRadius: 12,
                marginBottom: 12,
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>
                  iPhone 16 (현재)
                </div>
                <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                  서울, 대한민국 · 2026-06-05
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDevicesModal(false)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "var(--accent)",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                minHeight: 48,
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Clear Cache Modal */}
      {showClearCacheModal && (
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
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>
              캐시 삭제
            </h2>
            <p style={{ fontSize: 15, color: "var(--foreground)", lineHeight: 1.6, marginBottom: 20 }}>
              캐시를 삭제하면 앱 성능이 개선될 수 있습니다.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowClearCacheModal(false)}
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
                onClick={() => {
                  alert("캐시가 삭제되었습니다.");
                  setShowClearCacheModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
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
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--destructive)", marginBottom: 16 }}>
              계정을 삭제하시겠습니까?
            </h2>
            <p style={{ fontSize: 15, color: "var(--foreground)", lineHeight: 1.6, marginBottom: 20 }}>
              모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowDeleteModal(false)}
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
                onClick={() => {
                  setShowDeleteModal(false);
                  logout();
                  navigate("/");
                }}
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
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      <MobilePage>
        <PageHeader title="앱 설정" subtitle="알림 및 환경 설정" showBack={true} />

        <PageContent>
          {/* Notification Settings */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              알림 설정
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              {[
                { label: "좋아요 알림", state: likesNotif, setState: setLikesNotif },
                { label: "댓글 알림", state: commentsNotif, setState: setCommentsNotif },
                { label: "팔로워 알림", state: followersNotif, setState: setFollowersNotif },
                { label: "공지사항 알림", state: announcementsNotif, setState: setAnnouncementsNotif },
              ].map((item, idx, arr) => (
                <div
                  key={item.label}
                  style={{
                    padding: "16px",
                    borderBottom: idx < arr.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 60,
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flex: 1,
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--accent)18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Bell size={20} color="var(--accent)" />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                      {item.label}
                    </span>
                  </div>

                  <div
                    onClick={() => item.setState(!item.state)}
                    style={{
                      width: 48,
                      height: 28,
                      borderRadius: 14,
                      background: item.state ? "var(--accent)" : "var(--border)",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "white",
                      position: "absolute",
                      top: 2,
                      left: item.state ? 22 : 2,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              외관
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              {/* Dark Mode Toggle */}
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 60,
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flex: 1,
                }}>
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
                    <Moon size={20} color="var(--foreground)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                    다크 모드
                  </span>
                </div>

                <div
                  onClick={toggleTheme}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    background: theme === "dark" ? "var(--accent)" : "var(--border)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "white",
                    position: "absolute",
                    top: 2,
                    left: theme === "dark" ? 22 : 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "left 0.2s",
                  }} />
                </div>
              </div>

              {/* System Theme Toggle */}
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 60,
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flex: 1,
                }}>
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
                    <Moon size={20} color="var(--foreground)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                    시스템 테마 따르기
                  </span>
                </div>

                <div
                  onClick={() => setFollowSystemTheme(!followSystemTheme)}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    background: followSystemTheme ? "var(--accent)" : "var(--border)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "white",
                    position: "absolute",
                    top: 2,
                    left: followSystemTheme ? 22 : 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "left 0.2s",
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Playback */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              재생 설정
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              {[
                { label: "자동 재생", state: autoPlay, setState: setAutoPlay },
                { label: "모바일 데이터에서 제한", state: restrictOnMobile, setState: setRestrictOnMobile },
              ].map((item, idx, arr) => (
                <div
                  key={item.label}
                  style={{
                    padding: "16px",
                    borderBottom: idx < arr.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 60,
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flex: 1,
                  }}>
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
                      <Play size={20} color="var(--foreground)" />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                      {item.label}
                    </span>
                  </div>

                  <div
                    onClick={() => item.setState(!item.state)}
                    style={{
                      width: 48,
                      height: 28,
                      borderRadius: 14,
                      background: item.state ? "var(--accent)" : "var(--border)",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "white",
                      position: "absolute",
                      top: 2,
                      left: item.state ? 22 : 2,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              저장 공간
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              <button
                onClick={() => setShowClearCacheModal(true)}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
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
                  <Database size={20} color="var(--foreground)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>
                    캐시 삭제
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                    임시 데이터 삭제
                  </div>
                </div>
                <ChevronRight size={20} color="var(--muted-foreground)" />
              </button>
            </div>
          </div>

          {/* Security */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              보안
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              <button
                onClick={() => setShowPasswordModal(true)}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
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
                  <Lock size={20} color="var(--foreground)" />
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                  비밀번호 변경
                </span>
                <ChevronRight size={20} color="var(--muted-foreground)" />
              </button>

              <button
                onClick={() => setShowDevicesModal(true)}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
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
                  <Smartphone size={20} color="var(--foreground)" />
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                  로그인된 기기 관리
                </span>
                <ChevronRight size={20} color="var(--muted-foreground)" />
              </button>
            </div>
          </div>

          {/* Account Management */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              계정 관리
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
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
                  <LogOut size={20} color="var(--foreground)" />
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                  로그아웃
                </span>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Trash2 size={20} color="var(--destructive)" />
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--destructive)" }}>
                  계정 삭제
                </span>
              </button>
            </div>
          </div>
        </PageContent>
      </MobilePage>
    </>
  );
}
