import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("dph-theme");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  // Add toast animation styles on mount
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--background", "#0F172A");
      root.style.setProperty("--foreground", "#F9FAFB");
      root.style.setProperty("--card", "#1F2937");
      root.style.setProperty("--card-foreground", "#F9FAFB");
      root.style.setProperty("--popover", "#1F2937");
      root.style.setProperty("--popover-foreground", "#F9FAFB");
      root.style.setProperty("--primary", "#F9FAFB");
      root.style.setProperty("--primary-foreground", "#0F172A");
      root.style.setProperty("--secondary", "#374151");
      root.style.setProperty("--secondary-foreground", "#F9FAFB");
      root.style.setProperty("--muted", "#374151");
      root.style.setProperty("--muted-foreground", "#CBD5E1");
      root.style.setProperty("--accent", "#6366F1");
      root.style.setProperty("--accent-foreground", "#F9FAFB");
      root.style.setProperty("--destructive", "#EF4444");
      root.style.setProperty("--destructive-foreground", "#F9FAFB");
      root.style.setProperty("--border", "#374151");
      root.style.setProperty("--input", "#374151");
      root.style.setProperty("--ring", "#6366F1");
      root.style.setProperty("--success", "#10B981");
      root.style.setProperty("--warning", "#F59E0B");
    } else {
      root.style.setProperty("--background", "#F8FAFC");
      root.style.setProperty("--foreground", "#111827");
      root.style.setProperty("--card", "#FFFFFF");
      root.style.setProperty("--card-foreground", "#111827");
      root.style.setProperty("--popover", "#FFFFFF");
      root.style.setProperty("--popover-foreground", "#111827");
      root.style.setProperty("--primary", "#111827");
      root.style.setProperty("--primary-foreground", "#F9FAFB");
      root.style.setProperty("--secondary", "#F1F5F9");
      root.style.setProperty("--secondary-foreground", "#111827");
      root.style.setProperty("--muted", "#F1F5F9");
      root.style.setProperty("--muted-foreground", "#6B7280");
      root.style.setProperty("--accent", "#6366F1");
      root.style.setProperty("--accent-foreground", "#FFFFFF");
      root.style.setProperty("--destructive", "#EF4444");
      root.style.setProperty("--destructive-foreground", "#FFFFFF");
      root.style.setProperty("--border", "#E5E7EB");
      root.style.setProperty("--input", "#E5E7EB");
      root.style.setProperty("--ring", "#6366F1");
      root.style.setProperty("--success", "#10B981");
      root.style.setProperty("--warning", "#F59E0B");
    }

    localStorage.setItem("dph-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => {
      const newTheme = prev === "light" ? "dark" : "light";

      // Delay toast to allow CSS variables to update first
      setTimeout(() => {
        const message = newTheme === "dark" ? "다크 모드 활성화" : "라이트 모드 활성화";
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--card").trim();
        const textColor = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();

        // Create a simple toast notification
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.cssText = `
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: ${bgColor};
          color: ${textColor};
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
          border: 1px solid var(--border);
        `;

        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transition = "opacity 0.3s";
          setTimeout(() => {
            if (document.body.contains(toast)) {
              document.body.removeChild(toast);
            }
          }, 300);
        }, 2000);
      }, 50);

      return newTheme;
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
