import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, Repeat, ChevronDown } from "lucide-react";

const DANCER_COLORS = ["#6C3AED", "#EC4899", "#0EA5E9", "#10B981", "#F59E0B"];

const formations = [
  { name: "인트로", dancers: [{ x: 0.5, y: 0.4 }, { x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.4, y: 0.7 }, { x: 0.6, y: 0.7 }] },
  { name: "버스1", dancers: [{ x: 0.3, y: 0.3 }, { x: 0.5, y: 0.25 }, { x: 0.7, y: 0.3 }, { x: 0.4, y: 0.6 }, { x: 0.6, y: 0.6 }] },
  { name: "후렴", dancers: [{ x: 0.2, y: 0.4 }, { x: 0.4, y: 0.35 }, { x: 0.6, y: 0.35 }, { x: 0.8, y: 0.4 }, { x: 0.5, y: 0.7 }] },
  { name: "브릿지", dancers: [{ x: 0.5, y: 0.2 }, { x: 0.3, y: 0.45 }, { x: 0.7, y: 0.45 }, { x: 0.4, y: 0.7 }, { x: 0.6, y: 0.7 }] },
  { name: "아웃트로", dancers: [{ x: 0.5, y: 0.4 }, { x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.4, y: 0.7 }, { x: 0.6, y: 0.7 }] },
];

