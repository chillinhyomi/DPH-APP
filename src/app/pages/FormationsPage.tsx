import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Play, Copy, Trash2, ChevronRight, Layers, Users } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function FormationsPage() {
  const navigate = useNavigate();
  const { projects, formations, members } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectFormations = formations[selectedProjectId || ""] || [];
  const projectMembers = members[selectedProjectId || ""] || [];

  const allFormations = projects.flatMap(p =>
    (formations[p.id] || []).map(f => ({ ...f, projectTitle: p.title }))
  );

  return (
    <MobilePage>
      <PageHeader
        title="포메이션"
        subtitle={`총 ${allFormations.length}개`}
        action={
          <button
            onClick={() => selectedProjectId && navigate(`/project/${selectedProjectId}`)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "var(--accent)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
            }}
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        }
      />

      <div style={{ background: "var(--card)", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)", marginBottom: 8 }}>프로젝트 선택</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {projects.map(p => {
            const isActive = p.id === selectedProjectId;
            const count = (formations[p.id] || []).length;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: isActive ? "var(--accent)" : "var(--muted)",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  minHeight: 44,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? "white" : "var(--foreground)", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: isActive ? "rgba(255,255,255,0.8)" : "var(--muted-foreground)", marginTop: 2 }}>
                  포메이션 {count}개
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <PageContent>
        {selectedProject ? (
          projectFormations.length === 0 ? (
            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Layers size={32} color="var(--muted-foreground)" />
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
                포메이션이 없습니다
              </p>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>
                편집기에서 포메이션을 추가해보세요
              </p>
              <button
                onClick={() => navigate(`/project/${selectedProject.id}`)}
                style={{
                  padding: "14px 24px",
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
                편집기 열기
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {projectFormations.map((f, idx) => (
                <div
                  key={f.id}
                  onClick={() => navigate(`/project/${selectedProject.id}`)}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                >
                  {/* Stage Preview */}
                  <div style={{ background: "#0F172A", height: 140, position: "relative", overflow: "hidden" }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <rect x="5" y="5" width="90" height="85" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="0.5" />
                      <line x1="50" y1="5" x2="50" y2="90" stroke="#334155" strokeWidth="0.3" strokeDasharray="2,2" />
                      <rect x="5" y="90" width="90" height="5" rx="1" fill="var(--accent)" opacity="0.3" />
                      {f.positions.map(pos => {
                        const member = projectMembers.find(m => m.id === pos.memberId);
                        if (!member) return null;
                        const cx = 5 + pos.x * 90;
                        const cy = 5 + pos.y * 85;
                        return (
                          <g key={pos.memberId}>
                            <circle cx={cx} cy={cy} r="4" fill={member.color} opacity="0.9" />
                            <text x={cx} y={cy + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize="3" fill="white" fontWeight="bold">
                              {member.name[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      background: "var(--accent)",
                      borderRadius: 8,
                      padding: "4px 10px",
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>#{idx + 1}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "16px" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
                      {f.name}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div style={{
                        background: "var(--muted)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}>
                        <Users size={14} color="var(--muted-foreground)" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
                          {f.positions.length}명
                        </span>
                      </div>
                      <div style={{
                        background: "var(--muted)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
                          {f.duration}초
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Card */}
              <div
                onClick={() => navigate(`/project/${selectedProject.id}`)}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  border: "2px dashed var(--border)",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  gap: 12,
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Plus size={24} color="var(--muted-foreground)" />
                </div>
                <span style={{ fontSize: 14, color: "var(--muted-foreground)", fontWeight: 600 }}>
                  포메이션 추가
                </span>
              </div>
            </div>
          )
        ) : (
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "48px 24px",
            textAlign: "center",
            border: "1px solid var(--border)",
          }}>
            <p style={{ fontSize: 15, color: "var(--muted-foreground)" }}>
              프로젝트를 선택해주세요
            </p>
          </div>
        )}
      </PageContent>
    </MobilePage>
  );
}
