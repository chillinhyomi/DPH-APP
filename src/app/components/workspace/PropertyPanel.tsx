import { X } from "lucide-react";
import { Member, Formation, Position } from "../../context/AppContext";

interface Props {
  selectedMember: Member | null;
  formation: Formation | null;
  onUpdateMember: (m: Member) => void;
  onClose: () => void;
}

export function PropertyPanel({ selectedMember, formation, onUpdateMember, onClose }: Props) {
  const pos: Position | undefined = selectedMember
    ? formation?.positions.find(p => p.memberId === selectedMember.id)
    : undefined;

  const DANCER_ROLES = ["리드댄서", "메인댄서", "댄서", "포인트댄서", "백댄서"];

  return (
    <div className="workspace-property-panel" style={{ width: 220, background: "white", borderLeft: "1px solid #EDE9FE", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #F5F3FF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>속성</h3>
        <button onClick={onClose} title="패널 닫기" style={{ width: 28, height: 28, borderRadius: 8, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={14} color="#6C3AED" />
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px" }}>
        {!selectedMember ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
            <p style={{ fontSize: 13 }}>멤버를 선택하면</p>
            <p style={{ fontSize: 13 }}>속성이 표시됩니다</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: selectedMember.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${selectedMember.color}50` }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{selectedMember.name[0]}</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{selectedMember.name}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{selectedMember.dancerRole}</div>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #F5F3FF", margin: "0" }} />

            {/* Position */}
            {pos && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: 10, letterSpacing: 0.5, textTransform: "uppercase" as const }}>위치</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[{ label: "X", value: Math.round(pos.x * 100), unit: "%" }, { label: "Y", value: Math.round(pos.y * 100), unit: "%" }].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}>{f.label}축</label>
                      <div style={{ padding: "8px 10px", borderRadius: 8, background: "#F9FAFB", border: "1px solid #EDE9FE", fontSize: 13, fontWeight: 600, color: "#6C3AED" }}>
                        {f.value}{f.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" as const }}>색상</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: selectedMember.color, boxShadow: `0 2px 8px ${selectedMember.color}60` }} />
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#374151" }}>{selectedMember.color}</span>
              </div>
            </div>

            {/* Role */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" as const }}>역할</label>
              <select
                value={selectedMember.dancerRole}
                onChange={e => onUpdateMember({ ...selectedMember, dancerRole: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 13, color: "#111827", outline: "none", cursor: "pointer" }}
              >
                {DANCER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Permission */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" as const }}>권한</label>
              <select
                value={selectedMember.role}
                onChange={e => onUpdateMember({ ...selectedMember, role: e.target.value as Member["role"] })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid #EDE9FE", background: "#F9FAFB", fontSize: 13, color: "#111827", outline: "none", cursor: "pointer" }}
              >
                <option value="owner">소유자</option>
                <option value="editor">편집자</option>
                <option value="viewer">조회자</option>
              </select>
            </div>
          </div>
        )}

        {/* Formation info */}
        {formation && (
          <div style={{ marginTop: 20 }}>
            <hr style={{ border: "none", borderTop: "1px solid #F5F3FF", marginBottom: 16 }} />
            <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: 10, letterSpacing: 0.5, textTransform: "uppercase" as const }}>포메이션 정보</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#6B7280" }}>이름</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{formation.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#6B7280" }}>배치 인원</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{formation.positions.length}명</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#6B7280" }}>지속 시간</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{formation.duration}초</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
