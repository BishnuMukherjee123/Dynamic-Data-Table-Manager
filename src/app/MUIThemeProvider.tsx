"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { lightTheme, darkTheme } from "@/styles/muiTheme";
import { useEffect } from "react";

export function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.ui.theme);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    // Sync theme to HTML class for any remaining CSS
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
