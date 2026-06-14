import { useState } from "react";
import { Search, Plus, ChevronRight, Filter } from "lucide-react";

const DANCERS = [
  { id: 1, name: "김민준", role: "리더", team: "A팀", color: "#6C3AED", joined: "2022.03", formations: 8, rehearsals: 24 },
  { id: 2, name: "이지은", role: "메인댄서", team: "A팀", color: "#EC4899", joined: "2022.03", formations: 8, rehearsals: 22 },
  { id: 3, name: "박서준", role: "댄서", team: "B팀", color: "#0EA5E9", joined: "2023.03", formations: 6, rehearsals: 18 },
  { id: 4, name: "최하린", role: "댄서", team: "A팀", color: "#10B981", joined: "2023.09", formations: 5, rehearsals: 15 },
  { id: 5, name: "정도현", role: "댄서", team: "B팀", color: "#F59E0B", joined: "2023.09", formations: 5, rehearsals: 16 },
  { id: 6, name: "한소희", role: "메인댄서", team: "B팀", color: "#8B5CF6", joined: "2022.09", formations: 7, rehearsals: 21 },
  { id: 7, name: "오준서", role: "댄서", team: "A팀", color: "#14B8A6", joined: "2024.03", formations: 3, rehearsals: 10 },
  { id: 8, name: "임채원", role: "댄서", team: "B팀", color: "#EF4444", joined: "2024.03", formations: 3, rehearsals: 9 },
];

const ROLE_COLORS: Record<string, string> = {
  "리더": "#6C3AED",
  "메인댄서": "#EC4899",
  "댄서": "#6B7280",
};

const TEAMS = ["전체", "A팀", "B팀"];

export function DancerManagementScreen() {
  const [activeTeam, setActiveTeam] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = DANCERS.filter(d =>
    (activeTeam === "전체" || d.team === activeTeam) &&
    d.name.includes(query)
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", background: "white", borderBottom: "1px solid #F1F0FF" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>댄서 관리</h1>
          <div className="flex gap-2">
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Filter size={16} color="#6C3AED" />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,58,237,0.35)" }}>
              <Plus size={20} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        {/* Search */}
        <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, border: "1.5px solid #EDE9FE", marginBottom: 14 }}>
          <Search size={16} color="#A78BFA" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="댄서 이름 검색..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827" }} />
        </div>
        {/* Team tabs */}
        <div className="flex gap-2">
          {TEAMS.map(t => (
            <button key={t} onClick={() => setActiveTeam(t)} style={{ padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: activeTeam === t ? "#6C3AED" : "#F1F0FF", color: activeTeam === t ? "white" : "#6B7280", boxShadow: activeTeam === t ? "0 4px 12px rgba(108,58,237,0.3)" : "none" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: "14px 20px", background: "white", borderBottom: "1px solid #F1F0FF", display: "flex", gap: 12 }}>
        {[
          { label: "총 댄서", value: `${filtered.length}명`, color: "#6C3AED" },
          { label: "A팀", value: `${DANCERS.filter(d => d.team === "A팀").length}명`, color: "#EC4899" },
          { label: "B팀", value: `${DANCERS.filter(d => d.team === "B팀").length}명`, color: "#0EA5E9" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#F9FAFB", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Dancer list */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: "white", borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", cursor: "pointer" }}>
            {/* Avatar */}
            <div style={{ width: 48, height: 48, borderRadius: 15, background: d.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `2px solid ${d.color}33` }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: d.color }}>{d.name[1]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{d.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: ROLE_COLORS[d.role], background: ROLE_COLORS[d.role] + "18", borderRadius: 6, padding: "2px 7px" }}>{d.role}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 6, padding: "2px 7px", border: "1px solid #E5E7EB" }}>{d.team}</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>포메이션 {d.formations}개</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>연습 {d.rehearsals}회</span>
              </div>
            </div>
            <ChevronRight size={16} color="#E5E7EB" />
          </div>
        ))}
      </div>
    </div>
  );
}
