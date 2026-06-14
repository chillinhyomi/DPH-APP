import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  title: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function MobileFrame({ children, title, onClick, isActive }: MobileFrameProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* Screen label */}
      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#6C3AED" : "#9CA3AF", letterSpacing: 0.5 }}>{title}</span>
      </div>

      {/* Phone shell */}
      <div
        style={{
          width: 200,
          height: 420,
          borderRadius: 36,
          background: "#1A1033",
          padding: 6,
          boxShadow: isActive
            ? "0 20px 60px rgba(108,58,237,0.5), 0 0 0 2px #6C3AED"
            : "0 8px 32px rgba(0,0,0,0.25)",
          transition: "all 0.3s ease",
          transform: isActive ? "scale(1.02)" : "scale(1)",
          flexShrink: 0,
        }}
      >
        {/* Notch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <div style={{ width: 60, height: 18, borderRadius: 20, background: "#0F0A1E", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1A1033" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2D1F4E" }} />
          </div>
        </div>

        {/* Screen */}
        <div style={{ borderRadius: 28, overflow: "hidden", height: "calc(100% - 26px)", background: "#F8FAFC" }}>
          <div style={{ transform: "scale(0.513)", transformOrigin: "top left", width: "195%", height: "195%" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileFrameFull({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: 390,
      height: 844,
      borderRadius: 48,
      background: "#1A1033",
      padding: 8,
      boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
      flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ width: 120, height: 32, borderRadius: 24, background: "#0F0A1E", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A1033" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D1F4E" }} />
        </div>
      </div>
      {/* Screen content */}
      <div style={{ borderRadius: 40, overflow: "hidden", height: "calc(100% - 40px)", background: "#F8FAFC" }}>
        {children}
      </div>
    </div>
  );
}
