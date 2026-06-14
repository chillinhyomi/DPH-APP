import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home, FolderOpen, Layers, GitBranch, User,
  Bell, Menu, X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

// Bottom navigation - primary navigation
const BOTTOM_NAV_ITEMS = [
  { path: "/home", icon: Home, label: "홈" },
  { path: "/projects", icon: FolderOpen, label: "프로젝트" },
  { path: "/formations", icon: Layers, label: "포메이션" },
  { path: "/timeline", icon: GitBranch, label: "타임라인" },
  { path: "/profile", icon: User, label: "내정보" },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useApp();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleNavigate(path: string) {
    navigate(path);
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    setShowLogoutConfirm(false);
    setMenuOpen(false);
    navigate("/");
  }

  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === path;
    if (path === "/projects") return location.pathname === path || location.pathname.startsWith("/project/");
    if (path === "/formations") return location.pathname === path;
    if (path === "/timeline") return location.pathname === path;
    if (path === "/profile") return location.pathname === path;
    return location.pathname === path;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--background)", fontFamily: "var(--font-family)" }}>
      {/* Top Bar */}
      <header style={{
        height: 56,
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        flexShrink: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "white" }}>D</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--foreground)", letterSpacing: -0.3 }}>DPH</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => handleNavigate("/notices")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={20} color="var(--foreground)" />
            <div style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--destructive)",
            }} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <X size={20} color="var(--foreground)" /> : <Menu size={20} color="var(--foreground)" />}
          </button>
        </div>
      </header>

      {/* Menu Drawer */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 200,
              top: 56,
            }}
          />
          <div style={{
            position: "fixed",
            top: 56,
            right: 0,
            width: 280,
            height: "calc(100vh - 56px)",
            background: "var(--card)",
            boxShadow: "-2px 0 16px rgba(0,0,0,0.1)",
            zIndex: 201,
            display: "flex",
            flexDirection: "column",
            animation: "slideInRight 0.2s ease-out",
          }}>
            {/* User Info */}
            <div style={{ padding: 24, borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: currentUser?.avatarColor || "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
                    {currentUser?.name?.[0] || "U"}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>
                    {currentUser?.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 2 }}>
                    {currentUser?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav style={{ flex: 1, padding: 16, overflowY: "auto" }}>
              <button
                onClick={() => handleNavigate("/dashboard")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname === "/dashboard" ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname === "/dashboard" ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                대시보드
              </button>

              <button
                onClick={() => handleNavigate("/schedule")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname === "/schedule" ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname === "/schedule" ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                일정
              </button>

              <button
                onClick={() => handleNavigate("/members")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname === "/members" ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname === "/members" ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                팀원관리
              </button>

              <button
                onClick={() => handleNavigate("/files")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname === "/files" ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname === "/files" ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                자료실
              </button>

              <button
                onClick={() => handleNavigate("/qna")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname.startsWith("/qna") ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname.startsWith("/qna") ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                Q&A 게시판
              </button>

              <button
                onClick={() => handleNavigate("/settings")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: location.pathname === "/settings" ? "var(--muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: location.pathname === "/settings" ? 600 : 500,
                  color: "var(--foreground)",
                }}
              >
                설정
              </button>
            </nav>

            {/* Logout */}
            <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--destructive)",
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}

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
                <X size={18} color="var(--foreground)" />
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

      {/* Main Content */}
      <main style={{
        flex: 1,
        overflow: "hidden",
        paddingBottom: 64, // Space for bottom nav
      }}>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: `repeat(${BOTTOM_NAV_ITEMS.length}, 1fr)`,
        zIndex: 100,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
      }}>
        {BOTTOM_NAV_ITEMS.map(item => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "8px 4px",
                minHeight: 44,
              }}
            >
              <item.icon
                size={24}
                color={active ? "var(--accent)" : "var(--muted-foreground)"}
                strokeWidth={active ? 2.5 : 2}
              />
              <span style={{
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                color: active ? "var(--accent)" : "var(--muted-foreground)",
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
