import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BookOpen, MessageCircle, Bug, Lightbulb, Mail,
  ChevronRight, ChevronDown, ChevronUp, Bell, Shield, FileText
} from "lucide-react";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function HelpPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const userGuides = [
    { title: "DPH 소개", description: "DPH 사용 시작하기" },
    { title: "안무 생성 및 업로드", description: "프로젝트와 포메이션 만들기" },
    { title: "안무 편집 및 삭제", description: "포메이션 수정 방법" },
    { title: "비주얼 타임라인 사용법", description: "타임라인 기능 활용하기" },
    { title: "안무 공유하기", description: "팀원과 협업하기" },
    { title: "즐겨찾기 사용", description: "북마크 기능 활용" },
  ];

  const faqItems = [
    {
      question: "안무는 어떻게 업로드하나요?",
      answer: "프로젝트 페이지에서 '새 프로젝트 만들기' 버튼을 탭하고, 프로젝트 정보를 입력한 후 포메이션을 추가하세요. 각 포메이션에서 댄서 위치를 설정할 수 있습니다."
    },
    {
      question: "영상 업로드가 실패하면 어떻게 하나요?",
      answer: "네트워크 연결을 확인하고 파일 크기가 500MB 이하인지 확인하세요. 문제가 지속되면 support@dph.com으로 문의해 주세요."
    },
    {
      question: "타임라인이 제대로 표시되지 않아요",
      answer: "브라우저를 새로고침하거나 앱을 재시작해 보세요. 문제가 계속되면 캐시를 삭제하고 다시 로그인해 주세요."
    },
    {
      question: "프로필 사진은 어떻게 변경하나요?",
      answer: "마이페이지에서 프로필 카드의 편집 버튼을 탭하고, 프로필 이미지를 탭하여 새 사진을 업로드하세요."
    },
    {
      question: "계정을 삭제하면 데이터는 어떻게 되나요?",
      answer: "계정 삭제 시 모든 프로젝트, 포메이션, 일정 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 삭제 전 필요한 데이터를 백업하세요."
    },
  ];

  const announcements = [
    { id: "1", title: "타임라인 편집 기능 업데이트", date: "2026-06-03", badge: "신규 기능" },
    { id: "2", title: "서비스 점검 안내", date: "2026-06-10", badge: "점검" },
    { id: "3", title: "모바일 앱 UI 개선", date: "2026-05-28", badge: "업데이트" },
  ];

  return (
    <MobilePage>
      <PageHeader title="도움말 센터" subtitle="DPH 사용 가이드" showBack={true} />

      <PageContent>
        {/* User Guide */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--muted-foreground)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            사용 가이드
          </h3>

          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            {userGuides.map((guide, idx) => (
              <button
                key={idx}
                onClick={() => alert(`${guide.title} 가이드를 확인합니다.`)}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: idx < userGuides.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left" as const,
                  minHeight: 60,
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--accent)18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <BookOpen size={20} color="var(--accent)" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    marginBottom: 2,
                  }}>
                    {guide.title}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: "var(--muted-foreground)",
                  }}>
                    {guide.description}
                  </div>
                </div>

                <ChevronRight size={20} color="var(--muted-foreground)" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--muted-foreground)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            자주 묻는 질문
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqItems.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left" as const,
                    minHeight: 56,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--foreground)",
                    }}>
                      Q. {faq.question}
                    </div>
                  </div>

                  {expandedFaq === idx ? (
                    <ChevronUp size={20} color="var(--muted-foreground)" />
                  ) : (
                    <ChevronDown size={20} color="var(--muted-foreground)" />
                  )}
                </button>

                {expandedFaq === idx && (
                  <div style={{
                    padding: "0 16px 16px 16px",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 16,
                  }}>
                    <p style={{
                      fontSize: 15,
                      color: "var(--muted-foreground)",
                      lineHeight: 1.6,
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Feedback */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--muted-foreground)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            문의 및 피드백
          </h3>

          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            <button
              onClick={() => alert("버그 신고 양식으로 이동합니다.")}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left" as const,
                minHeight: 60,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Bug size={20} color="#EF4444" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                  버그 신고
                </div>
              </div>
              <ChevronRight size={20} color="var(--muted-foreground)" />
            </button>

            <button
              onClick={() => alert("기능 제안 양식으로 이동합니다.")}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left" as const,
                minHeight: 60,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Lightbulb size={20} color="#F59E0B" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                  기능 제안
                </div>
              </div>
              <ChevronRight size={20} color="var(--muted-foreground)" />
            </button>

            <button
              onClick={() => window.location.href = "mailto:support@dph.com"}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left" as const,
                minHeight: 60,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--accent)18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Mail size={20} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>
                  고객 지원
                </div>
                <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                  support@dph.com
                </div>
              </div>
              <ChevronRight size={20} color="var(--muted-foreground)" />
            </button>
          </div>
        </div>

        {/* Announcements */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--muted-foreground)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            공지사항
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => navigate("/notices")}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "var(--accent)18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Bell size={16} color="var(--accent)" />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent)",
                    background: "var(--accent)18",
                    borderRadius: 8,
                    padding: "4px 8px",
                  }}>
                    {announcement.badge}
                  </span>
                </div>
                <h4 style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: 4,
                }}>
                  {announcement.title}
                </h4>
                <p style={{
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                }}>
                  {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--muted-foreground)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            법적 고지
          </h3>

          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            <button
              onClick={() => navigate("/privacy-policy")}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left" as const,
                minHeight: 56,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Shield size={20} color="var(--foreground)" />
              </div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                개인정보 처리방침
              </div>
              <ChevronRight size={20} color="var(--muted-foreground)" />
            </button>

            <button
              onClick={() => navigate("/terms-of-service")}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left" as const,
                minHeight: 56,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <FileText size={20} color="var(--foreground)" />
              </div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
                이용약관
              </div>
              <ChevronRight size={20} color="var(--muted-foreground)" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "20px",
          border: "1px solid var(--border)",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 14,
            color: "var(--foreground)",
            fontWeight: 600,
            marginBottom: 8,
          }}>
            DPH (Dance Performing Helper)
          </p>
          <p style={{
            fontSize: 13,
            color: "var(--muted-foreground)",
            marginBottom: 4,
          }}>
            버전 1.0.0
          </p>
          <p style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
          }}>
            © 2026 DPH. All rights reserved.
          </p>
        </div>
      </PageContent>
    </MobilePage>
  );
}
