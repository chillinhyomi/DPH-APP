import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, Calendar } from "lucide-react";
import { useApp, ScheduleEvent } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const TYPE_COLORS: Record<string, string> = {
  "리허설": "#6366F1",
  "공연": "#EF4444",
  "회의": "#0EA5E9",
  "기타": "#10B981",
};

function getDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  const arr: (number | null)[] = Array(first).fill(null);
  for (let i = 1; i <= last; i++) arr.push(i);
  return arr;
}

function AddEventModal({ onClose, onAdd }: { onClose: () => void; onAdd: (e: Omit<ScheduleEvent, "id">) => void }) {
  const { projects } = useApp();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Current date
  const [start, setStart] = useState("14:00");
  const [end, setEnd] = useState("17:00");
  const [type, setType] = useState<ScheduleEvent["type"]>("리허설");
  const [place, setPlace] = useState("");
  const [projectId, setProjectId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date) return;
    onAdd({ title, date, startTime: start, endTime: end, type, place, projectId: projectId || null });
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "var(--card)", borderRadius: 20, padding: "24px", width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)" }}>일정 추가</h2>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 10, background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color="var(--foreground)" />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>일정명 *</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 합동 리허설" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>날짜 *</label>
            <input required type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>시작</label>
              <input type="time" value={start} onChange={e => setStart(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>종료</label>
              <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>장소</label>
            <input value={place} onChange={e => setPlace(e.target.value)} placeholder="예: 공연 연습실 B" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", display: "block", marginBottom: 6 }}>유형</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["리허설", "공연", "회의", "기타"] as ScheduleEvent["type"][]).map(t => (
                <button key={t} type="button" onClick={() => setType(t)} style={{ padding: "12px", borderRadius: 12, background: type === t ? TYPE_COLORS[t] : "var(--muted)", border: "none", color: type === t ? "white" : "var(--foreground)", fontSize: 14, fontWeight: 700, cursor: "pointer", minHeight: 48 }}>{t}</button>
              ))}
            </div>
          </div>
          <button type="submit" style={{ padding: "14px", borderRadius: 12, background: "var(--accent)", color: "white", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer", marginTop: 8, minHeight: 48 }}>
            일정 추가
          </button>
        </form>
      </div>
    </div>
  );
}

