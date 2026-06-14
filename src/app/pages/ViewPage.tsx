import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Map, Users, ArrowRight, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";
import { StageCanvas } from "../components/workspace/StageCanvas";

const TABS = [
  { id: "my", label: "내 위치", icon: Map },
  { id: "all", label: "전체 포메이션", icon: Users },
  { id: "path", label: "이동 동선", icon: ArrowRight },
  { id: "memo", label: "안무 메모", icon: MessageSquare },
];

export function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, members: allMembers, formations: allFormations, currentUser } = useApp();

  const project = projects.find(p => p.id === id);
  const members = allMembers[id!] || [];
  const formations = allFormations[id!] || [];
  const [activeTab, setActiveTab] = useState("all");
  const [activeFormationIdx, setActiveFormationIdx] = useState(0);

  const myMember = members.find(m => m.userId === currentUser?.uid);
  const activeFormation = formations[activeFormationIdx] || null;
  const myPosition = activeFormation?.positions.find(p => p.memberId === myMember?.id);

  if (!project) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, background: "#F8FAFC" }}>
        <p style={{ fontSize: 16, color: "#6B7280" }}>프로젝트를 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/projects")} style={{ padding: "10px 20px", borderRadius: 10, background: "#6C3AED", color: "white", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
          프로젝트 목록으로
        </button>
      </div>
    );
  }

  const MEMO_TEXT = `안무 메모 - ${project.title}

[포메이션 전환 시 주의사항]
• 오프닝→1절: 각자 좌우로 이동, 2박자 이동
• 1절→후렴: 센터 집결 후 퍼짐, 4박자
• 후렴→브릿지: 가로 일렬, 빠른 전환 2박자
• 브릿지→엔딩: 원래 포지션으로 복귀

[개인 파트 타이밍]
- 인트로 8박: 제자리 포즈
- 1절 버스: 이동 시작
- 후렴 16박: 메인 동선
- 아웃트로: 서서히 원위치

[음악 큐 포인트]
⏱ 0:00 - 오프닝 포메이션
⏱ 0:32 - 1절로 전환
⏱ 1:04 - 후렴 집결
⏱ 1:28 - 브릿지 분산`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#F8FAFC", overflow: "hidden", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <header style={{ padding: "0 24px", height: 56, background: "white", borderBottom: "1px solid #EDE9FE", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={() => navigate("/projects")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6C3AED" }}>
          <ChevronLeft size={18} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>목록</span>
        </button>
        <div style={{ width: 1, height: 18, background: "#EDE9FE" }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{project.title}</span>
          <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 8 }}>조회 전용</span>
        </div>
        {myMember && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 10, background: "#EDE9FE" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: myMember.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "white" }}>{myMember.name[0]}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#6C3AED" }}>{myMember.name} ({myMember.dancerRole})</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: "#FEF3C7", border: "1px solid #FDE68A" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#92400E" }}>👁 조회 전용</span>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #EDE9FE", padding: "0 24px", display: "flex", gap: 0, flexShrink: 0 }}>
        {TABS.map(t => {
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 18px", background: "none", border: "none", borderBottom: isActive ? "2.5px solid #6C3AED" : "2.5px solid transparent", cursor: "pointer", marginBottom: -1, color: isActive ? "#6C3AED" : "#6B7280", fontWeight: isActive ? 700 : 500, fontSize: 13 }}>
              <t.icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {(activeTab === "all" || activeTab === "my") && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Formation selector */}
            <div style={{ padding: "12px 24px", background: "#F8FAFC", borderBottom: "1px solid #EDE9FE", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>포메이션:</span>
              {formations.map((f, i) => (
                <button key={f.id} onClick={() => setActiveFormationIdx(i)} style={{ padding: "6px 14px", borderRadius: 8, background: i === activeFormationIdx ? "#6C3AED" : "white", color: i === activeFormationIdx ? "white" : "#374151", fontSize: 12, fontWeight: 600, border: i === activeFormationIdx ? "none" : "1px solid #E5E7EB", cursor: "pointer" }}>
                  {f.name}
                </button>
              ))}
            </div>

            {/* Canvas (read-only) */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <StageCanvas
                members={activeTab === "my" && myMember ? [myMember] : members}
                formation={activeFormation}
                selectedMemberId={myMember?.id || null}
                onSelectMember={() => {}}
                onPositionChange={() => {}}
                stageWidth={project.stageWidth}
                stageHeight={project.stageHeight}
                readOnly
              />
            </div>

            {/* My position info */}
            {activeTab === "my" && myPosition && (
              <div style={{ padding: "12px 24px", background: "white", borderTop: "1px solid #EDE9FE", display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: myMember?.color || "#6C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{myMember?.name?.[0]}</span>
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>내 위치</span>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1 }}>
                    X: {Math.round(myPosition.x * 100)}% · Y: {Math.round(myPosition.y * 100)}%
                  </div>
                </div>
                <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 8, background: "#EDE9FE" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6C3AED" }}>{activeFormation?.name}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "path" && (
          <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16 }}>포메이션별 이동 동선</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {formations.map((f, i) => {
                const nextF = formations[i + 1];
                if (!nextF) return null;
                return (
                  <div key={f.id} style={{ background: "white", borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #EDE9FE" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#6C3AED", background: "#EDE9FE", borderRadius: 8, padding: "3px 10px" }}>{f.name}</span>
                      <ArrowRight size={14} color="#9CA3AF" />
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#6C3AED", background: "#EDE9FE", borderRadius: 8, padding: "3px 10px" }}>{nextF.name}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#9CA3AF" }}>전환 시간: {f.duration}초</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {members.map(m => {
                        const from = f.positions.find(p => p.memberId === m.id);
                        const to = nextF.positions.find(p => p.memberId === m.id);
                        if (!from || !to) return null;
                        const dist = Math.round(Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)) * (project.stageWidth + project.stageHeight) / 2 * 10) / 10;
                        return (
                          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: "#F9FAFB", border: "1px solid #EDE9FE" }}>
                            <div style={{ width: 18, height: 18, borderRadius: 6, background: m.color }} />
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{m.name}</span>
                            <span style={{ fontSize: 10, color: "#9CA3AF" }}>~{dist}m</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "memo" && (
          <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
            <div style={{ background: "white", borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #EDE9FE" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16 }}>안무 메모</h2>
              <pre style={{ fontSize: 14, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap" as const, fontFamily: "var(--font-family)" }}>
                {MEMO_TEXT}
              </pre>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          header {
            padding: 0 16px !important;
            height: 52px !important;
          }
          .view-content {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
