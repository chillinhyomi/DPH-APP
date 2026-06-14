import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, Plus, Trash2, Copy, ChevronRight } from "lucide-react";

const DANCER_COLORS = ["#6C3AED", "#EC4899", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"];

const initialDancers = [
  { id: 1, name: "민준", x: 0.2, y: 0.3, color: DANCER_COLORS[0] },
  { id: 2, name: "지은", x: 0.5, y: 0.3, color: DANCER_COLORS[1] },
  { id: 3, name: "서준", x: 0.8, y: 0.3, color: DANCER_COLORS[2] },
  { id: 4, name: "하린", x: 0.35, y: 0.65, color: DANCER_COLORS[3] },
  { id: 5, name: "도현", x: 0.65, y: 0.65, color: DANCER_COLORS[4] },
];

const formations = ["포메이션 1", "포메이션 2", "포메이션 3", "포메이션 4", "포메이션 5"];

export function FormationEditorScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dancers] = useState(initialDancers);
  const [selected, setSelected] = useState<number | null>(1);
  const [activeFormation, setActiveFormation] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#1A1033";
    ctx.fillRect(0, 0, W, H);

    const pad = 16;
    const sW = W - pad * 2;
    const sH = H - pad * 2;

    // Stage
    const grad = ctx.createLinearGradient(pad, pad, pad, pad + sH);
    grad.addColorStop(0, "#211240");
    grad.addColorStop(1, "#1A1033");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(pad, pad, sW, sH, 10);
    ctx.fill();

    // Grid
    const gridStep = 32;
    ctx.strokeStyle = "rgba(167,139,250,0.08)";
    ctx.lineWidth = 0.5;
    for (let x = pad; x <= pad + sW; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad + sH); ctx.stroke();
    }
    for (let y = pad; y <= pad + sH; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + sW, y); ctx.stroke();
    }

    // Stage border
    ctx.strokeStyle = "rgba(167,139,250,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(pad, pad, sW, sH, 10);
    ctx.stroke();

    // Front label
    ctx.fillStyle = "rgba(167,139,250,0.4)";
    ctx.font = "9px Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("객석 방향 ↓", pad + sW / 2, pad + sH - 6);

    // Draw movement paths (ghost)
    ctx.strokeStyle = "rgba(167,139,250,0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    dancers.forEach(d => {
      const x = pad + d.x * sW;
      const y = pad + d.y * sH;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20, y - 15);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Draw dancers
    dancers.forEach(d => {
      const x = pad + d.x * sW;
      const y = pad + d.y * sH;
      const r = d.id === selected ? 18 : 15;

      // Selection ring
      if (d.id === selected) {
        ctx.beginPath();
        ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.strokeStyle = d.color + "60";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Shadow
      ctx.beginPath();
      ctx.arc(x, y + 2, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      const dGrad = ctx.createRadialGradient(x - 3, y - 3, 2, x, y, r);
      dGrad.addColorStop(0, d.color + "FF");
      dGrad.addColorStop(1, d.color + "CC");
      ctx.fillStyle = dGrad;
      ctx.fill();

      // Initial
      ctx.fillStyle = "white";
      ctx.font = `bold ${d.id === selected ? 11 : 9}px Pretendard, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(d.name[0], x, y);
      ctx.textBaseline = "alphabetic";

      // Name label
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "8px Pretendard, sans-serif";
      ctx.fillText(d.name, x, y + r + 10);
    });
  }, [dancers, selected]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex flex-col h-full" style={{ background: "#0F0A1E", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 12px", background: "#0F0A1E", borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(167,139,250,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={18} color="#A78BFA" />
            </button>
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 800, color: "white" }}>포메이션 편집</h1>
              <p style={{ fontSize: 11, color: "#6B7280" }}>포메이션 1 / 5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(167,139,250,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Copy size={15} color="#A78BFA" />
            </button>
            <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(167,139,250,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Trash2 size={15} color="#EF4444" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, padding: "0 0", position: "relative", minHeight: 0 }}>
        <canvas
          ref={canvasRef}
          width={350}
          height={280}
          onClick={e => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;
            const pad = 16;
            const sW = canvas.width - pad * 2;
            const sH = canvas.height - pad * 2;
            let found: number | null = null;
            dancers.forEach(d => {
              const dx = pad + d.x * sW - mx;
              const dy = pad + d.y * sH - my;
              if (Math.sqrt(dx*dx + dy*dy) < 20) found = d.id;
            });
            setSelected(found);
          }}
          style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }}
        />

        {/* Selected dancer info */}
        {selected && (() => {
          const d = dancers.find(x => x.id === selected);
          return d ? (
            <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(26,16,51,0.95)", backdropFilter: "blur(12px)", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(167,139,250,0.2)" }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 24, height: 24, borderRadius: 8, background: d.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "white" }}>{d.name[0]}</span>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{d.name}</p>
                  <p style={{ fontSize: 10, color: "#6B7280" }}>선택됨</p>
                </div>
              </div>
            </div>
          ) : null;
        })()}
      </div>

      {/* Formation timeline */}
      <div style={{ background: "#150D2E", borderTop: "1px solid rgba(167,139,250,0.1)", padding: "12px 16px" }}>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA" }}>포메이션 타임라인</span>
          <button style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(108,58,237,0.3)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={14} color="#A78BFA" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {formations.map((f, i) => (
            <button
              key={f}
              onClick={() => setActiveFormation(i)}
              style={{ flexShrink: 0, width: 60, padding: "8px 0", borderRadius: 10, background: activeFormation === i ? "#6C3AED" : "rgba(167,139,250,0.1)", border: activeFormation === i ? "none" : "1px solid rgba(167,139,250,0.15)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <div style={{ width: 28, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.1)", position: "relative" }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: DANCER_COLORS[j], left: [3, 11, 19][j], top: [3, 12, 3][j] }} />
                ))}
              </div>
              <span style={{ fontSize: 9, color: activeFormation === i ? "white" : "#6B7280", fontWeight: 600 }}>F{i + 1}</span>
            </button>
          ))}
          <button style={{ flexShrink: 0, width: 60, padding: "8px 0", borderRadius: 10, border: "1.5px dashed rgba(167,139,250,0.3)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={16} color="rgba(167,139,250,0.5)" />
          </button>
        </div>
      </div>

      {/* Dancer color picker */}
      <div style={{ background: "#0F0A1E", padding: "10px 16px 20px", borderTop: "1px solid rgba(167,139,250,0.08)" }}>
        <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {dancers.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: d.color, border: selected === d.id ? "2.5px solid white" : "2.5px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>{d.name[0]}</span>
              </div>
              <span style={{ fontSize: 9, color: selected === d.id ? "white" : "#6B7280", fontWeight: 600 }}>{d.name}</span>
            </button>
          ))}
          <button style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 10, border: "1.5px dashed rgba(167,139,250,0.4)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 0 }}>
            <Plus size={14} color="rgba(167,139,250,0.5)" />
          </button>
        </div>
      </div>
    </div>
  );
}
