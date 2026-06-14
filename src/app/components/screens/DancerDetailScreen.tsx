import { ChevronLeft, Edit3, Calendar, Award, TrendingUp, Music2, MessageSquare, Star } from "lucide-react";

const FORMATION_HISTORY = [
  { name: "인트로", position: "센터", color: "#6C3AED" },
  { name: "버스1", position: "좌측", color: "#EC4899" },
  { name: "후렴1", position: "센터", color: "#6C3AED" },
  { name: "브릿지", position: "우측", color: "#0EA5E9" },
  { name: "후렴2", position: "센터", color: "#6C3AED" },
];

const STATS = [
  { label: "총 연습", value: "24회", icon: Calendar, color: "#6C3AED" },
  { label: "출석률", value: "96%", icon: TrendingUp, color: "#10B981" },
  { label: "포메이션", value: "8개", icon: Music2, color: "#F59E0B" },
  { label: "평점", value: "4.9", icon: Star, color: "#EC4899" },
];

export function DancerDetailScreen() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header hero */}
      <div style={{ background: "linear-gradient(160deg, #6C3AED 0%, #8B5CF6 100%)", padding: "52px 20px 24px" }}>
        <div className="flex items-center justify-between mb-6">
          <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={18} color="white" />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Edit3 size={16} color="white" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ width: 72, height: 72, borderRadius: 22, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid rgba(255,255,255,0.4)" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>준</span>
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>김민준</h1>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "3px 10px" }}>리더</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>A팀 · 2022년 3월 가입</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "white", margin: "0", padding: "16px 20px", borderBottom: "1px solid #F1F0FF" }}>
        <div className="grid grid-cols-4 gap-3">
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <s.icon size={16} color={s.color} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Current project */}
        <div style={{ background: "white", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Award size={14} color="#6C3AED" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>현재 프로젝트</h3>
          </div>
          <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#6C3AED", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>2024 봄 정기공연</p>
              <p style={{ fontSize: 12, color: "#9CA3AF" }}>STEP 중앙댄스동아리 · D-23</p>
            </div>
            <div style={{ marginLeft: "auto", background: "#6C3AED", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>진행중</span>
            </div>
          </div>
        </div>

        {/* Formation history */}
        <div style={{ background: "white", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Music2 size={14} color="#6C3AED" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>포메이션 배치</h3>
          </div>
          <div className="flex flex-col gap-2">
            {FORMATION_HISTORY.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#F9FAFB", borderRadius: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: f.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: f.color }}>F{i + 1}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", flex: 1 }}>{f.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: f.color, background: f.color + "15", borderRadius: 8, padding: "3px 10px" }}>{f.position}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: "white", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} color="#6C3AED" />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>메모</h3>
            </div>
            <button style={{ fontSize: 12, color: "#6C3AED", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>편집</button>
          </div>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, background: "#F9FAFB", borderRadius: 12, padding: "12px 14px" }}>
            센터 포지션 담당. 점프 턴 시 착지 연습 필요. 팔 라인 개선 중. 전반적으로 매우 안정적인 퍼포먼스 유지.
          </p>
        </div>
      </div>
    </div>
  );
}
