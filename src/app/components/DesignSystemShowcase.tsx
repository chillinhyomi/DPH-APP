export function DesignSystemShowcase() {
  const colors = [
    { name: "Primary", hex: "#6C3AED", label: "주요 컬러" },
    { name: "Secondary", hex: "#A78BFA", label: "보조 컬러" },
    { name: "Accent", hex: "#EDE9FE", label: "액센트" },
    { name: "Success", hex: "#10B981", label: "성공" },
    { name: "Warning", hex: "#F59E0B", label: "경고" },
    { name: "Error", hex: "#EF4444", label: "오류" },
    { name: "Dark BG", hex: "#0F0A1E", label: "다크 배경" },
    { name: "Text", hex: "#111827", label: "텍스트" },
  ];

  const typography = [
    { label: "Display", size: "32px", weight: "800", sample: "DPH Dance Studio" },
    { label: "Heading 1", size: "24px", weight: "700", sample: "2024 봄 정기공연" },
    { label: "Heading 2", size: "20px", weight: "700", sample: "포메이션 편집기" },
    { label: "Body Large", size: "16px", weight: "500", sample: "댄서 5명이 등록되었습니다" },
    { label: "Body", size: "14px", weight: "400", sample: "한양대학교 중앙댄스동아리 STEP" },
    { label: "Caption", size: "12px", weight: "500", sample: "D-23 · 포메이션 8개" },
    { label: "Label", size: "11px", weight: "700", sample: "진행중 · 리더 · A팀" },
  ];

  const components = [
    {
      label: "버튼",
      items: [
        { style: { background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(108,58,237,0.35)" }, text: "프라이머리 버튼" },
        { style: { background: "#F5F3FF", color: "#6C3AED", padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }, text: "세컨더리 버튼" },
        { style: { background: "transparent", color: "#6C3AED", padding: "12px 24px", borderRadius: 14, border: "1.5px solid #6C3AED", fontSize: 14, fontWeight: 700, cursor: "pointer" }, text: "아웃라인 버튼" },
      ],
    },
  ];

  const badges = [
    { label: "진행중", color: "#6C3AED" },
    { label: "완료", color: "#10B981" },
    { label: "준비중", color: "#F59E0B" },
    { label: "리더", color: "#6C3AED" },
    { label: "메인댄서", color: "#EC4899" },
    { label: "댄서", color: "#6B7280" },
    { label: "A팀", color: "#0EA5E9" },
    { label: "공지", color: "#6C3AED" },
    { label: "중요", color: "#EF4444" },
    { label: "이벤트", color: "#F59E0B" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-family)", maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

      {/* Color Palette */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 6 }}>컬러 팔레트</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>보라색 그라디언트 기반의 프리미엄 퍼포먼스 디자인 시스템</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {colors.map(c => (
            <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: c.hex, boxShadow: c.name === "Primary" ? "0 8px 24px rgba(108,58,237,0.45)" : "0 4px 12px rgba(0,0,0,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{c.name}</p>
                <p style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>{c.hex}</p>
                <p style={{ fontSize: 10, color: "#6B7280" }}>{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 6 }}>타이포그래피</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Pretendard — 현대적인 한국어 모바일 UX 폰트</p>
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 20 }}>
          {typography.map(t => (
            <div key={t.label} style={{ display: "flex", alignItems: "baseline", gap: 24, borderBottom: "1px solid #F9FAFB", paddingBottom: 16 }}>
              <div style={{ width: 90, flexShrink: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF" }}>{t.label}</p>
                <p style={{ fontSize: 10, color: "#D1D5DB", fontFamily: "monospace" }}>{t.size} / {t.weight}</p>
              </div>
              <span style={{ fontSize: t.size, fontWeight: Number(t.weight), color: "#111827", lineHeight: 1.3 }}>{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>버튼 스타일</h2>
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {components[0].items.map((btn, i) => (
            <button key={i} style={btn.style as React.CSSProperties}>{btn.text}</button>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>뱃지 & 태그</h2>
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {badges.map(b => (
            <span key={b.label} style={{ fontSize: 12, fontWeight: 700, color: b.color, background: b.color + "18", borderRadius: 8, padding: "4px 12px" }}>{b.label}</span>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>카드 컴포넌트</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Project card */}
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", width: 240 }}>
            <div style={{ height: 8, background: "linear-gradient(135deg, #6C3AED 0%, #A78BFA 100%)" }} />
            <div style={{ padding: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#6C3AED", background: "#EDE9FE", borderRadius: 6, padding: "2px 8px" }}>진행중</span>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: "#111827", marginTop: 8 }}>2024 봄 정기공연</h4>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>STEP 댄스동아리</p>
              <div style={{ background: "#F1F0FF", borderRadius: 6, height: 6, marginTop: 12 }}>
                <div style={{ width: "68%", height: "100%", borderRadius: 6, background: "linear-gradient(135deg, #6C3AED, #A78BFA)" }} />
              </div>
              <span style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, display: "block" }}>진행률 68%</span>
            </div>
          </div>

          {/* Stat card */}
          <div style={{ background: "white", borderRadius: 20, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", width: 140 }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>💃</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>32개</p>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>전체 포메이션</p>
          </div>

          {/* Dark card */}
          <div style={{ background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", borderRadius: 20, padding: 20, boxShadow: "0 8px 24px rgba(108,58,237,0.4)", width: 200, color: "white" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>공연 D-Day</p>
            <p style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>D-23</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>2024 봄 정기공연</p>
          </div>
        </div>
      </section>

      {/* Spacing & Radius */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>간격 & 라운드</h2>
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
          {[
            { label: "8px", r: 8, w: 32 },
            { label: "12px", r: 12, w: 40 },
            { label: "16px", r: 16, w: 48 },
            { label: "20px", r: 20, w: 56 },
            { label: "24px", r: 24, w: 64 },
            { label: "50%", r: 999, w: 56 },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ width: item.w, height: item.w, borderRadius: item.r, background: "linear-gradient(135deg, #EDE9FE, #C4B5FD)", border: "2px solid #A78BFA" }} />
              <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 6, fontFamily: "monospace" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
