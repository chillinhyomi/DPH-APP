import { useNavigate } from "react-router";
import { Plus, FolderOpen, Calendar, Users, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageContent } from "../components/MobilePage";

export function HomePage() {
  const navigate = useNavigate();
  const { currentUser, projects, scheduleEvents } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = scheduleEvents.filter(e => e.date >= today).slice(0, 3);
  const recentProjects = projects.slice(0, 3);

  const eventTypeColor: Record<string, string> = {
    "리허설": "#6366F1",
    "공연": "#EF4444",
    "회의": "#0EA5E9",
    "기타": "#10B981",
  };

  return (
    <MobilePage>
      {/* Hero Section */}
      <div style={{
        background: "var(--card)",
        padding: "24px 16px",
        borderBottom: "1px solid var(--border)",
      }}>
        <h1 style={{
          fontSize: 24,
          fontWeight: 800,
          color: "var(--foreground)",
          marginBottom: 8,
          letterSpacing: -0.5,
        }}>
          안녕하세요,<br />{currentUser?.name}님
        </h1>
        <p style={{
          fontSize: 15,
          color: "var(--muted-foreground)",
          marginBottom: 20,
        }}>
          오늘도 멋진 공연을 준비해보세요
        </p>
        <button
          onClick={() => navigate("/projects?create=1")}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 16,
            background: "var(--accent)",
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            minHeight: 48,
          }}
        >
          <Plus size={20} strokeWidth={2.5} />
          새 프로젝트 만들기
        </button>
      </div>

      <PageContent>
        {/* 오늘 일정 */}
        {upcomingEvents.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}>
              <h2 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--foreground)",
              }}>
                오늘 일정
              </h2>
              <button
                onClick={() => navigate("/schedule")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "var(--muted-foreground)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                전체보기
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {upcomingEvents.slice(0, 2).map(e => (
                <div
                  key={e.id}
                  onClick={() => navigate("/schedule")}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    minHeight: 48,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: eventTypeColor[e.type] + "18",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: eventTypeColor[e.type],
                        lineHeight: 1,
                      }}>
                        {e.date.split("-")[2]}
                      </span>
                      <span style={{
                        fontSize: 10,
                        color: eventTypeColor[e.type],
                        fontWeight: 600,
                      }}>
                        5월
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: 4,
                      }}>
                        {e.title}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: "var(--muted-foreground)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                        <Clock size={12} />
                        {e.startTime} · {e.place}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: eventTypeColor[e.type],
                      background: eventTypeColor[e.type] + "18",
                      borderRadius: 8,
                      padding: "4px 8px",
                    }}>
                      {e.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 진행중 프로젝트 */}
        <section style={{ marginBottom: 32 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--foreground)",
            }}>
              진행중 프로젝트
            </h2>
            <button
              onClick={() => navigate("/projects")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "var(--muted-foreground)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              전체보기
              <ArrowRight size={16} />
            </button>
          </div>

          {recentProjects.length === 0 ? (
            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <FolderOpen size={28} color="var(--muted-foreground)" />
              </div>
              <p style={{
                fontSize: 15,
                color: "var(--muted-foreground)",
                fontWeight: 600,
                marginBottom: 8,
              }}>
                진행중인 프로젝트가 없습니다
              </p>
              <p style={{
                fontSize: 14,
                color: "var(--muted-foreground)",
              }}>
                새 프로젝트를 만들어보세요
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentProjects.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/project/${p.id}`)}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    minHeight: 48,
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}>
                    <div>
                      <div style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: 4,
                      }}>
                        {p.title}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: "var(--muted-foreground)",
                      }}>
                        {p.updatedAt} 수정
                      </div>
                    </div>
                    <ChevronRight size={20} color="var(--muted-foreground)" />
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}>
                    <div style={{
                      background: "var(--muted)",
                      borderRadius: 12,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <Users size={16} color="var(--muted-foreground)" />
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--foreground)",
                      }}>
                        팀원 {p.memberCount}명
                      </span>
                    </div>
                    <div style={{
                      background: "var(--muted)",
                      borderRadius: 12,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <Calendar size={16} color="var(--muted-foreground)" />
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--foreground)",
                      }}>
                        {p.performanceDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 최근 포메이션 */}
        <section>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--foreground)",
            }}>
              최근 포메이션
            </h2>
            <button
              onClick={() => navigate("/formations")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "var(--muted-foreground)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              전체보기
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "16px",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: 14,
              color: "var(--muted-foreground)",
            }}>
              프로젝트에서 포메이션을 추가해보세요
            </p>
          </div>
        </section>
      </PageContent>
    </MobilePage>
  );
}
