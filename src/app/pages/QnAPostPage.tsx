import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Edit, Trash2, MessageCircle, Eye, CheckCircle, Clock, X, Send } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function QnAPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { qnaPosts, currentUser, addQnAReply, deleteQnAPost, incrementQnAViews } = useApp();

  const post = qnaPosts.find(p => p.id === postId);
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAuthor = post && currentUser && post.authorId === currentUser.uid;
  const isAdmin = currentUser?.uid === "admin-1"; // Simple admin check

  useEffect(() => {
    if (post && incrementQnAViews) {
      incrementQnAViews(post.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id]);

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

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    addQnAReply(post.id, replyContent, isAdmin);
    setReplyContent("");
  };

  const handleDelete = () => {
    deleteQnAPost(post.id);
    navigate("/qna");
  };

  return (
    <>
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          padding: "16px",
        }}>
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "24px",
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
              <h2 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--destructive)",
              }}>
                게시글 삭제
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#FEE2E2",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} color="var(--destructive)" />
              </button>
            </div>

            <p style={{
              fontSize: 14,
              color: "var(--foreground)",
              lineHeight: 1.6,
              marginBottom: 20,
            }}>
              이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--muted)",
                  color: "var(--foreground)",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--destructive)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      <MobilePage>
        <PageHeader
          title="Q&A 상세"
          showBack={true}
          action={
            isAuthor ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => navigate(`/qna/${post.id}/edit`)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--muted)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Edit size={18} color="var(--foreground)" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#FEE2E2",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Trash2 size={18} color="var(--destructive)" />
                </button>
              </div>
            ) : undefined
          }
        />

        <PageContent>
          {/* Post Card */}
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid var(--border)",
            marginBottom: 16,
          }}>
            {/* Status Badge */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                background: post.status === "answered" ? "var(--success)" : "var(--warning)",
                opacity: 0.9,
              }}>
                {post.status === "answered" ? (
                  <CheckCircle size={16} color="white" />
                ) : (
                  <Clock size={16} color="white" />
                )}
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                }}>
                  {post.status === "answered" ? "답변완료" : "답변대기"}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--foreground)",
              marginBottom: 12,
              lineHeight: 1.4,
            }}>
              {post.title}
            </h1>

            {/* Author & Date */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              paddingBottom: 16,
              borderBottom: "1px solid var(--border)",
            }}>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--foreground)",
              }}>
                {post.isAnonymous ? "익명" : post.authorName}
              </span>
              <span style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
              }}>
                {post.createdAt}
              </span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                <Eye size={14} color="var(--muted-foreground)" />
                <span style={{
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                }}>
                  {post.views}
                </span>
              </div>
            </div>

            {/* Content */}
            <p style={{
              fontSize: 15,
              color: "var(--foreground)",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}>
              {post.content}
            </p>
          </div>

          {/* Replies Section */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <MessageCircle size={20} color="var(--accent)" />
              답변 {post.replies.length}개
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {post.replies.map(reply => (
                <div
                  key={reply.id}
                  style={{
                    background: reply.isAdmin ? "var(--accent)" : "var(--card)",
                    borderRadius: 12,
                    padding: "16px",
                    border: reply.isAdmin ? "none" : "1px solid var(--border)",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: reply.isAdmin ? "white" : "var(--foreground)",
                    }}>
                      {reply.authorName}
                    </span>
                    {reply.isAdmin && (
                      <div style={{
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.2)",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "white",
                      }}>
                        관리자
                      </div>
                    )}
                    <span style={{
                      fontSize: 12,
                      color: reply.isAdmin ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
                      marginLeft: "auto",
                    }}>
                      {reply.createdAt}
                    </span>
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: reply.isAdmin ? "white" : "var(--foreground)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}>
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Input (for all logged-in users) */}
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "16px",
            border: "1px solid var(--border)",
            position: "sticky",
            bottom: 0,
          }}>
            <h4 style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 12,
            }}>
              {isAdmin ? "관리자 답변 작성" : "답변 작성"}
            </h4>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답변을 입력하세요..."
              style={{
                width: "100%",
                minHeight: 100,
                padding: "12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: 15,
                resize: "vertical",
                outline: "none",
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleSubmitReply}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: isAdmin ? "var(--success)" : "var(--accent)",
                color: "white",
                fontSize: 15,
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
              <Send size={18} />
              {isAdmin ? "관리자 답변 등록" : "답변 등록"}
            </button>
          </div>
        </PageContent>
      </MobilePage>
    </>
  );
}
