import { useState } from "react";
import { Eye, EyeOff, Music2 } from "lucide-react";

export function LoginScreen() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: "var(--font-family)" }}>
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5 items-end">
            {[3, 5, 7, 9].map((h, i) => (
              <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? "#111827" : "#D1D5DB" }} />
            ))}
          </div>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 3C9.9 3 11.6 3.8 12.8 5L14.2 3.6C12.6 2.1 10.4 1.2 8 1.2C5.6 1.2 3.4 2.1 1.8 3.6L3.2 5C4.4 3.8 6.1 3 8 3Z" fill="#111827"/>
            <path d="M8 6C9.1 6 10.1 6.4 10.8 7.1L12.2 5.7C11.1 4.7 9.6 4 8 4C6.4 4 4.9 4.7 3.8 5.7L5.2 7.1C5.9 6.4 6.9 6 8 6Z" fill="#111827"/>
            <circle cx="8" cy="10" r="1.5" fill="#111827"/>
          </svg>
          <div style={{ width: 25, height: 13, borderRadius: 3, border: "1.5px solid #111827", padding: "1.5px", display: "flex", alignItems: "center" }}>
            <div style={{ width: "75%", height: "100%", borderRadius: 1.5, background: "#111827" }} />
          </div>
        </div>
      </div>

      {/* Logo area */}
      <div className="flex flex-col items-center pt-10 pb-8 px-6">
        <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, #6C3AED 0%, #A78BFA 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(108,58,237,0.35)" }}>
          <Music2 size={36} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginTop: 16, letterSpacing: -0.5 }}>DPH</h1>
        <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4, letterSpacing: 0.2 }}>Dance Performing Helper</p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col px-6 gap-4">
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>이메일</label>
          <div style={{ borderRadius: 14, border: "1.5px solid #E5E7EB", background: "#F9FAFB", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              style={{ flex: 1, background: "transparent", outline: "none", fontSize: 15, color: "#111827", border: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>비밀번호</label>
          <div style={{ borderRadius: 14, border: "1.5px solid #E5E7EB", background: "#F9FAFB", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호 입력"
              style={{ flex: 1, background: "transparent", outline: "none", fontSize: 15, color: "#111827", border: "none" }}
            />
            <button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {showPw ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center" style={{ marginTop: 4 }}>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, border: "1.5px solid #6C3AED", background: "#6C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: "#374151" }}>로그인 상태 유지</span>
          </label>
          <button style={{ fontSize: 13, color: "#6C3AED", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>비밀번호 찾기</button>
        </div>

        <button
          style={{ marginTop: 8, width: "100%", padding: "16px", borderRadius: 16, background: "linear-gradient(135deg, #6C3AED 0%, #8B5CF6 100%)", color: "white", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(108,58,237,0.4)" }}
        >
          로그인
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3" style={{ marginTop: 4 }}>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          <span style={{ fontSize: 13, color: "#9CA3AF" }}>또는</span>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
        </div>

        {/* Social login */}
        <div className="flex gap-3">
          {[
            { label: "카카오", bg: "#FEE500", color: "#191919" },
            { label: "애플", bg: "#000000", color: "#ffffff" },
            { label: "구글", bg: "#ffffff", color: "#374151", border: "#E5E7EB" },
          ].map((s) => (
            <button key={s.label} style={{ flex: 1, padding: "12px 0", borderRadius: 14, background: s.bg, color: s.color, fontSize: 13, fontWeight: 600, border: s.border ? `1.5px solid ${s.border}` : "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 14, color: "#6B7280" }}>계정이 없으신가요?</span>
          <button style={{ fontSize: 14, color: "#6C3AED", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>회원가입</button>
        </div>
      </div>
    </div>
  );
}
