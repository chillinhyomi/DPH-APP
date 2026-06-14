import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Plus, Search, Users, Calendar, MoreHorizontal, X, Music2, Lock, ChevronRight, Edit2, Share2, Star, Trash2 } from "lucide-react";
import { useApp, Project } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

function CreateProjectModal({ onClose, onCreate }: { onClose: () => void; onCreate: (p: Project) => void }) {
  const { createProject } = useApp();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stageW, setStageW] = useState("10");
  const [stageH, setStageH] = useState("8");
  const [password, setPassword] = useState("");
  const [created, setCreated] = useState<Project | null>(null);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    const p = createProject({ title, description: desc, stageWidth: Number(stageW), stageHeight: Number(stageH), password });
    setCreated(p);
    onCreate(p);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", padding: "0 16px" }}>
      <div className="modal-content" style={{ background: "white", borderRadius: 24, padding: "36px 40px", width: "100%", maxWidth: 520, boxShadow: "0 24px 80px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        {created ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#6C3AED,#A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Music2 size={28} color="white" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>프로젝트가 생성되었습니다!</h2>
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>아래 초대 코드로 팀원을 초대하세요.</p>
            <div style={{ background: "#F5F3FF", borderRadius: 16, padding: "20px", marginBottom: 24 }}>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>초대 코드</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#6C3AED", letterSpacing: 4, fontFamily: "monospace" }}>{created.inviteCode}</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#F5F3FF", color: "#6C3AED", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14 }}>
                닫기
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>새 프로젝트 생성</h2>
              <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 10, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} color="#6C3AED" />
              </button>
            </div>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>프로젝트명 *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 2026 봄 정기공연" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>설명</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="프로젝트 설명 (선택)" rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA", fontSize: 14, outline: "none", resize: "none" as const, boxSizing: "border-box" as const }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>무대 가로 (m)</label>
                  <input type="number" value={stageW} onChange={e => setStageW(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>무대 세로 (m)</label>
                  <input type="number" value={stageH} onChange={e => setStageH(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
                  <Lock size={12} style={{ display: "inline", marginRight: 4 }} />
                  참여 비밀번호
                </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호 설정 (선택)" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
              <button type="submit" style={{ padding: "14px", borderRadius: 14, background: "linear-gradient(135deg,#6C3AED,#8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(108,58,237,0.35)", marginTop: 4 }}>
                프로젝트 생성
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, renameProject, deleteProject, toggleFavorite } = useApp();
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renameProjectId, setRenameProjectId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [shareProjectId, setShareProjectId] = useState<string | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get("create") === "1") {
      setShowCreate(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleRenameSubmit(projectId: string) {
    if (renameValue.trim()) {
      renameProject(projectId, renameValue.trim());
      setRenameProjectId(null);
      setRenameValue("");
    }
  }

  function handleDeleteConfirm(projectId: string) {
    deleteProject(projectId);
    setDeleteProjectId(null);
  }

  const filtered = projects.filter(p => p.title.includes(query) || p.description.includes(query));

  const gradients = [
    "linear-gradient(135deg,#6C3AED,#A78BFA)",
    "linear-gradient(135deg,#10B981,#34D399)",
    "linear-gradient(135deg,#EF4444,#F87171)",
    "linear-gradient(135deg,#F59E0B,#FCD34D)",
    "linear-gradient(135deg,#0EA5E9,#38BDF8)",
  ];

  return (
    <>
      {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)} onCreate={() => {}} />}

      {/* Rename Modal */}
      {renameProjectId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: "24px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)" }}>프로젝트 이름 변경</h3>
              <button onClick={() => setRenameProjectId(null)} style={{ width: 40, height: 40, borderRadius: 10, background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} color="var(--foreground)" />
              </button>
            </div>
            <input
              autoFocus
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleRenameSubmit(renameProjectId)}
              placeholder="새 프로젝트 이름"
              style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)", fontSize: 15, outline: "none", boxSizing: "border-box" as const, marginBottom: 16, minHeight: 48 }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setRenameProjectId(null)} style={{ flex: 1, padding: "14px", borderRadius: 12, background: "var(--muted)", color: "var(--foreground)", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", minHeight: 48 }}>
                취소
              </button>
              <button onClick={() => handleRenameSubmit(renameProjectId)} style={{ flex: 1, padding: "14px", borderRadius: 12, background: "var(--accent)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", minHeight: 48 }}>
                변경
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareProjectId && (() => {
        const project = projects.find(p => p.id === shareProjectId);
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "var(--card)", borderRadius: 20, padding: "24px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)" }}>프로젝트 공유</h3>
                <button onClick={() => setShareProjectId(null)} style={{ width: 40, height: 40, borderRadius: 10, background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={18} color="var(--foreground)" />
                </button>
              </div>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 16 }}>아래 초대 코드를 팀원에게 공유하세요.</p>
              <div style={{ background: "var(--muted)", borderRadius: 16, padding: "20px", marginBottom: 16, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 8 }}>초대 코드</p>
                <p style={{ fontSize: 32, fontWeight: 900, color: "var(--accent)", letterSpacing: 4, fontFamily: "monospace" }}>{project?.inviteCode}</p>
              </div>
              <button onClick={() => setShareProjectId(null)} style={{ width: "100%", padding: "14px", borderRadius: 12, background: "var(--accent)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", minHeight: 48 }}>
                닫기
              </button>
            </div>
          </div>
        );
      })()}

      {/* Delete Confirmation */}
      {deleteProjectId && (() => {
        const project = projects.find(p => p.id === deleteProjectId);
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "var(--card)", borderRadius: 20, padding: "24px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)", marginBottom: 12 }}>프로젝트 삭제</h3>
              <p style={{ fontSize: 15, color: "var(--muted-foreground)", marginBottom: 24 }}>
                <strong style={{ color: "var(--foreground)" }}>{project?.title}</strong> 프로젝트를 삭제하시겠습니까?<br/>
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setDeleteProjectId(null)} style={{ flex: 1, padding: "14px", borderRadius: 12, background: "var(--muted)", color: "var(--foreground)", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", minHeight: 48 }}>
                  취소
                </button>
                <button onClick={() => handleDeleteConfirm(deleteProjectId)} style={{ flex: 1, padding: "14px", borderRadius: 12, background: "var(--destructive)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", minHeight: 48 }}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <MobilePage>
        <PageHeader
          title="프로젝트"
          subtitle={`총 ${projects.length}개`}
          action={
            <button
              onClick={() => setShowCreate(true)}
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
          extra={
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--background)" }}>
              <Search size={18} color="var(--muted-foreground)" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="프로젝트 검색..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 15,
                  color: "var(--foreground)",
                  minHeight: 24,
                }}
              />
            </div>
          }
        />

        <PageContent>
          {filtered.length === 0 ? (
            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <FolderOpen size={32} color="var(--muted-foreground)" />
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
                프로젝트가 없습니다
              </p>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>
                새 프로젝트를 만들어보세요
              </p>
              <button
                onClick={() => setShowCreate(true)}
                style={{
                  padding: "14px 24px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                프로젝트 생성
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/project/${p.id}`)}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                        {p.description || "설명 없음"}
                      </p>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === p.id ? null : p.id);
                      }}
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
                        flexShrink: 0,
                        marginLeft: 12,
                        minHeight: 44,
                        minWidth: 44,
                      }}
                    >
                      <MoreHorizontal size={20} color="var(--foreground)" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{
                      background: "var(--muted)",
                      borderRadius: 12,
                      padding: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <Users size={16} color="var(--muted-foreground)" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                        팀원 {p.memberCount}명
                      </span>
                    </div>
                    <div style={{
                      background: "var(--muted)",
                      borderRadius: 12,
                      padding: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <Calendar size={16} color="var(--muted-foreground)" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                        {p.updatedAt}
                      </span>
                    </div>
                  </div>

                  {/* Menu */}
                  {openMenuId === p.id && (
                    <div
                      ref={menuRef}
                      style={{
                        position: "absolute",
                        top: 60,
                        right: 16,
                        background: "var(--card)",
                        borderRadius: 12,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        border: "1px solid var(--border)",
                        minWidth: 180,
                        zIndex: 100,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                          setRenameValue(p.title);
                          setRenameProjectId(p.id);
                        }}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--foreground)",
                          textAlign: "left" as const,
                          minHeight: 48,
                        }}
                      >
                        <Edit2 size={16} color="var(--accent)" />
                        이름 변경
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                          setShareProjectId(p.id);
                        }}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--foreground)",
                          textAlign: "left" as const,
                          minHeight: 48,
                        }}
                      >
                        <Share2 size={16} color="var(--accent)" />
                        공유
                      </button>
                      <div style={{ height: 1, background: "var(--border)" }} />
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                          setDeleteProjectId(p.id);
                        }}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--destructive)",
                          textAlign: "left" as const,
                          minHeight: 48,
                        }}
                      >
                        <Trash2 size={16} />
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </PageContent>
      </MobilePage>
    </>
  );
}
