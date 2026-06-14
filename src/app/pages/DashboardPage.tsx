import { useNavigate } from "react-router";
import { FolderOpen, Calendar, Users, Layers, ArrowRight, Clock, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageContent } from "../components/MobilePage";

export function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser, projects, scheduleEvents } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);
  const upcomingEvents = scheduleEvents.filter(e => e.date >= today).slice(0, 2);
  const recentProjects = projects.slice(0, 2);

  const stats = [
    { label: "진행중 프로젝트", value: projects.length, icon: FolderOpen, color: "var(--accent)", path: "/projects" },
    { label: "이번 달 일정", value: scheduleEvents.filter(e => e.date.startsWith(currentMonth)).length, icon: Calendar, color: "#EC4899", path: "/schedule" },
    { label: "참여 댄서", value: 12, icon: Users, color: "#0EA5E9", path: "/members" },
    { label: "총 포메이션", value: projects.reduce((s, p) => s + p.formationCount, 0), icon: Layers, color: "#F59E0B", path: "/formations" },
  ];

  const eventTypeColor: Record<string, string> = {
    "리허설": "var(--accent)",
    "공연": "#EF4444",
    "회의": "#0EA5E9",
    "기타": "#10B981",
  };

  return (
    <MobilePage>
      {/* Hero */}
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
          대시보드
        </h1>
        <p style={{
          fontSize: 15,
          color: "var(--muted-foreground)",
          marginBottom: 20,
        }}>
          안녕하세요, {currentUser?.name}님!
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
        {/* Quick Stats */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            현황
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {stats.map(stat => (
              <div
                key={stat.label}
                onClick={() => navigate(stat.path)}
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
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${stat.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "var(--foreground)",
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  fontWeight: 600,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
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
                다가오는 일정
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
              {upcomingEvents.map(e => (
                <div
                  key={e.id}
                  onClick={() => navigate("/schedule")}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
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

        {/* Recent Projects */}
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
              최근 프로젝트
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
              padding: "32px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <p style={{
                fontSize: 14,
                color: "var(--muted-foreground)",
              }}>
                프로젝트가 없습니다
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
                  }}
                >
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--foreground)",
                    marginBottom: 12,
                  }}>
                    {p.title}
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
                        {p.memberCount}명
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
                        {p.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </PageContent>
    </MobilePage>
  );
}
