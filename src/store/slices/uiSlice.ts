import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SortConfig, User } from "@/types";

interface UIState {
  theme: "light" | "dark";
  searchTerm: string;
  sortConfig: SortConfig | null;
  currentPage: number;
  isManageColumnsModalOpen: boolean;
  userToDelete: number | null;
  editingRows: Record<number, Partial<User>>;
}

const initialState: UIState = {
  theme: "light",
  searchTerm: "",
  sortConfig: { key: "name", direction: "ascending" },
  currentPage: 1,
  isManageColumnsModalOpen: false,
  userToDelete: null,
  editingRows: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig | null>) => {
      state.sortConfig = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    openManageColumnsModal: (state) => {
      state.isManageColumnsModalOpen = true;
    },
    closeManageColumnsModal: (state) => {
      state.isManageColumnsModalOpen = false;
    },
    setUserToDelete: (state, action: PayloadAction<number | null>) => {
      state.userToDelete = action.payload;
    },
    setEditingRows: (
      state,
      action: PayloadAction<Record<number, Partial<User>>>
    ) => {
      state.editingRows = action.payload;
    },
    updateEditingRow: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<User> }>
    ) => {
      state.editingRows[action.payload.id] = {
        ...state.editingRows[action.payload.id],
        ...action.payload.updates,
      };
    },
    clearEditingRows: (state) => {
      state.editingRows = {};
    },
  },
});

export const {
  setTheme,
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
} = uiSlice.actions;

export default uiSlice.reducer;
