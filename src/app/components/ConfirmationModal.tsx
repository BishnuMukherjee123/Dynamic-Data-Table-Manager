"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Zoom,
} from "@mui/material";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  theme?: "light" | "dark";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  theme = "light",
}) => {
  return (
    <Dialog
      open={true}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Zoom}
      TransitionProps={{
        timeout: 300,
        style: {
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: theme === "dark" ? "#1a1a24" : "#ffffff",
          boxShadow:
            theme === "dark"
              ? "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 10px 20px -5px rgba(0, 0, 0, 0.5)"
              : undefined,
          borderRadius: 3,
          animation: "fadeInUp 0.3s ease-out",
          "@keyframes fadeInUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(20px) scale(0.95)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          },
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.3s ease-out",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme === "dark" ? "#ffffff" : "#111827",
          fontWeight: 600,
          borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
          pb: 2,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme === "dark" ? "#d1d5db" : "#4b5563",
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
          backgroundColor:
            theme === "dark" ? "rgba(15, 23, 42, 0.5)" : "#f9fafb",
          px: 3,
          py: 2,
          gap: 2,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor: theme === "dark" ? "#334155" : "#d1d5db",
            color: theme === "dark" ? "#e5e7eb" : "#374151",
            backgroundColor: theme === "dark" ? "#334155" : "#ffffff",
            "&:hover": {
              borderColor: theme === "dark" ? "#475569" : "#9ca3af",
              backgroundColor: theme === "dark" ? "#475569" : "#f9fafb",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #ef4444, #b91c1c)",
            color: "#ffffff",
            "&:hover": {
              background: "linear-gradient(to right, #dc2626, #991b1b)",
            },
          }}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
