"use client";

import React, { useState } from "react";
import type { User, Column, SortConfig } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Edit,
  Delete,
  DragIndicator,
} from "@mui/icons-material";

interface DataTableProps {
  users: User[];
  columns: Column[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof User) => void;
  onDelete: (user: User) => void;
  onEditStart: (userId: number) => void;
  onEditChange: (
    userId: number,
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  onColumnOrderChange: (draggedKey: keyof User, targetKey: keyof User) => void;
  editingRows: Record<number, Partial<User>>;
  theme?: "light" | "dark";
}

const DataTable: React.FC<DataTableProps> = ({
  users,
  columns,
  sortConfig,
  onSort,
  onDelete,
  onEditStart,
  onEditChange,
  onColumnOrderChange,
  editingRows,
  theme = "light",
}) => {
  const [draggedColumn, setDraggedColumn] = useState<keyof User | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    key: keyof User
  ) => {
    setDraggedColumn(key);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLTableCellElement>,
    targetKey: keyof User
  ) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== targetKey) {
      onColumnOrderChange(draggedColumn, targetKey);
    }
    setDraggedColumn(null);
  };

  const renderCellContent = (user: User, column: Column) => {
    const isEditing = !!editingRows[user.id];
    const value = isEditing
      ? editingRows[user.id][column.key] ?? user[column.key]
      : user[column.key];

    if (isEditing) {
      const inputValue =
        value === undefined || value === null ? "" : String(value);
      return (
        <TextField
          type={
            column.key === "age"
              ? "number"
              : column.key === "email"
              ? "email"
              : "text"
          }
          value={inputValue}
          onChange={(e) =>
            onEditChange(
              user.id,
              column.key,
              column.key === "age"
                ? parseInt(e.target.value) || ""
                : e.target.value
            )
          }
          size="small"
          variant="outlined"
          fullWidth
          autoFocus={columns.findIndex((c) => c.key === column.key) === 0}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              "& fieldset": {
                borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
              },
            },
          }}
        />
      );
    }
    // Ensure consistent rendering between server and client
    if (value === undefined || value === null) {
      return "";
    }
    return String(value);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
              "& .MuiTableCell-head": {
                color: "white",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.75rem",
              },
            }}
          >
            {columns.map((col) => (
              <TableCell
                key={col.key}
                draggable={col.sortable}
                onDragStart={(e) => handleDragStart(e, col.key)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.key)}
                sx={{
                  cursor: col.sortable ? "grab" : "default",
                  "&:active": {
                    cursor: "grabbing",
                  },
                  opacity: draggedColumn === col.key ? 0.5 : 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DragIndicator sx={{ fontSize: 16 }} />
                  <Box
                    component="span"
                    onClick={col.sortable ? () => onSort(col.key) : undefined}
                    sx={{
                      cursor: col.sortable ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {col.label}
                    {col.sortable && (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === "ascending" ? (
                            <ArrowUpward sx={{ fontSize: 16 }} />
                          ) : (
                            <ArrowDownward sx={{ fontSize: 16 }} />
                          )
                        ) : (
                          <ArrowUpward sx={{ fontSize: 16, opacity: 0.3 }} />
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </TableCell>
            ))}
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isEditing = !!editingRows[user.id];
            return (
              <TableRow
                key={user.id}
                onDoubleClick={() => onEditStart(user.id)}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "#f9fafb",
                  },
                  backgroundColor: isEditing
                    ? theme === "dark"
                      ? "#252530"
                      : "#dbeafe"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#252530" : "#f3f4f6",
                  },
                  borderBottom: `1px solid ${
                    theme === "dark" ? "#334155" : "#e5e7eb"
                  }`,
                  transition: "background-color 0.2s",
                }}
              >
                {columns.map((col) => (
                  <TableCell key={`${user.id}-${col.key}`}>
                    {renderCellContent(user, col)}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEditStart(user.id)}
                      sx={{
                        color: theme === "dark" ? "#9ca3af" : "#6b7280",
                        "&:hover": {
                          backgroundColor:
                            theme === "dark" ? "#475569" : "#e5e7eb",
                          color: "#4f46e5",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(user)}
                      sx={{
                        color: theme === "dark" ? "#9ca3af" : "#6b7280",
                        "&:hover": {
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(239, 68, 68, 0.2)"
                              : "#fee2e2",
                          color: "#ef4444",
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: theme === "dark" ? "#9ca3af" : "#6b7280",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            🤷‍♂️
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: theme === "dark" ? "#d1d5db" : "#1f2937",
            }}
          >
            No Users Found!
          </Typography>
          <Typography variant="body2">
            Looks like the user list is empty. Try a different search or import
            a CSV to get started.
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default DataTable;
