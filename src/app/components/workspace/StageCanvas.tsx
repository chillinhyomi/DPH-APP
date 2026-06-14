import { useRef, useState, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import { Member, Formation, Position } from "../../context/AppContext";

interface Props {
  members: Member[];
  formation: Formation | null;
  selectedMemberId: string | null;
  onSelectMember: (id: string | null) => void;
  onPositionChange: (memberId: string, x: number, y: number) => void;
  stageWidth: number;
  stageHeight: number;
  readOnly?: boolean;
}

export function StageCanvas({ members, formation, selectedMemberId, onSelectMember, onPositionChange, stageWidth, stageHeight, readOnly }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const dragOffset = useRef({ ox: 0, oy: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Stage visual dimensions in pixels
  const PX_PER_M = 56;
  const stageW = stageWidth * PX_PER_M;
  const stageH = stageHeight * PX_PER_M;
  const audienceH = 48;
  const totalH = stageH + audienceH;
  const totalW = stageW;
  const RADIUS = 20;

  function getPosition(memberId: string): { x: number; y: number } {
    const pos = formation?.positions.find(p => p.memberId === memberId);
    return pos || { x: 0.5, y: 0.5 };
  }

  function pxToNorm(px: number, py: number): { x: number; y: number } {
    return { x: Math.max(0, Math.min(1, px / stageW)), y: Math.max(0, Math.min(1, py / stageH)) };
  }

  function normToPx(x: number, y: number): { px: number; py: number } {
    return { px: x * stageW, py: y * stageH };
  }

  function getContainerCoords(e: React.MouseEvent): { x: number; y: number } {
    const rect = containerRef.current!.getBoundingClientRect();
    const cx = (e.clientX - rect.left - pan.x) / zoom - (rect.width / 2 / zoom - totalW / 2);
    const cy = (e.clientY - rect.top - pan.y) / zoom - (rect.height / 2 / zoom - totalH / 2);
    return { x: cx, y: cy };
  }

  const handleMouseDown = useCallback((e: React.MouseEvent, memberId?: string) => {
    if (readOnly) return;
    e.stopPropagation();
    if (memberId) {
      setDragging(memberId);
      onSelectMember(memberId);
      const { x: cx, y: cy } = getContainerCoords(e);
      const pos = getPosition(memberId);
      const { px, py } = normToPx(pos.x, pos.y);
      dragOffset.current = { ox: cx - px, oy: cy - py };
    } else {
      // Pan
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
      onSelectMember(null);
    }
  }, [pan, zoom, formation, readOnly]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) {
      const { x: cx, y: cy } = getContainerCoords(e);
      const nx = cx - dragOffset.current.ox;
      const ny = cy - dragOffset.current.oy;
      const { x, y } = pxToNorm(nx, ny);
      onPositionChange(dragging, x, y);
    } else if (isPanning) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setPan({ x: panStart.current.px + dx, y: panStart.current.py + dy });
    }
  }, [dragging, isPanning, pan, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    setIsPanning(false);
  }, []);

  useEffect(() => {
    const handleGlobalUp = () => { setDragging(null); setIsPanning(false); };
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchend", handleGlobalUp);
    window.addEventListener("touchcancel", handleGlobalUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
      window.removeEventListener("touchcancel", handleGlobalUp);
    };
  }, []);

  // Fullscreen handlers with silent CSS fallback
  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      // Try native Fullscreen API with vendor prefixes
      const elem = containerRef.current as any;
      const requestFullscreen = elem.requestFullscreen ||
                                elem.webkitRequestFullscreen ||
                                elem.mozRequestFullScreen ||
                                elem.msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen.call(elem).then(() => {
          setIsFullscreen(true);
        }).catch(() => {
          // Silent fallback to CSS-based fullscreen
          setIsFullscreen(true);
        });
      } else {
        // Direct CSS fallback if API not available
        setIsFullscreen(true);
      }
    } else {
      // Exit fullscreen
      const doc = document as any;
      const exitFullscreen = doc.exitFullscreen ||
                            doc.webkitExitFullscreen ||
                            doc.mozCancelFullScreen ||
                            doc.msExitFullscreen;

      if (doc.fullscreenElement && exitFullscreen) {
        exitFullscreen.call(doc).then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      } else {
        // CSS fallback exit
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes (e.g., ESC key) with vendor prefixes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const isInFullscreen = doc.fullscreenElement ||
                            doc.webkitFullscreenElement ||
                            doc.mozFullScreenElement ||
                            doc.msFullscreenElement;

      if (!isInFullscreen) {
        setIsFullscreen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        const doc = document as any;
        const isInNativeFullscreen = doc.fullscreenElement ||
                                     doc.webkitFullscreenElement ||
                                     doc.mozFullScreenElement ||
                                     doc.msFullscreenElement;

        if (!isInNativeFullscreen) {
          setIsFullscreen(false);
        }
      }
    };

    // Add listeners for all vendor-prefixed events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Grid lines
  const gridLines: JSX.Element[] = [];
  if (showGrid) {
    for (let gx = 0; gx <= stageW; gx += PX_PER_M) {
      gridLines.push(<line key={`v${gx}`} x1={gx} y1={0} x2={gx} y2={stageH} stroke="rgba(108,58,237,0.1)" strokeWidth={0.5} />);
    }
    for (let gy = 0; gy <= stageH; gy += PX_PER_M) {
      gridLines.push(<line key={`h${gy}`} x1={0} y1={gy} x2={stageW} y2={gy} stroke="rgba(108,58,237,0.1)" strokeWidth={0.5} />);
    }
    // Center lines
    gridLines.push(<line key="cx" x1={stageW/2} y1={0} x2={stageW/2} y2={stageH} stroke="rgba(108,58,237,0.2)" strokeWidth={0.8} strokeDasharray="4,4" />);
    gridLines.push(<line key="cy" x1={0} y1={stageH/2} x2={stageW} y2={stageH/2} stroke="rgba(108,58,237,0.2)" strokeWidth={0.8} strokeDasharray="4,4" />);
  }

  return (
    <div
      style={{
        position: isFullscreen ? "fixed" : "relative",
        top: isFullscreen ? 0 : undefined,
        left: isFullscreen ? 0 : undefined,
        right: isFullscreen ? 0 : undefined,
        bottom: isFullscreen ? 0 : undefined,
        width: isFullscreen ? "100vw" : undefined,
        height: isFullscreen ? "100vh" : undefined,
        flex: isFullscreen ? undefined : 1,
        overflow: "hidden",
        background: "#0F0A1E",
        zIndex: isFullscreen ? 9999 : undefined,
      }}
      ref={containerRef}
    >
      {/* SVG canvas */}
      <svg
        width="100%"
        height="100%"
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isPanning ? "grabbing" : dragging ? "grabbing" : "grab", userSelect: "none" }}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Center within viewport using foreignObject trick - just offset */}
          <g>
            {/* Audience area */}
            <rect
              x={0} y={stageH}
              width={stageW} height={audienceH}
              fill="rgba(108,58,237,0.08)"
              rx={0}
            />
            <text x={stageW / 2} y={stageH + audienceH / 2 + 5} textAnchor="middle" fontSize={11} fill="rgba(167,139,250,0.6)" fontFamily="Pretendard,sans-serif" fontWeight={600}>
              ▲ 객석 ▲
            </text>

            {/* Stage floor */}
            <rect x={0} y={0} width={stageW} height={stageH} fill="#211240" rx={6} />
            {/* Stage border */}
            <rect x={0} y={0} width={stageW} height={stageH} fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth={1.5} rx={6} />

            {/* Grid */}
            {gridLines}

            {/* STAGE FRONT label */}
            <text x={stageW / 2} y={stageH - 8} textAnchor="middle" fontSize={9} fill="rgba(167,139,250,0.5)" fontFamily="Pretendard,sans-serif" fontWeight={700} letterSpacing={2}>
              STAGE FRONT
            </text>

            {/* Dimension labels */}
            <text x={stageW / 2} y={-8} textAnchor="middle" fontSize={10} fill="rgba(167,139,250,0.5)" fontFamily="Pretendard,sans-serif">{stageWidth}m</text>
            <text x={-8} y={stageH / 2} textAnchor="middle" fontSize={10} fill="rgba(167,139,250,0.5)" fontFamily="Pretendard,sans-serif" transform={`rotate(-90,-8,${stageH/2})`}>{stageHeight}m</text>

            {/* Movement paths (ghost lines between positions) */}
            {/* Dancer nodes */}
            {members.map(m => {
              const pos = getPosition(m.id);
              const { px, py } = normToPx(pos.x, pos.y);
              const isSelected = selectedMemberId === m.id;
              const isActive = !!formation?.positions.find(p => p.memberId === m.id);

              return (
                <g key={m.id} onMouseDown={e => handleMouseDown(e, m.id)} style={{ cursor: readOnly ? "default" : "pointer" }}>
                  {/* Selection ring */}
                  {isSelected && (
                    <circle cx={px} cy={py} r={RADIUS + 6} fill="none" stroke={m.color} strokeWidth={2} opacity={0.5} />
                  )}
                  {/* Shadow */}
                  <circle cx={px} cy={py + 2} r={RADIUS} fill="rgba(0,0,0,0.4)" />
                  {/* Main circle */}
                  <circle cx={px} cy={py} r={RADIUS} fill={m.color} opacity={isActive ? 1 : 0.3} />
                  {/* Highlight */}
                  <circle cx={px - 5} cy={py - 5} r={5} fill="rgba(255,255,255,0.25)" />
                  {/* Initial */}
                  <text x={px} y={py + 4} textAnchor="middle" fontSize={11} fill="white" fontFamily="Pretendard,sans-serif" fontWeight={800}>
                    {m.name[0]}
                  </text>
                  {/* Name label */}
                  <text x={px} y={py + RADIUS + 13} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="Pretendard,sans-serif" fontWeight={600}>
                    {m.name}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Controls overlay */}
      <div className="stage-controls" style={{ position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 6 }}>
        <button onClick={() => setZoom(z => Math.min(2.5, z + 0.15))} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
          <ZoomIn size={16} color="white" />
        </button>
        <button onClick={() => setZoom(z => Math.max(0.4, z - 0.15))} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
          <ZoomOut size={16} color="white" />
        </button>
        <button
          onClick={handleToggleFullscreen}
          title={isFullscreen ? "전체화면 종료" : "전체화면"}
          style={{ width: 36, height: 36, borderRadius: 10, background: isFullscreen ? "rgba(108,58,237,0.7)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
        >
          {isFullscreen ? <Minimize2 size={14} color="white" /> : <Maximize2 size={14} color="white" />}
        </button>
      </div>

      {/* Grid toggle */}
      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
        <button onClick={() => setShowGrid(!showGrid)} style={{ padding: "6px 12px", borderRadius: 8, background: showGrid ? "rgba(108,58,237,0.7)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "white", backdropFilter: "blur(8px)" }}>
          그리드 {showGrid ? "ON" : "OFF"}
        </button>
      </div>

      {/* Zoom level */}
      <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 8, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{Math.round(zoom * 100)}%</span>
      </div>

      {/* Fullscreen hint */}
      {isFullscreen && (
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", padding: "8px 16px", borderRadius: 8, background: "rgba(108,58,237,0.9)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <span style={{ fontSize: 12, color: "white", fontWeight: 600 }}>전체화면 모드</span>
          <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>ESC 키 또는 버튼으로 종료</span>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .stage-controls {
            bottom: 12px !important;
            right: 12px !important;
            gap: 4px !important;
          }
          .stage-controls button {
            width: 40px !important;
            height: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .stage-controls {
            bottom: 8px !important;
            right: 8px !important;
          }
          .stage-controls button {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
