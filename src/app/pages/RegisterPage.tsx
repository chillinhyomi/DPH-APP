import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError("모든 항목을 입력해주세요."); return; }
    if (password !== confirm) { setError("비밀번호가 일치하지 않습니다."); return; }
    if (password.length < 6) { setError("비밀번호는 6자 이상이어야 합니다."); return; }
    setError("");
    const errorMessage = await register(name, email, password);
    if (!errorMessage) navigate("/dashboard");
    else setError(errorMessage);
  }

  const fields = [
    { label: "이름", value: name, setter: setName, placeholder: "홍길동", icon: User, type: "text" },
    { label: "이메일", value: email, setter: setEmail, placeholder: "example@email.com", icon: Mail, type: "email" },
    { label: "비밀번호", value: password, setter: setPassword, placeholder: "6자 이상", icon: Lock, type: showPw ? "text" : "password", togglePw: true },
    { label: "비밀번호 확인", value: confirm, setter: setConfirm, placeholder: "비밀번호 재입력", icon: Lock, type: showPw ? "text" : "password" },
  ];

  return (
    <div className="auth-card" style={{ width: "100%", maxWidth: 460, background: "white", borderRadius: 24, padding: "44px 44px 36px", boxShadow: "0 8px 40px rgba(108,58,237,0.12)", border: "1px solid #EDE9FE" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: -0.5, marginBottom: 6 }}>DPH 가입하기</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>무료로 시작하고 팀과 함께 공연을 기획하세요.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {fields.map(f => (
          <div key={f.label}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>{f.label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA" }}>
              <f.icon size={15} color="#A78BFA" />
              <input
                type={f.type}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                placeholder={f.placeholder}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#111827" }}
              />
              {f.togglePw && (
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {showPw ? <EyeOff size={15} color="#9CA3AF" /> : <Eye size={15} color="#9CA3AF" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {error && <p style={{ fontSize: 13, color: "#EF4444", background: "#FEF2F2", padding: "10px 14px", borderRadius: 10 }}>{error}</p>}

        <button type="submit" style={{ marginTop: 8, padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 18px rgba(108,58,237,0.4)" }}>
          회원가입
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 24 }}>
        이미 계정이 있으신가요?{" "}
        <button onClick={() => navigate("/login")} style={{ color: "#6C3AED", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>로그인</button>
      </p>

      <p style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF", marginTop: 12, lineHeight: 1.6 }}>
        가입 시 <a href="#" style={{ color: "#6C3AED", textDecoration: "none" }}>이용약관</a> 및{" "}
        <a href="#" style={{ color: "#6C3AED", textDecoration: "none" }}>개인정보처리방침</a>에 동의하게 됩니다.
      </p>

      <style>{`
        @media (max-width: 768px) {
          .auth-card {
            max-width: 100% !important;
            padding: 32px 24px 28px !important;
            margin: 0 16px !important;
            box-shadow: 0 4px 20px rgba(108,58,237,0.1) !important;
          }
        }
        @media (max-width: 480px) {
          .auth-card {
            border-radius: 16px !important;
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
