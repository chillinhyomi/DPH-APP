import { Bell, ChevronRight, Calendar, Users, Music, Play, Zap, Star, TrendingUp } from "lucide-react";

const quickCards = [
  { icon: Music, label: "무대 편집", color: "#6C3AED", bg: "#EDE9FE" },
  { icon: Users, label: "댄서 관리", color: "#0EA5E9", bg: "#E0F2FE" },
  { icon: Calendar, label: "일정 추가", color: "#10B981", bg: "#D1FAE5" },
  { icon: Play, label: "애니메이션", color: "#F59E0B", bg: "#FEF3C7" },
];

const schedules = [
  { time: "오후 3:00", title: "합동 리허설", place: "공연 연습실 B", type: "리허설", color: "#6C3AED" },
  { time: "오후 7:00", title: "개인 안무 연습", place: "자유 연습실", type: "개인", color: "#10B981" },
];

export function HomeScreen() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4" style={{ background: "transparent" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>●●●</div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "16px 20px 0", background: "linear-gradient(160deg, #6C3AED 0%, #8B5CF6 60%, #A78BFA 100%)", borderRadius: "0 0 28px 28px", paddingBottom: 32, marginBottom: -16 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>안녕하세요 👋</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5, marginTop: 2 }}>김민준님</h2>
          </div>
          <div style={{ position: "relative" }}>
            <button style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={20} color="white" />
            </button>
            <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "#F59E0B", border: "2px solid white" }} />
          </div>
        </div>

        {/* Active project card */}
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", borderRadius: 20, padding: 18, border: "1px solid rgba(255,255,255,0.25)" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: 0.5, textTransform: "uppercase" }}>활성 프로젝트</span>
            <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 20, padding: "3px 10px" }}>
              <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>진행중</span>
            </div>
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 4 }}>2024 봄 정기공연</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>한양대 중앙댄스동아리 STEP</p>
          <div className="flex items-center gap-4">
            <div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>D-Day</span>
              <p style={{ fontSize: 22, fontWeight: 800, color: "white", lineHeight: 1 }}>D-23</p>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.2)" }} />
            <div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>팀원</span>
              <p style={{ fontSize: 20, fontWeight: 800, color: "white", lineHeight: 1 }}>12명</p>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.2)" }} />
            <div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>포메이션</span>
              <p style={{ fontSize: 20, fontWeight: 800, color: "white", lineHeight: 1 }}>8개</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronRight size={18} color="white" />
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: 14, background: "rgba(255,255,255,0.2)", borderRadius: 8, height: 6 }}>
            <div style={{ width: "68%", height: "100%", borderRadius: 8, background: "rgba(255,255,255,0.9)" }} />
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 6, display: "block" }}>진행률 68%</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "24px 20px", paddingTop: 28 }}>
        {/* Quick actions */}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 12 }}>빠른 메뉴</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickCards.map((c) => (
            <button key={c.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "white", borderRadius: 16, padding: "14px 4px", border: "none", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon size={18} color={c.color} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#374151", textAlign: "center", lineHeight: 1.3 }}>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6">
          {[
            { label: "이번 달 연습", value: "14회", icon: TrendingUp, color: "#6C3AED" },
            { label: "전체 포메이션", value: "32개", icon: Zap, color: "#F59E0B" },
            { label: "공연 준비도", value: "87%", icon: Star, color: "#10B981" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "white", borderRadius: 16, padding: "14px 10px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <s.icon size={16} color={s.color} style={{ margin: "0 auto 6px" }} />
              <p style={{ fontSize: 17, fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Today's schedule */}
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>오늘 일정</h3>
          <button style={{ fontSize: 12, color: "#6C3AED", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>전체보기</button>
        </div>
        <div className="flex flex-col gap-3">
          {schedules.map((s) => (
            <div key={s.title} style={{ background: "white", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 4, height: 48, borderRadius: 4, background: s.color }} />
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.color + "18", borderRadius: 6, padding: "2px 8px" }}>{s.type}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{s.title}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{s.time} · {s.place}</p>
              </div>
              <ChevronRight size={16} color="#D1D5DB" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
