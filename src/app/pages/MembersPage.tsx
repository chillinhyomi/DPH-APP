import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Users, Mail, MoreVertical } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

const ROLE_LABELS: Record<string, string> = { owner: "디렉터", editor: "안무가", viewer: "댄서" };

export function MembersPage() {
  const navigate = useNavigate();
  const { projects, members } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectMembers = members[selectedProjectId] || [];
  const filteredMembers = projectMembers.filter(m =>
    m.name.includes(searchQuery) || m.email.includes(searchQuery)
  );

  const handleInvite = async () => {
    if (!selectedProject) {
      alert("프로젝트를 먼저 선택해주세요.");
      return;
    }

    const inviteCode = selectedProject.inviteCode;
    const inviteUrl = `${window.location.origin}/join?code=${inviteCode}`;
    const inviteMessage = `${selectedProject.title} 프로젝트에 초대합니다!\n\n초대 코드: ${inviteCode}\n비밀번호: ${selectedProject.password}\n\n링크로 바로 참여: ${inviteUrl}\n\nDPH로 함께 공연을 준비해요!`;

    // Try native Web Share API (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedProject.title} 프로젝트 초대`,
          text: inviteMessage,
          url: inviteUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        if (error instanceof Error && error.name !== 'AbortError') {
          // Fall back to copying to clipboard
          fallbackToCopy(inviteMessage);
        }
      }
    } else {
      // Fallback for desktop/browsers without Share API
      fallbackToCopy(inviteMessage);
    }
  };

  const fallbackToCopy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert("초대 정보가 클립보드에 복사되었습니다!\n\nKakaoTalk, SMS, 이메일 등으로 공유할 수 있습니다.");
      }).catch(() => {
        // Clipboard API failed, show the invite info
        alert(text);
      });
    } else {
      // Clipboard not available, show the invite info
      alert(text);
    }
  };

  return (
    <MobilePage>
      <PageHeader
        title="팀원관리"
        subtitle={`총 ${projectMembers.length}명`}
        showBack={true}
        action={
          <button
            onClick={handleInvite}
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
      />

      {/* Project Selector */}
      <div style={{ background: "var(--card)", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)", marginBottom: 8 }}>프로젝트 선택</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {projects.map(p => {
            const isActive = p.id === selectedProjectId;
            const memberCount = (members[p.id] || []).length;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: isActive ? "var(--accent)" : "var(--muted)",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  minHeight: 44,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? "white" : "var(--foreground)", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: isActive ? "rgba(255,255,255,0.8)" : "var(--muted-foreground)", marginTop: 2 }}>
                  팀원 {memberCount}명
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <PageContent>
        {/* Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "var(--card)",
          marginBottom: 16,
        }}>
          <Search size={18} color="var(--muted-foreground)" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="팀원 검색..."
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

        {/* Members List */}
        {filteredMembers.length === 0 ? (
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
              <Users size={32} color="var(--muted-foreground)" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
              {searchQuery ? "검색 결과가 없습니다" : "팀원이 없습니다"}
            </p>
            <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>
              팀원을 초대해보세요
            </p>
            <button
              onClick={handleInvite}
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
              팀원 초대
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredMembers.map(member => (
              <div
                key={member.id}
                style={{
                  background: "var(--card)",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: member.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
                      {member.name[0]}
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--foreground)",
                      marginBottom: 2,
                    }}>
                      {member.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Mail size={12} color="var(--muted-foreground)" />
                      <span style={{
                        fontSize: 13,
                        color: "var(--muted-foreground)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {member.email}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--accent)",
                      background: "var(--muted)",
                      borderRadius: 8,
                      padding: "4px 10px",
                    }}>
                      {ROLE_LABELS[member.role]}
                    </span>
                    <button
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
                      <MoreVertical size={18} color="var(--foreground)" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContent>
    </MobilePage>
  );
}
