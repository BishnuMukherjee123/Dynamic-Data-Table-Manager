"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // brand-indigo
    },
    secondary: {
      main: "#8b5cf6", // brand-purple
    },
    background: {
      default: "#f9fafb", // bg-gray-50
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937", // text-gray-800
      secondary: "#4b5563", // text-gray-600
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4f46e5", // brand-indigo
    },
    secondary: {
      main: "#8b5cf6", // brand-purple
    },
    background: {
      default: "#0a0a0f", // Main dark background - deep charcoal with subtle blue tint
      paper: "#1a1a24", // Secondary background (card) - dark slate with good contrast
    },
    text: {
      primary: "#e5e7eb", // text-gray-200
      secondary: "#9ca3af", // text-gray-400
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Remove default gradient
        },
        elevation3: {
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
        },
      },
    },
  },
});
