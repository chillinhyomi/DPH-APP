import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useApp();

  const [email, setEmail] = useState("minjun@dph.kr");
  const [password, setPassword] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
   e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  }
  async function handleGoogleLogin() {
  await loginWithGoogle();
}

  return (
    <div className="auth-card" style={{ width: "100%", maxWidth: 440, background: "white", borderRadius: 24, padding: "44px 44px 36px", boxShadow: "0 8px 40px rgba(108,58,237,0.12)", border: "1px solid #EDE9FE" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: -0.5, marginBottom: 6 }}>다시 오셨군요!</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>DPH에 로그인하여 프로젝트를 계속하세요.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>이메일</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA" }}>
            <Mail size={15} color="#A78BFA" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 주소"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#111827" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>비밀번호</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: "1.5px solid #EDE9FE", background: "#FAFAFA" }}>
            <Lock size={15} color="#A78BFA" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#111827" }}
            />
            <button type="button" onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {showPw ? <EyeOff size={15} color="#9CA3AF" /> : <Eye size={15} color="#9CA3AF" />}
            </button>
          </div>
        </div>

        {error && <p style={{ fontSize: 13, color: "#EF4444", background: "#FEF2F2", padding: "10px 14px", borderRadius: 10 }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" style={{ fontSize: 13, color: "#6C3AED", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>비밀번호 찾기</button>
        </div>

        <button type="submit" style={{ padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 18px rgba(108,58,237,0.4)" }}>
          로그인
        </button>

        <button
         type="button"
         onClick={handleGoogleLogin}
        >
         구글로 로그인
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>또는</span>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
        </div>

         <button
          type="button"
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider : "google",
              options: {
                redirectTo: window.location.origin
              },
            })

            if (error){
              console.error(error);
              alert("구글 로그인에 실패했습니다.");
            }
          }}
          style={{ padding: "12px 14px", borderRadius: 12, background: "white", border: "1.5px solid #E5E7EB", fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Google 계정으로 로그인
        </button>
      </form>
  
      <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 24 }}>
        계정이 없으신가요?{" "}
        <button onClick={() => navigate("/register")} style={{ color: "#6C3AED", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>회원가입</button>
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
