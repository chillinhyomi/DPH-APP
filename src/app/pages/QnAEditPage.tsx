import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Save } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function QnAEditPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { qnaPosts, updateQnAPost, currentUser } = useApp();

  const post = qnaPosts.find(p => p.id === postId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return (
      <MobilePage>
        <PageHeader title="게시글을 찾을 수 없습니다" showBack={true} />
        <PageContent>
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "48px 24px",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: 15,
              color: "var(--muted-foreground)",
            }}>
              존재하지 않거나 삭제된 게시글입니다.
            </p>
          </div>
        </PageContent>
      </MobilePage>
    );
  }

  const isAuthor = currentUser && post.authorId === currentUser.uid;

  if (!isAuthor) {
    return (
      <MobilePage>
        <PageHeader title="권한이 없습니다" showBack={true} />
        <PageContent>
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "48px 24px",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: 15,
              color: "var(--muted-foreground)",
            }}>
              본인이 작성한 게시글만 수정할 수 있습니다.
            </p>
          </div>
        </PageContent>
      </MobilePage>
    );
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    updateQnAPost(post.id, {
      title: title.trim(),
      content: content.trim(),
    });

    navigate(`/qna/${post.id}`);
  };

  return (
    <MobilePage>
      <PageHeader
        title="질문 수정"
        subtitle="질문을 수정하세요"
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
              ℹ️ 수정 시 익명 설정은 변경할 수 없습니다.<br />
              답변이 이미 달린 경우 수정 내용이 기존 답변과 맞지 않을 수 있으니 주의해주세요.
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
            <Save size={20} />
            수정 완료
          </button>
        </div>
      </PageContent>
    </MobilePage>
  );
}
