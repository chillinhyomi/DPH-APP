import { Bell, Pin } from "lucide-react";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  isRead: boolean;
}

const MOCK_NOTICES: Notice[] = [
  {
    id: "1",
    title: "서비스 점검 안내",
    content: "2026년 6월 10일 새벽 2시부터 4시까지 서비스 점검이 있습니다.",
    date: "2026-06-03",
    isPinned: true,
    isRead: false,
  },
  {
    id: "2",
    title: "새로운 기능 업데이트",
    content: "타임라인 편집 기능이 추가되었습니다. 이제 더욱 편리하게 공연을 준비할 수 있습니다.",
    date: "2026-06-01",
    isPinned: false,
    isRead: true,
  },
  {
    id: "3",
    title: "이용 가이드",
    content: "DPH 사용 방법을 안내하는 튜토리얼 영상이 준비되었습니다.",
    date: "2026-05-28",
    isPinned: false,
    isRead: true,
  },
];

export function NoticesPage() {
  const pinnedNotices = MOCK_NOTICES.filter(n => n.isPinned);
  const normalNotices = MOCK_NOTICES.filter(n => !n.isPinned);

  return (
    <MobilePage>
      <PageHeader
        title="공지사항"
        subtitle={`총 ${MOCK_NOTICES.length}개`}
        showBack={true}
      />

      <PageContent>
        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              고정 공지
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {pinnedNotices.map(notice => (
                <div
                  key={notice.id}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    borderLeft: "4px solid var(--accent)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                    <Pin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: 4,
                      }}>
                        {notice.title}
                      </h4>
                      <p style={{
                        fontSize: 14,
                        color: "var(--muted-foreground)",
                        lineHeight: 1.6,
                      }}>
                        {notice.content}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    marginTop: 8,
                  }}>
                    {notice.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Normal Notices */}
        <div>
          {normalNotices.length > 0 && pinnedNotices.length > 0 && (
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              일반 공지
            </h3>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {normalNotices.map(notice => (
              <div
                key={notice.id}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1px solid var(--border)",
                  opacity: notice.isRead ? 0.7 : 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                  <Bell size={16} color="var(--muted-foreground)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--foreground)",
                      marginBottom: 4,
                    }}>
                      {notice.title}
                    </h4>
                    <p style={{
                      fontSize: 14,
                      color: "var(--muted-foreground)",
                      lineHeight: 1.6,
                    }}>
                      {notice.content}
                    </p>
                  </div>
                </div>
                <div style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  marginTop: 8,
                }}>
                  {notice.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContent>
    </MobilePage>
  );
}
