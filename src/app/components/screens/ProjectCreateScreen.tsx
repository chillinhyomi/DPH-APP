import { useState } from "react";
import { X, ChevronLeft, Calendar, Users, Music2, ChevronDown, Plus } from "lucide-react";

const genres = ["K-POP", "힙합", "팝핀", "왁킹", "재즈", "컨템포러리", "스트릿"];

export function ProjectCreateScreen() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("K-POP");
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", background: "white", borderBottom: "1px solid #F1F0FF" }}>
        <div className="flex items-center gap-3 mb-2">
          <button style={{ width: 36, height: 36, borderRadius: 11, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={18} color="#6C3AED" />
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>새 프로젝트</h1>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div style={{ width: s === step ? 28 : 8, height: 8, borderRadius: 8, background: s <= step ? "#6C3AED" : "#E5E7EB", transition: "all 0.3s" }} />
              {s < 3 && <div style={{ width: 12, height: 1, background: "#E5E7EB" }} />}
            </div>
          ))}
          <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 6 }}>단계 {step} / 3</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: "24px 20px" }}>
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>프로젝트 이름 *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="예: 2024 봄 정기공연"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 15, color: "#111827", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>댄스 장르</label>
              <div className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1.5px solid", cursor: "pointer", borderColor: genre === g ? "#6C3AED" : "#E5E7EB", background: genre === g ? "#6C3AED" : "white", color: genre === g ? "white" : "#6B7280" }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>팀 / 소속</label>
              <input
                placeholder="예: 한양대 STEP 댄스동아리"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 15, color: "#111827", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>공연 날짜</label>
              <div style={{ padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <Calendar size={16} color="#A78BFA" />
                <span style={{ fontSize: 15, color: "#9CA3AF" }}>날짜 선택</span>
                <ChevronDown size={16} color="#D1D5DB" style={{ marginLeft: "auto" }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>공연 곡</label>
              <div style={{ padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <Music2 size={16} color="#A78BFA" />
                <span style={{ fontSize: 15, color: "#9CA3AF" }}>곡 추가</span>
                <Plus size={16} color="#D1D5DB" style={{ marginLeft: "auto" }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>무대 너비 (m)</label>
              <div className="flex items-center gap-3">
                <input defaultValue="8" style={{ flex: 1, padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 15, outline: "none" }} type="number" />
                <span style={{ fontSize: 14, color: "#6B7280" }}>×</span>
                <input defaultValue="6" style={{ flex: 1, padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 15, outline: "none" }} type="number" />
              </div>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>너비 × 깊이</p>
            </div>

            {/* Stage preview */}
            <div style={{ background: "white", borderRadius: 20, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>무대 미리보기</p>
              <div style={{ background: "#F5F3FF", borderRadius: 12, padding: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "2px solid #EDE9FE" }}>
                <div style={{ width: "80%", height: "75%", border: "2px dashed #A78BFA", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>무대 영역</span>
                  <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#9CA3AF", background: "#F5F3FF", padding: "2px 8px", borderRadius: 6 }}>객석 방향 ▼</div>
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>그리드 크기</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["0.5m", "1m", "2m"].map(g => (
                  <button key={g} style={{ flex: 1, padding: "10px", borderRadius: 12, background: g === "1m" ? "#6C3AED" : "#F5F3FF", color: g === "1m" ? "white" : "#6B7280", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>팀원 초대</label>
              <div style={{ padding: "14px 16px", borderRadius: 14, border: "1.5px solid #EDE9FE", background: "#F9FAFB", display: "flex", alignItems: "center", gap: 10 }}>
                <Users size={16} color="#A78BFA" />
                <input placeholder="이메일로 초대" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 15, color: "#111827" }} />
              </div>
            </div>
            {/* Invited members */}
            {[
              { name: "이지은", role: "댄서", color: "#EC4899" },
              { name: "박서준", role: "리더", color: "#6C3AED" },
              { name: "김태형", role: "댄서", color: "#0EA5E9" },
            ].map(m => (
              <div key={m.name} style={{ background: "white", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: m.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: m.color }}>{m.name[0]}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF" }}>{m.role}</p>
                </div>
                <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer" }}>
                  <X size={16} color="#D1D5DB" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: "16px 20px 32px", background: "white", borderTop: "1px solid #F1F0FF", display: "flex", gap: 12 }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "16px", borderRadius: 16, background: "#F5F3FF", color: "#6C3AED", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
            이전
          </button>
        )}
        <button onClick={() => step < 3 ? setStep(s => s + 1) : undefined} style={{ flex: 2, padding: "16px", borderRadius: 16, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(108,58,237,0.35)" }}>
          {step === 3 ? "프로젝트 생성" : "다음"}
        </button>
      </div>
    </div>
  );
}
