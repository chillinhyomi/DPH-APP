import { useState } from "react";
import { Search, Plus, Users, Calendar, ChevronRight, MoreHorizontal } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "2024 봄 정기공연",
    team: "STEP 중앙댄스동아리",
    date: "2024.05.18",
    members: 12,
    formations: 8,
    progress: 68,
    status: "진행중",
    statusColor: "#6C3AED",
    coverGrad: "linear-gradient(135deg, #6C3AED 0%, #A78BFA 100%)",
    emoji: "💜",
  },
  {
    id: 2,
    title: "버스킹 퍼포먼스",
    team: "홍대 스트릿팀",
    date: "2024.04.06",
    members: 5,
    formations: 4,
    progress: 100,
    status: "완료",
    statusColor: "#10B981",
    coverGrad: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    emoji: "🟢",
  },
  {
    id: 3,
    title: "신입생 오리엔테이션 공연",
    team: "STEP 중앙댄스동아리",
    date: "2024.03.02",
    members: 8,
    formations: 3,
    progress: 42,
    status: "준비중",
    statusColor: "#F59E0B",
    coverGrad: "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
    emoji: "🟡",
  },
  {
    id: 4,
    title: "축제 경연대회",
    team: "한양대 K-POP 소모임",
    date: "2024.05.25",
    members: 15,
    formations: 10,
    progress: 20,
    status: "준비중",
    statusColor: "#F59E0B",
    coverGrad: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    emoji: "🔴",
  },
];

const tabs = ["전체", "진행중", "준비중", "완료"];

export function ProjectListScreen() {
  const [activeTab, setActiveTab] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = projects.filter(p => {
    const matchTab = activeTab === "전체" || p.status === activeTab;
    const matchQ = p.title.includes(query) || p.team.includes(query);
    return matchTab && matchQ;
  });

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", background: "white", borderBottom: "1px solid #F1F0FF" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>프로젝트</h1>
          <button style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,58,237,0.35)" }}>
            <Plus size={20} color="white" strokeWidth={2.5} />
          </button>
        </div>
        {/* Search */}
        <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, border: "1.5px solid #EDE9FE" }}>
          <Search size={16} color="#A78BFA" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="프로젝트 검색..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827" }}
          />
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: activeTab === t ? "#6C3AED" : "#F1F0FF",
                color: activeTab === t ? "white" : "#6B7280",
                boxShadow: activeTab === t ? "0 4px 12px rgba(108,58,237,0.3)" : "none",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
            {/* Cover strip */}
            <div style={{ height: 8, background: p.coverGrad }} />
            <div style={{ padding: "16px 18px" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 11, fontWeight: 700, color: p.statusColor, background: p.statusColor + "18", borderRadius: 6, padding: "2px 8px" }}>{p.status}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: -0.3 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{p.team}</p>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <MoreHorizontal size={18} color="#D1D5DB" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                  <Users size={12} color="#9CA3AF" />
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{p.members}명</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} color="#9CA3AF" />
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{p.date}</span>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{ fontSize: 12, color: "#6C3AED", fontWeight: 700 }}>포메이션 {p.formations}개</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>진행률</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{p.progress}%</span>
                </div>
                <div style={{ background: "#F1F0FF", borderRadius: 6, height: 6 }}>
                  <div style={{ width: `${p.progress}%`, height: "100%", borderRadius: 6, background: p.coverGrad }} />
                </div>
              </div>

              <button style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 12, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#6C3AED" }}>프로젝트 열기</span>
                <ChevronRight size={14} color="#6C3AED" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