export function SchedulePage() {
  const { scheduleEvents, addScheduleEvent } = useApp();
  // Use current system date
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);

  const days = getDays(year, month);

  const eventsForDay = (d: number) => {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return scheduleEvents.filter(e => e.date === ds);
  };

  const today = new Date().toISOString().split('T')[0];
  const selectedEvents = scheduleEvents.filter(e => e.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const todayEvents = scheduleEvents.filter(e => e.date === today);
  const upcomingEvents = scheduleEvents.filter(e => e.date > today).slice(0, 3);

  return (
    <>
      {showAdd && <AddEventModal onClose={() => setShowAdd(false)} onAdd={addScheduleEvent} />}

      <MobilePage>
        <PageHeader
          title="일정 관리"
          subtitle="리허설 및 공연 일정"
          showBack={true}
          action={
            <button
              onClick={() => setShowAdd(true)}
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

        <PageContent>
          {/* Calendar */}
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "16px",
            border: "1px solid var(--border)",
            marginBottom: 24,
          }}>
            {/* Month nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <button
                onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}
                style={{ width: 40, height: 40, borderRadius: 12, background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 44 }}
              >
                <ChevronLeft size={20} color="var(--foreground)" />
              </button>
              <span style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)" }}>{year}년 {month + 1}월</span>
              <button
                onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}
                style={{ width: 40, height: 40, borderRadius: 12, background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 44 }}
              >
                <ChevronRight size={20} color="var(--foreground)" />
              </button>
            </div>

            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8, gap: "2px" }}>
              {DAYS.map((d, i) => (
                <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: i === 0 ? "#EF4444" : i === 6 ? "#3B82F6" : "var(--muted-foreground)", padding: "8px 0" }}>{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
              {days.map((day, i) => {
                if (!day) return <div key={`e${i}`} style={{ aspectRatio: "1" }} />;
                const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const evts = eventsForDay(day);
                const isSel = ds === selectedDate;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(ds)}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 12,
                      background: isSel ? "var(--accent)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      position: "relative",
                      minHeight: 44,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: isSel ? 700 : 400, color: isSel ? "white" : i % 7 === 0 ? "#EF4444" : i % 7 === 6 ? "#3B82F6" : "var(--foreground)" }}>{day}</span>
                    {evts.length > 0 && (
                      <div style={{ display: "flex", gap: 2 }}>
                        {evts.slice(0, 3).map(e => (
                          <div key={e.id} style={{ width: 4, height: 4, borderRadius: "50%", background: isSel ? "white" : TYPE_COLORS[e.type] }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(TYPE_COLORS).map(([t, c]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Events */}
          {todayEvents.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 12 }}>
                오늘 일정
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {todayEvents.map(e => (
                  <div key={e.id} style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    borderLeft: `4px solid ${TYPE_COLORS[e.type]}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: TYPE_COLORS[e.type], background: TYPE_COLORS[e.type] + "18", borderRadius: 8, padding: "3px 8px" }}>{e.type}</span>
                        </div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>{e.title}</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Clock size={14} color="var(--muted-foreground)" />
                            <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{e.startTime} – {e.endTime}</span>
                          </div>
                          {e.place && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <MapPin size={14} color="var(--muted-foreground)" />
                              <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{e.place}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 12 }}>
                다가오는 일정
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {upcomingEvents.map(e => (
                  <div key={e.id} style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: TYPE_COLORS[e.type] + "18",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: TYPE_COLORS[e.type], lineHeight: 1 }}>
                          {e.date.split("-")[2]}
                        </span>
                        <span style={{ fontSize: 10, color: TYPE_COLORS[e.type], fontWeight: 600 }}>
                          {month + 1}월
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>{e.title}</h4>
                        <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                          {e.startTime} · {e.place}
                        </div>
                      </div>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: TYPE_COLORS[e.type],
                        background: TYPE_COLORS[e.type] + "18",
                        borderRadius: 8,
                        padding: "4px 8px",
                      }}>
                        {e.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Date Events */}
          {selectedDate !== today && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 12 }}>
                {selectedDate.replace(/-/g, ". ")} 일정
              </h3>
              {selectedEvents.length === 0 ? (
                <div style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  padding: "32px 24px",
                  textAlign: "center",
                  border: "1px solid var(--border)",
                }}>
                  <Calendar size={32} color="var(--muted-foreground)" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 16 }}>
                    이 날에는 등록된 일정이 없습니다
                  </p>
                  <button
                    onClick={() => setShowAdd(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      background: "var(--accent)",
                      color: "white",
                      fontSize: 14,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      minHeight: 48,
                    }}
                  >
                    일정 추가
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {selectedEvents.map(e => (
                    <div key={e.id} style={{
                      background: "var(--card)",
                      borderRadius: 16,
                      padding: "16px",
                      border: "1px solid var(--border)",
                      borderLeft: `4px solid ${TYPE_COLORS[e.type]}`,
                    }}>
                      <div style={{ marginBottom: 8 }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: TYPE_COLORS[e.type],
                          background: TYPE_COLORS[e.type] + "18",
                          borderRadius: 8,
                          padding: "3px 8px",
                        }}>
                          {e.type}
                        </span>
                      </div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>{e.title}</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Clock size={14} color="var(--muted-foreground)" />
                          <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{e.startTime} – {e.endTime}</span>
                        </div>
                        {e.place && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <MapPin size={14} color="var(--muted-foreground)" />
                            <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{e.place}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </PageContent>
      </MobilePage>
    </>
  );
}
