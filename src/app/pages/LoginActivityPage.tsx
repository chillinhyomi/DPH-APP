import { Smartphone, Monitor, Clock } from "lucide-react";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function LoginActivityPage() {
  const loginHistory = [
    {
      id: "1",
      device: "iPhone 15 Pro",
      location: "서울, 대한민국",
      time: "2026-06-05 14:23",
      current: true,
      icon: Smartphone,
    },
    {
      id: "2",
      device: "MacBook Pro",
      location: "서울, 대한민국",
      time: "2026-06-04 09:15",
      current: false,
      icon: Monitor,
    },
    {
      id: "3",
      device: "iPhone 15 Pro",
      location: "서울, 대한민국",
      time: "2026-06-03 18:45",
      current: false,
      icon: Smartphone,
    },
    {
      id: "4",
      device: "iPad Air",
      location: "부산, 대한민국",
      time: "2026-05-28 12:30",
      current: false,
      icon: Monitor,
    },
  ];

  return (
    <MobilePage>
      <PageHeader title="로그인 활동" subtitle="최근 로그인 내역" showBack={true} />

      <PageContent>
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "16px",
          border: "1px solid var(--border)",
          marginBottom: 16,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#DBEAFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Clock size={20} color="#0EA5E9" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: 2,
              }}>
                보안 알림
              </div>
              <div style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
              }}>
                의심스러운 활동이 감지되면 알려드립니다
              </div>
            </div>
          </div>
        </div>

        <h3 style={{
          fontSize: 14,
          fontWeight: 700,
          color: "var(--muted-foreground)",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}>
          로그인 기록
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {loginHistory.map((login) => (
            <div
              key={login.id}
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: "16px",
                border: login.current ? "2px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: login.current ? "var(--accent)18" : "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <login.icon size={24} color={login.current ? "var(--accent)" : "var(--foreground)"} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--foreground)",
                    }}>
                      {login.device}
                    </div>
                    {login.current && (
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--accent)",
                        background: "var(--accent)18",
                        borderRadius: 8,
                        padding: "2px 8px",
                      }}>
                        현재 기기
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: "var(--muted-foreground)",
                    marginBottom: 2,
                  }}>
                    {login.location}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                  }}>
                    {login.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "20px",
          border: "1px solid var(--border)",
          marginTop: 24,
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
          }}>
            의심스러운 활동이 있다면 즉시 비밀번호를 변경하고<br />
            2단계 인증을 활성화하세요.
          </p>
        </div>
      </PageContent>
    </MobilePage>
  );
}
