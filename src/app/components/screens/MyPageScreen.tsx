import { ChevronRight, Bell, Lock, HelpCircle, LogOut, Edit3, Award, Star, Music2, Calendar, Moon, Shield, Trash2 } from "lucide-react";

const SETTINGS = [
  {
    section: "계정",
    items: [
      { icon: Edit3, label: "프로필 편집", color: "#6C3AED", arrow: true },
      { icon: Lock, label: "비밀번호 변경", color: "#0EA5E9", arrow: true },
      { icon: Shield, label: "개인정보 보호", color: "#10B981", arrow: true },
    ],
  },
  {
    section: "알림",
    items: [
      { icon: Bell, label: "일정 알림", color: "#F59E0B", toggle: true, on: true },
      { icon: Bell, label: "공지 알림", color: "#EC4899", toggle: true, on: true },
      { icon: Bell, label: "댄서 업데이트", color: "#8B5CF6", toggle: true, on: false },
    ],
  },
  {
    section: "앱 설정",
    items: [
      { icon: Moon, label: "다크 모드", color: "#374151", toggle: true, on: false },
      { icon: HelpCircle, label: "도움말 & 지원", color: "#6B7280", arrow: true },
    ],
  },
  {
    section: "계정 관리",
    items: [
      { icon: LogOut, label: "로그아웃", color: "#EF4444", arrow: false },
      { icon: Trash2, label: "계정 삭제", color: "#EF4444", arrow: false },
    ],
  },
];

export function MyPageScreen() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Profile hero */}
      <div style={{ background: "linear-gradient(160deg, #6C3AED 0%, #8B5CF6 100%)", padding: "52px 20px 28px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 20 }}>마이페이지</h1>
        <div className="flex items-center gap-4">
          <div style={{ width: 68, height: 68, borderRadius: 20, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid rgba(255,255,255,0.4)", flexShrink: 0 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "white" }}>민</span>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "white" }}>김민준</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>minj.dance@gmail.com</p>
            <div className="flex items-center gap-2 mt-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "3px 10px" }}>리더</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>STEP 댄스동아리</span>
            </div>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Edit3 size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Achievement stats */}
      <div style={{ background: "white", padding: "16px 20px", borderBottom: "1px solid #F1F0FF" }}>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "프로젝트", value: "5", icon: Music2, color: "#6C3AED" },
            { label: "연습 횟수", value: "48", icon: Calendar, color: "#10B981" },
            { label: "포메이션", value: "32", icon: Star, color: "#F59E0B" },
            { label: "수상 내역", value: "3", icon: Award, color: "#EC4899" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <s.icon size={16} color={s.color} />
              </div>
              <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "12px 20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {SETTINGS.map(section => (
          <div key={section.section}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, marginLeft: 4, display: "block", marginBottom: 8 }}>{section.section}</span>
            <div style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: i < section.items.length - 1 ? "1px solid #F9FAFB" : "none", cursor: "pointer" }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: item.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <item.icon size={16} color={item.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: item.label === "로그아웃" || item.label === "계정 삭제" ? item.color : "#111827" }}>{item.label}</span>
                  {"toggle" in item ? (
                    <div style={{ width: 44, height: 24, borderRadius: 12, background: item.on ? "#6C3AED" : "#E5E7EB", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: item.on ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                    </div>
                  ) : item.arrow ? (
                    <ChevronRight size={16} color="#D1D5DB" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}

        <p style={{ textAlign: "center", fontSize: 11, color: "#D1D5DB", marginTop: 4 }}>DPH v1.0.0 · 개인정보처리방침 · 이용약관</p>
      </div>
    </div>
  );
}
