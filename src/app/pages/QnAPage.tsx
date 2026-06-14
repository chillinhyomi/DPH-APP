import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, MessageCircle, Eye, CheckCircle, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function QnAPage() {
  const navigate = useNavigate();
  const { qnaPosts } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = qnaPosts.filter(post => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      (!post.isAnonymous && post.authorName.toLowerCase().includes(query))
    );
  });

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <MobilePage>
      <PageHeader
        title="Q&A 게시판"
        subtitle="질문하고 답변받으세요"
        showBack={true}
        action={
          <button
            onClick={() => navigate("/qna/create")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--accent)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
          </button>
        }
      />

      <PageContent>
        {/* Search Bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            minHeight: 48,
          }}>
            <Search size={20} color="var(--muted-foreground)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문 검색..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 15,
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 20,
        }}>
          <div style={{
            background: "var(--card)",
            borderRadius: 12,
            padding: "16px",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 800,
              color: "var(--accent)",
              marginBottom: 4,
            }}>
              {qnaPosts.length}
            </div>
            <div style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              fontWeight: 600,
            }}>
              전체 질문
            </div>
          </div>
          <div style={{
            background: "var(--card)",
            borderRadius: 12,
            padding: "16px",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 800,
              color: "var(--success)",
              marginBottom: 4,
            }}>
              {qnaPosts.filter(p => p.status === "answered").length}
            </div>
            <div style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              fontWeight: 600,
            }}>
              답변 완료
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sortedPosts.length === 0 ? (
            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              padding: "48px 24px",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}>
              <MessageCircle size={40} color="var(--muted-foreground)" style={{ marginBottom: 12 }} />
              <p style={{
                fontSize: 15,
                color: "var(--muted-foreground)",
                marginBottom: 4,
              }}>
                {searchQuery ? "검색 결과가 없습니다" : "아직 질문이 없습니다"}
              </p>
              <p style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
              }}>
                {searchQuery ? "다른 검색어로 시도해보세요" : "첫 질문을 작성해보세요"}
              </p>
            </div>
          ) : (
            sortedPosts.map(post => (
              <button
                key={post.id}
                onClick={() => navigate(`/qna/${post.id}`)}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Status Badge & Author */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: post.status === "answered" ? "var(--success)" : "var(--warning)",
                    opacity: 0.9,
                  }}>
                    {post.status === "answered" ? (
                      <CheckCircle size={14} color="white" />
                    ) : (
                      <Clock size={14} color="white" />
                    )}
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "white",
                    }}>
                      {post.status === "answered" ? "답변완료" : "대기중"}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    fontWeight: 600,
                  }}>
                    {post.isAnonymous ? "익명" : post.authorName}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--foreground)",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {post.title}
                </h3>

                {/* Content Preview */}
                <p style={{
                  fontSize: 14,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {post.content}
                </p>

                {/* Meta Info */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  paddingTop: 8,
                  borderTop: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                  }}>
                    {post.createdAt}
                  </span>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <MessageCircle size={14} color="var(--muted-foreground)" />
                      <span style={{
                        fontSize: 12,
                        color: "var(--muted-foreground)",
                        fontWeight: 600,
                      }}>
                        {post.replies.length}
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <Eye size={14} color="var(--muted-foreground)" />
                      <span style={{
                        fontSize: 12,
                        color: "var(--muted-foreground)",
                        fontWeight: 600,
                      }}>
                        {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </PageContent>
    </MobilePage>
  );
}