export function FormationAnimationScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentFormation, setCurrentFormation] = useState(0);
  const animRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const totalDuration = 8000;

  const drawFrame = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#1A1033";
    ctx.fillRect(0, 0, W, H);

    const pad = 12;
    const sW = W - pad * 2, sH = H - pad * 2;

    const grad = ctx.createLinearGradient(pad, pad, pad, pad + sH);
    grad.addColorStop(0, "#211240");
    grad.addColorStop(1, "#1A1033");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(pad, pad, sW, sH, 10); ctx.fill();

    // Grid
    ctx.strokeStyle = "rgba(167,139,250,0.08)";
    ctx.lineWidth = 0.5;
    for (let x = pad; x <= pad + sW; x += 28) {
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad + sH); ctx.stroke();
    }
    for (let y = pad; y <= pad + sH; y += 28) {
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + sW, y); ctx.stroke();
    }

    ctx.strokeStyle = "rgba(167,139,250,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(pad, pad, sW, sH, 10); ctx.stroke();

    // Interpolate between formations
    const segCount = formations.length - 1;
    const segDur = totalDuration / segCount;
    const segIdx = Math.min(Math.floor(t / segDur), segCount - 1);
    const segT = (t % segDur) / segDur;
    const ease = segT < 0.5 ? 2 * segT * segT : -1 + (4 - 2 * segT) * segT;

    const fromF = formations[segIdx];
    const toF = formations[segIdx + 1] || formations[segIdx];

    fromF.dancers.forEach((fd, i) => {
      const td = toF.dancers[i];
      const ix = fd.x + (td.x - fd.x) * ease;
      const iy = fd.y + (td.y - fd.y) * ease;
      const px = pad + ix * sW;
      const py = pad + iy * sH;

      // Trail
      if (isPlaying) {
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fillStyle = DANCER_COLORS[i] + "15";
        ctx.fill();
      }

      // Shadow
      ctx.beginPath();
      ctx.arc(px, py + 2, 14, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      // Dancer circle
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      const dg = ctx.createRadialGradient(px - 2, py - 2, 2, px, py, 14);
      dg.addColorStop(0, DANCER_COLORS[i] + "FF");
      dg.addColorStop(1, DANCER_COLORS[i] + "BB");
      ctx.fillStyle = dg;
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "bold 9px Pretendard, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(["민", "지", "서", "하", "도"][i], px, py);
      ctx.textBaseline = "alphabetic";
    });
  }, [isPlaying]);

  useEffect(() => {
    drawFrame(progress / 100 * totalDuration);
  }, [progress, drawFrame]);

  useEffect(() => {
    if (isPlaying) {
      const start = performance.now() - (progress / 100 * totalDuration / speed);
      const tick = (now: number) => {
        const elapsed = (now - start) * speed;
        const p = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(p);
        const formIdx = Math.floor((p / 100) * (formations.length - 1));
        setCurrentFormation(Math.min(formIdx, formations.length - 1));
        if (p < 100) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          setIsPlaying(false);
          setProgress(0);
        }
      };
      animRef.current = requestAnimationFrame(tick);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isPlaying, speed]);

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
              <h1 style={{ fontSize: 17, fontWeight: 800, color: "white" }}>포메이션 애니메이션</h1>
              <p style={{ fontSize: 11, color: "#6B7280" }}>2024 봄 정기공연</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(167,139,250,0.1)", borderRadius: 10, padding: "6px 12px", cursor: "pointer" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA" }}>×{speed}</span>
            <ChevronDown size={12} color="#A78BFA" />
          </div>
        </div>
      </div>

      {/* Canvas stage */}
      <div style={{ flex: 1, padding: "8px 12px 0", minHeight: 0 }}>
        <canvas ref={canvasRef} width={326} height={260} style={{ width: "100%", height: "100%", display: "block", borderRadius: 12 }} />
      </div>

      {/* Current formation badge */}
      <div style={{ padding: "10px 16px 0", display: "flex", justifyContent: "center" }}>
        <div style={{ background: "rgba(108,58,237,0.3)", borderRadius: 20, padding: "4px 16px", border: "1px solid rgba(108,58,237,0.4)" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA" }}>{formations[currentFormation].name}</span>
        </div>
      </div>

      {/* Formation list */}
      <div style={{ padding: "10px 16px", display: "flex", gap: 8, overflow: "hidden" }}>
        {formations.map((f, i) => (
          <button
            key={f.name}
            onClick={() => { setCurrentFormation(i); setProgress((i / (formations.length - 1)) * 100); }}
            style={{ flex: 1, padding: "6px 0", borderRadius: 10, background: currentFormation === i ? "#6C3AED" : "rgba(167,139,250,0.08)", border: currentFormation === i ? "none" : "1px solid rgba(167,139,250,0.15)", cursor: "pointer" }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: currentFormation === i ? "white" : "#6B7280" }}>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: "#150D2E", padding: "12px 20px 32px", borderTop: "1px solid rgba(167,139,250,0.1)" }}>
        {/* Timeline */}
        <div style={{ marginBottom: 16 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => { setIsPlaying(false); setProgress(Number(e.target.value)); }}
            style={{ width: "100%", accentColor: "#6C3AED", height: 4 }}
          />
          <div className="flex justify-between" style={{ marginTop: 4 }}>
            <span style={{ fontSize: 10, color: "#6B7280" }}>{Math.floor(progress / 100 * 32)}초</span>
            <span style={{ fontSize: 10, color: "#6B7280" }}>32초</span>
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => { setProgress(0); setCurrentFormation(0); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <SkipBack size={22} color="#A78BFA" />
          </button>
          <button
            onClick={() => setIsPlaying(p => !p)}
            style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(108,58,237,0.5)" }}
          >
            {isPlaying ? <Pause size={24} color="white" fill="white" /> : <Play size={24} color="white" fill="white" style={{ marginLeft: 3 }} />}
          </button>
          <button onClick={() => { setProgress(100); setCurrentFormation(formations.length - 1); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <SkipForward size={22} color="#A78BFA" />
          </button>
          <button onClick={() => setSpeed(s => s === 1 ? 0.5 : s === 0.5 ? 2 : 1)} style={{ background: "rgba(167,139,250,0.1)", border: "none", cursor: "pointer", borderRadius: 10, padding: "6px 12px" }}>
            <Repeat size={18} color="#A78BFA" />
          </button>
        </div>
      </div>
    </div>
  );
}
