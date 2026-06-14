import { useState } from "react";
import { Plus, Crown, Edit2, Eye, ChevronDown, X } from "lucide-react";
import { Member } from "../../context/AppContext";

interface Props {
  members: Member[];
  selectedMemberId: string | null;
  onSelectMember: (id: string) => void;
  onUpdateMember: (m: Member) => void;
  onAddMember: (name: string, color: string) => void;
  onClose: () => void;
  colors: string[];
}

const ROLE_LABELS: Record<string, string> = { owner: "소유자", editor: "편집자", viewer: "조회자" };

export function MemberPanel({ members, selectedMemberId, onSelectMember, onUpdateMember, onAddMember, onClose, colors }: Props) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(colors[0]);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleAdd() {
    if (!newName.trim()) return;
    onAddMember(newName.trim(), newColor);
    setNewName("");
    setNewColor(colors[(members.length) % colors.length]);
    setAdding(false);
  }

  return (
    <div className="workspace-member-panel" style={{ width: 220, background: "white", borderRight: "1px solid #EDE9FE", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #F5F3FF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>멤버 ({members.length})</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setAdding(!adding)} style={{ width: 28, height: 28, borderRadius: 8, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={14} color="#6C3AED" />
          </button>
          <button onClick={onClose} title="패널 닫기" style={{ width: 28, height: 28, borderRadius: 8, background: "#F5F3FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color="#6C3AED" />
          </button>
        </div>
      </div>

      {adding && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #F5F3FF", background: "#FAFAFA" }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="댄서 이름"
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            autoFocus
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid #EDE9FE", background: "white", fontSize: 13, outline: "none", marginBottom: 8, boxSizing: "border-box" as const }}
          />
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
            {colors.map(c => (
              <button key={c} onClick={() => setNewColor(c)} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: newColor === c ? "2.5px solid #111827" : "2px solid white", cursor: "pointer", outline: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleAdd} style={{ flex: 1, padding: "7px 0", borderRadius: 8, background: "#6C3AED", color: "white", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>추가</button>
            <button onClick={() => setAdding(false)} style={{ padding: "7px 10px", borderRadius: 8, background: "#F5F3FF", color: "#6B7280", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>취소</button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: "auto", padding: "8px" }}>
        {members.map(m => {
          const isSelected = selectedMemberId === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelectMember(m.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 12, background: isSelected ? "#EDE9FE" : "transparent", cursor: "pointer", marginBottom: 2, position: "relative" }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 2px 8px ${m.color}50` }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{m.name[0]}</span>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? "#6C3AED" : "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                  {m.role === "owner" && <Crown size={9} color="#F59E0B" />}
                  <span style={{ fontSize: 10, color: "#9CA3AF" }}>{ROLE_LABELS[m.role]} · {m.dancerRole}</span>
                </div>
              </div>
              {editingId === m.id ? (
                <button onClick={e => { e.stopPropagation(); setEditingId(null); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <ChevronDown size={13} color="#9CA3AF" />
                </button>
              ) : (
                <button onClick={e => { e.stopPropagation(); setEditingId(editingId === m.id ? null : m.id); }} style={{ background: "none", border: "none", cursor: "pointer", opacity: isSelected ? 1 : 0 }}>
                  <Edit2 size={12} color="#9CA3AF" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ padding: "10px 16px", borderTop: "1px solid #F5F3FF" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ icon: Crown, label: "소유자", color: "#F59E0B" }, { icon: Edit2, label: "편집자", color: "#6C3AED" }, { icon: Eye, label: "조회자", color: "#9CA3AF" }].map(i => (
            <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <i.icon size={10} color={i.color} />
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{i.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
