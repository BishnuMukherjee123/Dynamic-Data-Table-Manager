"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Only set initial theme on mount, don't interfere with toggles
    const setInitialTheme = () => {
      try {
        const saved = localStorage.getItem("theme");
        if (!saved) {
          document.documentElement.classList.remove("dark");
          setTheme("light");
          return;
        }

        // Parse JSON string (useLocalStorage stores as JSON)
        let themeValue: string;
        try {
          themeValue = JSON.parse(saved);
        } catch {
          themeValue = saved;
        }

        const root = document.documentElement;
        if (themeValue === "dark") {
          root.classList.add("dark");
          setTheme("dark");
        } else {
          root.classList.remove("dark");
          setTheme("light");
        }
      } catch (error) {
        console.error("Error setting initial theme:", error);
      }
    };

    // Set initial theme only once on mount
    setInitialTheme();
  }, []);

  return (
    <body className="font-sans transition-colors duration-300">{children}</body>
  );
}
