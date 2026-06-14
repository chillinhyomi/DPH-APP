import { useState } from "react";
import { useNavigate } from "react-router";
import { Send } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function QnACreatePage() {
  const navigate = useNavigate();
  const { createQnAPost, currentUser } = useApp();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newPost = createQnAPost({
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.uid,
      authorName: currentUser.name,
      isAnonymous,
    });

    navigate(`/qna/${newPost.id}`);
  };

  return (
    <MobilePage>
      <PageHeader
        title="질문 작성"
        subtitle="궁금한 점을 질문하세요"
        showBack={true}
      />

      <PageContent>
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "20px",
          border: "1px solid var(--border)",
          marginBottom: 16,
        }}>
          {/* Title Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 8,
            }}>
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="질문 제목을 입력하세요"
              maxLength={100}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                minHeight: 48,
              }}
            />
            <div style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
              marginTop: 6,
              textAlign: "right",
            }}>
              {title.length}/100
            </div>
          </div>

          {/* Content Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 8,
            }}>
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="질문 내용을 자세히 입력하세요"
              maxLength={1000}
              style={{
                width: "100%",
                minHeight: 200,
                padding: "14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: 15,
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
              marginTop: 6,
              textAlign: "right",
            }}>
              {content.length}/1000
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "var(--muted)",
            borderRadius: 12,
            marginBottom: 20,
            minHeight: 48,
          }}>
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: 2,
              }}>
                익명으로 작성
              </div>
              <div style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
              }}>
                다른 사용자에게 익명으로 표시됩니다
              </div>
            </div>
            <div
              onClick={() => setIsAnonymous(!isAnonymous)}
              style={{
                width: 48,
                height: 28,
                borderRadius: 14,
                background: isAnonymous ? "var(--accent)" : "var(--border)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: 2,
                left: isAnonymous ? 22 : 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }} />
            </div>
          </div>

          {/* Info Box */}
          <div style={{
            padding: "12px 16px",
            background: "var(--muted)",
            borderRadius: 12,
            marginBottom: 20,
          }}>
            <p style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
            }}>
              💡 <strong>작성 안내</strong><br />
              • 질문은 명확하고 구체적으로 작성해주세요<br />
              • 문제 상황과 시도한 해결 방법을 함께 적어주세요<br />
              • 관리자가 답변하면 알림을 받으실 수 있습니다<br />
              {isAnonymous && "• 익명 작성 시에도 관리자는 작성자를 확인할 수 있습니다"}
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 12,
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
              minHeight: 52,
            }}
          >
            <Send size={20} />
            질문 등록
          </button>
        </div>
      </PageContent>
    </MobilePage>
  );
}
