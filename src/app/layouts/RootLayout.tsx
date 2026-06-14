import { Outlet } from "react-router";
import { AppProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeContext";

export function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Outlet />
      </AppProvider>
    </ThemeProvider>
  );
}
