import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#F8FAFC", gap: 20, fontFamily: "var(--font-family)", padding: "20px" }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: "#EDE9FE", letterSpacing: -4 }}>404</div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginTop: -8, textAlign: "center" }}>페이지를 찾을 수 없습니다</h1>
      <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", lineHeight: 1.7, maxWidth: 360, padding: "0 20px" }}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.<br/>
        주소를 다시 확인해 주세요.
      </p>
      <div className="notfound-actions" style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 12, background: "white", border: "1.5px solid #EDE9FE", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          <ArrowLeft size={15} />
          이전 페이지
        </button>
        <button onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 12, background: "linear-gradient(135deg,#6C3AED,#8B5CF6)", color: "white", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(108,58,237,0.35)" }}>
          <Home size={15} />
          대시보드로
        </button>
      </div>
    </div>
  );
}
