import { Archive, Search, FolderOpen } from "lucide-react";

export function ArchivePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <header style={{ padding: "20px 32px", borderBottom: "1px solid #EDE9FE", background: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>아카이브</h1>
          <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>완료된 프로젝트를 보관합니다</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "white", width: 260 }}>
          <Search size={14} color="#9CA3AF" />
          <input placeholder="아카이브 검색..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#111827", background: "transparent" }} />
        </div>
      </header>

      <div style={{ flex: 1, overflow: "auto", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: 22, background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Archive size={32} color="#A78BFA" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>아카이브가 비어 있습니다</h2>
        <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", maxWidth: 360, lineHeight: 1.7 }}>
          완료된 프로젝트를 아카이브로 이동하면 여기에 표시됩니다.<br/>
          프로젝트 페이지에서 완료된 프로젝트를 아카이브로 이동할 수 있습니다.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: "#F5F3FF", border: "1px solid #EDE9FE" }}>
          <FolderOpen size={14} color="#6C3AED" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6C3AED" }}>프로젝트 목록 보기</span>
        </div>
      </div>
    </div>
  );
}
