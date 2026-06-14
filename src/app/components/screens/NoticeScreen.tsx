import { useState } from "react";
import { Bell, ChevronRight, Megaphone, AlertCircle, Star, Check } from "lucide-react";

const NOTICES = [
  {
    id: 1,
    type: "공지",
    typeColor: "#6C3AED",
    icon: Megaphone,
    title: "5월 정기공연 최종 리허설 일정 안내",
    preview: "오는 5월 15일(수) 오후 2시부터 공연장 현장 리허설을 진행합니다. 반드시 참석해주시기 바랍니다.",
    date: "2024.04.28",
    isRead: false,
    isPinned: true,
  },
  {
    id: 2,
    type: "중요",
    typeColor: "#EF4444",
    icon: AlertCircle,
    title: "무대 의상 사이즈 측정 마감 안내",
    preview: "의상 제작을 위한 사이즈 측정이 4월 30일까지 완료되어야 합니다. 미제출자는...",
    date: "2024.04.26",
    isRead: false,
    isPinned: false,
  },
  {
    id: 3,
    type: "일반",
    typeColor: "#10B981",
    icon: Bell,
    title: "4월 월간 연습 일정표 공유",
    preview: "4월 전체 연습 일정을 공유드립니다. 개인 사정에 따른 불참 시 사전에 알려주세요.",
    date: "2024.04.20",
    isRead: true,
    isPinned: false,
  },
  {
    id: 4,
    type: "공지",
    typeColor: "#6C3AED",
    icon: Megaphone,
    title: "연습실 이용 수칙 업데이트",
    preview: "연습실 예약 시스템이 변경되었습니다. 앱에서 직접 예약 가능합니다.",
    date: "2024.04.15",
    isRead: true,
    isPinned: false,
  },
  {
    id: 5,
    type: "이벤트",
    typeColor: "#F59E0B",
    icon: Star,
    title: "전국 댄스 경연대회 참가 신청 안내",
    preview: "6월 전국 대학생 댄스 경연대회 참가 신청을 받습니다. 관심 있는 분들은...",
    date: "2024.04.10",
    isRead: true,
    isPinned: false,
  },
];

const FILTER_TABS = ["전체", "공지", "중요", "이벤트"];

export function NoticeScreen() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(1);

  const filtered = NOTICES.filter(n => activeFilter === "전체" || n.type === activeFilter);
  const unreadCount = NOTICES.filter(n => !n.isRead).length;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", background: "white", borderBottom: "1px solid #F1F0FF" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>공지사항</h1>
            {unreadCount > 0 && (
              <div style={{ background: "#EF4444", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "white" }}>{unreadCount}</span>
              </div>
            )}
          </div>
          <button style={{ fontSize: 12, color: "#6C3AED", fontWeight: 600, background: "#F5F3FF", borderRadius: 10, padding: "6px 12px", border: "none", cursor: "pointer" }}>
            전체 읽음
          </button>
        </div>
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {FILTER_TABS.map(t => (
            <button key={t} onClick={() => setActiveFilter(t)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", whiteSpace: "nowrap", background: activeFilter === t ? "#6C3AED" : "#F1F0FF", color: activeFilter === t ? "white" : "#6B7280", boxShadow: activeFilter === t ? "0 4px 12px rgba(108,58,237,0.3)" : "none" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(n => (
          <div
            key={n.id}
            onClick={() => setExpanded(expanded === n.id ? null : n.id)}
            style={{ background: "white", borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", cursor: "pointer", border: n.isPinned ? "1.5px solid #EDE9FE" : "1.5px solid transparent" }}
          >
            <div className="flex items-start gap-12">
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2 mb-2">
                  {n.isPinned && <span style={{ fontSize: 9, fontWeight: 700, color: "#6C3AED", background: "#EDE9FE", borderRadius: 5, padding: "2px 6px" }}>고정</span>}
                  <span style={{ fontSize: 10, fontWeight: 700, color: n.typeColor, background: n.typeColor + "18", borderRadius: 6, padding: "2px 8px" }}>{n.type}</span>
                  {!n.isRead && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: n.isRead ? 600 : 700, color: n.isRead ? "#374151" : "#111827", lineHeight: 1.4, marginBottom: 6 }}>{n.title}</h4>
                {expanded === n.id ? (
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, marginBottom: 8 }}>{n.preview}</p>
                ) : (
                  <p style={{ fontSize: 12, color: "#9CA3AF", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{n.preview}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{n.date}</span>
                  {n.isRead ? (
                    <div className="flex items-center gap-1">
                      <Check size={10} color="#10B981" />
                      <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>읽음</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#EF4444" }}>미읽음</span>
                  )}
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: n.typeColor + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <n.icon size={14} color={n.typeColor} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
