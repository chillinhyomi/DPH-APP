import { Outlet, useNavigate } from "react-router";
import { Music2 } from "lucide-react";

export function AuthLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "column", fontFamily: "var(--font-family)" }}>
      {/* Minimal header */}
      <header className="auth-header" style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music2 size={17} color="white" />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#111827" }}>DPH</span>
        </button>
      </header>
      <div className="auth-content" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <Outlet />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-header {
            padding: 16px 20px !important;
          }
          .auth-content {
            padding: 16px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
