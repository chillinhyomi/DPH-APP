import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface MobilePageProps {
  children: ReactNode;
}

/**
 * Shared mobile page wrapper component.
 *
 * Ensures consistent scrolling behavior across all pages.
 * Only the top nav bar and bottom nav bar remain fixed.
 * All page content (headers, titles, buttons) scrolls naturally.
 */
export function MobilePage({ children }: MobilePageProps) {
  return (
    <div style={{
      height: "100%",
      overflow: "auto",
      background: "var(--background)",
      WebkitOverflowScrolling: "touch",
    }}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  extra?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

/**
 * Standard page header component.
 * This scrolls with the page content.
 */
export function PageHeader({ title, subtitle, action, extra, showBack, onBack }: PageHeaderProps) {
  // Always call hooks unconditionally at the top level
  const navigate = useNavigate();

  // Handler function for back navigation
  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }

  return (
    <div style={{
      background: "var(--card)",
      padding: "20px 16px",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: extra ? 16 : 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          {showBack && (
            <button
              onClick={handleBack}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--muted)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={20} color="var(--foreground)" />
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{
              fontSize: 24,
              fontWeight: 800,
              color: "var(--foreground)",
              marginBottom: subtitle ? 4 : 0,
              letterSpacing: -0.5,
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{
                fontSize: 14,
                color: "var(--muted-foreground)",
              }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div style={{ flexShrink: 0 }}>
            {action}
          </div>
        )}
      </div>
      {extra && (
        <div>
          {extra}
        </div>
      )}
    </div>
  );
}

interface PageContentProps {
  children: ReactNode;
  noPadding?: boolean;
}

/**
 * Standard page content container.
 * Provides consistent padding and safe bottom spacing.
 */
export function PageContent({ children, noPadding }: PageContentProps) {
  return (
    <div style={{
      padding: noPadding ? 0 : "16px",
      paddingBottom: noPadding ? 0 : "24px",
      minHeight: "calc(100vh - 120px)", // Ensures content extends fully
    }}>
      {children}
    </div>
  );
}
