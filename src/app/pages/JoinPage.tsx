import { useState } from "react";
import { useNavigate } from "react-router";
import { Hash, Lock, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export function JoinPage() {
  const navigate = useNavigate();
  const { joinProject } = useApp();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) { setError("초대 코드를 입력해주세요."); return; }
    setLoading(true);
    setTimeout(() => {
      const project = joinProject(code.trim().toUpperCase(), password);
      setLoading(false);
      if (project) {
        navigate(`/view/${project.id}`);
      } else {
        setError("초대 코드 또는 비밀번호가 올바르지 않습니다. (예시: STEP2026, 비밀번호: 1234)");
      }
    }, 500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "20px 32px", borderBottom: "1px solid #EDE9FE", background: "white", flexShrink: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>프로젝트 참여</h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>초대 코드로 프로젝트에 참여하세요</p>
      </header>
      <div className="join-content" style={{ flex: 1, overflow: "auto", padding: "40px 32px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div className="join-card" style={{ width: "100%", maxWidth: 480, background: "white", borderRadius: 24, padding: "44px 44px 36px", boxShadow: "0 8px 40px rgba(108,58,237,0.1)", border: "1px solid #EDE9FE" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg,#6C3AED,#A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Hash size={26} color="white" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 6 }}>프로젝트에 참여하기</h2>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
              초대 코드를 입력하여 팀 프로젝트에 참여하세요.<br/>
              초대 코드는 프로젝트 소유자에게 받을 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>초대 코드 *</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA" }}>
                <Hash size={15} color="#A78BFA" />
                <input
                  value={code}
                  onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
                  placeholder="예: STEP2026"
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, color: "#111827", fontWeight: 700, fontFamily: "monospace", letterSpacing: 2 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
                비밀번호 <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(선택)</span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA" }}>
                <Lock size={15} color="#A78BFA" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#111827" }}
                />
              </div>
            </div>

            {error && (
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <p style={{ fontSize: 13, color: "#EF4444" }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} style={{ padding: "14px", borderRadius: 14, background: "linear-gradient(135deg,#6C3AED,#8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 18px rgba(108,58,237,0.4)", marginTop: 4 }}>
              {loading ? "참여 중..." : <>프로젝트 참여하기 <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Hint */}
          <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: 12, background: "#F5F3FF", border: "1px solid #EDE9FE" }}>
            <p style={{ fontSize: 12, color: "#6C3AED", fontWeight: 600, marginBottom: 4 }}>💡 테스트 참여 방법</p>
            <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>초대코드: <strong>STEP2026</strong>, 비밀번호: <strong>1234</strong><br/>또는: 초대코드: <strong>BUSK01</strong>, 비밀번호: <strong>0000</strong></p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          header {
            padding: 16px 20px !important;
          }
          .join-content {
            padding: 24px 16px !important;
          }
          .join-card {
            padding: 32px 24px 28px !important;
            border-radius: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .join-card {
            padding: 24px 20px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
