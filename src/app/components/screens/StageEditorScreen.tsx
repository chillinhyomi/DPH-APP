import { useRef, useEffect, useState } from "react";
import { ZoomIn, ZoomOut, Grid, Maximize2, ChevronLeft, RotateCcw, Move, ChevronDown } from "lucide-react";

export function StageEditorScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState("select");

  useEffect(() => {
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

    const margin = 24;
    const stageW = W - margin * 2;
    const stageH = H - margin * 2 - 40;
    const sx = margin;
    const sy = margin + 30;

    // Stage floor
    const grad = ctx.createLinearGradient(sx, sy, sx, sy + stageH);
    grad.addColorStop(0, "#2D1F4E");
    grad.addColorStop(1, "#1A1033");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx, sy, stageW, stageH, 12);
    ctx.fill();

    // Grid
    const gridSize = 28;
    ctx.strokeStyle = "rgba(167,139,250,0.12)";
    ctx.lineWidth = 0.5;
    for (let x = sx; x <= sx + stageW; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, sy);
      ctx.lineTo(x, sy + stageH);
      ctx.stroke();
    }
    for (let y = sy; y <= sy + stageH; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(sx, y);
      ctx.lineTo(sx + stageW, y);
      ctx.stroke();
    }

    // Stage border
    ctx.strokeStyle = "rgba(167,139,250,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sx, sy, stageW, stageH, 12);
    ctx.stroke();

    // Front label
    ctx.fillStyle = "rgba(167,139,250,0.6)";
    ctx.font = "bold 10px Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STAGE FRONT", sx + stageW / 2, sy + stageH - 10);

    // Audience area indicator
    ctx.fillStyle = "rgba(167,139,250,0.15)";
    ctx.beginPath();
    ctx.roundRect(sx, sy + stageH + 4, stageW, 18, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(167,139,250,0.5)";
    ctx.font = "bold 9px Pretendard, sans-serif";
    ctx.fillText("▼  객석  ▼", sx + stageW / 2, sy + stageH + 16);

    // Dimension labels
    ctx.fillStyle = "rgba(167,139,250,0.5)";
    ctx.font = "10px Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("8m", sx + stageW / 2, sy - 8);
    ctx.save();
    ctx.translate(sx - 8, sy + stageH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("6m", 0, 0);
    ctx.restore();

    // Center cross
    ctx.strokeStyle = "rgba(167,139,250,0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(sx + stageW / 2, sy);
    ctx.lineTo(sx + stageW / 2, sy + stageH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sx, sy + stageH / 2);
    ctx.lineTo(sx + stageW, sy + stageH / 2);
    ctx.stroke();
    ctx.setLineDash([]);

  }, [zoom]);

  const tools = [
    { id: "select", icon: Move, label: "선택" },
    { id: "grid", icon: Grid, label: "그리드" },
    { id: "zoom", icon: Maximize2, label: "확대" },
  ];

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
              <h1 style={{ fontSize: 17, fontWeight: 800, color: "white", letterSpacing: -0.3 }}>무대 편집</h1>
              <p style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>2024 봄 정기공연</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(167,139,250,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RotateCcw size={16} color="#A78BFA" />
            </button>
            <button style={{ padding: "8px 16px", borderRadius: 11, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "white" }}>
              저장
            </button>
          </div>
        </div>
      </div>

      {/* Stage info bar */}
      <div style={{ background: "rgba(167,139,250,0.06)", borderBottom: "1px solid rgba(167,139,250,0.08)", padding: "10px 16px", display: "flex", gap: 16, alignItems: "center" }}>
        {[
          { label: "너비", value: "8m" },
          { label: "깊이", value: "6m" },
          { label: "그리드", value: "1m" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span style={{ fontSize: 11, color: "#6B7280" }}>{item.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(167,139,250,0.1)", borderRadius: 8, padding: "3px 10px", cursor: "pointer" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA" }}>{item.value}</span>
              <ChevronDown size={10} color="#A78BFA" />
            </div>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#6B7280" }}>
          <span style={{ color: "#A78BFA", fontWeight: 700 }}>{zoom}%</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative" style={{ overflow: "hidden" }}>
        <canvas
          ref={canvasRef}
          width={350}
          height={360}
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Tool sidebar */}
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6 }}>
          {tools.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              style={{ width: 40, height: 40, borderRadius: 12, background: activeTool === t.id ? "#6C3AED" : "rgba(26,16,51,0.9)", border: activeTool === t.id ? "none" : "1px solid rgba(167,139,250,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
            >
              <t.icon size={16} color={activeTool === t.id ? "white" : "#A78BFA"} />
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div style={{ position: "absolute", right: 12, bottom: 20, display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(26,16,51,0.9)", border: "1px solid rgba(167,139,250,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ZoomIn size={16} color="#A78BFA" />
          </button>
          <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(26,16,51,0.9)", border: "1px solid rgba(167,139,250,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ZoomOut size={16} color="#A78BFA" />
          </button>
        </div>
      </div>
    </div>
  );
}
