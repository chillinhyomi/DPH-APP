import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(first).fill(null);
  for (let i = 1; i <= last; i++) days.push(i);
  return days;
}

const EVENTS: Record<number, { color: string; label: string }[]> = {
  3: [{ color: "#6C3AED", label: "합동연습" }],
  7: [{ color: "#10B981", label: "개인연습" }],
  10: [{ color: "#F59E0B", label: "무대체크" }],
  15: [{ color: "#EC4899", label: "리허설" }, { color: "#6C3AED", label: "합동" }],
  18: [{ color: "#EF4444", label: "공연" }],
  22: [{ color: "#10B981", label: "개인연습" }],
  28: [{ color: "#6C3AED", label: "합동연습" }],
};

const TODAY_SCHEDULE = [
  { time: "14:00", end: "16:00", title: "합동 리허설", place: "공연 연습실 B", type: "리허설", attendees: 12, color: "#6C3AED" },
  { time: "19:00", end: "21:00", title: "개인 안무 연습", place: "자유 연습실 3", type: "개인", attendees: 1, color: "#10B981" },
];

export function ScheduleScreen() {
  const [year] = useState(2024);
  const [month, setMonth] = useState(4);
  const [selected, setSelected] = useState(3);
  const days = getCalendarDays(year, month);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", background: "white", borderBottom: "1px solid #F1F0FF" }}>
        <div className="flex items-center justify-between mb-2">
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>일정 관리</h1>
          <button style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,58,237,0.35)" }}>
            <Plus size={20} color="white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div style={{ background: "white", padding: "16px 20px", borderBottom: "1px solid #F1F0FF" }}>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(m => Math.max(0, m - 1))} style={{ width: 32, height: 32, borderRadius: 10, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={16} color="#6C3AED" />
          </button>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{year}년 {MONTHS[month]}</span>
          <button onClick={() => setMonth(m => Math.min(11, m + 1))} style={{ width: 32, height: 32, borderRadius: 10, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={16} color="#6C3AED" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d, i) => (
            <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: i === 0 ? "#EF4444" : i === 6 ? "#3B82F6" : "#9CA3AF", paddingBottom: 6 }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {days.map((day, i) => {
            if (!day) return <div key={`e${i}`} />;
            const isSelected = day === selected;
            const hasEvents = EVENTS[day];
            const isToday = day === 3;
            return (
              <div
                key={day}
                onClick={() => setSelected(day)}
                style={{ textAlign: "center", cursor: "pointer", padding: "4px 0" }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 10, background: isSelected ? "#6C3AED" : isToday ? "#EDE9FE" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <span style={{ fontSize: 13, fontWeight: isSelected || isToday ? 700 : 400, color: isSelected ? "white" : i % 7 === 0 ? "#EF4444" : i % 7 === 6 ? "#3B82F6" : "#111827" }}>{day}</span>
                </div>
                {hasEvents && (
                  <div className="flex justify-center gap-0.5 mt-1">
                    {hasEvents.slice(0, 2).map((e, j) => (
                      <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: e.color }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily schedule */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
          {month + 1}월 {selected}일 일정
        </h3>
        {(selected === 3 ? TODAY_SCHEDULE : []).length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize: 14, color: "#9CA3AF" }}>등록된 일정이 없습니다</p>
          </div>
        ) : (
          (selected === 3 ? TODAY_SCHEDULE : []).map((s, i) => (
            <div key={i} style={{ background: "white", borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", gap: 14 }}>
              <div style={{ width: 4, borderRadius: 4, background: s.color, alignSelf: "stretch" }} />
              <div style={{ flex: 1 }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.color + "18", borderRadius: 6, padding: "2px 8px" }}>{s.type}</span>
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{s.title}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} color="#9CA3AF" />
                    <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{s.time} - {s.end}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} color="#9CA3AF" />
                    <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{s.place}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Users size={12} color="#9CA3AF" />
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{s.attendees}명 참가</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
