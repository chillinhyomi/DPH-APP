import { Bell, Moon, Globe, Lock, User, Mail, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export function SettingsPage() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const sections = [
    {
      title: "계정",
      items: [
        { icon: User, label: "프로필", description: "이름, 프로필 사진 변경", path: "/profile" },
        { icon: Mail, label: "이메일", description: currentUser?.email || "", path: null },
        { icon: Lock, label: "비밀번호", description: "비밀번호 변경", path: null },
      ],
    },
    {
      title: "설정",
      items: [
        { icon: Bell, label: "알림", description: "알림 설정", path: null },
        { icon: Moon, label: "다크 모드", description: "테마 변경", path: null },
        { icon: Globe, label: "언어", description: "한국어", path: null },
      ],
    },
    {
      title: "정보",
      items: [
        { icon: HelpCircle, label: "도움말", description: "사용 가이드", path: null },
        { icon: Mail, label: "문의하기", description: "support@dph.com", path: null },
      ],
    },
  ];

  return (
    <MobilePage>
      <PageHeader title="설정" showBack={true} />

      <PageContent>
        {sections.map((section, idx) => (
          <div key={section.title} style={{ marginBottom: idx < sections.length - 1 ? 32 : 0 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              {section.title}
            </h3>

            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              {section.items.map((item, itemIdx) => (
                <button
                  key={item.label}
                  onClick={() => item.path && navigate(item.path)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: itemIdx < section.items.length - 1 ? "1px solid var(--border)" : "none",
                    cursor: item.path ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left" as const,
                    minHeight: 64,
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
                    <item.icon size={20} color="var(--foreground)" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--foreground)",
                      marginBottom: 2,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: "var(--muted-foreground)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {item.description}
                    </div>
                  </div>

                  {item.path && (
                    <ChevronRight size={20} color="var(--muted-foreground)" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 16,
            background: "var(--card)",
            border: "1px solid var(--border)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 32,
            minHeight: 56,
          }}
        >
          <LogOut size={20} color="var(--destructive)" />
          <span style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--destructive)",
          }}>
            로그아웃
          </span>
        </button>

        {/* App Version */}
        <div style={{
          textAlign: "center",
          marginTop: 24,
          padding: "16px",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--muted-foreground)",
          }}>
            DPH v1.0.0
          </p>
        </div>
      </PageContent>
    </MobilePage>
  );
}
