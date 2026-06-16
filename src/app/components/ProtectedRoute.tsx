import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useApp } from "../context/AppContext";
import { useLocation } from "react-router";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, authLoading, authMessage } = useApp();
  const location = useLocation();

  if (authLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname, authMessage }} />;
  }

  return <>{children}</>;
}
