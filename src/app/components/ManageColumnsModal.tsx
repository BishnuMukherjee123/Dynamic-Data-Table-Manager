"use client";

import React from "react";
import type { User, Column } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Stack,
  Zoom,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

interface ManageColumnsModalProps {
  columns: Column[];
  onClose: () => void;
  onColumnToggle: (key: keyof User, visible: boolean) => void;
  onAddNewColumn: (label: string) => void;
  theme?: "light" | "dark";
}

interface FormData {
  newColumnName: string;
}

const ManageColumnsModal: React.FC<ManageColumnsModalProps> = ({
  columns,
  onClose,
  onColumnToggle,
  onAddNewColumn,
  theme = "light",
}) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      newColumnName: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.newColumnName.trim()) {
      onAddNewColumn(data.newColumnName.trim());
      reset();
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
          pb: 2,
          background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 600,
        }}
      >
        Manage Columns
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: theme === "dark" ? "#9ca3af" : "#6b7280",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#334155" : "#f3f4f6",
              color: theme === "dark" ? "#e5e7eb" : "#4b5563",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: theme === "dark" ? "#9ca3af" : "#4b5563",
            mb: 3,
          }}
        >
          Select columns to display in the table.
        </Typography>

        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            border: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
            borderRadius: 2,
            p: 1,
          }}
        >
          <List>
            {columns.map((col) => (
              <ListItem
                key={col.key}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#252530" : "#f3f4f6",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={col.visible}
                      onChange={(e) =>
                        onColumnToggle(col.key, e.target.checked)
                      }
                      sx={{
                        color: theme === "dark" ? "#334155" : "#d1d5db",
                        "&.Mui-checked": {
                          color: "#4f46e5",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: theme === "dark" ? "#e5e7eb" : "#1f2937",
                        fontWeight: 500,
                      }}
                    >
                      {col.label}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: theme === "dark" ? "#e5e7eb" : "#1f2937",
            }}
          >
            Add New Column
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={2}>
              <Controller
                name="newColumnName"
                control={control}
                rules={{ required: "Column name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="e.g., Phone Number"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor:
                          theme === "dark" ? "#0f172a" : "#f9fafb",
                        "& fieldset": {
                          borderColor: theme === "dark" ? "#334155" : "#d1d5db",
                        },
                        "&:hover fieldset": {
                          borderColor: theme === "dark" ? "#475569" : "#9ca3af",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme === "dark" ? "#e5e7eb" : "#1f2937",
                      },
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<Add />}
                sx={{
                  background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
                  "&:hover": {
                    background: "linear-gradient(to right, #7c3aed, #4338ca)",
                  },
                  whiteSpace: "nowrap",
                }}
              >
                Add
              </Button>
            </Stack>
          </form>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
          backgroundColor:
            theme === "dark" ? "rgba(15, 23, 42, 0.5)" : "#f9fafb",
          px: 3,
          py: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: theme === "dark" ? "#334155" : "#e5e7eb",
            color: theme === "dark" ? "#e5e7eb" : "#1f2937",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#475569" : "#d1d5db",
            },
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageColumnsModal;
