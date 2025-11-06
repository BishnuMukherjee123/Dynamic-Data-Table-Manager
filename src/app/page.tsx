"use client";

import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setUsers,
  importUsers,
  updateMultipleUsers,
  deleteUser,
} from "@/store/slices/usersSlice";
import {
  toggleColumnVisibility,
  addColumn,
  reorderColumns,
} from "@/store/slices/columnsSlice";
import {
  toggleTheme,
  setSearchTerm,
  setSortConfig,
  setCurrentPage,
  openManageColumnsModal,
  closeManageColumnsModal,
  setUserToDelete,
  setEditingRows,
  updateEditingRow,
  clearEditingRows,
} from "@/store/slices/uiSlice";
import type { User } from "@/types";
import { INITIAL_USERS, INITIAL_COLUMNS } from "@/constants";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import ManageColumnsModal from "./components/ManageColumnsModal";
import ConfirmationModal from "./components/ConfirmationModal";
import Papa from "papaparse";
import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Upload,
  Download,
  Settings,
  Save,
  Cancel,
  Search as SearchIcon,
} from "@mui/icons-material";
import { setColumns } from "@/store/slices/columnsSlice";

/** Main Page — Dynamic Data Table Manager */
export default function Page() {
  const dispatch = useAppDispatch();
  const muiTheme = useAppSelector((state) => state.ui.theme);

  // Redux state
  const users = useAppSelector((state) => state.users.users);
  const columns = useAppSelector((state) => state.columns.columns);
  const searchTerm = useAppSelector((state) => state.ui.searchTerm);
  const sortConfig = useAppSelector((state) => state.ui.sortConfig);
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const isManageColumnsModalOpen = useAppSelector(
    (state) => state.ui.isManageColumnsModalOpen
  );
  const userToDeleteId = useAppSelector((state) => state.ui.userToDelete);
  const editingRows = useAppSelector((state) => state.ui.editingRows);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize store on mount
  useEffect(() => {
    if (users.length === 0) {
      dispatch(setUsers(INITIAL_USERS));
    }
    if (columns.length === 0) {
      dispatch(setColumns(INITIAL_COLUMNS));
    }
  }, [dispatch, users.length, columns.length]);

  // Visible columns
  const visibleColumns = useMemo(
    () => columns.filter((c: { visible: boolean }) => c.visible),
    [columns]
  );

  // Search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user: User) =>
      visibleColumns.some((column: { key: keyof User }) => {
        const value = user[column.key];
        return value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
  }, [users, searchTerm, visibleColumns]);

  // Sorting
  const sortedUsers = useMemo(() => {
    const sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }

        if (String(aValue).localeCompare(String(bValue)) < 0) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (String(aValue).localeCompare(String(bValue)) > 0) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  // Pagination
  useEffect(() => {
    if (currentPage > Math.ceil(sortedUsers.length / 10)) {
      dispatch(setCurrentPage(1));
    }
  }, [sortedUsers.length, currentPage, dispatch]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    return sortedUsers.slice(startIndex, startIndex + 10);
  }, [sortedUsers, currentPage]);

  // Handlers
  const handleSort = useCallback(
    (key: keyof User) => {
      let direction: "ascending" | "descending" = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      dispatch(setSortConfig({ key, direction }));
    },
    [sortConfig, dispatch]
  );

  const handleColumnVisibilityChange = (key: keyof User, visible: boolean) => {
    dispatch(toggleColumnVisibility({ key, visible }));
  };

  const handleAddNewColumn = (label: string) => {
    const key = label.toLowerCase().replace(/[^a-z0-9]/g, "") as keyof User;
    if (!key) {
      alert("Invalid column name.");
      return;
    }
    if (columns.some((c: { key: string }) => c.key === key)) {
      alert("Column already exists.");
      return;
    }
    dispatch(addColumn({ key, label, visible: true, sortable: true }));
    // Add empty field to all users
    const updatedUsers = users.map((user: User) => ({ ...user, [key]: "" }));
    dispatch(setUsers(updatedUsers));
  };

  const handleColumnOrderChange = (
    draggedKey: keyof User,
    targetKey: keyof User
  ) => {
    dispatch(reorderColumns({ draggedKey, targetKey }));
  };

  const handleExport = () => {
    if (!Papa) {
      alert("CSV library is loading, please try again in a moment.");
      return;
    }
    const dataToExport = sortedUsers.map((user: User) => {
      const row: Record<string, string | number | boolean | undefined> = {};
      visibleColumns.forEach((col: { label: string; key: keyof User }) => {
        row[col.label] = user[col.key];
      });
      return row;
    });
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!Papa) {
      alert("CSV library is loading, please try again in a moment.");
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: {
          data: Record<string, string>[];
          errors: { message: string }[];
        }) => {
          if (results.errors.length) {
            alert(
              "Error parsing CSV: " +
                results.errors.map((e) => e.message).join("\n")
            );
            return;
          }

          const importedUsers = results.data.map(
            (row: Record<string, string>, index: number) => {
              const newUser: User = {
                id: Date.now() + index,
                name: "",
                email: "",
                age: 0,
                role: "",
              };
              visibleColumns.forEach(
                (col: { label: string; key: keyof User }) => {
                  const rowHeader = Object.keys(row).find(
                    (k) => k.toLowerCase() === col.label.toLowerCase()
                  );
                  if (rowHeader) {
                    newUser[col.key] =
                      col.key === "age"
                        ? parseInt(row[rowHeader], 10) || 0
                        : row[rowHeader];
                  }
                }
              );
              return newUser;
            }
          );

          dispatch(importUsers(importedUsers));
          alert("Data imported successfully!");
        },
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteUser = () => {
    if (userToDeleteId !== null) {
      dispatch(deleteUser(userToDeleteId));
      dispatch(setUserToDelete(null));
    }
  };

  const handleStartEdit = (userId: number) => {
    if (!editingRows[userId]) {
      const userToEdit = users.find((u: User) => u.id === userId);
      if (userToEdit) {
        dispatch(
          setEditingRows({ ...editingRows, [userId]: { ...userToEdit } })
        );
      }
    }
  };

  const handleEditChange = (
    userId: number,
    field: keyof User,
    value: string | number | boolean | undefined
  ) => {
    // Basic validation
    if (field === "age") {
      const age = Number(value);
      if (isNaN(age) || age < 0 || age > 120) {
        return;
      }
    }
    dispatch(
      updateEditingRow({
        id: userId,
        updates: { [field]: value },
      })
    );
  };

  const handleSaveAll = () => {
    dispatch(updateMultipleUsers(editingRows));
    dispatch(clearEditingRows());
  };

  const handleCancelAll = () => {
    dispatch(clearEditingRows());
  };

  const isEditing = Object.keys(editingRows).length > 0;
  const userToDelete = userToDeleteId
    ? users.find((u: User) => u.id === userToDeleteId)
    : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 2, sm: 3, lg: 4 },
        px: { xs: 2, sm: 3, lg: 4 },
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.2,
              pb: 0.5,
            }}
          >
            Data Table Manager
          </Typography>
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: muiTheme === "dark" ? "#9ca3af" : "#6b7280",
              "&:hover": {
                bgcolor: muiTheme === "dark" ? "#1a1a24" : "#e5e7eb",
              },
            }}
          >
            {muiTheme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>

        {/* Main Card */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, lg: 4 },
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow:
              muiTheme === "dark"
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)"
                : undefined,
          }}
        >
          {/* Top Controls */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <TextField
              fullWidth
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: muiTheme === "dark" ? "#9ca3af" : "#6b7280",
                        fontSize: "1.25rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: { md: "0 0 350px" },
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  fontSize: "1rem",
                },
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ flex: 1, justifyContent: "flex-end", flexWrap: "wrap" }}
            >
              {isEditing && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Save />}
                    onClick={handleSaveAll}
                    size="large"
                    sx={{
                      minHeight: "48px",
                      px: 3,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Save All
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={handleCancelAll}
                    size="large"
                    sx={{
                      minHeight: "48px",
                      px: 3,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Cancel All
                  </Button>
                </>
              )}

              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleImport}
                style={{ display: "none" }}
                id="csv-importer"
              />
              <label htmlFor="csv-importer">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<Upload />}
                  size="large"
                  sx={{
                    minHeight: "48px",
                    px: 3,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  Import
                </Button>
              </label>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                size="large"
                sx={{
                  minHeight: "48px",
                  px: 3,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<Settings />}
                onClick={() => dispatch(openManageColumnsModal())}
                size="large"
                sx={{
                  minHeight: "48px",
                  px: 3.5,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
                  "&:hover": {
                    background: "linear-gradient(to right, #7c3aed, #4338ca)",
                  },
                }}
              >
                Manage Columns
              </Button>
            </Stack>
          </Stack>

          {/* Table */}
          <DataTable
            users={paginatedUsers}
            columns={visibleColumns}
            sortConfig={sortConfig}
            onSort={handleSort}
            onDelete={(user) => dispatch(setUserToDelete(user.id))}
            onEditStart={handleStartEdit}
            onEditChange={handleEditChange}
            onColumnOrderChange={handleColumnOrderChange}
            editingRows={editingRows}
            theme={muiTheme}
          />

          {/* Pagination */}
          <Pagination
            totalItems={sortedUsers.length}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            theme={muiTheme}
          />
        </Paper>
      </Container>

      {/* Modals */}
      {isManageColumnsModalOpen && (
        <ManageColumnsModal
          columns={columns}
          onClose={() => dispatch(closeManageColumnsModal())}
          onColumnToggle={handleColumnVisibilityChange}
          onAddNewColumn={handleAddNewColumn}
          theme={muiTheme}
        />
      )}

      {userToDelete && (
        <ConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${userToDelete.name}? This action is irreversible.`}
          onConfirm={handleDeleteUser}
          onCancel={() => dispatch(setUserToDelete(null))}
          theme={muiTheme}
        />
      )}
    </Box>
  );
}
