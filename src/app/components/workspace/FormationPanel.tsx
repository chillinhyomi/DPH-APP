import { useState } from "react";
import { Plus, Trash2, Copy, GripVertical, Edit2, Check, X } from "lucide-react";
import { Formation } from "../../context/AppContext";

interface Props {
  formations: Formation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function FormationPanel({ formations, activeId, onSelect, onAdd, onDelete, onDuplicate, onRename }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  function startEdit(f: Formation) {
    setEditingId(f.id);
    setEditName(f.name);
  }

  function commitEdit() {
    if (editingId && editName.trim()) {
      onRename(editingId, editName.trim());
    }
    setEditingId(null);
  }

  return (
    <div className="formation-panel" style={{ height: 180, background: "#150D2E", borderTop: "1px solid rgba(167,139,250,0.15)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Header */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(167,139,250,0.1)", display: "flex", alignItems: "center", gap: 12 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: "rgba(167,139,250,0.9)", letterSpacing: 0.5 }}>포메이션</h3>
        <div style={{ flex: 1, height: 1, background: "rgba(167,139,250,0.1)" }} />
        <span style={{ fontSize: 11, color: "rgba(167,139,250,0.5)" }}>{formations.length}개</span>
        <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: "rgba(108,58,237,0.4)", border: "1px solid rgba(108,58,237,0.5)", color: "#C4B5FD", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          <Plus size={12} />
          추가
        </button>
      </div>

      {/* Formation list */}
      <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden", padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        {formations.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", color: "rgba(167,139,250,0.4)", fontSize: 13 }}>
            포메이션을 추가하세요
          </div>
        ) : (
          formations.map((f, i) => {
            const isActive = f.id === activeId;
            return (
              <div
                key={f.id}
                onClick={() => onSelect(f.id)}
                style={{ flexShrink: 0, width: 120, borderRadius: 12, background: isActive ? "rgba(108,58,237,0.6)" : "rgba(255,255,255,0.05)", border: isActive ? "1.5px solid rgba(108,58,237,0.8)" : "1.5px solid rgba(167,139,250,0.15)", cursor: "pointer", overflow: "hidden" }}
              >
                {/* Mini stage preview */}
                <div style={{ height: 68, background: isActive ? "rgba(108,58,237,0.3)" : "rgba(0,0,0,0.2)", position: "relative", padding: 4 }}>
                  <div style={{ width: "100%", height: "100%", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 6, position: "relative", background: "rgba(33,18,64,0.6)" }}>
                    {f.positions.slice(0, 8).map((pos, j) => (
                      <div
                        key={pos.memberId}
                        style={{ position: "absolute", left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: ["#6C3AED","#EC4899","#0EA5E9","#10B981","#F59E0B","#EF4444","#8B5CF6","#14B8A6"][j % 8] }}
                      />
                    ))}
                    <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", fontSize: 6, color: "rgba(167,139,250,0.4)" }}>▼</div>
                  </div>
                </div>

                {/* Label */}
                <div style={{ padding: "6px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                  {editingId === f.id ? (
                    <div style={{ flex: 1, display: "flex", gap: 4 }}>
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditingId(null); }}
                        autoFocus
                        onClick={e => e.stopPropagation()}
                        style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: 5, padding: "2px 5px", fontSize: 11, color: "white", outline: "none", width: 0 }}
                      />
                      <button onClick={e => { e.stopPropagation(); commitEdit(); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        <Check size={11} color="#10B981" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: isActive ? "#E9D5FF" : "rgba(255,255,255,0.65)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.name}</span>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button onClick={e => { e.stopPropagation(); startEdit(f); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 1, opacity: 0.6 }}>
                          <Edit2 size={9} color="white" />
                        </button>
                        <button onClick={e => { e.stopPropagation(); onDuplicate(f.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 1, opacity: 0.6 }}>
                          <Copy size={9} color="white" />
                        </button>
                        <button onClick={e => { e.stopPropagation(); if (formations.length > 1) onDelete(f.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 1, opacity: 0.6 }}>
                          <Trash2 size={9} color="#EF4444" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Add placeholder */}
        <div onClick={onAdd} style={{ flexShrink: 0, width: 120, height: 100, borderRadius: 12, border: "1.5px dashed rgba(167,139,250,0.25)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "rgba(167,139,250,0.4)" }}>
          <Plus size={16} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>포메이션 추가</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .formation-panel {
            height: 140px !important;
          }
          .formation-panel [style*="width: 120"] {
            width: 100px !important;
          }
          .formation-panel [style*="height: 68"] {
            height: 56px !important;
          }
        }
        @media (max-width: 480px) {
          .formation-panel {
            height: 120px !important;
          }
          .formation-panel [style*="width: 120"] {
            width: 90px !important;
          }
        }
      `}</style>
    </div>
  );
}
